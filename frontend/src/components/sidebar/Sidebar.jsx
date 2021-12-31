import { useState, useEffect } from 'react'
import styles from './sidebar.module.css'
import { Link } from 'react-router-dom'
import { data } from '../../docs/data.js';
const Sidebar = () => {


    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarItem}>
                <span className={styles.sidebarTitle}>CATEGORIES</span>
                <ul className={styles.sidebarList}>
                    {
                        data.map((category) => (
                            <Link to={`/?cat=${category.value}`} className="link">
                                <li className={styles.sidebarListItem}>{category.value}</li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
