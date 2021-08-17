import axios from 'axios';

const getProperties = async () => {
    const response = await axios.get(
        `${
            process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : ''
        }/api/properties`
    );
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

export { getProperties, getFavourites };
