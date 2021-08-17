import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import { useLocalState } from '../../utils/useLocalState';
import { Drawing } from '../../components/maputils/Drawing';
import useSupercluster from 'use-supercluster';
import MarkerComponent from '../Markers/MarkerComponent';
import MapMarker from '../Markers/MapMarker';
import { classNames } from '../../utils/general';
import MarkerListComponent from '../Markers/MarkerListComponent';

function createMapOptions(maps) {
    return {
        panControl: true,
        mapTypeControl: true,
        scrollwheel: true,
        clickableIcons: false,
        drawing: true,
    };
}

const default_center = { lat: 24.701627, lng: -79.026432 };
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
    properties,
    isHighlighted,
}) {
    const [center, setCenter] = useState({ lat: 24.701627, lng: -79.026432 });
    const [markers, setMarkers] = useState([]);
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(10);
    const [isdragging, setIsdragging] = useState(false);
    const [value, setValue] = useLocalState('viewport', {
        lat: 24.701627,
        lng: -79.026432,
    });

    const unClusteredProperties = [];

    useEffect(() => {
        setMarkers(properties); // Will cause 1x extra re-render
    }, [properties]);

    useEffect(() => {
        setCenter(value);
    }, []);

    const onBoundsChanged = async (center, zoom, bounds) => {
        setValue({
            lat: center.lat,
            lng: center.lng,
        });
        setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]);
        setZoom(zoom);
    };

    const onMapLoad = ({ map, maps }) => {
        mapRef.current = map;
        mapsRef.current = maps;
    };

    const points = properties.map((property) => ({
        type: 'Feature',
        properties: {
            cluster: false,
            propertyId: property.property_id,
            propertyType: property.prop_type,
            propertyPrice: property.community.price_max,
        },
        data: property,
        geometry: {
            type: 'Point',
            coordinates: [property.address.lon, property.address.lat],
        },
    }));

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
            property.properties.propertyId !== isHighlighted.property_id;
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
                type="rent" // rent or buy
                // pass property fetcher here
            />
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
                    libraries,
                }}
                defaultCenter={default_center}
                options={createMapOptions}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={onMapLoad}
                defaultZoom={8}
                center={center}
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
                                            : 'rounded-full h-6 w-6 flex items-center justify-center bg-indigo-400 z-10 cursor-pointer transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110 '
                                    )}
                                    onClick={() => {
                                        const expansionZoom = Math.min(
                                            supercluster.getClusterExpansionZoom(
                                                cluster.id
                                            ),
                                            20
                                        );
                                        console.log(
                                            'cluster properties',
                                            cluster
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
                                        <span className="font-bold">
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
                                data={cluster.data}
                                isdragging={isdragging}
                                // onClick={() => {
                                //     mapRef.current.panTo({
                                //         lat: latitude,
                                //         lng: longitude,
                                //     });
                                // }}
                            >
                                {/* MARKER */}
                                <MapMarker
                                    text={cluster.properties.propertyPrice}
                                    conditionalClass={isHighlighted.property_id}
                                    clusterId={cluster.properties.propertyId}
                                    currency={'R'}
                                />
                            </MarkerComponent>
                        );
                    }
                })}
                {isHighlighted.property_id !== '' &&
                checkIfInCluster(isHighlighted) ? (
                    <MapMarker
                        lat={isHighlighted.lat}
                        lng={isHighlighted.lon}
                        text={isHighlighted.price}
                        currency={'R'}
                    />
                ) : null}
                {/* ============= END MARKERS ================ */}
            </GoogleMapReact>
        </>
    );
}
