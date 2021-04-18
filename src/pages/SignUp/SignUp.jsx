import { Link } from "react-router-dom";
import styles from "./SignUp.module.css"

export default function SignUp() {
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
                            placeholder="Enter your name"
                            required/>
                        <span></span>
                    </div>
                    <div className={`styled-input`}>
                        <input 
                            type="email" 
                            placeholder="Enter your email"
                            required/>
                        <span></span>
                    </div>
                    <div className={`styled-input`}>
                        <input 
                            type="password" 
                            placeholder="Enter your password"
                            required/>
                        <span></span>
                    </div>
                </form>

            </div>
            <button 
                className={`btn btn-primary lg`}>
                    Sign In
            </button>

            <div className={`mt-2`}>
                <p>Already have Account? <Link className={`f-info`} to="/login">Sign In</Link> </p>
            </div>
        </div>
    )
}