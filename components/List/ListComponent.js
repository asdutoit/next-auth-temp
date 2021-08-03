import React from 'react';
import Image from 'next/image';
import ListCard from '../Property/ListCard';

export default function ListComponent({ properties, setIsHighlighted }) {
    return (
        <div className="flex flex-row h-full relative mdxl:grid mdxl:grid-cols-cardviews p-2 mdxl:p-5 gap-4">
            {properties.map((property) => (
                <ListCard
                    key={property.property_id}
                    property={property}
                    setIsHighlighted={setIsHighlighted}
                />
            ))}
            {/* </div>
            </div> */}
        </div>
    );
}
