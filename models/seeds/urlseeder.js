const bcrypt = require('bcrypt')
const Url = require('../url')

const db = ('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  Url.create({
    originalUrl: 'https://www.google.com/',
    shortenerUrl: bcrypt.hashSync('https://www.google.com/', 10).slice(-5)
  })
  console.log('url cerate done')
})
