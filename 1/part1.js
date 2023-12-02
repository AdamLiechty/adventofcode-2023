const fs = require('fs')

const lines = fs.readFileSync('./1/input.txt', {encoding: 'utf8'}).split('\n')

function getNumberForLine(text) {
    const digits = text.split('').filter(c => c >= '0' && c <= '9')
    const numberText = digits.length > 0 ? digits[0] + digits[digits.length - 1] : '0'
    return +numberText
}

const add = (x, y) => x + y

const numbers = lines.map(getNumberForLine)
const sum = numbers.reduce(add)
exports.answer = sum
