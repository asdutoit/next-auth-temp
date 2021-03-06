import React, { useState, memo, useEffect, useContext } from 'react';
// import PhotoSlider from './PhotoSlider';
import { numFormatter } from '../../utils/numFormatter';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { classNames } from '../../utils/general';
import { UserContext } from '../../context/Context';
import { updateFavourite } from '../../utils/mutations';
import NewPhotoSlider from './NewPhotoSlider';

const updater = async (propertyId) => {
    // Updates the user object
    const res = await axios.post(`/api/property/${propertyId}/fav`);
    return res;
};

function areEqual(prevProps, nextProps) {
    if (prevProps.property === nextProps.property) {
        return true; // props are equal
    }
    return false; // props are not equal -> update the component
}

export default memo(function MapCard({
    mapRef,
    rounded,
    onMap = false,
    propertyId,
    data,
    error,
}) {
    const { state } = useContext(UserContext);
    const [favHover, setFavHover] = useState(false);
    const [shareHover, setShareHover] = useState(false);
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const [session, loading] = useSession();
    const [saving, setSaving] = useState(false);
    const queryClient = useQueryClient();
    let price;

    // const { isLoading, isError, data, error } = useQuery(
    //     ['getProperty', propertyId],
    //     () => getProperty(propertyId)
    // );

    const mutation = useMutation((propertyId) => updateFavourite(propertyId), {
        onMutate: async (propertyId) => {
            setSaving(true);
            await queryClient.cancelQueries('favourites');

            const previousFavourites = queryClient.getQueryData('favourites');
            const newval = previousFavourites.favourites.filter(
                (value) => value !== propertyId.toString()
            );

            if (
                JSON.stringify(previousFavourites.favourites) !==
                JSON.stringify(newval)
            ) {
                // Remove from the favourites array
                queryClient.setQueryData('favourites', (old) => ({
                    ...old,
                    favourites: [...newval],
                }));
            } else {
                // Add to the favourites array
                queryClient.setQueryData('favourites', (old) => ({
                    ...old,
                    favourites: [...old.favourites, propertyId],
                }));
            }

            return { previousFavourites };
        },

        onError: (err, variables, context) => {
            queryClient.setQueryData('favourites', context.previousFavourites);
        },

        onSettled: (o) => {
            queryClient.invalidateQueries('favourites');
            localStorage.removeItem('tempFav');
            setSaving(false);
            // Below function is not necessarily needed, as the query update from /buy buy automatically fire and update context
            // console.log('o', o.data.favouriteProperties);
            // dispatch({
            //     type: 'FAV_UPDATE',
            //     payload: o.data.favouriteProperties,
            // });
        },
    });

    // ============== HANDLE TOGGLE PROPERTY TO FAVOURITE OR NOT ==================
    //

    useEffect(() => {
        // 1.  Check if there are any tempory favourites in localstorage that need to be added to the user's profile.
        const checkLocalStorageForFav = async () => {
            const tempFav = localStorage.getItem('tempFav');
            // 2.  Check if user is logged in
            if (tempFav?.length > 2 && session) {
                if (tempFav === property._id) {
                    const valid =
                        session.user?.favouriteProperties?.includes(tempFav);
                    // 3.  If there are, do nothing.   If not, add to profile.
                    if (!valid) {
                        mutation.mutate(tempFav);
                    }
                }
            }
        };
        checkLocalStorageForFav();
    }, [loading]);

    const handleSetFav = async () => {
        try {
            // 1.   Check if user is logged in.  If not, redirect to signin page
            if (session) {
                // 2.   Toggle the property as favourite or un-favourite - DONE ON BACKEND
                setSaving(true);
                mutation.mutate(propertyId);
            } else {
                // Set the favourite item in localstorage temporarily until user logged in.  See /buy page
                localStorage.setItem('tempFav', propertyId);
                signIn('google', {
                    callbackUrl:
                        process.env.NEXT_PUBLIC_NEXTAUTH_URL + router.pathname,
                });
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    // if (isLoading) return null;
    if (data && !error) {
        price = numFormatter(data.property[0]?.community?.price_max);
    }

    return (
        <div
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            <div
                className={classNames(
                    rounded ? 'rounded-lg h-245' : '',
                    'overflow-hidden'
                )}
            >
                {/* <PhotoSlider
                    photos={data.property[0].photos}
                    rounded={rounded}
                    visible={visible}
                /> */}
                <NewPhotoSlider
                    photos={data.property[0].photos}
                    rounded={rounded}
                    visible={visible}
                />
            </div>
            {/* Property Summary Details */}
            <div
                className={classNames(
                    rounded ? 'rounded-b-lg' : '',
                    'text-white p-2 absolute bottom-0 w-full cursor-pointer marker-component-details z-10'
                )}
                // Function to open the Details page for the data.property[0]
                onClick={() => {}}
            >
                <div className="flex justify-between">
                    <div className="text-white align-center font-bold text-xl self-center">
                        {`$ ${price} `}
                    </div>
                    <div className="text-white align-center">
                        <div className="flex">
                            <div>
                                <div style={{ textAlign: 'center' }}>
                                    <p>
                                        <strong>{`${data.property[0].community.beds_max}`}</strong>
                                    </p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p>
                                        <strong>{`Beds`}</strong>
                                    </p>
                                </div>
                            </div>
                            <div
                                style={{
                                    borderRight: '1px solid #fff',
                                    marginLeft: '5px',
                                    marginRight: '5px',
                                }}
                            >
                                {' '}
                            </div>
                            <div>
                                <div style={{ textAlign: 'center' }}>
                                    <p>
                                        <strong>{`${data.property[0].community.baths_max}`}</strong>
                                    </p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p>
                                        <strong>{`Bath`}</strong>
                                    </p>
                                </div>
                            </div>
                            <div
                                style={{
                                    borderRight: '1px solid #fff',
                                    marginLeft: '5px',
                                    marginRight: '5px',
                                }}
                            >
                                {' '}
                            </div>
                            <div>
                                <div style={{ textAlign: 'center' }}>
                                    <p>
                                        <strong>{`${
                                            data.property[0].community
                                                .sqft_max === null
                                                ? 'N/A'
                                                : data.property[0].community
                                                      .sqft_max
                                        }`}</strong>
                                    </p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p>
                                        <strong>{`sqft`}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-white font-normal text-sm h-9">{`${data.property[0].address.line}, ${data.property[0].address.neighborhood_name}, ${data.property[0].address.city}, ${data.property[0].address.postal_code} `}</div>
            </div>{' '}
            <div className="absolute top-0 w-full  h-11 flex items-center justify-end z-10">
                {/* Favourite Component */}
                <div
                    className="pr-4 hover:cursor-pointer "
                    onMouseEnter={() => setFavHover(true)}
                    onMouseLeave={() => setFavHover(false)}
                    onClick={handleSetFav}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={classNames(
                            saving ? 'animate-pulse' : '',
                            'rounded-full h-8 w-8  m-1 p-1'
                        )}
                        fill={
                            favHover ||
                            state.favs.includes(data.property[0]._id)
                                ? 'red'
                                : 'bg-black bg-opacity-10'
                        }
                        viewBox="0 0 24 24"
                        stroke={'white'}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </div>
                {/* Share Component */}
                <div
                    className="pr-4 hover:cursor-pointer "
                    onMouseEnter={() => setShareHover(true)}
                    onMouseLeave={() => setShareHover(false)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="rounded-full h-8 w-8  m-1 p-1 "
                        fill={shareHover ? 'black' : 'white'}
                        viewBox="0 0 24 24"
                        stroke={shareHover ? 'black' : 'black'}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
},
areEqual);

// export default memo(Card, areEqual);
