//  產生 5 碼英數組合
function sample (array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function random () {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  const arr = (lowerCaseLetters + upperCaseLetters + numbers).split('')
  let randomValue = ''
  for (let i = 0; i < 5; i++) {
    randomValue += sample(arr)
  }
  return randomValue
}
module.exports = random
