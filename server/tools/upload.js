import { tmpdir } from 'os'
import { join, extname } from 'path'

import upload from 'express-fileupload'
import { Router } from 'express'
import shortid from 'shortid'
import { mkdir } from 'fs-extra'

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$&')

const router = Router()

router.use(upload())
router.post('/', (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const file = req.files.file;
  const dirPath = join(tmpdir(), shortid())
  const filePath = join(dirPath, 'font' + extname(file.name))

  mkdir(dirPath).then(() => {
    // Use the mv() method to place the file somewhere on your server
    return file.mv(filePath)
  }).then(() => {
    res.json({ filePath });
  }).catch((error) => {
    res.json({ error });
  });
})

export default router