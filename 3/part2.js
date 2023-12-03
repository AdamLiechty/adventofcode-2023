const fs = require('fs')

const add = (x, y) => x + y
const lines = fs.readFileSync('./3/input.txt', {encoding: 'utf8'}).split('\n')

const numbers = lines.flatMap((line, row) => {
    const matches = Array.from(line.matchAll(/[0-9]+/g), m => ({num: m[0], col: m.index, row}))
    return matches
})

const gears = []
lines.forEach((line, row) => {
    for (let col = 0; col < line.length; col++) {
        const char = line[col]
        if (char == '*') {
            const adjacentNums = numbers.filter(num => {
                return num.row > row - 2
                    && num.row < row + 2
                    && num.col > col - num.num.length - 1
                    && num.col < col + 2
            })
            if (adjacentNums.length === 2) gears.push({row, col, adjacentNums})
        }
    }
})

const gearRatios = gears.map(g => (+g.adjacentNums[0].num) * (+g.adjacentNums[1].num))
const sum = gearRatios.reduce(add)
exports.answer = sum
