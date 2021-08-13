import { createContext } from 'react';

const UserContext = createContext({
    favs: [],
    mapRef: null,
    mapsRef: null,
    //   properties: [],
    //   location: { location: [40.732596554229914, -73.99016011693472], zoom: 10 },
});

export { UserContext };
