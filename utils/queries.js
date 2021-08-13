import axios from 'axios';

const getProperties = async () => {
    const { data } = await axios.get(
        `${
            process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : ''
        }/api/properties`
    );
    return data;
};

export { getProperties };
