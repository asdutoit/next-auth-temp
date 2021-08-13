import React from 'react';
import Image from 'next/image';
import { getProperties } from '../utils/queries';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

export default function sell() {
    const { data, loading } = useQuery('properties', getProperties);
    return (
        <>
            {!loading &&
                data.properties.map((p) => (
                    <div className="relative flex flex-row">
                        {p.photos.map((photo, i) => (
                            <div className="relative ">
                                <Image
                                    key={i}
                                    src={photo.href}
                                    alt={`sample photo ${i}`}
                                    width={200}
                                    height={200}
                                    quality={25}
                                    // layout="fill"
                                    // objectFit
                                />
                            </div>
                        ))}
                    </div>
                ))}
        </>
    );
}

export async function getStaticProps(context) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery('properties', getProperties);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
