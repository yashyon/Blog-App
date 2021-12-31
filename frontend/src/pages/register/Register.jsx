import React from 'react'
import styles from './register.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from '../../services/authApi';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const ppurl = "https://www.pngitem.com/pimgs/b/421-4212266_default-avatar-png.png";
    const [error, setError] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await registerUser({
                username,
                email,
                password,
                profilePic: ppurl
            });
            console.log(res.data);
            res.data && window.location.replace("/login");
        } catch (err) {
            setError(true);
        }
    };
    return (
        <div className={styles.register}>
            <span className={styles.registerTitle}>REGISTER</span>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    className={styles.registerInput}
                    type="text"
                    placeholder="Enter your username..."
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                    className={styles.registerInput}
                    type="text"
                    placeholder="Enter your email..."
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                    className={styles.registerInput}
                    type="password"
                    placeholder="Enter your password..."
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles.registerButton} type='submit'>Register</button>
            </form>
            <button className={styles.registerLoginButton}>
                <Link to="/login" className="link">
                    Login
                </Link>
            </button>
            {error && <span style={{ color: "red", marginTop: "10px" }}>Something went wrong!</span>}
        </div>
    )
}

export default Register
