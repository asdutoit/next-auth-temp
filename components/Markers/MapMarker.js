import React from 'react';
import { numFormatter } from '../../utils/numFormatter';
import { classNames } from '../../utils/general';

const MapMarker = ({
    text = '0.00',
    conditionalClass = null,
    clusterId = undefined,
    isOpen,
    currency = 'R',
    inCluster = false,
}) => {
    const price = numFormatter(parseInt(text));

    return (
        <div
            className={classNames(
                conditionalClass === clusterId || inCluster
                    ? 'transform -translate-y-1 scale-110 z-50 bg-green-400'
                    : isOpen
                    ? '-translate-y-1 scale-110 bg-purple-400'
                    : 'bg-white z-0',
                'map-price-marker absolute flex items-center justify-center rounded cursor-pointer shadow-lg  transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110'
            )}
        >
            <span className="font-bold text-black text-tiny">{`${
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
