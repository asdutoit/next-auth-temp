import React from 'react';
import Image from 'next/image';
import PhotoSlider from './PhotoSlider';
import { numFormatter } from '../../utils/numFormatter';

export default function ListCard({ property, setIsHighlighted }) {
    const price = numFormatter(property.community.price_max);

    return (
        <div
            className="relative w-320 h-230"
            // style={{ height: '230px', width: 'auto' }}
            key={property.property_id}
            onMouseEnter={() =>
                setIsHighlighted({
                    property_id: property.property_id,
                    lon: property.address.lon,
                    lat: property.address.lat,
                    price: property.community.price_max,
                })
            }
            onMouseLeave={() =>
                setIsHighlighted({
                    property_id: '',
                    lon: '',
                    lat: '',
                    price: '',
                })
            }
        >
            <div className="h-full relative w-full">
                {console.log(property.photos)}
                <PhotoSlider photos={property.photos} />
            </div>
            <div
                className=" text-white p-2 absolute bottom-0 w-full cursor-pointer marker-component-details"
                onClick={() => {}}
            >
                <div className="flex justify-between">
                    <div className="text-white align-center font-bold text-xl self-center">
                        {`$ ${price} `}
                    </div>
                    <div className="text-white align-center">
                        <div className="flex">
                            <div>
                                <div style={{ textAlign: 'center' }}>
                                    <p>
                                        <strong>{`${property.community.beds_max}`}</strong>
                                    </p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p>
                                        <strong>{`Beds`}</strong>
                                    </p>
                                </div>
                            </div>
                            <div
                                style={{
                                    borderRight: '1px solid #fff',
                                    marginLeft: '5px',
                                    marginRight: '5px',
                                }}
                            >
                                {' '}
                            </div>
                            <div>
                                <div style={{ textAlign: 'center' }}>
                                    <p>
                                        <strong>{`${property.community.baths_max}`}</strong>
                                    </p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p>
                                        <strong>{`Bath`}</strong>
                                    </p>
                                </div>
                            </div>
                            <div
                                style={{
                                    borderRight: '1px solid #fff',
                                    marginLeft: '5px',
                                    marginRight: '5px',
                                }}
                            >
                                {' '}
                            </div>
                            <div>
                                <div style={{ textAlign: 'center' }}>
                                    <p>
                                        <strong>{`${
                                            property.community.sqft_max === null
                                                ? 'N/A'
                                                : property.community.sqft_max
                                        }`}</strong>
                                    </p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p>
                                        <strong>{`sqft`}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-white font-normal text-sm h-9">{`${property.address.line}, ${property.address.neighborhood_name}, ${property.address.city}, ${property.address.postal_code} `}</div>
            </div>
        </div>
    );
}
// w-full md:w-1/2
