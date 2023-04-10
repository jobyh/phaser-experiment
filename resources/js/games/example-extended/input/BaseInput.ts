import InputPlugin = Phaser.Input.InputPlugin

export default abstract class BaseInput {
    constructor(protected input: InputPlugin) {}

    abstract get isUp(): boolean
    abstract get isRight(): boolean
    abstract get isDown(): boolean
    abstract get isLeft(): boolean
}
