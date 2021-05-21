import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css"

export const Navbar = () => {

    return (
        <nav className={`${styles.navbar}`}>
            {/* desktop nav styles */}
            <div className={`${styles.desktopNav}`}>
                <div className={`brand h5`}>
                    <Link to="/">leafShots</Link>
                </div>

                <ul className={`${styles.navItems}`}>
                    <li className={`${styles.navLink} h6 mt-2`}>
                        <NavLink
                            activeStyle={{fontWeight: 600}}
                            to="/" end>🏡 Home</NavLink>
                    </li>
                    <li className={`${styles.navLink} h6 mt-2`}>
                        <NavLink 
                            activeStyle={{fontWeight: 600}}
                            to="/playlist">🎫 Playlist</NavLink>
                    </li>
                    <li className={`${styles.navLink} h6 mt-2`}>
                        <NavLink 
                            activeStyle={{fontWeight: 600}}
                            to="/account">👨🏾‍🌾 Account</NavLink>
                    </li>
                </ul>
                
                <div>
                    <div className={`ml-1 h6`}>Hi👋 </div>
                </div>
            </div>

            {/* mobile nav */}
            <div className={`${styles.mobileNav}`}>
                <ul className={`${styles.mbItems}`}>
                    <li>
                        <Link to="/">🏡 <span className={`${styles.mbName}`}>Home</span></Link>
                    </li>
                    <li>
                        <Link to="/playlist">🎫 <span className={`${styles.mbName}`}>Playlist</span></Link>
                    </li>
                    <li>
                        <Link to="/account">👨🏾‍🌾 <span className={`${styles.mbName}`}>Account</span></Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}