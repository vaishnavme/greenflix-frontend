import { useAuth } from "../../context";
import styles from "./Account.module.css";

export default function Login() {
    const { user, logOutUser } = useAuth();
    
    return (
        <div className={`${styles.main}`}>
            <div className={`${styles.card} p-2`}>
                <div className={`${styles.header}`}>
                    <h6>Hi there👋</h6>
                    <h4><span className={`f-warning`}>{user.name}</span></h4>                 
                </div>
                <div className={`${styles.body}`}>
                    <form>
                        <div className={`styled-input`}>
                            <input
                                value={user.email}
                                type="email" 
                                readOnly 
                                placeholder="Enter your email" 
                                required/>
                            <span></span>
                        </div>
                    </form>
                    <button className={`btn btn-secondary`} onClick={() => logOutUser()}>Log Out</button>
                </div>
            </div>
        </div>
    )
}