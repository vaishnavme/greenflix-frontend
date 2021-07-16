import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"

export const Navbar = () => {
    const [isNavActive, setNavActive] = useState(false);

    const navLinkVisible = () => setNavActive(prevState => !prevState)

    return (
        <Fragment>
            <nav className={`${styles.navbar}`}>
                <div className={`${styles.container}`}>
                    <div className={`${styles.brand}`}>
                        GreenFlix
                    </div>

                    <div className={`${styles.navContainer} ${isNavActive && styles.navActive}`}>
                        <ul className={`${styles.navItems}`}>
                            <li className={`${styles.navLink}`}>
                                <Link to="/">Home</Link>
                            </li>
                            <li className={`${styles.navLink}`}>
                                <Link to="/playlist">Playlists</Link>
                            </li>
                            <li className={`${styles.navLink}`}>
                                <Link to="/account">Account</Link>
                            </li>
                            <button>Logout</button>
                        </ul>
                    </div>

                    <button 
                        onClick={() => navLinkVisible()}
                        className={`${styles.btnIcon}`}>
                        <i className="bx bx-menu"></i>
                    </button>
                </div>
            </nav>
        </Fragment>
    )
}