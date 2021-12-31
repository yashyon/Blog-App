import React from 'react';
import styles from './header.module.css';


const Header = () => {
    const url = "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=jeshoots-com-pUAM5hPaCRI-unsplash.jpg&w=1920";
    return (
        <div className={styles.container}>
            <h1 className={styles.text}>BLOG APP</h1>
            <img className={styles.image} src={url} alt='rkmbomb' />
        </div>
    )
}

export default Header
