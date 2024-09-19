import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

const Signup = () => {
    return (
        <div className={styles.container}>
            <Navbar />
            <main className={styles.main}>
                <h1 className={styles.title}>Sign Up</h1>
                <p>Placeholder for sign up form</p>
            </main>
        </div>
    );
};

export default Signup;