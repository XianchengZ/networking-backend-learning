const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

app.get('/', (req, res) => {
  res.send(`Hello from APPID ${process.env.APPID}`)
})

app.listen(9999)
