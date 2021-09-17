import React, { useState, useEffect, Children } from 'react';
import { useLayer, Arrow } from 'react-laag';
import MapCard from '../Property/MapCard';
import axios from 'axios';
import { isBrowser } from 'react-device-detect';
import MobileCard from '../Property/MobileCard';

export default function MarkerComponent({ propertyId, isdragging, children }) {
    const [isOpen, setOpen] = useState(false);
    const [mobileIsOpen, setMobileIsOpen] = useState(false);
    const [property, setProperty] = useState(undefined);

    // useEffect(() => {
    //     const fetchProperty = async (id) => {
    //         try {
    //             setFetchingData(true);
    //             const response = await axios.get(`/api/property/${id}`);
    //             setProperty(response.data.properties[0]);
    //             setFetchingData(false);
    //         } catch (error) {
    //             console.log('Error in the MarkerComponent');
    //         }
    //     };
    //     if (isOpen || mobileIsOpen) {
    //         fetchProperty(propertyId);
    //     }
    // }, [isOpen, mobileIsOpen]);

    const { triggerProps, layerProps, renderLayer } = useLayer({
        isOpen,
        auto: true,
        overflowContainer: false,
        isOpen,
        triggerOffset: 40,
        containerOffset: 0,
        arrowOffset: 6,
        // When clicking outside the card, the card will close.   Disable this feature is card should remain open even if scrolling the map
        onOutsideClick: isdragging ? null : () => setOpen(false),
    });

    // Passing props down to the children components
    const childrenWithProps = Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { isOpen });
        }
        return child;
    });

    return (
        <>
            {isBrowser ? (
                <>
                    <div {...triggerProps} onClick={() => setOpen(!isOpen)}>
                        {childrenWithProps}
                    </div>
                    {isOpen &&
                        renderLayer(
                            <div
                                className="w-270 h-245 bg-white shadow-3xl rounded-lg relative flex flex-col"
                                {...layerProps}
                            >
                                <MapCard
                                    rounded="true"
                                    propertyId={propertyId}
                                />
                            </div>
                        )}
                </>
            ) : (
                <>
                    <div onClick={() => setMobileIsOpen(!mobileIsOpen)}>
                        {childrenWithProps}
                    </div>
                    {mobileIsOpen && property ? (
                        <MobileCard
                            mobileIsOpen={mobileIsOpen}
                            setMobileIsOpen={setMobileIsOpen}
                            property={property}
                        />
                    ) : null}
                </>
            )}
        </>
    );
}
