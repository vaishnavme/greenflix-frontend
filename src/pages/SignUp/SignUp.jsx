import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context";
import { errorNotification, successNotification } from "../../components";
import styles from "./SignUp.module.css";

export default function SignUp() {
    const { signUpUser } = useAuth();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: ""
    });
    
    const inputChangeHandler = (e) => {
        e.preventDefault();
        setUserInfo((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const createAccount = async (e) => {
        e.preventDefault();
        const { success, message } = await signUpUser(userInfo);
        
        if(success) {
            successNotification("Account Created!!");
            navigate("/products")
        } else {
            errorNotification(message);
        }
        console.log("userinfo: ", userInfo)
    }

    return (
        <div className={`${styles.main}`}>
            <div className={`${styles.card} p-2`}>
                <div className={`${styles.header}`}>
                    <h6>Hi there👋</h6>
                    <h4>Let's get your free account.</h4>
                </div>
                <div className={`${styles.body}`}>
                    <form>
                        <div className={`styled-input`}>
                            <input 
                                onChange={inputChangeHandler}
                                value={userInfo.name}
                                name="name"
                                type="text" 
                                placeholder="Your Name" 
                                required/>
                            <span></span>
                        </div>
                        <div className={`styled-input`}>
                            <input
                                onChange={inputChangeHandler}
                                value={userInfo.email}
                                name="email"
                                type="email" 
                                placeholder="Enter your email" 
                                required/>
                            <span></span>
                        </div>
                        <div className={`styled-input`}>
                            <input 
                                onChange={inputChangeHandler}
                                value={userInfo.password}
                                name="password"
                                type="password" 
                                placeholder="Enter your password" 
                                required/>
                            <span></span>
                        </div>
                        <button
                            onClick={(e) => createAccount(e)}
                            className={`btn btn-secondary ${styles.lognBtn}`}>
                                Sign Up
                        </button>
                    </form>
                    <p>Already have an account? <Link className={`f-primary`} to="/login">Log in</Link> here</p>
                </div>
            </div>
        </div>
    )
}