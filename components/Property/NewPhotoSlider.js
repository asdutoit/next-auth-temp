import React, { memo, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/lazy';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.module.css';

// import Swiper core and required modules
import SwiperCore, { Lazy, Pagination, Navigation } from 'swiper';

// install Swiper modules
SwiperCore.use([Lazy, Pagination, Navigation]);

const CustomImage = (props) => {
    const { src, alt, width, height, loader, quality } = props;
    const updatedSrc = loader({ src, quality, width, height });
    return (
        <img
            data-src={updatedSrc}
            alt={alt}
            className="object-cover h-full w-full swiper-lazy"
        />
    );
};

const bunnyLoader = (props) => {
    const { src, quality = 100, width = 400, height, sharpen = true } = props;
    const { hostname, pathname } = new URL(src);
    if (hostname === 'res.cloudinary.com') {
        return `https://lightcloudinary.b-cdn.net${pathname}?quality=${
            quality || 75
        }&width=${width}&sharpen=${sharpen}`;
    } else {
        return `https://rdcpix.b-cdn.net${pathname}?quality=${
            quality || 75
        }&width=${width}&sharpen=${sharpen}`;
    }
};

function NewPhotoSlider({ photos, rounded = false, visible }) {
    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                lazy={{
                    loadPrevNext: true,
                    loadPrevNextAmount: 1,
                    loadOnTransitionStart: true,
                }}
                navigation={true}
                className="mySwiper h-full z-0"
                loadOnTransitionStart={true}
                loop={true}
            >
                {photos.map((photo, i) => (
                    <SwiperSlide key={i}>
                        <CustomImage
                            loader={bunnyLoader}
                            src={photo.href}
                            // TODO: alt={to-be-added}
                            width={400}
                            height={256}
                            quality={100}
                        />
                        <div className="swiper-lazy-preloader"></div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

export default memo(NewPhotoSlider);
