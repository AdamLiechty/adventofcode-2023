const fs = require('fs')

const lines = fs.readFileSync('./1/input.txt', {encoding: 'utf8'}).split('\n')

function numTextFor(text) {
    const map = {
        'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
    }
    return map[text] || text
}
function getNumberForLine(text) {
    // zero-width assertion
    // https://stackoverflow.com/a/33903830/1952208
    const matchAll = text.matchAll(/(?=(zero|one|two|three|four|five|six|seven|eight|nine|[0-9]))/g)
    
    const matches = Array.from(matchAll, x => x[1])
    const numberText = matches.length > 0 ? numTextFor(matches[0]) + numTextFor(matches[matches.length - 1]) : '0'

    return +numberText
}

const add = (x, y) => x + y

const numbers = lines.map(getNumberForLine)
const sum = numbers.reduce(add)
exports.answer = sum
