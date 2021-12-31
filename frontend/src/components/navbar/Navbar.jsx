import { useContext } from 'react'
import { Link } from "react-router-dom";
import { Context } from '../../context/Context';
import styles from './navbar.module.css';

const Navbar = () => {
    const { user, dispatch } = useContext(Context);
    const ppurl = "https://www.pngitem.com/pimgs/b/421-4212266_default-avatar-png.png";

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
        <div className={styles.top}>
            <div className={styles.topLeft}>
                {/* <h1 className={styles.text}>Blog Website</h1> */}
            </div>
            <div className={styles.topCenter}>
                <ul className={styles.topList}>
                    <li className={styles.topListItem}>
                        <Link className="link" to="/">
                            HOME
                        </Link>
                    </li>
                    {/* <li className={styles.topListItem}>
                        <Link className="link" to="/about">
                            ABOUT
                        </Link>
                    </li>
                    <li className={styles.topListItem}>
                        <Link className="link" to="/contact">
                            CONTACT
                        </Link>
                    </li> */}
                    <li className={styles.topListItem}>
                        <Link className="link" to="/write">
                            WRITE
                        </Link>
                    </li>
                    <li className={styles.topListItem} onClick={handleLogout}>
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className={styles.topRight}>
                {user ? (
                    <Link to="/settings">
                        {

                            user.profilePic ? (
                                <img className={styles.topImg} src={user.profilePic} alt="" />
                            ) : (
                                <img className={styles.topImg} src={ppurl} alt="" />
                            )
                        }
                    </Link>
                ) : (
                    <ul className={styles.topList}>
                        <li className={styles.topListItem}>
                            <Link className="link" to="/login">
                                LOGIN
                            </Link>
                        </li>
                        <li className={styles.topListItem}>
                            <Link className="link" to="/register">
                                REGISTER
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Navbar;
