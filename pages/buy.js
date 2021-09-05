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
import Pagination from '../components/List/Pagination';

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
    const [count, setCount] = useState(0);
    const [draw, setDraw] = useState(false);
    let skip = 0;
    let limit = 20;

    //TODO: Move some state to global state.   Too many props being shared.   No need for prop drilling

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
        <div className="flex h-full flex-row buy-rent ">
            <div className="flex-grow h-full overflow-auto relative">
                <MapComponent2
                    setViewport={setViewport}
                    isHighlighted={isHighlighted}
                    mapRef={mapRef}
                    mapsRef={mapsRef}
                    polygonRef={polygonRef}
                    setProperties={setProperties}
                    draw={draw}
                    setDraw={setDraw}
                />
            </div>
            {isBrowser ? (
                // <div className="h-550 flex-grow-0 relative overflow-scroll overflow-y-hidden mdxl:overflow-auto mdxl:h-full flex-col flex-nowrap mdxl:w-700 bg-green-500">
                <div className="flex-grow-0 w-350 relative h-full flex-col mdxl:w-700 overflow-auto">
                    <div className="list__info bg-yellow-300 h-12">
                        List Information
                    </div>
                    <div className="list__results__section ">
                        <div className="list__results">
                            {/* <div style={{ height: '100%' }}> */}
                            {mapsRef.current && (
                                <ListComponent
                                    viewport={viewport}
                                    setIsHighlighted={setIsHighlighted}
                                    mapRef={mapRef}
                                    properties={properties}
                                    setProperties={setProperties}
                                    setCount={setCount}
                                    draw={draw}
                                    limit={limit}
                                    skip={skip}
                                />
                            )}
                            {/* </div> */}
                        </div>
                        {/* <div className="list__pagination bg-red-500">
                            Pagination
                        </div> */}
                        <Pagination count={count} limit={limit} />
                    </div>
                </div>
            ) : null}
        </div>
    );
}

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
