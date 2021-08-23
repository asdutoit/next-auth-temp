import React, { useEffect } from 'react';
import ListCard from '../Property/ListCard';
import Card from '../Property/Card';
import axios from 'axios';

export default function ListComponent({
    viewport,
    setIsHighlighted,
    mapRef,
    properties,
    setProperties,
}) {
    useEffect(() => {
        const fetchProperties = async (viewport) => {
            try {
                const response = await axios({
                    url: '/api/properties/viewport',
                    method: 'post',
                    data: {
                        viewport,
                        list: true,
                    },
                });
                setProperties(response.data.properties);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchProperties(viewport);
    }, [viewport]);

    return (
        <>
            {properties.length > 0 ? (
                <>
                    {/* might need to include 'overflow-auto' */}
                    <div className="h-full relative grid grid-cols-cardviews p-2 mdxl:p-5 gap-4 overflow-auto">
                        {properties.map((property) => (
                            <ListCard
                                key={property._id}
                                property={property}
                                setIsHighlighted={setIsHighlighted}
                                mapRef={mapRef}
                                className="w-full h-full"
                            >
                                <Card property={property} mapRef={mapRef} />
                            </ListCard>
                        ))}
                    </div>
                </>
            ) : (
                <div>No properties listed in this area</div>
            )}
        </>
    );
}
