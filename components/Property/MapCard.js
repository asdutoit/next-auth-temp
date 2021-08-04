import React from 'react';
import { numFormatter } from '../../utils/numFormatter';
import PhotoSlider from './PhotoSlider';

export default function MapCard({ data, layerProps = null }) {
    const price = numFormatter(data.community.price_max);

    return (
        <div
            className="w-320 h-290 bg-green-400 shadow-xl rounded-lg relative flex flex-col"
            {...layerProps}
        >
            <div className="bg-yellow-300 h-290 rounded-lg">
                <PhotoSlider photos={data.photos} rounded="true" />
            </div>
            <div
                className=" text-white p-2 absolute bottom-0 w-full cursor-pointer marker-component-details rounded-xl"
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
                                        <strong>{`${data.community.beds_max}`}</strong>
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
                                        <strong>{`${data.community.baths_max}`}</strong>
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
                                            data.community.sqft_max === null
                                                ? 'N/A'
                                                : data.community.sqft_max
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

                <div className="text-white font-normal text-sm h-9">{`${data.address.line}, ${data.address.neighborhood_name}, ${data.address.city}, ${data.address.postal_code} `}</div>
            </div>{' '}
            {/* <Arrow
        {...arrowProps}
        size={10}
        roundness={0}
        backgroundColor="rgba(52, 211, 153)"
    /> */}
        </div>
    );
}
