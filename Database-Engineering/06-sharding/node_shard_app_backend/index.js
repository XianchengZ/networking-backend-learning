const express = require('express')
const { Client } = require('pg')
const crypto = require('crypto')
const HashRing = require('hashring')

const hr = new HashRing()
hr.add('5432')
hr.add('5433')
hr.add('5434')

const clients = {
  5432: new Client({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
  }),
  5433: new Client({
    host: 'localhost',
    port: '5433',
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
  }),
  5434: new Client({
    host: 'localhost',
    port: '5434',
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
  }),
}

const connect = async () => {
  try {
    await clients[5432].connect()
    await clients[5433].connect()
    await clients[5434].connect()
  } catch (error) {
    console.log(error)
  }
}
connect()
const app = express()
app.use(express.json())

app.get('/:urlId', async (req, res) => {
  console.log('GET /:urlId')
  const urlId = req.params.urlId
  const server = hr.get(urlId)
  const result = await clients[server].query(
    'SELECT * FROM URL_TABLE WHERE URL_ID = $1',
    [urlId]
  )
  if (result.rowCount > 0) {
    res.send({
      urlId,
      server,
      result: result.rows[0],
    })
  } else {
    res.sendStatus(404)
  }
})

app.post('/', async (req, res) => {
  console.log('POST /')
  const url = req.body.url
  const hash = crypto.createHash('sha256').update(url).digest('base64')
  const urlId = hash.substring(0, 5)
  const server = hr.get(urlId)

  console.log('server:', server)

  await clients[server].query(
    'INSERT INTO URL_TABLE (URL, URL_ID) VALUES ($1, $2)',
    [url, urlId]
  )

  res.send({
    hash,
    urlId,
    server,
  })
  // consistently hash this to get a port
})

app.get('/resetdb', async (req, res) => {
  for (var i = 5432; i <= 5434; i++) {
    await clients[i].query('DELETE FROM URL_TABLE')
  }
  res.json({ success: 'success' })
})

app.get('/populateDB', async (req, res) => {
  for (var i = 0; i <= 1000; i++) {
    const url = 'https://www.andrew-zang.com/test/' + i
    const hash = crypto.createHash('sha256').update(url).digest('base64')
    const urlId = hash.substring(0, 5)
    const server = hr.get(urlId)

    console.log('server:', server)

    await clients[server].query(
      'INSERT INTO URL_TABLE (URL, URL_ID) VALUES ($1, $2)',
      [url, urlId]
    )
  }
  res.json({ success: 'success' })
})

app.listen('8080', () => console.log('Listening 8080'))
