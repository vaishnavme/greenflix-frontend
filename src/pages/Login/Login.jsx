import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import styles from "./Login.module.css";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isUserLogin, checkUser } = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    console.log("isUserLogn:",isUserLogin)
    const getLogin = () => {
        checkUser(username, password)
        navigate(state?.from ? state.from : "/")
    }
    
    return (
        <div className={`${styles.card}`}>
            <div className={`${styles.header}`}>
                <h1>Welcome Back</h1>
                <p className={`${styles.subtitle}`}>Enter your email and password.</p>
            </div>
            <div>
                <form>
                    <div className={`styled-input`}>
                        <input 
                            type="email" 
                            placeholder="Enter your email"
                            onChange={(e) => setUsername(e.target.value)}
                            required/>
                        <span></span>
                    </div>
                    <div className={`styled-input`}>
                        <input 
                            type="password" 
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            required/>
                        <span></span>
                    </div>
                </form>

            </div>
            <button 
                className={`btn btn-primary lg`}
                onClick={getLogin}>
                    Sign In
            </button>
            {/* {
                showError && 
                <p className={`f-warning`}>Wrong username or password</p>
            }
            <div className={`mt-2`}>
                <p>New here? <Link disabled className={`f-info`} to="/signup">Sign Up</Link> </p>
            </div> */}
        </div>
    )
}