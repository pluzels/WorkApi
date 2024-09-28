import ndtv from "../func/news.js";
import express from 'express';

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const result = await ndtv()
        res.json({ creator: 'galihrhgnwnn', result })
    } catch (error) {
        res.status(500).json({ creator: 'galihrhgnwnn', status: false, msg: 'Internal Server Error' })
    }
});
export default router
