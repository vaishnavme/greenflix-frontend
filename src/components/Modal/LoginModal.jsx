import { Link } from 'react-router-dom';
import styles from './Modal.module.css';

export const LoginModal = ({ setModelVisibility }) => {
    return (
        <div className={`${styles.modalBox}`}>
            <div className={`${styles.loginModal}`}>
                <div className={`h5`}>Uh Oh!</div>
                <div className={`h6`}>You need to be logged in</div>
                <div className={`${styles.menuFooter}`}>
                    <button
                        className={`${styles.btn} ${styles.secondary}`}
                        onClick={() => setModelVisibility(false)}
                    >
                        Close
                    </button>
                    <button className={`${styles.btn} ${styles.primary}`}>
                        <Link to="/login">Log In</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};
