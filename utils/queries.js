import axios from 'axios';

const getProperties = async () => {
    const { data } = await axios.get(
        `${
            process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : ''
        }/api/properties`
    );
    return data;
};

const getFavourites = async () => {
    const { data } = await axios.get(
        `${
            process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : ''
        }/api/user/favs`
    );
    return data;
};

export { getProperties, getFavourites };
