import axios from 'axios';

const getProperties = async () => {
    const response = await axios.get(
        `${
            process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : ''
        }/api/properties`
    );
    return response.data;
};

const getPolygonProperties = async (polygon) => {
    const response = await axios({
        url: '/api/properties/polygon',
        method: 'post',
        data: {
            polygon,
        },
    });
    return response.data;
};

const getViewportProperties = async (viewport) => {
    const response = await axios({
        url: '/api/properties/viewport',
        method: 'post',
        data: {
            viewport,
        },
    });
    return response.data;
};

const getFavourites = async () => {
    const response = await axios.get(
        `${
            process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : ''
        }/api/user/favs`
    );
    return response.data;
};

const getProperty = async (id) => {
    console.log('calllededelde');
    const response = await axios.get(`/api/property/${id}`);
    return response.data;
};

export {
    getProperties,
    getFavourites,
    getPolygonProperties,
    getViewportProperties,
    getProperty,
};
