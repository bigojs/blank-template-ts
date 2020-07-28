import http from 'http'
import fs from 'fs'
import path from 'path'
import mime from 'mime-types'
import { Request } from 'bigojs'
import { HomeComponent } from './components/Home/Home'
import { MasterComponent } from './components/Master/Master'
import { ErrorComponent } from './components/Error/Error'

const host: string = '127.0.0.1'
const port: number = 3001

const server: http.Server = http.createServer((req, res) => {
  const bigoReq = new Request(req)

  // Routing
  switch(req.method) {
    case 'GET':
      switch (bigoReq.route[0]) {
        case undefined:
          const title = 'Bigo'
          const homePage = new HomeComponent({title: title}).render()
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(new MasterComponent({page: homePage, title: title}).render(), 'utf-8')
        case 'users':
          res.writeHead(200)
          res.end('respond with a resource')
        // Returning static files from the `/static` folder
        default:
          let filePath: string = 'static' + req.url
          if (filePath === 'static/') {
            filePath = 'static/index.html'
          }

          const extname: string = String(path.extname(filePath)).toLowerCase()

          const contentType: string = mime.lookup(extname) || 'application/octet-stream'

          fs.readFile(filePath, (error: NodeJS.ErrnoException, content: Buffer) => {
            if (error) {
              let statusNo: number = error.code === 'ENOENT' ? 404 : 500
              const page = new ErrorComponent({
                message: 'Oops something went wrong 😥', 
                status: statusNo, 
                stack: error.stack
              }).render()
              res.writeHead(statusNo, { 'Content-Type': 'text/html' })
              res.end(new MasterComponent({page: page, title: 'Error'}).render(), 'utf-8')
            }
            else {
              res.writeHead(200, { 'Content-Type': contentType })
              res.end(content, 'utf-8')
            }
          })
      }
    break
  }
})

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`)
})