import YTDL from '../func/ytdl.js'
import Ytdl2 from '../func/y2mate.js'
import ytplay from '../func/ytplay.js'
import express from 'express'
import ytsearch from '../func/search/yts.js'

let ytdl = new YTDL()
let ytdl2 = new Ytdl2()
let yt = new ytplay()

const router = express.Router()

// Endpoint untuk mengunduh audio dari youtube
router.get('/ytmp3', async (req, res) => {
  const url = req.query.url
  if (!url) return res.json({ creator: 'galihrhgnwnn', status: false, msg: 'URL is required' })
  const search = await ytdl.ytaudio(url)
  res.json(search)
})

// Endpoint untuk mengunduh video dari youtube
router.get('/ytmp4', async (req, res) => {
  const url = req.query.url
  if (!url) return res.json({ creator: 'galihrhgnwnn', status: false, msg: 'URL is required' })
  const search = await ytdl.ytvideo(url)
  res.json(search)
})

// Endpoint untuk mencari video di youtube
router.get('/ytsearch', async (req, res) => {
  const query = req.query.query
  if (!query) return res.json({ creator: 'galihrhgnwnn', status: false, msg: 'query is required' })
  const result = await ytsearch(query)
  res.json(result)
})

// Endpoint versi 2 untuk mengunduh audio dari youtube
router.get('/v2/ytmp3', async (req, res) => {
  const url = req.query.url
  if (!url) return res.json({ creator: 'galihrhgnwnn', status: false, msg: 'URL is required' })
  const search = await ytdl2.ytaud(url)
  res.json(search)
})

// Endpoint versi 2 untuk mengunduh video dari youtube
router.get('/v2/ytmp4', async (req, res) => {
  const url = req.query.url
  if (!url) return res.json({ creator: 'galihrhgnwnn', status: false, msg: 'URL is required' })
  const search = await ytdl2.ytvid(url)
  res.json(search)
})

// Endpoint untuk memainkan audio atau video berdasarkan URL atau query
router.get('/ytplay', async (req, res) => {
  const { url, query, type } = req.query

  if (url) {
    // jika ada url, cek apakah tipe audio atau video
    if (type === 'audio') {
      const search = await yt.ytaudio(url)
      return res.json(search)
    } else {
      const search = await yt.ytvideo(url)
      return res.json(search)
    }
  } else if (query) {
    // jika ada query, lakukan search
    const result = await yt.searchAndDownload(query, type || 'video')
    return res.json(result)
  } else {
    return res.json({ creator: 'galihrhgnwnn', status: false, msg: 'URL or query is required' })
  }
})

export default router
