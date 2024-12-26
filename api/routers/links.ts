import express from "express";
import Link from "../models/Link";
import {customAlphabet} from "nanoid";
import isUrl from "is-url";

const linksRouter = express.Router();

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

linksRouter.get('/', async (_req, res, next) => {
    try {
        const results = await Link.find();
        res.send(results);
    } catch (e) {
        next(e);
    }
});

linksRouter.get('/:shortUrl', async (req, res, next) => {
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

linksRouter.post('/', async (req, res, next) => {
    const { url } = req.body;

    if (!url) {
        res.status(400).json({ error: 'URL is required' });
        return;
    } else if (!isUrl(url)) {
        res.status(400).json({ error: 'Please use valid URL' });
        return;
    }

    const nanoid = customAlphabet(alphabet, 7);
    const shortUrl = nanoid();

    if (await Link.findOne({ shortUrl })) {
        res.status(400).json({ error: 'An error occurred while generating short url, short url already exists' });
        return;
    } else {
        const linkData = {
            originalUrl: url,
            shortUrl
        };

        const link = new Link(linkData);
        try {
            await link.save();
            res.status(200).send(link);
        } catch (e) {
            next(e);
        }
    }
});

export default linksRouter;
