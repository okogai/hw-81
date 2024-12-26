import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import mongoDb from "./mongoDb";
import linksRouter from "./routers/links";
import Link from "./models/Link";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/links', linksRouter);

app.get('/:shortUrl', async (req, res, next) => {
    try {
        const result = await Link.findOne({ shortUrl: req.params.shortUrl });
        if (!result) {
            res.status(404).json({ error: 'Not found' });
            return;
        }
        res.status(301).redirect(result.originalUrl);
    } catch (e) {
        next(e);
    }
});


const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://localhost:27017/links');

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

run().catch(err => console.log(err));


