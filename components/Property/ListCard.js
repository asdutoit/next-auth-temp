import React, { memo } from 'react';
import { isEqual } from 'lodash';

function areEqual(prevProps, nextProps) {
    console.log('LISTCARD PROPS CHECK', isEqual(prevProps, nextProps));
    if (isEqual(prevProps, nextProps)) {
        return true; // props are equal
    }
    return false; // props are not equal -> update the component
}

export default memo(function ListCard(props) {
    const { property, setIsHighlighted, children } = props;
    return (
        <div
            className="relative transition duration-300 transform hover:scale-105 hover:shadow-md"
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
}, areEqual);

{
    /* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
</svg> */
}
