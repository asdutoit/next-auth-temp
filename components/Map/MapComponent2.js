import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { useLocalState } from '../../utils/useLocalState';
import { Drawing } from '../../components/maputils/Drawing';
import useSupercluster from 'use-supercluster';
import MarkerComponent from '../Markers/MarkerComponent';
import MapMarker from '../Markers/MapMarker';
import { classNames } from '../../utils/general';
import MarkerListComponent from '../Markers/MarkerListComponent';
import { getViewportProperties } from '../../utils/queries';

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

const libraries = ['places', 'geometry', 'drawing', 'visualization'];

const MarkerCluster = ({ children }) => children;

const renderMultiListingComponent = (points, isdragging) => {
    return (
        <MarkerListComponent
            className="overflow-visible"
            data={points}
            isdragging={isdragging}
        >
            {/* MARKER */}
            <MapMarker text={`${points.length} Listings`} />
        </MarkerListComponent>
    );
};

export default function MapComponent2({
    mapRef,
    mapsRef,
    polygonRef,
    setViewport,
    isHighlighted,
    setProperties,
    draw,
    setDraw,
}) {
    const [markers, setMarkers] = useState([]);
    const [points, setPoints] = useState([]);
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(11);
    const [busyDrawing, setBusyDrawing] = useState(false);
    const [isdragging, setIsdragging] = useState(false);
    const [value, setValue] = useLocalState('viewport', {
        lat: 24.701627,
        lng: -79.026432,
    });
    const [maploaded, setMapLoaded] = useState(false);
    const unClusteredProperties = [];

    useEffect(() => {
        // Will cause 1x extra re-render
        const points = markers.map((property) => ({
            type: 'Feature',
            properties: {
                cluster: false,
                propertyId: property._id,
                propertyPrice: property.community.price_max,
            },
            geometry: {
                type: 'Point',
                coordinates: [property.address.lon, property.address.lat],
            },
        }));
        setPoints([...points]);
    }, [markers]);

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
            if (!busyDrawing) {
                try {
                    const data = await getViewportProperties(mapviewport);
                    setMarkers([...data.properties]);
                } catch (error) {
                    console.log('error', error);
                }
            }

            setZoom(zoom);
        }
    };

    const onMapLoad = async ({ map, maps }) => {
        mapRef.current = map;
        mapsRef.current = maps;
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
        try {
            const data = await getViewportProperties(bounds);
            setMarkers([...data.properties]);
        } catch (error) {
            console.log(error);
        }
        setMapLoaded(true);
    };

    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 75, maxZoom: 20 },
    });

    // Function to check if properties are inside or outside the cluster
    const checkIfInCluster = (isHighlighted) => {
        // 1.  Check if the highlighted property is outside the cluster by comparing the unClusteredProperties with all properties
        const validationCheck = (property) =>
            property.properties.propertyId !== isHighlighted._id;
        const valid = unClusteredProperties.every(validationCheck);
        // 2.  Return boolean to use in conditional rendering
        return valid;
    };

    return (
        // Important! Always set the container height explicitly
        <>
            <Drawing
                mapRef={mapRef}
                polygonRef={polygonRef}
                setMarkers={setMarkers}
                setBusyDrawing={setBusyDrawing}
                setProperties={setProperties}
                draw={draw}
                setDraw={setDraw}
                type="rent" // rent or buy
            />
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
            >
                {/* ============= MARKERS ================ */}
                {clusters.map((cluster) => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const { cluster: isCluster, point_count: pointCount } =
                        cluster.properties;
                    if (isCluster) {
                        return (
                            <MarkerCluster
                                key={`cluster-${cluster.id}`}
                                lat={latitude}
                                lng={longitude}
                            >
                                <div
                                    className={classNames(
                                        zoom > 19
                                            ? ''
                                            : 'rounded-full h-6 w-6 flex items-center justify-center bg-blue-600 z-10 cursor-pointer transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110 '
                                    )}
                                    onClick={() => {
                                        const expansionZoom = Math.min(
                                            supercluster.getClusterExpansionZoom(
                                                cluster.id
                                            ),
                                            20
                                        );
                                        mapRef.current.setZoom(expansionZoom);
                                        mapRef.current.panTo({
                                            lat: latitude,
                                            lng: longitude,
                                        });
                                    }}
                                >
                                    {zoom > 19 ? (
                                        renderMultiListingComponent(
                                            supercluster.getLeaves(cluster.id),
                                            isdragging
                                        )
                                    ) : (
                                        <span className="font-bold text-white">
                                            {pointCount}
                                        </span>
                                    )}
                                </div>
                            </MarkerCluster>
                        );
                    } else {
                        unClusteredProperties.push(cluster);
                        return (
                            <MarkerComponent
                                key={`${cluster.properties.propertyId}`}
                                lat={latitude}
                                lng={longitude}
                                className="overflow-visible"
                                propertyId={cluster.properties.propertyId}
                                isdragging={isdragging}
                            >
                                {/* MARKER */}
                                <MapMarker
                                    text={cluster.properties.propertyPrice}
                                    conditionalClass={isHighlighted._id}
                                    clusterId={cluster.properties.propertyId}
                                    currency={'R'}
                                />
                            </MarkerComponent>
                        );
                    }
                })}
                
                {/* The code below display the MapMarker when hovering on a List Card.   This is while the marker is still part of the cluster */}
                {isHighlighted._id !== '' && checkIfInCluster(isHighlighted) ? (
                    <MapMarker
                        lat={isHighlighted.lat}
                        lng={isHighlighted.lon}
                        text={isHighlighted.price}
                        inCluster={true}
                        currency={'R'}
                    />
                ) : null}
                {/* ============= END MARKERS ================ */}
            </GoogleMapReact>
        </>
    );
}
