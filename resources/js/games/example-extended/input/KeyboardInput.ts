import * as Phaser from 'phaser'
import BaseInput from './BaseInput'
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys
import InputPlugin = Phaser.Input.InputPlugin

export default class KeyboardInput extends BaseInput {
    protected keys

    constructor(protected input: InputPlugin) {
        super(input)
        this.keys = input.keyboard.createCursorKeys()
    }

    isDown(): boolean {
        return this.keys.down.isDown
    }

    isLeft(): boolean {
        return this.keys.left.isDown
    }

    isRight(): boolean {
        return this.keys.right.isDown
    }

    isUp(): boolean {
        return this.keys.up.isDown
    }
}
