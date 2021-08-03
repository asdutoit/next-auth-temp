import React, { useState, useEffect } from 'react';
import { useLayer, Arrow } from 'react-laag';
import PhotoSlider from '../Property/PhotoSlider';
import MapCard from '../Property/MapCard';

export default function MarkerComponent({ data, children }) {
    const [isOpen, setOpen] = useState(false);

    const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
        isOpen,
        auto: true,
        overflowContainer: false,
        isOpen,
        triggerOffset: 40,
        containerOffset: 0,
        arrowOffset: 6,
        onOutsideClick: () => setOpen(false),
    });

    return (
        <>
            <div {...triggerProps} onClick={() => setOpen(!isOpen)}>
                {children}
            </div>
            {isOpen &&
                renderLayer(<MapCard data={data} layerProps={layerProps} />)}
        </>
    );
}
