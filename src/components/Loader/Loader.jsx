import styles from "./Loader.module.css";
import loader from "../../assets/images/Spinner-5.gif";

export const Loader = () => {
    return (
        <div className={`${styles.loaderScreen}`}>
            <div className={`${styles.loader}`}>
                <img src={loader} alt="loader"/>
            </div>
        </div>
    )
}