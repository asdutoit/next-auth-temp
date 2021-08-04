// import Banner from "../Banner";
import Head from 'next/head';
import Navbar from '../Navbar';
import styles from './Layout.module.css';

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    type="text/css"
                    charSet="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
            </Head>
            <div className={styles.root}>
                {/* <Banner /> */}
                <Navbar />
                <div className="main-container">{children}</div>
            </div>
        </>
    );
}
