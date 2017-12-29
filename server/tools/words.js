import { tmpdir } from 'os'
import { join, extname } from 'path'

import bodyParser from 'body-parser'
import { Router } from 'express'
import shortid from 'shortid'

const router = Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/', (req, res) => {
  console.log(req.body)
  const { filePath, words, fontFamily } = req.body || {}
  res.json(req.body)
})

export default router