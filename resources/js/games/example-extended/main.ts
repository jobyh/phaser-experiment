import * as Phaser from 'phaser'
import SceneOne from './scenes/SceneOne'

new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [new SceneOne()],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
})
