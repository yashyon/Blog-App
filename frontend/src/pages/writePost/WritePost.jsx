import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './writePost.module.css';
import { Context } from '../../context/Context';
import { uploadFile, writePost } from '../../services/postApi';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { data } from '../../docs/data';

const WritePost = () => {

    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [categories, setCategories] = useState([]);
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);
    const history = useHistory();

    const animatedComponents = makeAnimated();

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                const image = await uploadFile(data);
                setImage(image.data);
            }
        }
        getImage();
    }, [file]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const choosenCategories = [];
        categories.map((category) => (
            choosenCategories.push(category.value)
        ))
        const newPost = {
            username: user.username,
            title: title,
            desc: desc,
            photo: image,
            categories: choosenCategories
        };
        try {
            const res = writePost(newPost);
            history.push('/');
            window.location.replace("/post/" + res.data._id);
        } catch (err) { }
    };

    const url = "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=jeshoots-com-pUAM5hPaCRI-unsplash.jpg&w=1920";
    return (
        <>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    {
                        file
                            ? <img className={styles.image} src={URL.createObjectURL(file)} alt="" />
                            :
                            <img className={styles.image} src={url} alt="" />
                    }
                </div>
                <div className={styles.writeForm}>
                    <div>
                        <input
                            type="text"
                            className={styles.title}
                            name="title"
                            placeholder="Title"
                            required=""
                            autoFocus={true}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div >
                        <button className={styles.button}>
                            <label htmlFor="imageinput">
                                Add Image
                            </label>
                            <input type="file"
                                id="imageinput"
                                style={{ display: 'none' }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </button>
                    </div>
                    <div >
                        <textarea
                            type="text"
                            name="description"
                            className={styles.description}
                            placeholder="Write your blog...."
                            required=""
                            onChange={e => setDesc(e.target.value)}
                        />
                    </div>
                    {
                        <div >
                            <Select
                                styles={styles.categories}
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                defaultValue={data[0]}
                                isMulti={true}
                                options={data}
                                onChange={(e) => setCategories(e)}
                            />
                            {/* {categories.map(o => <p>{o.value}</p>)} */}
                        </div>
                    }
                    <div>
                        <button className={styles.button} onClick={handleSubmit}>
                            Publish
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WritePost
