const exprerss = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')
const Url = require('./models/url')
const random = require('./public/javascripts/random')
const app = exprerss()
const PORT = 3000

mongoose.connect('mongodb://localhost/URL-shortener', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(bodyParser.urlencoded({ extended: true }))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const originalUrl = req.body.url
  const shortenerUrl = random()
  return Url.create({ originalUrl, shortenerUrl })
    .then(() => res.render('shortUrl', { originalUrl, shortenerUrl }))
    .catch(error => console.log(error))
})

app.get('/:shortenerUrl', (req, res) => {
  const shortenerUrl = req.params.shortenerUrl
  return Url.find({ shortenerUrl: shortenerUrl })
    .lean()
    .then((url) => res.redirect(`${url[0].originalUrl}`))
    .catch(error => console.log(error))
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
