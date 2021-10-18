import React, { useContext } from 'react';
import { numFormatter } from '../../utils/numFormatter';
import { classNames } from '../../utils/general';
import { UserContext } from '../../context/Context';

const MapMarker = ({
    text = '0.00',
    conditionalClass = null,
    clusterId = undefined,
    isOpen,
    currency = 'R',
    inCluster = false,
    propertyId = undefined,
}) => {
    const price = numFormatter(parseInt(text));
    const { state } = useContext(UserContext);

    return (
        <div
            className={classNames(
                conditionalClass === clusterId || inCluster
                    ? 'transform -translate-y-1 scale-110 z-50 bg-gray-800'
                    : isOpen
                    ? '-translate-y-1 scale-110 bg-gray-800 hover:bg-gray-800'
                    : 'bg-white z-0 ',
                'map-price-marker absolute flex items-center justify-center rounded cursor-pointer shadow-lg transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110'
            )}
        >
            <span
                className={classNames(
                    conditionalClass === clusterId || inCluster
                        ? 'text-white'
                        : isOpen
                        ? 'text-white'
                        : 'text-black',
                    'font-bold text-tiny'
                )}
            >{`${currency ? currency : ''} ${price}`}</span>
            {state.favs.includes(propertyId) ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 absolute"
                    viewBox="0 0 20 20"
                    fill="red"
                    style={{ top: '-7px', right: '-7px' }}
                >
                    <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                    />
                </svg>
            ) : null}
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
