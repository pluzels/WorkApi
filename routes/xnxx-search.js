import xnxxSearch from '../func/search/xnxxsearch.js'
import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
  const query = req.query.query
  if (!query) return res.json({ creator: 'galihrhgnwn', status: false, msg: 'query is required' })
  const result = await xnxxSearch(query)
  res.json(result)
})

export default router
