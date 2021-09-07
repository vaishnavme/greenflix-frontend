// import { Fragment, useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { useAuth, useData } from '../../context';
// import styles from './Navbar.module.css';

// export const Navbar = () => {
//     const { user, logOutUser } = useAuth();
//     const { dispatch } = useData();
//     const [isNavActive, setNavActive] = useState(false);

//     const navLinkVisible = () => setNavActive((prevState) => !prevState);

//     const logout = () => {
//         logOutUser();
//         dispatch({ type: 'LOGOUT_USER_STATES' });
//     };

//     const activeStyle = {
//         color: '#22C55E'
//     };
//     return (
//         <Fragment>
//             <nav className={`${styles.navbar}`}>
//                 <div className={`${styles.container}`}>
//                     <div className={`${styles.brand}`}>
//                         <Link to="/">GreenFlix</Link>
//                     </div>

//                     <div
//                         className={`${styles.navContainer} ${
//                             isNavActive && styles.navActive
//                         }`}
//                     >
//                         <ul className={`${styles.navItems}`}>
//                             <li className={`${styles.navLink}`}>
//                                 <NavLink to="/" activeStyle={activeStyle} end>
//                                     Home
//                                 </NavLink>
//                             </li>
//                             <li className={`${styles.navLink}`}>
//                                 <NavLink
//                                     to="/playlist"
//                                     activeStyle={activeStyle}
//                                 >
//                                     Playlists
//                                 </NavLink>
//                             </li>
//                             {user ? (
//                                 <li className={`${styles.navLink}`}>
//                                     <NavLink
//                                         to="/account"
//                                         activeStyle={activeStyle}
//                                     >
//                                         Account
//                                     </NavLink>
//                                 </li>
//                             ) : (
//                                 <li className={`${styles.navLink}`}>
//                                     <NavLink
//                                         to="/login"
//                                         activeStyle={activeStyle}
//                                     >
//                                         Login
//                                     </NavLink>
//                                 </li>
//                             )}
//                             {user && (
//                                 <button
//                                     className={`ml-1`}
//                                     onClick={() => logout()}
//                                 >
//                                     Logout
//                                 </button>
//                             )}
//                         </ul>
//                     </div>

//                     <button
//                         onClick={() => navLinkVisible()}
//                         className={`${styles.btnIcon}`}
//                     >
//                         <i className="bx bx-menu"></i>
//                     </button>
//                 </div>
//             </nav>
//         </Fragment>
//     );
// };

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export const Navbar = () => {
    const [isNavActive, setNavActive] = useState(false);
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
                    <NavLink className={styles.navLink} to="/">
                        <i className="bx bx-home"></i>
                        <span className={styles.linkText}>Home</span>
                    </NavLink>
                    <NavLink className={styles.navLink} to="/playlist">
                        <i className="bx bxs-playlist"></i>
                        <span className={styles.linkText}>Playlist</span>
                    </NavLink>
                    <NavLink className={styles.navLink} to="/account">
                        <i className="bx bx-user"></i>{' '}
                        <span className={styles.linkText}>Account</span>
                    </NavLink>
                </ul>

                <button className={styles.btnLogout}>
                    <i className="bx bx-log-out"></i>
                    <span className={styles.linkText}>Log out</span>
                </button>
            </nav>
        </>
    );
};
