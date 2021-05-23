import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import styles from "./Navbar.module.css"

export const Navbar = () => {
    const { user, logOutUser } = useAuth();
    const navigate = useNavigate();
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
                            to="/liked">❤️ Liked Videos</NavLink>
                    </li>
                    <li className={`${styles.navLink} h6 mt-2`}>
                        <NavLink 
                            activeStyle={{fontWeight: 600}}
                            to="/watch">⏳ Watch Later</NavLink>
                    </li>
                    <li className={`${styles.navLink} h6 mt-2`}>
                        <NavLink 
                            activeStyle={{fontWeight: 600}}
                            to="/account">👨🏾‍🌾 Account</NavLink>
                    </li>
                </ul>
                
                <div>
                    <div className={`ml-1`}>{
                        user ? (
                            <>
                                <div className={`h6`}>Hi👋 {user.name}</div>
                                <button className={`btn btn-secondary w-auto`} onClick={() => logOutUser()}>Log Out</button>
                            </>
                            )
                        : <button className={`btn btn-secondary w-auto`} onClick={() => navigate("/login")}>Login</button>
                    }</div>
                </div>
            </div>

            {/* mobile nav */}
            <div className={`${styles.mobileNav}`}>
                <ul className={`${styles.mbItems}`}>
                    <li>
                        <NavLink to="/">🏡 <span className={`${styles.mbName}`}>Home</span></NavLink>
                    </li>
                    <li>
                        <NavLink to="/liked">❤️  <span className={`${styles.mbName}`}>Liked Videos</span></NavLink>
                    </li>
                    <li>
                        <NavLink to="/watch">⏳  <span className={`${styles.mbName}`}>Watch Later</span></NavLink>
                    </li>
                    <li>
                        <NavLink to="/account">👨🏾‍🌾 <span className={`${styles.mbName}`}>Account</span></NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
