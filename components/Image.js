import Image from 'next/image';

const cloudflareImageLoader = ({ src, width, quality }) => {
    if (!quality) {
        quality = 75;
    }
    return `https://images.gentle-bush-3da0.asdutoit.workers.dev?width=${width}&quality=${quality}&image=https://next-auth-temp.pages.dev${src}`;
};

// const normalizeSrc = (src) => {
//     return src[0] === '/' ? src.slice(1) : src;
// };

// const cloudflareLoader = ({ src, width, quality }) => {
//     const params = [`width=${width}`];
//     if (quality) {
//         params.push(`quality=${quality}`);
//     }
//     const paramsString = params.join(',');
//     return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
// };

// const MyImage = (props) => {
//     return (
//         <Image
//             loader={cloudflareLoader}
//             src="/me.png"
//             alt="Picture of the author"
//             width={500}
//             height={500}
//         />
//     );
// };

export default function Img(props) {
    if (process.env.NODE_ENV === 'development') {
        return <Image {...props} />;
        // unoptimized={true}
    } else {
        return <Image {...props} loader={cloudflareImageLoader} />;
    }
}
