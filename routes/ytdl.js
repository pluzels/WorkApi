import express from 'express'
import YTDL from '../func/ytdl.js'
import Ytdl2 from '../func/y2mate.js'
import ytsearch from '../func/search/yts.js'
import express from 'express';
import YTDL from '../func/ytplay.js'; // Ensure this is the correct path

const router = express.Router();
const ytplay = new YTDL();

router.get('/ytmp3', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json({ creator: 'Guru sensei', status: false, msg: 'URL is required' });

  try {
    const result = await ytplay.ytaudio(url);
    res.json(result);
  } catch (error) {
    res.json({
      creator: 'Guru sensei',
      status: false,
      msg: 'Error occurred',
      error: error.message,
    });
  }
});

router.get('/ytmp4', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json({ creator: 'Guru sensei', status: false, msg: 'URL is required' });

  try {
    const result = await ytplay.ytvideo(url);
    res.json(result);
  } catch (error) {
    res.json({
      creator: 'Guru sensei',
      status: false,
      msg: 'Error occurred',
      error: error.message,
    });
  }
});

router.get('/ytsearch', async (req, res) => {
  const query = req.query.query;
  if (!query) return res.json({ creator: 'Guru sensei', status: false, msg: 'Query is required' });

  try {
    const result = await ytplay.searchAndDownload(query, 'video');
    res.json(result);
  } catch (error) {
    res.json({
      creator: 'Guru sensei',
      status: false,
      msg: 'Error occurred',
      error: error.message,
    });
  }
});

router.get('/ytsearch/mp3', async (req, res) => {
  const query = req.query.query;
  if (!query) return res.json({ creator: 'Guru sensei', status: false, msg: 'Query is required' });

  try {
    const result = await ytplay.searchAndDownload(query, 'audio');
    res.json(result);
  } catch (error) {
    res.json({
      creator: 'Guru sensei',
      status: false,
      msg: 'Error occurred',
      error: error.message,
    });
  }
});

export default router;
