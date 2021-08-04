import React, { useState, memo } from 'react';
import PhotoSlider from './PhotoSlider';
import { numFormatter } from '../../utils/numFormatter';

export default memo(function ListCard({ property, setIsHighlighted }) {
    const price = numFormatter(property.community.price_max);
    const [favHover, setFavHover] = useState(false);
    const [shareHover, setShareHover] = useState(false);

    return (
        <div
            className="relative w-320 h-290 transition duration-100 ease-in-out transform hover:scale-102 "
            key={property.property_id}
            // FIXME: --- The following functions have an adverse affect on performance.  Optimize ---
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
            <div className="h-290">
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
            </div>{' '}
            <div className="absolute top-0 w-full  h-11 flex items-center justify-end">
                <div
                    className="pr-4 hover:cursor-pointer "
                    onMouseEnter={() => setFavHover(true)}
                    onMouseLeave={() => setFavHover(false)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="rounded-full h-8 w-8 bg-black bg-opacity-10 m-1 p-1 "
                        fill={favHover ? 'red' : 'none'}
                        viewBox="0 0 24 24"
                        stroke={favHover ? 'red' : 'currentColor'}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </div>
                <div
                    className="pr-4 hover:cursor-pointer "
                    onMouseEnter={() => setShareHover(true)}
                    onMouseLeave={() => setShareHover(false)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="rounded-full h-8 w-8 bg-black bg-opacity-10 m-1 p-1 "
                        fill={shareHover ? 'black' : 'none'}
                        viewBox="0 0 24 24"
                        stroke={shareHover ? 'black' : 'currentColor'}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
});

{
    /* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
</svg> */
}
