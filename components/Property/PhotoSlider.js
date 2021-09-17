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

const bunnyLoader = ({ src, width, quality }) => {
    const updatedURL = src.replace('https://ar.rdcpix.com/', '');
    return `https://rdcpix.b-cdn.net/${updatedURL}?width=${width}&quality=${
        quality || 75
    }`;
};

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
    typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str);

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
                width={20}
                height={20}
                quality={25}
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
                        width={20}
                        height={20}
                        quality={25}
                        key={i}
                        // placeholder="blur"
                        // blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        //     shimmer(20, 20)
                        // )}`}
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
