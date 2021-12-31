import React from 'react';
import styles from './singlePost.module.css';
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { deletePost, getPostDetails, updatePost } from '../../services/postApi';

const SinglePost = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const getPost = async () => {
            const res = await getPostDetails(id);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    }, [id]);
    const handleDelete = async () => {
        try {
            deletePost(post._id, {
                data: { username: user.username },
            });
            history.push('/');
            window.location.replace("/");
        } catch (err) { }
    };
    useEffect(() => {

    }, [updateMode])

    const handleUpdate = async () => {
        try {
            updatePost(post._id, {
                username: user.username,
                title,
                desc,
            })
            setUpdateMode(false)
        } catch (err) { }
    };
    return (

        <div className={styles.singlePost}>
            <div className={styles.singlePostWrapper}>
                {post.photo &&
                    <img
                        className={styles.singlePostImg}
                        src={post.photo}
                        alt=""
                    />
                }
                {
                    updateMode ? (
                        <input
                            type="text"
                            value={title}
                            className={styles.singlePostTitleInput}
                            autoFocus
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    ) : (
                        < h1 className={styles.singlePostTitle}>
                            {title}
                            {
                                post.username === user?.username && (
                                    <div className={styles.singlePostEdit}>
                                        <button
                                            className={styles.singlePostIcon}
                                            onClick={() => setUpdateMode(true)}
                                        >Edit
                                        </button>
                                        <button
                                            className={styles.singlePostIcon}
                                            onClick={handleDelete}
                                        >Delete</button>
                                    </div>
                                )
                            }
                        </h1>
                    )
                }
                <div className={styles.singlePostInfo}>
                    <span>
                        Author:
                        <b className={styles.singlePostAuthor}>
                            <Link className="link" to={`/?user=${post.username}`}>
                                {post.username}
                            </Link>
                        </b>
                    </span>
                    <span className={styles.singlePostDate}>
                        {new Date(post.createdAt).toDateString()}
                    </span>
                </div>
                {
                    updateMode ? (
                        <textarea
                            className={styles.singlePostDescInput}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    ) :
                        <p className={styles.singlePostDesc}>
                            {post.desc}
                        </p>
                }
                <div style={{ marginTop: '10px' }}>

                    {updateMode && (
                        <button className={styles.singlePostButton} onClick={handleUpdate}>
                            Update
                        </button>
                    )}
                </div>
            </div>
        </div >
    )
}

export default SinglePost
