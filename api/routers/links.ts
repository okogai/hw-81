import express from "express";

const linksRouter = express.Router();

linksRouter.get('/', async (_req, res) => {
    try {
    } catch {
        res.sendStatus(500);
    }
});

linksRouter.get('/:id', async (req, res) => {
    try {
    } catch {
        res.sendStatus(500);
    }
});

linksRouter.post('/', async (req, res) => {

    try {
    } catch (error) {
        res.status(400).send(error);
    }
});

export default linksRouter;
