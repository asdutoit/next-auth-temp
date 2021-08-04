import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

function ChevronRight(props) {
    const { className, style, onClick } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer h-6 w-6 absolute right-2 top-28 bg-black bg-opacity-25 rounded-full p-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            onClick={onClick}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M9 5l7 7-7 7"
            />
        </svg>
    );
}

function ChevronLeft(props) {
    const { className, style, onClick } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer h-6 w-6 absolute top-28 left-2 z-10 bg-black bg-opacity-25 rounded-full p-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            onClick={onClick}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M15 19l-7-7 7-7"
            />
        </svg>
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <ChevronRight
            className={className}
            style={{
                ...style,
                display: 'block',
                color: 'white',
                fontSize: '3em',
                right: '9px',
                zIndex: 30,
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <ChevronLeft
            className={className}
            style={{
                ...style,
                display: 'block',
                color: 'white',
                fontSize: '3em',
                left: '9px',
                zIndex: 30,
            }}
            onClick={onClick}
        />
    );
}

const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ChevronRight />,
    prevArrow: <ChevronLeft />,

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

function PhotoSlider({ photos, rounded }) {
    return (
        <div>
            <Slider {...settings}>
                {photos.map((photo, i) => (
                    <Image
                        src={photo.href}
                        layout="responsive"
                        width="512"
                        height="465"
                        key={i}
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
