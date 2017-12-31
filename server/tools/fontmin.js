import { join } from 'path'

import Fontmin from 'fontmin'
import shortid from 'shortid'

import usage from './usage'

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$&')

export default ({ words, fontFamily, fontPath }) => {
  const folderName = shortid()
  const distPath = join(__dirname, '..', '..', 'static', 'generated', folderName)
  const distUrl = `/generated/${folderName}`

  var fontmin = new Fontmin()
    .src(fontPath)
    .use(Fontmin.glyph({
      text: words,
      hinting: false,         // keep ttf hint info (fpgm, prep, cvt). default = true
    }))
    .use(Fontmin.ttf2eot())
    .use(Fontmin.ttf2woff({ deflate: true }))
    .use(Fontmin.ttf2svg())
    .use(Fontmin.css({
      fontPath: './',         // location of font file 
      //base64: true,           // inject base64 data:application/x-font-ttf; (gzip font with css). default = false
      glyph: false,            // generate class for each glyph. default = false
      //iconPrefix: 'my-icon',  // class prefix, only work when glyph is `true`. default to "icon"
      fontFamily,   // custom fontFamily, default to filename or get from analysed ttf file
      asFileName: false,      // rewrite fontFamily as filename force. default = false
      //local: false,             // boolean to add local font. default = false
    }))
    .dest(distPath)

  return new Promise((resolve, reject) => {
    fontmin.run(function (err, files, stream) {
      if (err) {
        reject(err)
        return
      }
      resolve(distUrl)
    })
  }).then(() => {
    return usage(join(distPath, 'index.html'), {
      fontUrl: distUrl,
      fontFamily,
      words,
    })
  }).then(() => {
    return {
      distUrl,
      distPath,
    }
  })
}
