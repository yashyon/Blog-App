import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const Connection = async () => {
    try {
        const url = process.env.MONGO_URL;
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting to MongoDB ", error);
    }

}

export default Connection;