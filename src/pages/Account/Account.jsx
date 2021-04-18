import styles from "./Account.module.css";
import { useAuth } from "../../context";

export default function Account() {
    const { user } = useAuth(); 
    return (
        <div className={`${styles.card}`}>
            <div className={`${styles.header}`}>
                <h1>Hi {user.name}</h1>
                <p className={`${styles.subtitle}`}>Update Account Settings</p>
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
        </div>
    )
}