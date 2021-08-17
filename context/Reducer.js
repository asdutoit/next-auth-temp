const userReducer = (state, { type, payload }) => {
    switch (type) {
        case 'LOGIN':
            console.log('LOGIN CONTEXT CASE');
        case 'FAV_UPDATE':
            console.log('payload', payload);
            if (payload === undefined) {
                return { ...state, favs: [] };
            } else {
                return {
                    ...state,
                    favs: [...payload],
                };
            }
        default:
            return state;
    }
};

export { userReducer };
