const fs = require('fs')
const path = require('path')

module.exports = (dirPath = './public') => {
  return async (ctx, next) => {
    if (ctx.url.indexOf('/public') === 0) {
      const url = path.resolve(__dirname, dirPath)
      const filePath = url + ctx.url.replace('/public', '')
      console.log(filePath)
      try {
        stats = fs.statSync(filePath)
        if (stats.isDirectory()) {
          const dir = fs.readdirSync(filePath)
          const ret = ['<div style="padding-left: 20px;">']
          dir.forEach((filename) => {
            console.log(filename)
            if (filename.indexOf('.') > -1) {
              ret.push(
                `<p><a style="color: black;" href="${ctx.url}/${filename}">${filename}</a></p>`
              )
            } else {
              ret.push(
                `<p><a href="${ctx.url}/${filename}">${filename}</a></p>`
              )
            }
          })
          ret.push('</div>')
          ctx.body = ret.join('')
        } else {
          console.log('文件')
          const content = fs.readFileSync(filePath)
          ctx.body = content
        }
      } catch (e) {
        ctx.body = '404, not found'
      }
    } else {
      await next()
    }
  }
}
