import { useAuth } from '../../context';
import styles from './Account.module.css';

export default function Login() {
    const { user } = useAuth();

    return (
        <div>
            <section className={`${styles.wrapper}`}>
                <div className={`${styles.formSection}`}>
                    <div className={`${styles.header}`}>
                        <h5>Hi {user.name}</h5>
                    </div>
                    <div className={`mt-2 mb-2`}>
                        <p>
                            Welcome to account setting. You can update your{' '}
                            <br /> account details here.
                        </p>
                        <div className={`mt-2 mb-2`}>
                            <label className={`${styles.label}`}>
                                Your Name
                            </label>
                            <input
                                className={`${styles.inputField} mb-2`}
                                readOnly
                                type="text"
                                defaultValue={user.name}
                            />

                            <label className={`${styles.label}`}>
                                Your Email
                            </label>
                            <input
                                className={`${styles.inputField} mb-4`}
                                readOnly
                                type="text"
                                defaultValue={user.email}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
