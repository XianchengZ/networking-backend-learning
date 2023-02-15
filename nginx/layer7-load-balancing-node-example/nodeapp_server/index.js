const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

app.get('/', (req, res) => {
  res.send(`Hello from APPID ${process.env.APPID}`)
})

app.get('/admin', (req, res) => {
  res.send(`APPID: ${process.env.APPID}, this is an admin path`)
})

app.listen(9999)
