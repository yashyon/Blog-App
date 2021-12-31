import express from 'express';
import { loginUser, registerUser, updateUserDetails } from '../controllers/auth-controller.js';
import { getAllPosts, getPost, deletePost, updatePost, createPost } from '../controllers/post-controller.js';
import { uploadImage, getImage } from '../controllers/image-controller.js'
import upload from '../utils/upload.js';

const router = express();

/* User Registration , Authorization and Changing User Details */
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/users/:id", updateUserDetails);

/* For getting posts and creating new post */
router.get('/posts', getAllPosts);
router.get('/post/:id', getPost);
router.post('/write', createPost);

/*For uploading and getting image*/
router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

/* For Deleting and updating Post */
router.put('/update/:id', updatePost);
router.delete('/details/:id', deletePost);

/* For Fetching Categories */


export default router;