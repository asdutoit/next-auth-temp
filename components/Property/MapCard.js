import axios from 'axios';
import React, { useState } from 'react';
import { numFormatter } from '../../utils/numFormatter';
import PhotoSlider from './PhotoSlider';

export default function MapCard({ layerProps = null, children, fetchingData }) {
    return (
        <>
            {fetchingData ? null : (
                <div
                    className="w-320 h-290 bg-white shadow-xl rounded-lg relative flex flex-col"
                    {...layerProps}
                >
                    {children}
                </div>
            )}
        </>
    );
}
