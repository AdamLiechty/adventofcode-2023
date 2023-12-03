const fs = require('fs')

const add = (x, y) => x + y
const lines = fs.readFileSync('./3/input.txt', {encoding: 'utf8'}).split('\n')

const numbers = lines.flatMap((line, row) => {
    const matches = Array.from(line.matchAll(/[0-9]+/g), m => ({num: m[0], col: m.index, row}))
    return matches
})

function isAdjacentToSymbol(num) {
    function hasSymbolIn(row, col, length) {
        if (row < 0 || row >= lines.length) return false
        return !lines[row].slice(Math.max(col, 0), col + length).match(/^[0-9\.]*$/)
    }

    const startCol = num.col - 1, length = num.num.length + 2
    const isAdjacent = hasSymbolIn(num.row - 1, startCol, length)
                    || hasSymbolIn(num.row,     startCol, length)
                    || hasSymbolIn(num.row + 1, startCol, length)
    return isAdjacent
}

const parts = numbers.filter(isAdjacentToSymbol)

const sum = parts.map(p => +p.num).reduce(add)
exports.answer = sum
