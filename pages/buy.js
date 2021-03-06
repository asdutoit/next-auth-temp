import { useState, useEffect, useRef, useContext } from 'react';
import Head from 'next/head';
import ListComponent from '../components/List/ListComponent';
import MapComponent from '../components/Map/MapComponent';
// import { connectToDatabase } from '../utils/mongodb';
import { isBrowser } from 'react-device-detect';
// import { ObjectId } from 'mongodb';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { UserContext } from '../context/Context';
import { getFavourites } from '../utils/queries';
import Pagination from '../components/List/Pagination';
import useWhyDidYouUpdate from '../utils/useWhyDidYouUpdate';

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
    const [currentLocation, setCurrentLocation] = useState(null); // FIXME: Move to global state
    const [isHighlighted, setIsHighlighted] = useState(defaultProperty); // FIXME: Move to global state
    const [viewport, setViewport] = useState(null); // FIXME: Move to global state
    const [properties, setProperties] = useState([]); // FIXME: Move to global state
    const [count, setCount] = useState(0);
    const [draw, setDraw] = useState(false); // FIXME: Move to global state
    let skip = 0;
    let limit = 20;

    // test update

    //TODO: Move some state to global state.   Too many props being shared.   No need for prop drilling

    const { refetch } = useQuery('favourites', getFavourites, {
        onSuccess: (favourites) => {
            dispatch({
                type: 'FAV_UPDATE',
                payload: favourites.favourites,
            });
        },
        enabled: false,
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
        refetch();
        dispatch({
            type: 'MAPREF',
            payload: mapRef,
        });
        dispatch({
            type: 'MAPSREF',
            payload: mapsRef,
        });
    }, []);

    // if (isLoading) return 'Loading...';
    console.count('counter');
    return (
        <>
            <Head>
                <title>Search for Properties</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <div className="flex h-full flex-row buy-rent ">
                <div className="flex-grow h-full overflow-auto relative">
                    <MapComponent
                        setViewport={setViewport}
                        isHighlighted={isHighlighted}
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

                                {/* {mapsRef.current && (
                                    //FIXME: SERIOUS PERFORMANCE ISSUE
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
                                )} */}
                                {/* </div> */}
                            </div>

                            <Pagination count={count} limit={limit} />
                        </div>
                    </div>
                ) : null}
            </div>
        </>
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
