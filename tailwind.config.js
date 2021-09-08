module.exports = {
    mode: 'jit',
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                customGray: 'rgba(50, 62, 81, 1.00)',
                customGray2: 'rgba(37, 54, 70, 1.00)',
                cosmiclatte: 'rgba(255, 249, 234, 1.00)',
                FAFA: '#FAFAFA',
            },
            gridTemplateColumns: {
                cardviews: 'repeat(auto-fill, minmax(284px, 1fr))',
            },
            width: {
                250: '250px',
                270: '270px',
                320: '320px',
                350: '350px',
                700: '700px',
                380: '380px',
            },
            height: {
                150: '150px',
                230: '230px',
                245: '245px',
                290: '290px',
                365: '365px',
                430: '430px',
                550: '550px',
            },
            screens: {
                mdxl: '1150px',
            },
            scale: {
                102: '1.02',
            },
            fontSize: {
                tiny: '0.7rem',
            },
            inset: {
                '00': '-1px',
            },
            boxShadow: {
                '3xl': 'rgb(0 0 0 / 28%) 0px 8px 28px',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
};
