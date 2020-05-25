const exprerss = require('express')
const app = exprerss()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('hello word!')
})

app.listen(PORT, () =>{
  console.log(`App is running on http://localhost:3000`)
})