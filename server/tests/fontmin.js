import { join } from 'path'

import fontmin from '../tools/fontmin'

fontmin({
  words: '测试',
  fontFamily: 'testfont',
  fontPath: join(__dirname, 'font.ttf'),
}).then(console.log).catch(console.log)