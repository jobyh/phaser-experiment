import * as Phaser from 'phaser'
import BaseInput from './BaseInput'
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys
import InputPlugin = Phaser.Input.InputPlugin

export default class KeyboardInput extends BaseInput {
    protected _keys

    get keys() {
        return (
            this._keys ?? (this._keys = this.input.keyboard.createCursorKeys())
        )
    }

    get isDown(): boolean {
        return this.keys.down.isDown
    }

    get isLeft(): boolean {
        return this.keys.left.isDown
    }

    get isRight(): boolean {
        return this.keys.right.isDown
    }

    get isUp(): boolean {
        return this.keys.up.isDown
    }
}
