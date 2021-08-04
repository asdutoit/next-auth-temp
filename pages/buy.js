import { useState, useEffect, useCallback, useRef } from 'react';
import ListComponent from '../components/List/ListComponent';
// import MapComponent from '../components/Map/MapComponent';
import MapComponent2 from '../components/Map/MapComponent2';
// import { useLoadScript, useGoogleMap } from '@react-google-maps/api';
import axios from 'axios';

// const libraries = ['places', 'geometry', 'drawing', 'visualization'];

const defaultProperty = {
    property_id: '',
    lon: '',
    lat: '',
    price: '',
};

export default function buy({ properties }) {
    // const { isLoaded, loadError } = useLoadScript({
    //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
    //     libraries,
    // });
    // const mapRef = useRef();
    // const mapsRef = useRef();
    // const polygonRef = useRef();
    const [map, setMap] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [isHighlighted, setIsHighlighted] = useState(defaultProperty);

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

    // const onMapLoad = useCallback((map) => {
    //     map.data.loadGeoJson('/chicago.json');
    //     // map.data.addListener("click", showData);
    //     mapRef.current = map;
    //     setMap(map);
    // }, []);

    // const panTo = useCallback(({ lat, lng }) => {
    //     mapRef.current.panTo({ lat, lng });
    //     mapRef.current.setZoom(14);
    // }, []);

    // if (loadError) return 'Error loading maps';
    // if (!isLoaded) return 'Loading maps';
    let viewheight;
    if (typeof window !== 'undefined') {
        // browser code
        viewheight = window.innerHeight;
        window.addEventListener('resize', () => {
            // We execute the same script as before
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    }

    return (
        <div className="flex flex-col h-full mdxl:flex-row buy-rent ">
            <div className="flex-grow h-full overflow-auto relative">
                <MapComponent2
                    properties={properties}
                    isHighlighted={isHighlighted}
                />
            </div>
            <div className="h-550 flex-grow-0 relative overflow-scroll overflow-y-hidden mdxl:overflow-auto mdxl:h-full flex-col flex-nowrap mdxl:w-700 ">
                <ListComponent
                    properties={properties}
                    setIsHighlighted={setIsHighlighted}
                />
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const options = {
        method: 'GET',
        url: 'https://realtor.p.rapidapi.com/properties/v2/list-for-rent',
        params: {
            city: 'New York City',
            state_code: 'NY',
            limit: '10',
            offset: '0',
            sort: 'relevance',
        },
        headers: {
            'x-rapidapi-key':
                '9a83b48da5msh68c0186833d4b88p114873jsn9291b3278b3e',
            'x-rapidapi-host': 'realty-in-us.p.rapidapi.com',
        },
    };

    const response = await axios.request(options);
    console.log(response.status);
    console.log(response.statusText);

    return {
        props: {
            properties: response.data.properties,
        },
    };
}
