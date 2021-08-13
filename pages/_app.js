import React, { useContext, useReducer } from 'react';
import { Provider as AuthProvider } from 'next-auth/client';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { UserContext } from '../context/Context';
import { userReducer } from '../context/Reducer';

library.add(fab);

function MyApp({ Component, pageProps }) {
    const [queryClient] = React.useState(() => new QueryClient());
    const initialState = useContext(UserContext);
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <AuthProvider session={pageProps.session}>
                    <UserContext.Provider value={{ state, dispatch }}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </UserContext.Provider>
                </AuthProvider>
            </Hydrate>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default MyApp;
