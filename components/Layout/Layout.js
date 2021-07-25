import Navbar from "../Navbar";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.root}>
      <Navbar />
      <div style={{ height: "calc(100vh - 64px)" }}>{children}</div>
    </div>
  );
}
