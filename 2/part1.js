const fs = require('fs')

const lines = fs.readFileSync('./2/input.txt', {encoding: 'utf8'}).split('\n')

const add = (x, y) => x + y

function parsePulled(ps) {
    const colorCounts = ps.split(',').map(x => x.trim())
    const pulls = colorCounts.map(cc => {
        const ccSplit = cc.split(' ')
        const num = +ccSplit[0]
        const color = ccSplit[1]
        return {num, color}
    })
    return pulls
}

const games = lines.map(line => {
    const entries = line.split(': ')
    const game = +entries[0].replace('Game ', '')
    const pulls = entries[1].split(';').map(parsePulled)
    return {game, pulls}
})

const actual = { red: 12, green: 13, blue: 14 }
const possibleGames = games.filter(game =>
        game.pulls.every(pull =>
            pull.every(({num, color}) =>
                actual[color] >= num)))

const sum = possibleGames.map(g => g.game).reduce(add)
exports.answer = sum
