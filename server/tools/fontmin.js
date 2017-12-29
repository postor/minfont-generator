import Fontmin from 'fontmin'

export default ({ words, fontFamily, fontPath }) => {

  var fontmin = new Fontmin()
    .use(Fontmin.glyph({
      text: words,
      hinting: false,         // keep ttf hint info (fpgm, prep, cvt). default = true
    }))
    .use(Fontmin.css({
      fontPath,         // location of font file 
      base64: true,           // inject base64 data:application/x-font-ttf; (gzip font with css). default = false
      glyph: false,            // generate class for each glyph. default = false
      //iconPrefix: 'my-icon',  // class prefix, only work when glyph is `true`. default to "icon"
      fontFamily,   // custom fontFamily, default to filename or get from analysed ttf file
      //asFileName: false,      // rewrite fontFamily as filename force. default = false
      //local: false,             // boolean to add local font. default = false
    }))

  return new Promise((resolve, reject) => {
    fontmin.run(function (err, files, stream) {
      if (err) {
        reject(err)
        return
      }
      resolve(fontPath)
    })
  })
}
