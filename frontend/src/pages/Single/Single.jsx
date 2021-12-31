import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar'
import SinglePost from '../../components/SinglePost/SinglePost';
import styles from './single.module.css';
import { withRouter } from 'react-router-dom'


const Single = () => {
    return (
        <div className={styles.container}>
            <SinglePost />
            <Sidebar />
        </div>
    )
}

export default Single;
