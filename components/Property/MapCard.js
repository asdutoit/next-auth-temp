import React from 'react';
import PhotoSlider from './PhotoSlider';

export default function MapCard({ data, layerProps = null }) {
    return (
        <div
            className="w-320 h-230 bg-green-400 shadow-xl rounded-lg relative flex flex-col"
            {...layerProps}
        >
            <div className="bg-indigo-500 h-full relative rounded-lg w-full">
                <PhotoSlider photos={data.photos} rounded="true" />
            </div>
            <div
                className=" text-white p-2 absolute bottom-0 w-full rounded-b-lg cursor-pointer marker-component-details"
                onClick={() => {}}
            >
                <div className="flex justify-between">
                    <div>Price</div>
                    <div>Details</div>
                </div>

                <div>Address</div>
            </div>
            {/* <Arrow
        {...arrowProps}
        size={10}
        roundness={0}
        backgroundColor="rgba(52, 211, 153)"
    /> */}
        </div>
    );
}
