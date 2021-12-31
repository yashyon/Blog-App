// import express from "express";
import express from 'express';
import cors from 'cors';
import Connection from './database/db.js';
import Router from './router/routes.js'
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);
app.use(bodyParser.json());
const PORT = 8000;

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

Connection();
console.log("server is running");
