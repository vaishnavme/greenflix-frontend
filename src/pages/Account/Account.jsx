import { useAuth } from '../../context';
import styles from './Account.module.css';

export default function Login() {
    const { user } = useAuth();

    return (
        <div>
            <section className={`${styles.wrapper}`}>
                <div className={`${styles.formSection}`}>
                    <div className={`${styles.header}`}>
                        <h2>Hi {user.name} 👋</h2>
                    </div>
                </div>
            </section>
        </div>
    );
}
