import './bootstrap'
import Phaser from 'phaser'

let player
const dx = 160
const velocity = 0

let stars

let score = 0
let scoreText

function preload() {
    this.load.image('sky', '/assets/sky.png')
    this.load.image('ground', '/assets/platform.png')
    this.load.image('star', '/assets/star.png')
    this.load.image('bomb', '/assets/bomb.png')
    this.load.spritesheet('dude',
        '/assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create() {

    this.add.image(400, 300, 'sky')

    const platforms = this.physics.add.staticGroup()

    platforms.create(400, 568, 'ground').setScale(2).refreshBody()

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude')
    player.setBounce(0.4)
    player.body.setGravityY(1500)
    player.setCollideWorldBounds(true)

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNames('dude', { start: 0, end: 3}),
        frameRate: 10,
        repeat: -1,
    })

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNames('dude', { start: 5, end: 8}),
        frameRate: 10,
        repeat: -1,
    })

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4}],
        frameRate: 20,
    })

    this.physics.add.collider(player, platforms)

    let stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70}
    })

    stars.children.iterate(child => child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)))
    this.physics.add.collider(stars, platforms)
    this.physics.add.overlap(player, stars, function(player, star) {
        star.disableBody(true, true)
        score += 10
        scoreText.setText('Score: ' + score)
    }, null, this)

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000'})
}

function update() {
    const cursors = this.input.keyboard.createCursorKeys()
    // const pad = this.input.gamepad.getPad(0)

    if (cursors.left.isDown) {
        player.setVelocityX(-dx)
        player.anims.play('left', true)
    } else if (cursors.right.isDown) {
        player.setVelocityX(dx)
        player.anims.play('right', true)
    } else {
        player.setVelocityX(0)
        player.anims.play('turn', true)
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-820);
    }
}

new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload,
        create,
        update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
        }
    },
})
