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
            },
            gridTemplateColumns: {
                cardviews: 'repeat(auto-fill, minmax(284px, 1fr))',
            },
            width: {
                320: '320px',
                700: '700px',
            },
            height: {
                230: '230px',
                365: '365px',
                430: '430px',
            },
            screens: {
                mdxl: '1150px',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
};
