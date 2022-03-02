let soundEffects = {};
let assets = {};
let currentGun = 0;
let end = false;
let keepKeys = false;

const player = { x: 1920 / 2, y: 1080 / 2, direction: 'up' };
const guns = [
    'laser',
    'ak',
]

const gunsData = [
    { time: 500, damage: 5 },
    { time: 100, damage: 5 },
]
function preload() {
    assets = {
        spaceship_up: loadImage('assets/spaceship_up.png'),
        spaceship_left: loadImage('assets/spaceship_left.png'),
        spaceship_down: loadImage('assets/spaceship_down.png'),
        spaceship_right: loadImage('assets/spaceship_right.png'),
    }
    soundEffects = {
        heavy_bump: loadSound('assets/heavy_bump.wav'),
        laser: loadSound('assets/laser.wav'),
        ak: loadSound('assets/ak.wav'),
        ak_end: loadSound('assets/ak_end.wav'),
        theme: loadSound('assets/theme.mp3'),
    };
}

function setup() {
    createCanvas(displayWidth, displayHeight);
    noStroke();
    frameRate(60);
    rectMode(CENTER);

    soundEffects.theme.play()
}

function draw() {
    background('#000000');

    image(assets[`spaceship_${player.direction}`], player.x, player.y, 60, 60);

    text(guns[currentGun], 100, 100)
}

function keyPressed() {
    if (keyCode === 49) currentGun = 0;
    if (keyCode === 50) currentGun = 1;
    if (keyCode === 51) currentGun = 2;

    keepKeys = true

    const xd = setInterval(() => {
        if (keepKeys === false) return clearInterval(xd)

        if (key === 'd') player.x += 5, player.direction = 'right';
        if (key === 'a') player.x -= 5, player.direction = 'left';
        if (key === 's') player.y += 5, player.direction = 'down';
        if (key === 'w') player.y -= 5, player.direction = 'up';

        if (player.y <= 0) player.y = 5
        if (player.y >= 1015) player.y = 1015, console.log('reaced display')
        if (player.x <= 0) player.x = 5
        if (player.x >= 1750) player.x = 1750
    })
}

function keyReleased() {
    keepKeys = false;
}
function mousePressed() {
    end = true
    // Object.keys(soundEffects).forEach((key) => soundEffects[key].stop())

    soundEffects[guns[currentGun]].play()

    const xd = setInterval(() => {
        if (end === false) {
            if (guns[currentGun] === 'ak') soundEffects.ak_end.play();
            return clearInterval(xd);
        }
        soundEffects[guns[currentGun]].play()
    }, gunsData[currentGun].time)
}

function mouseReleased() {
    end = false;
}