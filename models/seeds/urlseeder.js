const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Url = require('../url')
mongoose.connect('mongodb://localhost/URL-shortener', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Url.create({
    originalUrl: 'https://www.google.com/',
    shortenerUrl: bcrypt.hashSync('https://www.google.com/', 10).slice(-5)
  })
  console.log('url cerate done')
})
