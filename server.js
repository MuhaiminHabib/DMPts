// const https = require('https')
// const fs = require('fs')
// const next = require('next')

// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()

// const httpsOptions = {
//   key: fs.readFileSync('./certs/localhost.key'),
//   cert: fs.readFileSync('./certs/localhost.crt')
// }

// app.prepare().then(() => {
//   https
//     .createServer(httpsOptions, (req, res) => {
//       handle(req, res)
//     })
//     .listen(4000, err => {
//       if (err) throw err
//       console.log('> Ready on https://localhost:4000')
//     })
// })

const express = require('express')
const https = require('https')
const fs = require('fs')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const httpsOptions = {
  key: fs.readFileSync('./certs/localhost.key'),
  cert: fs.readFileSync('./certs/localhost.crt')
}

app.prepare().then(() => {
  const server = express()

  // Next.js request handler
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  // Create the HTTPS server
  https.createServer(httpsOptions, server).listen(4000, err => {
    if (err) throw err
    console.log('> Ready on https://localhost:4000')
  })
})
