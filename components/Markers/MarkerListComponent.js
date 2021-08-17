import React, { useState } from 'react';
import { useLayer, Arrow } from 'react-laag';
import Image from 'next/image';

export default function MarkerListComponent({ data, isdragging, children }) {
    const [isOpen, setOpen] = useState(false);

    const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
        isOpen,
        auto: true,
        overflowContainer: false,
        isOpen,
        triggerOffset: 40,
        containerOffset: 0,
        arrowOffset: 6,
        // When clicking outside the card, the card will close.   Disable this feature is card should remain open even if scrolling the map
        // onOutsideClick: isdragging ? null : () => setOpen(false),
    });

    return (
        <>
            <div {...triggerProps} onClick={() => setOpen(!isOpen)}>
                {children}
            </div>
            {isOpen &&
                renderLayer(
                    <div {...layerProps}>
                        {data.map((property) => (
                            <div className="flex bg-white">
                                <div className="flex-none w-48 relative ">
                                    <Image
                                        src={property.data.photos[0].href}
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover"
                                        width={90}
                                        height={90}
                                    />
                                </div>
                                <div className="flex-auto p-6">
                                    <div className="flex flex-wrap">
                                        <div className="text-black font-normal text-sm h-9">{`${property.data.address.line}, ${property.data.address.neighborhood_name}, ${property.data.address.city}, ${property.data.address.postal_code} `}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </>
    );
}
