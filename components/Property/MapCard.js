import axios from 'axios';
import React, { useState } from 'react';
import { numFormatter } from '../../utils/numFormatter';
import PhotoSlider from './PhotoSlider';

export default function MapCard({ layerProps = null, children }) {
    return (
        <div
            className="w-320 h-290 bg-green-400 shadow-xl rounded-lg relative flex flex-col"
            {...layerProps}
        >
            {children}
        </div>
    );
}

{
    /* <Arrow
        {...arrowProps}
        size={10}
        roundness={0}
        backgroundColor="rgba(52, 211, 153)"
    /> */
}
