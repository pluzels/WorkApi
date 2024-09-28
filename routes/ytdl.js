import express from 'express'
import YTDL from '../func/ytdl.js'
import Ytdl2 from '../func/y2mate.js'
import ytsearch from '../func/search/yts.js'
import ytplay from '../func/ytplay.js'  // impor ytplay

let ytdl = new YTDL()
let ytdl2 = new Ytdl2()

const router = express.Router()

// Route untuk ytmp3
router.get('/ytmp3', async (req, res) => {
  const url = req.query.url
  if (!url) return res.json({ creator: 'Guru sensei', status: false, msg: 'URL is required' })
  const search = await ytdl.ytaudio(url)
  res.json(search)
})

// Route untuk ytmp4
router.get('/ytmp4', async (req, res) => {
  const url = req.query.url
  if (!url) return res.json({ creator: 'Guru sensei', status: false, msg: 'URL is required' })
  const search = await ytdl.ytvideo(url)
  res.json(search)
})

// Route untuk pencarian ytsearch
router.get('/ytsearch', async (req, res) => {
  const query = req.query.query
  if (!query) return res.json({ creator: 'Guru sensei', status: false, msg: 'query is required' })
  const result = await ytsearch(query)
  res.json(result)
})

// Route v2 untuk ytmp3 dengan ytdl2
router.get('/v2/ytmp3', async (req, res) => {
  const url = req.query.url
  if (!url) return res.json({ creator: 'Guru sensei', status: false, msg: 'URL is required' })
  const search = await ytdl2.ytaud(url)
  res.json(search)
})

// Route v2 untuk ytmp4 dengan ytdl2
router.get('/v2/ytmp4', async (req, res) => {
  const url = req.query.url
  if (!url) return res.json({ creator: 'Guru sensei', status: false, msg: 'URL is required' })
  const search = await ytdl2.ytvid(url)
  res.json(search)
})

// Route untuk ytplay (implementasi dari ../func/ytplay.js)
router.get('/ytplay', async (req, res) => {
  const query = req.query.query
  const type = req.query.type || 'video' // default video

  if (!query) {
    return res.json({ creator: 'Guru sensei', status: false, msg: 'Query is required' })
  }

  try {
    const result = await ytplay.searchAndDownload(query, type)  // Panggil fungsi searchAndDownload dari ytplay
    if (!result) {
      return res.json({ creator: 'Guru sensei', status: false, msg: 'No result found' })
    }
    res.json(result)
  } catch (error) {
    res.status(500).json({ creator: 'Guru sensei', status: false, msg: 'Error occurred', error: error.message })
  }
})

export default router
