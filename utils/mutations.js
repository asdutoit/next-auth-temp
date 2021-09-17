import axios from 'axios';

const updateFavourite = async (propertyId) => {
    const response = await axios.post(`/api/property/${propertyId}/fav`);
    return response.data;
};

export { updateFavourite };
