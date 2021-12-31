import styles from './settings.module.css';
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { uploadFile } from '../../services/postApi';
import { updateUser } from '../../services/authApi';


const Settings = () => {
    const ppurl = "https://www.pngitem.com/pimgs/b/421-4212266_default-avatar-png.png";
    const [file, setFile] = useState("");
    const [image, setImage] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const { user, dispatch } = useContext(Context);

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
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
            profilePic: image
        };
        try {
            const res = await updateUser(updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };

    return (
        <div className={styles.settings}>
            <div className={styles.settingsWrapper}>
                <div className={styles.settingsTitle}>
                    <span className={styles.settingsTitleUpdate}>Update Your Account</span>
                    <span className={styles.settingsTitleDelete}>Delete Account</span>
                </div>
                <div className={styles.settingsForm} >
                    <label>Profile Picture</label>
                    <div className={styles.settingsPP}>
                        {
                            file ?
                                (<img
                                    src={image}
                                    alt=""
                                />) :
                                (<img
                                    src={ppurl}
                                    alt=""
                                />)
                        }

                        <label htmlFor="fileInput" style={{ fontSize: "15px" }} className={styles.changeProfilePicture}>
                            Change Profile Picture
                        </label>
                        <input
                            type='file'
                            name="fileInput"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder={user.username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className={styles.settingsSubmitButton}
                        onClick={handleSubmit}
                        type="submit">
                        Update
                    </button>
                    {success && (
                        <span
                            style={{ color: "green", textAlign: "center", marginTop: "20px" }}>
                            Profile has been updated...
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Settings
