import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import styles from './login.module.css';
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import { loginUser } from '../../services/authApi';
const Login = () => {

    const history = useHistory();
    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await loginUser({
                username: userRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            history.push('/');
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
        }
    };

    return (
        <div className={styles.login}>
            <span className={styles.loginTitle}>LOGIN</span>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    className={styles.loginInput}
                    type="text"
                    placeholder="Enter your username"
                    ref={userRef}
                />
                <label>Password</label>
                <input
                    className={styles.loginInput}
                    type="password"
                    placeholder="Enter your password"
                    ref={passwordRef}
                />
                <button className={styles.loginButton} type="submit" disabled={isFetching}>
                    Login
                </button>
            </form>
            <button className={styles.loginRegisterButton}>
                <Link to="/register" className="link">
                    Register
                </Link>
            </button>
        </div>
    )
}

export default Login
