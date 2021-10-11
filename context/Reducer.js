const userReducer = (state, { type, payload }) => {
    switch (type) {
        case 'LOGIN':
            console.log('LOGIN CONTEXT CASE');
        case 'FAV_UPDATE':
            if (payload === undefined) {
                return { ...state, favs: [] };
            } else {
                return {
                    ...state,
                    favs: [...payload],
                };
            }
        case 'MAPREF':
            return {
                ...state,
                mapRef: payload,
            };
        case 'MAPSREF':
            return {
                ...state,
                mapsRef: payload,
            };
        default:
            return state;
    }
};

export { userReducer };
