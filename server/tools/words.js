import { tmpdir } from 'os'
import { join, extname } from 'path'

import bodyParser from 'body-parser'
import { Router } from 'express'
import shortid from 'shortid'

import fontmin from './fontmin'

const router = Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/', (req, res) => {
  const { filePath, words, fontFamily } = req.body || {}

  fontmin({
    words,
    fontPath: filePath,
    fontFamily,
  }).then((data) => {
    const { distUrl, distPath } = data
    res.json({
      distUrl,
      distPath,
    })
  }).catch((error) => {
    console.log(error)
    res.json({error})
  })

})

export default router