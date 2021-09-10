import React, { useState, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import { useLocalState } from '../../../utils/useLocalState';
import MapMarker from '../../Markers/MapMarker';
import Geocode from 'react-geocode';
import { updateState } from './AddProperty';
import { useStateMachine } from 'little-state-machine';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';

function createMapOptions(maps) {
    return {
        panControl: true,
        mapTypeControl: true,
        scrollwheel: true,
        clickableIcons: false,
        drawing: true,
        fullscreenControl: false,
    };
}

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API);
Geocode.setLanguage('en');
Geocode.setRegion('za');

const libraries = ['places', 'geometry', 'drawing', 'visualization'];

export default function Map({
    price = 0.0,
    marker,
    setMarker,
    mapRef,
    mapsRef,
    setValue: setAddress,
    setStateaddress,
}) {
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(11);
    const [isdragging, setIsdragging] = useState(false);
    const [value, setValue] = useLocalState('viewport-addproperty', {
        lat: 24.701627,
        lng: -79.026432,
    });
    const [maploaded, setMapLoaded] = useState(false);
    const { state, actions } = useStateMachine({ updateState });
    const [viewport, setViewport] = useState(null);
    const polygonRef = useRef();
    const drawingRef = useRef();
    const [polygonOnMap, setPolygonOnMap] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);

    const onBoundsChanged = async (center, zoom, bounds) => {
        if (maploaded) {
            setValue({
                lat: center.lat,
                lng: center.lng,
            });
            setBounds([
                bounds.nw.lng,
                bounds.se.lat,
                bounds.se.lng,
                bounds.nw.lat,
            ]);

            const mapviewport = {
                south: bounds.se.lat,
                west: bounds.nw.lng,
                north: bounds.nw.lat,
                east: bounds.se.lng,
            };
            setViewport(mapviewport);
            setZoom(zoom);
        }
    };

    const onMapLoad = async ({ map, maps }) => {
        mapRef.current = map;
        mapsRef.current = maps;
        const polygonPath = [];
        const drawingManager = new maps.drawing.DrawingManager({
            // drawingMode: maps.drawing.OverlayType.POLYGON,
            drawingControl: false,
            drawingControlOptions: {
                position: maps.ControlPosition.TOP_CENTER,
                drawingModes: ['polygon'],
            },
        });
        drawingManager.setMap(map);
        drawingRef.current = drawingManager;

        maps.event.addListener(
            drawingManager,
            'polygoncomplete',
            function (event) {
                polygonRef.current = event;
                setPolygonOnMap(true);
                console.log('Path', event.getPath().getAt(1));
                console.log('Path', event.getPath().getAt(1).toUrlValue(5));
                let numberOfPaths = event.getPath().getLength();
                for (let i = 0; i < numberOfPaths; i++) {
                    polygonPath.push({
                        lat: event.getPath().getAt(i).lat(),
                        lng: event.getPath().getAt(i).lng(),
                    });
                }
                drawingManager.setDrawingMode(null);
            }
        );

        maps.event.addListener(
            drawingManager,
            'overlaycomplete',
            function (event) {
                console.log('overlaycomplete', event);
            }
        );
        map.addListener('click', function (event) {
            console.log('click', event.latLng.lat(), event.latLng.lng());
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setMarker({ lat, lng });
            Geocode.fromLatLng(lat, lng).then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    setAddress('Address', address);
                    setStateaddress(address);
                    actions.updateState({
                        address,
                        lat,
                        lng,
                    });
                    setAddress('Address Latitude', lat);
                    setAddress('Address Longitude', lng);
                },
                (error) => {
                    console.error(error);
                }
            );
        });

        if (state.PropertyDetails.lat) {
            setMarker({
                lat: state.PropertyDetails.lat,
                lng: state.PropertyDetails.lng,
            });
        }
        if (marker) {
            mapRef.current.panTo({
                lat: state.PropertyDetails.lat,
                lng: state.PropertyDetails.lng,
            });
        }
        const viewport = mapRef.current.getBounds();
        const bounds = JSON.parse(JSON.stringify(viewport));
        setViewport(bounds);

        const parsedbounds = [
            bounds.west,
            bounds.south,
            bounds.east,
            bounds.north,
        ];

        setBounds(parsedbounds);
        setMapLoaded(true);
    };

    function _clearPolygon() {
        const drawingManager = drawingRef.current;
        polygonRef?.current?.setMap(null);
        drawingManager.setDrawingMode(null);
        setPolygonOnMap(false);
        setIsDrawing(false);
    }

    function _drawPolygon() {
        setIsDrawing(true);
        const drawingManager = drawingRef.current;
        drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    }

    function _cancelDrawing() {
        const drawingManager = drawingRef.current;
        drawingManager.setDrawingMode(null);
        setIsDrawing(false);
    }

    return (
        <div className="w-full h-full relative">
            {polygonOnMap ? (
                <button
                    onClick={_clearPolygon}
                    className="absolute top-3 right-3 z-10 bg-white shadow-md rounded-md p-2 font-bold flex items-center"
                >
                    <span>
                        <TrashIcon className="h-5 w-5 text-blue-500 mr-1" />
                    </span>
                    Clear Perimeter
                </button>
            ) : isDrawing ? (
                <button
                    onClick={_cancelDrawing}
                    className="absolute top-3 right-3 z-10 bg-white shadow-md rounded-md p-2 font-bold flex items-center"
                >
                    Cancel Drawing
                </button>
            ) : (
                <button
                    onClick={_drawPolygon}
                    className="absolute top-3 right-3 z-10 bg-white shadow-md rounded-md p-2 font-bold flex items-center"
                >
                    <span>
                        <PencilIcon className="h-5 w-5 text-blue-500 mr-1" />
                    </span>
                    Draw Perimeter
                </button>
            )}

            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
                    libraries,
                }}
                // defaultCenter={default_center}
                options={createMapOptions}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={onMapLoad}
                defaultZoom={12}
                center={value}
                onChange={({ center, zoom, bounds }) =>
                    onBoundsChanged(center, zoom, bounds)
                }
                onDrag={() => setIsdragging(true)}
                onDragEnd={() => setIsdragging(false)}
                // onClick={_onClick}
            >
                {marker && (
                    <MapMarker lat={marker.lat} lng={marker.lng} text={price} />
                )}
            </GoogleMapReact>
        </div>
    );
}

