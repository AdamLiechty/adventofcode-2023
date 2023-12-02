const fs = require('fs')
const path = require('path')

const dirs = fs.readdirSync('.', {withFileTypes: true}).filter(x => x.isDirectory).map(x => +x.name).filter(x => x > 0)

function doDay(day) {
    const dayDir = `${day}`
    const files = fs.readdirSync(path.join('.', dayDir)).filter(x => x.endsWith('.js'))
    console.log(`Day ${day}`)
    files.forEach(file => {
        const {answer} = require('./' + path.join(dayDir, file))
        console.log(`  ${file.replace('.js', '')}\t\t${answer}`)
    })
}

dirs.forEach(doDay)
