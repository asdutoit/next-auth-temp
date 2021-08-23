import React from 'react';
import Image from 'next/image';
import { getProperties } from '../utils/queries';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

export default function sell() {
    const { data, loading } = useQuery('properties', getProperties);
    return <>{!loading && <div>Sell</div>}</>;
}

// export async function getStaticProps(context) {
//     const queryClient = new QueryClient();
//     await queryClient.prefetchQuery('properties', getProperties);

//     return {
//         props: {
//             dehydratedState: dehydrate(queryClient),
//         },
//     };
// }
