import styles from './RouteError.module.css';

export const RouteError = () => {
    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.notfound}`}>
                <div className={`${styles.notfound404}`}>
                    <h1>Oops!</h1>
                    <h2>404 - The Page can't be found</h2>
                </div>
            </div>
        </div>
    );
};
