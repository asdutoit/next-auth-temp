const userReducer = (state, { type, payload }) => {
    switch (type) {
        case 'LOGIN':
            console.log('LOGIN CONTEXT CASE');
        case 'FAV_UPDATE':
            return {
                ...state,
                favs: [...payload],
            };
        default:
            return state;
    }
};

export { userReducer };
