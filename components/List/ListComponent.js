import React from 'react';
import Image from 'next/image';
import ListCard from '../Property/ListCard';
import Card from '../Property/Card';

export default function ListComponent({
    properties,
    setIsHighlighted,
    mapRef,
}) {
    return (
        <div className="flex flex-row h-full relative mdxl:grid mdxl:grid-cols-cardviews p-2 mdxl:p-5 gap-4 overflow-auto">
            {properties.map((property) => (
                <ListCard
                    key={property._id}
                    property={property}
                    setIsHighlighted={setIsHighlighted}
                    mapRef={mapRef}
                >
                    <Card property={property} mapRef={mapRef} />
                </ListCard>
            ))}
        </div>
    );
}
