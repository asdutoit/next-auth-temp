import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import Head from 'next/head';

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
    lazyLoad: 'ondemand',
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

const bunnyLoader = (props) => {
    const { src, quality } = props;
    const width = 500;
    // console.log('width: ', width, 'quality: ', quality);
    // console.log('props', props);
    const updatedURL = src.replace('https://ar.rdcpix.com/', '');
    return `https://rdcpix.b-cdn.net/${updatedURL}?width=${width}&quality=${
        quality || 75
    }`;
};

//test message

function PhotoSlider({ photos, rounded = false, visible }) {
    return (
        <div>
            <Head>
                <link
                    rel="stylesheet"
                    type="text/css"
                    charSet="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
            </Head>
            {/* <Image
                loader={bunnyLoader}
                src={photos[0].href}
                layout="responsive"
                width={500}
                height={500}
                quality={75}
                // key={i}
                // priority={true}
                // loading="eager"
                className={`object-cover ${rounded ? 'rounded-lg' : ''}`}
            /> */}
            <Slider
                {...settings}
                nextArrow={<ChevronRight visible={visible} />}
                prevArrow={<ChevronLeft visible={visible} />}
            >
                {photos.map((photo, i) => (
                    <Image
                        loader={bunnyLoader}
                        src={photos[0].href}
                        layout="responsive"
                        width={200}
                        height={200}
                        quality={75}
                        key={i}
                        loading="lazy"
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
