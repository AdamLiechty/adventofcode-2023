const fs = require('fs')

const add = (x, y) => x + y
const lines = fs.readFileSync('./4/input.txt', {encoding: 'utf8'}).split('\n')

const games = lines.map(line => {
    const parts = line.split(':')[1].split('|').map(x => x.trim())
    const parse = numbers => numbers.split(' ').filter(x => x).map(x => +x)
    const winners = parse(parts[0])
    const have = parse(parts[1])
    const wins = have.filter(h => winners.includes(h)).length
    return {winners, have, wins}
})

const copyCounts = games.map(() => 1)
for (let i = 0; i < games.length; ++i) {
    const {wins} = games[i]
    const numCards = copyCounts[i]
    for (let j = 0; j < wins; j++) {
        copyCounts[i + j + 1] = copyCounts[i + j + 1] + numCards
    }
}

const sum = copyCounts.reduce(add)
exports.answer = sum
