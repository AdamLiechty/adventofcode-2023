const fs = require('fs')

const add = (x, y) => x + y
const lines = fs.readFileSync('./4/input.txt', {encoding: 'utf8'}).split('\n')

const games = lines.map(line => {
    const parts = line.split(':')[1].split('|').map(x => x.trim())
    const parse = numbers => numbers.split(' ').filter(x => x).map(x => +x)
    const winners = parse(parts[0])
    const have = parse(parts[1])
    return {winners, have}
})

const scores = games.map(({winners, have}) => {
    const wins = have.filter(h => winners.includes(h)).length
    const score = wins === 0 ? 0 : Math.pow(2, wins - 1)
    return score
})

const sum = scores.reduce(add)
exports.answer = sum
