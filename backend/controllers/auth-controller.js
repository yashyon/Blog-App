import bcrypt from "bcrypt";
import User from '../models/User.js';

/* For Registering New Users */
export const registerUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            profilePic: req.body.profilePic
        });
        console.log(newUser);
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}

/* For Logging In A User */

export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("Wrong credentials!");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials!");

        const { password, ...others } = user._doc;
        res.status(200).json(others);
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }
}

/* For changing settings of a user */
export const updateUserDetails = async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json(`Error while updating user details `, error);
        }
    } else {
        res.status(401).json("You can update only your account!");
    }
}