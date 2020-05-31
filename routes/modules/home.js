const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const random = require('../../public/javascripts/random')
const indexUrl = 'https://mysterious-retreat-22206.herokuapp.com'

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const hostName = req.hostname
  const originalUrl = req.body.url
  const shortenerUrl = random()
  if (originalUrl.length === 0) {
    const err = '請輸入有效網址'
    res.render('index', { err, originalUrl })
  } else {
    Url.findOne({ originalUrl: originalUrl })
    // 檢查網址防止重複
      .lean()
      .then(check => {
        if (check) {
          return res.render('shortUrl', { originalUrl, shortenerUrl: check.shortenerUrl, hostName, indexUrl })
        } else {
          Url.create({ originalUrl, shortenerUrl })
          return res.render('shortUrl', { originalUrl, shortenerUrl, hostName, indexUrl })
        }
      })
      .catch(error => console.log(error))
  }
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Url.findOne({ shortenerUrl: id })
    .lean()
    .then(url => res.redirect(url.originalUrl))
    .catch(error => console.log(error))
})

module.exports = router
