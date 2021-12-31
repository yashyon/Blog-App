import grid from 'gridfs-stream';
import mongoose from 'mongoose';

let gfs;

const url = `http://localhost:8000`;
const conn = mongoose.connection;

conn.once('open', () => {
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});

export const uploadImage = (req, res) => {
    try {
        if (!req.file) {
            return res.status(404).json("File not found");
        }
        const imageUrl = `${url}/file/${req.file.filename}`;

        res.status(200).json(imageUrl);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getImage = async (req, res) => {
    console.log(req.params.filename);
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream({ filename: file.filename });
        // console.log(file);
        readStream.pipe(res);
    } catch (error) {
        console.log('ERROR : ', error);
        res.status(500).json(error);
    }
}