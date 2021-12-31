import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import styles from './post.module.css';


const Post = ({ post }) => {

    return (
        <div className={styles.post}>
            {post.photo &&
                <img
                    className={styles.postImg}
                    src={post.photo}
                    alt=""
                />}
            <div className={styles.postInfo}>
                <div className={styles.postCats}>
                    {
                        post.categories.map((category) => (
                            <span className={styles.postCat}>
                                <Link className={styles.link} to={`/?cat=${category}`}>
                                    {category}
                                </Link>
                            </span>
                        ))
                    }
                </div>
                <span className={styles.postTitle}>
                    <Link to={`/post/${post._id}`} className={styles.link}>
                        {post.title}
                    </Link>
                </span>
                <span className={styles.postDate}>{new Date(post.createdAt).toDateString()}</span>
                <span className={styles.postUsername}>
                    <Link to={`/?user=${post.username}`} className={styles.link}>
                        {post.username}
                    </Link>
                </span>
            </div>
            <p className={styles.postDesc}>
                {post.desc}
            </p>
        </div>
    )
}

export default Post
