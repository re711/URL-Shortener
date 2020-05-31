const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const random = require('../../public/javascripts/random')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
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
          return res.render('shortUrl', { originalUrl, shortenerUrl: check.shortenerUrl })
        } else {
          Url.create({ originalUrl, shortenerUrl })
          return res.render('shortUrl', { originalUrl, shortenerUrl })
        }
      })
      .catch(error => console.log(error))
  }
})

router.get('/:shortenerUrl', (req, res) => {
  const shortenerUrl = req.params.shortenerUrl
  Url.find({ shortenerUrl: shortenerUrl })
    .lean()
    .then((url) => res.redirect(`${url[0].originalUrl}`))
    .catch(error => console.log(error))
})

module.exports = router
