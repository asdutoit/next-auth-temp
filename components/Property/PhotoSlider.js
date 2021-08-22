import React, { useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

function ChevronRight(props) {
    const { className, style, onClick, visible } = props;
    return (
        <>
            {visible && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer h-6 w-6 absolute right-2 top-28 bg-white bg-opacity-95 rounded-full p-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                    onClick={onClick}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={4}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            )}
        </>
    );
}

function ChevronLeft(props) {
    const { className, style, onClick, visible } = props;
    return (
        <>
            {visible && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer h-6 w-6 absolute top-28 left-2 z-10 bg-white bg-opacity-95 rounded-full p-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                    onClick={onClick}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={4}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            )}
        </>
    );
}

const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    // nextArrow: <ChevronRight />,
    // prevArrow: <ChevronLeft />,
    swipe: false,
    appendDots: (dots) => (
        <div
            style={{
                bottom: 10,
            }}
        >
            <ul style={{ margin: '0px', padding: 0 }}> {dots} </ul>
        </div>
    ),
};

function PhotoSlider({ photos, rounded = false, visible }) {
    return (
        <div>
            <Slider
                {...settings}
                nextArrow={<ChevronRight visible={visible} />}
                prevArrow={<ChevronLeft visible={visible} />}
            >
                {photos.map((photo, i) => (
                    <Image
                        src={photo.href}
                        layout="responsive"
                        width="512"
                        height="465"
                        quality={25}
                        key={i}
                        loading="eager"
                        // priority="true"
                        className={`object-cover ${
                            rounded ? 'rounded-lg' : ''
                        }`}
                    />
                ))}
            </Slider>
        </div>
    );
}

export default PhotoSlider;
