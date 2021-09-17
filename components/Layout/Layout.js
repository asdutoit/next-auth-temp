// import Banner from "../Banner";
import Navbar from '../Navigation/Navbar';
import styles from './Layout.module.css';
import { useSession } from 'next-auth/client';

export default function Layout({ children }) {
    const [session, loading] = useSession();

    return (
        <>
            <div className={styles.root}>
                {/* <Banner /> */}
                <Navbar />
                <div className="main-container">{children}</div>
            </div>
        </>
    );
}
