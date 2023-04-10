import * as Phaser from 'phaser'
import SpriteWithDynamicBody = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
import InputPlugin = Phaser.Input.InputPlugin
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys
import Gamepad = Phaser.Input.Gamepad.Gamepad
import BaseInput from './input/BaseInput'
import KeyboardInput from './input/KeyboardInput'
import Dualshock4 from './input/Dualshock4'

enum Direction {
    Up = 'isUp',
    Right = 'isRight',
    Down = 'isDown',
    Left = 'isLeft',
}

export default class PlayerController {
    protected inputs: BaseInput[] = []

    constructor(
        protected player: SpriteWithDynamicBody,
        protected input: InputPlugin,
    ) {
        this.inputs.push(new KeyboardInput(input))
        this.inputs.push(new Dualshock4(input))
    }

    protected dir(direction: Direction) {
        return this.inputs.find(input => input[direction]())
    }

    left(): boolean {
        return this.dir(Direction.Left)
    }

    right(): boolean {
        return this.dir(Direction.Right)
    }

    up(): boolean {
        return this.dir(Direction.Up)
    }

    down(): boolean {
        return this.dir(Direction.Up)
    }
}
