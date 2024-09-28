import ytplay from '../func/ytplay.js'
import express from 'express'

let yt = new ytplay()

const router = express.Router()

router.get('/yt/ytplay', async (req, res) => {
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