// const _onClick = ({ x, y, lat, lng, event }) => {
//     // console.log(x, y, lat, lng, event);
//     setMarker({ lat, lng });
//     Geocode.fromLatLng(lat, lng).then(
//         (response) => {
//             const address = response.results[0].formatted_address;
//             setAddress('Address', address);
//             setStateaddress(address);
//             actions.updateState({
//                 address,
//                 lat,
//                 lng,
//             });
//             setAddress('Address Latitude', lat);
//             setAddress('Address Longitude', lng);
//         },
//         (error) => {
//             console.error(error);
//         }
//     );
// };

// const durbanvilleCoords = [
//     {
//         lat: -33.83106690626819,
//         lng: 18.64926516449815,
//     },
//     {
//         lat: -33.83186009360745,
//         lng: 18.650681370858013,
//     },
//     {
//         lat: -33.83115602880815,
//         lng: 18.651432389382183,
//     },
//     {
//         lat: -33.8301222016324,
//         lng: 18.65022003090745,
//     },
// ];

// const durbanville = new maps.Polygon({
//     paths: durbanvilleCoords,
//     strokeColor: '#FF0000',
//     strokeOpacity: 0.8,
//     strokeWeight: 3,
//     fillColor: '#FF0000',
//     fillOpacity: 0.35,
//     clickable: false,
// });

// // durbanville.maps.PolylineOptions.
// durbanville.setMap(map);
