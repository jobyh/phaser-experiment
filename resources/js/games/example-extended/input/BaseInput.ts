import InputPlugin = Phaser.Input.InputPlugin

export default abstract class BaseInput {
    constructor(protected input: InputPlugin) {}

    abstract isUp(): boolean
    abstract isRight(): boolean
    abstract isDown(): boolean
    abstract isLeft(): boolean
}
