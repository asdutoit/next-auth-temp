import { useState, useEffect, useRef, useContext } from 'react';
import ListComponent from '../components/List/ListComponent';
import MapComponent2 from '../components/Map/MapComponent2';
// import { connectToDatabase } from '../utils/mongodb';
import { isBrowser } from 'react-device-detect';
// import { ObjectId } from 'mongodb';
import { getsession, useSession } from 'next-auth/client';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { UserContext } from '../context/Context';
import { getProperties, getFavourites } from '../utils/queries';

const defaultProperty = {
    property_id: '',
    lon: '',
    lat: '',
    price: '',
};

export default function buy() {
    const { state, dispatch } = useContext(UserContext);
    const mapRef = useRef();
    const mapsRef = useRef();
    const polygonRef = useRef();
    const [currentLocation, setCurrentLocation] = useState(null);
    const [isHighlighted, setIsHighlighted] = useState(defaultProperty);
    const [viewport, setViewport] = useState(null);
    const [properties, setProperties] = useState([]);

    useQuery('favourites', getFavourites, {
        onSuccess: (o) => {
            dispatch({
                type: 'FAV_UPDATE',
                payload: o.favourites,
            });
        },
    });

    useEffect(() => {
        const coords = JSON.parse(localStorage.getItem('coords'));
        if (!coords) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                const parsedCoords = JSON.stringify({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                localStorage.setItem('coords', parsedCoords);
            });
            // mapRef.current = map;
        } else {
            setCurrentLocation({ lat: coords.lat, lng: coords.lng });
            // mapRef.current = map;
        }
    }, []);

    // if (isLoading) return 'Loading...';

    return (
        <div className="flex flex-col h-full mdxl:flex-row buy-rent ">
            <div className="flex-grow h-full overflow-auto relative">
                <MapComponent2
                    setViewport={setViewport}
                    isHighlighted={isHighlighted}
                    mapRef={mapRef}
                    mapsRef={mapsRef}
                    polygonRef={polygonRef}
                    setProperties={setProperties}
                />
            </div>
            {isBrowser ? (
                <div className="h-550 flex-grow-0 relative overflow-scroll overflow-y-hidden mdxl:overflow-auto mdxl:h-full flex-col flex-nowrap mdxl:w-700 ">
                    <div style={{ height: '100%' }}>
                        {mapsRef.current && (
                            <ListComponent
                                viewport={viewport}
                                setIsHighlighted={setIsHighlighted}
                                mapRef={mapRef}
                                properties={properties}
                                setProperties={setProperties}
                            />
                        )}
                    </div>
                    <div className="bg-yellow-500 sticky left-0 bottom-0 h-12 w-full"></div>
                </div>
            ) : null}
        </div>
    );
}

// ======= UNCOMMENT FOR REAL API CALL ========
// ============================================
// export async function getStaticProps() {
//     const options = {
//         method: 'GET',
//         url: 'https://realtor.p.rapidapi.com/properties/v2/list-for-rent',
//         params: {
//             city: 'New York City',
//             state_code: 'NY',
//             limit: '10',
//             offset: '0',
//             sort: 'relevance',
//         },
//         headers: {
//             'x-rapidapi-key':
//                 '9a83b48da5msh68c0186833d4b88p114873jsn9291b3278b3e',
//             'x-rapidapi-host': 'realty-in-us.p.rapidapi.com',
//         },
//     };

//     const response = await axios.request(options);

//     return {
//         props: {
//             properties: response.data.properties,
//         },
//     };
// }
// ============================================

// export async function getStaticProps() {
//     const queryClient = new QueryClient();
//     const { client } = await connectToDatabase();

//     const db = await client.db('HappyPropertiesTest');
//     const properties = await db
//         .collection('newyorksampleproperties')
//         .find({})
//         .sort({ metacritic: -1 })
//         .toArray();

//     return {
//         props: {
//             properties: JSON.parse(JSON.stringify(properties)),
//         },
//     };
// }

export async function getStaticProps() {
    const queryClient = new QueryClient();
    // await queryClient.prefetchQuery('properties', getProperties);
    await queryClient.prefetchQuery('favourites', getFavourites);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
