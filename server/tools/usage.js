import { join } from 'path'

import { readFile, writeFile } from 'fs-extra'
import { template } from 'lodash'

const templateFilePath = join(__dirname, 'usage.html')

/**
 * 
 * @param {string} filePath
 * @param {Object} data 
 * @param {string} data.fontFamily
 * @param {string} data.fontUrl
 * @param {string} data.words
 */
export default (filePath, data) => {
  return readFile(templateFilePath, 'utf8').then((content) => {  
    const compiled = template(content)
    return compiled(data)
  }).then((content) => {
    return writeFile(filePath, content)
  })
}