const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
