import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context";
import styles from "./Login.module.css";

export default function Login() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const { loginCredentialHandler } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();
    
    const loginHandler = async (e) => {
        e.preventDefault();
        const { success } = await loginCredentialHandler(
            userEmail,
            userPassword
        )
        console.log(success)
        if(success) {
            navigate(state?.from ? state.from : "/");
        } else {
            navigate("/login")
        }
    }

    return (
        <div className={`${styles.main}`}>
            <div className={`${styles.card} p-2`}>
                <div className={`${styles.header}`}>
                    <h6>Hi there👋</h6>
                    <h4>Welcome Back</h4>
                </div>
                <div className={`${styles.body}`}>
                    <form onSubmit={(e) =>loginHandler(e)}>
                        <div className={`styled-input`}>
                            <input
                                onChange={(e) => setUserEmail(() => e.target.value)}
                                value={userEmail}
                                type="email" 
                                placeholder="Enter your email" 
                                required/>
                            <span></span>
                        </div>
                        <div className={`styled-input`}>
                            <input 
                                onChange={(e) =>setUserPassword(() => e.target.value)}
                                value={userPassword}
                                type="password" 
                                placeholder="Enter your password" 
                                required/>
                            <span></span>
                        </div>
                        <button
                            type="submit"
                            className={`btn btn-secondary ${styles.formBtn}`}>
                                Log in
                        </button>
                    </form>
                    <p>Don't have account? <Link className={`f-primary`} to="/signup">Sign Up</Link> here</p>
                </div>
            </div>
        </div>
    )
}