import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useLocalState } from '../../../utils/useLocalState';
import MapMarker from '../../Markers/MapMarker';
import Geocode from 'react-geocode';
import { updateState } from './AddProperty';
import { useStateMachine } from 'little-state-machine';

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

    const _onClick = ({ x, y, lat, lng, event }) => {
        console.log(x, y, lat, lng, event);
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
    };

    return (
        <div className="w-full h-full">
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
                onClick={_onClick}
            >
                {marker && (
                    <MapMarker lat={marker.lat} lng={marker.lng} text={price} />
                )}
            </GoogleMapReact>
        </div>
    );
}
