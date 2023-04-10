import * as Phaser from 'phaser'
import Scene = Phaser.Scene
import Text = Phaser.GameObjects.Text
import SpriteWithDynamicBody = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
import Group = Phaser.Physics.Arcade.Group
import PlayerController from '../PlayerController'

export default class SceneOne extends Scene {
    protected player: SpriteWithDynamicBody
    protected controller: PlayerController
    protected stars: Group
    protected dx = 160

    protected score = 0
    protected scoreText: Text

    protected bombs
    protected gameOver = false

    constructor() {
        super({})
    }

    preload() {
        this.load.image('sky', '/assets/sky.png')
        this.load.image('ground', '/assets/platform.png')
        this.load.image('star', '/assets/star.png')
        this.load.image('bomb', '/assets/bomb.png')
        this.load.spritesheet('dude', '/assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48,
        })
    }

    create() {
        this.add.image(400, 300, 'sky')

        const platforms = this.physics.add.staticGroup()

        platforms.create(400, 568, 'ground').setScale(2).refreshBody()

        platforms.create(600, 400, 'ground')
        platforms.create(50, 250, 'ground')
        platforms.create(750, 220, 'ground')

        this.player = this.physics.add.sprite(100, 450, 'dude')
        this.player.setBounce(0.4)
        this.player.body.setGravityY(1500)
        this.player.setCollideWorldBounds(true)

        this.controller = new PlayerController(this.player, this.input)

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNames('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNames('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20,
        })

        this.physics.add.collider(this.player, platforms)

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
        })

        this.stars.children.iterate((child: SpriteWithDynamicBody) =>
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)),
        )
        this.physics.add.collider(this.stars, platforms)
        this.physics.add.overlap(
            this.player,
            this.stars,
            function (
                player: SpriteWithDynamicBody,
                star: SpriteWithDynamicBody,
            ) {
                star.disableBody(true, true)
                this.score += 10
                this.scoreText.setText('Score: ' + this.score)

                if (this.stars.countActive(true) === 0) {
                    this.stars.children.iterate(function (child) {
                        child.enableBody(true, child.x, 0, true, true)
                    })
                    let x =
                        this.player.x < 400
                            ? Phaser.Math.Between(400, 800)
                            : Phaser.Math.Between(0, 400)

                    this.bombs
                        .create(x, 16, 'bomb')
                        .setBounce(1)
                        .setCollideWorldBounds(true)
                        .setVelocity(Phaser.Math.Between(-200, 200), 20)
                }
            },
            null,
            this,
        )

        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            color: '#000',
        })

        this.bombs = this.physics.add.group()
        this.physics.add.collider(this.bombs, platforms)
        this.physics.add.collider(
            this.player,
            this.bombs,
            function (
                player: SpriteWithDynamicBody,
                bomb: SpriteWithDynamicBody,
            ) {
                this.physics.pause()
                player.setTint(0xff0000)
                player.anims.play('turn')
                this.gameOver = true
            },
            null,
            this,
        )
    }

    update() {
        // const pad = this.input.gamepad.pad1

        // Do we need this?
        // this.input.gamepad.once('connect', function (pad) {
        //     console.log('pad connected')
        // })
        //
        // if (this.input.gamepad.pad1) {
        //     console.log('pad1 connected!')
        // }
        // const pad = this.input.gamepad.getPad(0)

        if (this.controller.left()) {
            this.player.setVelocityX(-this.dx)
            this.player.anims.play('left', true)
        } else if (this.controller.right()) {
            this.player.setVelocityX(this.dx)
            this.player.anims.play('right', true)
        } else {
            this.player.setVelocityX(0)
            this.player.anims.play('turn', true)
        }

        if (this.controller.up() && this.player.body.touching.down) {
            this.player.setVelocityY(-900)
        }
    }
}
