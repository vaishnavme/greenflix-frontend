import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth, useData } from '../../context';
import styles from './Navbar.module.css';

export const Navbar = () => {
    const [isNavActive, setNavActive] = useState(false);
    const { user, logOutUser } = useAuth();
    const { dispatch } = useData();

    const logout = () => {
        logOutUser();
        dispatch({ type: 'LOGOUT_USER_STATES' });
    };

    const activeStyle = {
        color: '#1F2937',
        backgroundColor: '#FDE68A'
    };

    return (
        <>
            <header className={styles.header}>
                <h3 className={styles.brand}>GreenFlix</h3>
                <button
                    onClick={() => setNavActive((prevState) => !prevState)}
                    className={styles.menuBtn}
                >
                    <i className="bx bx-menu"></i>
                </button>
            </header>
            <nav
                className={
                    isNavActive
                        ? `${styles.nav} ${styles.navShow}`
                        : `${styles.nav} ${styles.navHide}`
                }
            >
                <ul className={styles.navItem}>
                    <NavLink
                        activeStyle={activeStyle}
                        className={styles.navLink}
                        to="/"
                        end
                    >
                        <i className="bx bx-home"></i>
                        <span className={styles.linkText}>Home</span>
                    </NavLink>
                    <NavLink
                        activeStyle={activeStyle}
                        className={styles.navLink}
                        to="/playlist"
                    >
                        <i className="bx bxs-playlist"></i>
                        <span className={styles.linkText}>Playlist</span>
                    </NavLink>
                    {user && (
                        <NavLink
                            activeStyle={activeStyle}
                            className={styles.navLink}
                            to="/account"
                        >
                            <i className="bx bx-user"></i>{' '}
                            <span className={styles.linkText}>Account</span>
                        </NavLink>
                    )}
                    {!user && (
                        <NavLink
                            activeStyle={activeStyle}
                            className={styles.navLink}
                            to="/login"
                        >
                            <i className="bx bx-user"></i>{' '}
                            <span className={styles.linkText}>Log In</span>
                        </NavLink>
                    )}
                </ul>

                {user && (
                    <button
                        onClick={() => logout()}
                        className={styles.btnLogout}
                    >
                        <i className="bx bx-log-out"></i>
                        <span className={styles.linkText}>Log out</span>
                    </button>
                )}
            </nav>
        </>
    );
};
