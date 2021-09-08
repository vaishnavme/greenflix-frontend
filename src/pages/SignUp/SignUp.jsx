import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context';
import {
    errorNotification,
    successNotification,
    InputField
} from '../../components';
import styles from './SignUp.module.css';

export default function SignUp() {
    const { signUpUser } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();

    const [signupCread, setSignupCread] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const inputChangeHandler = (e) => {
        e.preventDefault();
        setSignupCread((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const validate = () => {
        if (
            !/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/i.test(signupCread.email)
        ) {
            setErrorMessage('Invalid Email address!');
            return false;
        }
        if (
            !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/i.test(
                signupCread.password
            )
        ) {
            setErrorMessage(
                'Must be atleast 8 characters long and contain 1 uppercase, lowercase letter and number.'
            );
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const createAccount = async (e) => {
        e.preventDefault();
        if (validate()) {
            const { success, message } = await signUpUser(signupCread);

            if (success) {
                successNotification('Account Created!!');
                navigate(state?.from ? state.from : '/', { replace: true });
            } else {
                errorNotification(message);
            }
        }
    };

    return (
        <div className={`${styles.main}`}>
            <div className={`${styles.card} p-2`}>
                <div className={`${styles.header}`}>
                    <h6>Hi there👋</h6>
                    <h4>Let's get your free account.</h4>
                </div>
                <div className={`${styles.body}`}>
                    <form>
                        <InputField
                            labelName={'Name'}
                            type={'text'}
                            name={'name'}
                            onChangeOperation={inputChangeHandler}
                        />
                        <InputField
                            labelName={'Email'}
                            type={'email'}
                            name={'email'}
                            onChangeOperation={inputChangeHandler}
                        />
                        <InputField
                            labelName={'Password'}
                            type={'password'}
                            name={'password'}
                            onChangeOperation={inputChangeHandler}
                        />
                        <button
                            onClick={(e) => createAccount(e)}
                            className={`${styles.btn} ${styles.primary}`}
                        >
                            Sign Up
                        </button>
                    </form>
                    {errorMessage && <p className="f-danger">{errorMessage}</p>}
                    <p>
                        Already have an account?{' '}
                        <Link className={styles.primaryText} to="/login">
                            Log in
                        </Link>{' '}
                        here
                    </p>
                </div>
            </div>
        </div>
    );
}
