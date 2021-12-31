import { useState, useEffect } from 'react'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './home.module.css'
import { useLocation } from 'react-router-dom'
import { getAllPosts } from '../../services/postApi'

const Home = () => {

    const [posts, setPosts] = useState([]);
    const { search } = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            console.log(search);
            const res = await getAllPosts(search);
            console.log(res);
            setPosts(res.data);
        };
        console.log(search);

        fetchPosts();
    }, [search])

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.home}>
                {
                    posts &&
                    <Posts posts={posts} />
                }
                <Sidebar />
            </div>

        </div>
    )
}

export default Home;
