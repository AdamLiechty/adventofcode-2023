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

const pullAsMap = pull => pull.reduce((p, curr) => ({...p, [curr.color]: curr.num}), {})

const games = lines.map(line => {
    const entries = line.split(': ')
    const game = +entries[0].replace('Game ', '')
    const pulls = entries[1].split(';').map(parsePulled)
    return {game, pulls}
})

const minimalBags = games.map(game => ({...game, pulls: game.pulls.map(pullAsMap)})).map(game =>
    game.pulls.reduce((minimal, pull) => ({
        red: Math.max(minimal.red, pull.red || 0),
        green: Math.max(minimal.green, pull.green || 0),
        blue: Math.max(minimal.blue, pull.blue || 0),
    }), {red: 0, green: 0, blue: 0}))

const gamePowers = minimalBags.map(m => m.red * m.green * m.blue)

const sum = gamePowers.reduce(add)
exports.answer = sum
