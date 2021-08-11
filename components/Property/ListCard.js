import React, { useState, memo, useEffect } from 'react';
import PhotoSlider from './PhotoSlider';
import { numFormatter } from '../../utils/numFormatter';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import {
    useQuery,
    useQueryClient,
    useMutation,
    notifyManager,
} from 'react-query';

const updater = async (propertyId) => {
    const res = await axios.post(`/api/property/${propertyId}/fav`);
    return res;
};

export default memo(function ListCard({
    property,
    setIsHighlighted,
    children,
}) {
    return (
        <div
            className="relative w-320 h-290 transition duration-100 ease-in-out transform hover:scale-102 "
            // FIXME: --- The following functions may have an adverse affect on performance.  Optimize ---
            // UPDATE:  Wrapped the component in React.memo.   Made a considerable difference.
            onMouseEnter={() =>
                setIsHighlighted({
                    _id: property._id,
                    property_id: property.property_id,
                    lon: property.address.lon,
                    lat: property.address.lat,
                    price: property.community.price_max,
                })
            }
            onMouseLeave={() =>
                setIsHighlighted({
                    _id: '',
                    property_id: '',
                    lon: '',
                    lat: '',
                    price: '',
                })
            }
        >
            {children}
        </div>
    );
});

{
    /* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
</svg> */
}
