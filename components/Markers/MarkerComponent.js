import React, { useState, useEffect, Children } from 'react';
import { useLayer, Arrow } from 'react-laag';
import PhotoSlider from '../Property/PhotoSlider';
import MapCard from '../Property/MapCard';
import Card from '../Property/Card';

export default function MarkerComponent({ data, isdragging, children }) {
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
            <div {...triggerProps} onClick={() => setOpen(!isOpen)}>
                {childrenWithProps}
            </div>
            {isOpen &&
                renderLayer(
                    <MapCard layerProps={layerProps}>
                        <Card property={data} rounded="true" onMap="true" />
                    </MapCard>
                )}
        </>
    );
}
