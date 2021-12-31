import React from 'react'
import styles from './posts.module.css'
import Post from '../Post/Post'
const Posts = ({ posts }) => {
    return (
        <div className={styles.posts}>
            {
                posts.map((post) => (
                    < Post key={post.createdAt} post={post} />
                ))
            }
        </div>
    )
}

export default Posts
