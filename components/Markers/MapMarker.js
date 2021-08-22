import React from 'react';
import { numFormatter } from '../../utils/numFormatter';

const MapMarker = ({
    text,
    conditionalClass = null,
    clusterId = undefined,
    isOpen,
    currency = undefined,
}) => {
    const price = numFormatter(parseInt(text));

    return (
        <div
            className={`map-price-marker absolute flex items-center justify-center rounded cursor-pointer shadow-lg bg-white transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110 ${
                conditionalClass === clusterId
                    ? 'bg-green-500 transform -translate-y-1 scale-110 z-50'
                    : 'z-0'
            } ${isOpen ? '-translate-y-1 scale-110 bg-purple-400' : ''}`}
        >
            <span className="font-bold text-black text-xs">{`${
                currency ? currency : ''
            } ${price}`}</span>
        </div>
    );
};

export default MapMarker;

// <div
//                                     className={`map-price-marker absolute flex items-center justify-center rounded-2xl cursor-pointer shadow-lg bg-white transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110 ${
//                                         isHighlighted.property_id ===
//                                         cluster.properties.propertyId
//                                             ? 'bg-gray-200 transform -translate-y-1 scale-110 z-50'
//                                             : 'z-0'
//                                     }`}
// hover:bg-gray-200 -translate-y-1 scale-110 z-50
