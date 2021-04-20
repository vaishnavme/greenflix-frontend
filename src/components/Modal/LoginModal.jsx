import { Link } from "react-router-dom";
import styles from "./Modal.module.css";

export const LoginModal = ({setShowLoginModal}) => {
    return (
        <div className={`${styles.modalBox}`}>
            <div className={`${styles.loginModal}`}>
                <h4>You need to be login.</h4>
                <div className={`${styles.menuFooter}`}>
                    <button 
                        className={`btn btn-secondary w40`}
                        onClick={() => setShowLoginModal(false)}>CLOSE
                    </button>
                    <button className={`btn btn-secondary w40`}>
                        <Link to="/login">Sign In</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}