const ioHook = require('iohook');
const player = require('play-sound')(opts = {})
const fs = require('fs')
const path = require('path')

let audioFile = 'sounds/cherrymx-blue'

function getAudio(folder){
    return new Promise((resolve, reject) => {
        fs.readdir(folder, (err, files) => {
            if (err) { reject(err) }

            files = files.map(el => {
                return path.join(folder, el)
            })

            resolve(files)
        })  
    })
}

function playRandom(files){
    let randFile = files[Math.floor(Math.random()*files.length)]
    player.play(randFile)
}

Promise.all([
    getAudio(`${audioFile}/down`), 
    getAudio(`${audioFile}/up`)
]).then(files => {
    let downAudio = files[0]
    let upAudio = files[1]

    console.log(downAudio)

    let lastKey = null
    ioHook.on("keydown", event => {
        
        if (lastKey != event.keycode){
            playRandom(downAudio)
        }
        lastKey = event.keycode
    });

    ioHook.on("keyup", event => {
        lastKey = null
        playRandom(upAudio)
    })
    ioHook.start();

})




