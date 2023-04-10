import * as Phaser from 'phaser'
import BaseInput from './BaseInput'

export default class Dualshock4 extends BaseInput {
    get pad() {
        return this.input.gamepad.pad1
    }

    get isDown(): boolean {
        if (!this.pad) return false
        if (this.pad.down) return true
        if (this.pad.leftStick.y > 0) return true
    }

    get isLeft(): boolean {
        if (!this.pad) return false
        if (this.pad.left) return true
        if (this.pad.leftStick.x < 0) return true
    }

    get isRight(): boolean {
        if (!this.pad) return false
        if (this.pad.right) return true
        if (this.pad.leftStick.x > 0) return true
    }

    get isUp(): boolean {
        if (!this.pad) return false
        if (this.pad.up) return true
        if (this.pad.buttons[0].pressed) return true
    }
}
