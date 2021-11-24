import * as Phaser from 'phaser';

const shape: Phaser.Types.Math.Vector2Like[] = [
    { x: 25, y: 0 }, // spitze
    { x: 37, y: 20 }, // rechts oben
    { x: 50, y: 50 }, // rechts mitte
    { x: 45, y: 75 },
    { x: 35, y: 87 },
    { x: 45, y: 95 },
    { x: 50, y: 103 }, // unten rechts
    { x: 25, y: 110 }, // unten mitte
    { x: 0, y: 103 }, // unten links
    { x: 5, y: 95 },
    { x: 15, y: 87 },
    { x: 5, y: 75 },
    { x: 0, y: 50 },
    { x: 15, y: 20 } // links oben
];

export class RaceCar extends Phaser.Physics.Matter.Sprite {

    private player: integer;

    private keyW: Phaser.Input.Keyboard.Key;
    private keyA: Phaser.Input.Keyboard.Key;
    private keyS: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, x: number, y: number, player: number) {

        super(scene.matter.world, x, y, 'race_car', player - 1, { label: 'race_car', isSensor: false, vertices: shape });

        this.player = player;

        scene.add.existing(this);

        // KEYS
        this.keyW = this.scene.input.keyboard.addKey('W');
        this.keyA = this.scene.input.keyboard.addKey('A');
        this.keyS = this.scene.input.keyboard.addKey('S');
        this.keyD = this.scene.input.keyboard.addKey('D');

        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update(): void {

        this.setVelocity(0, 0);

        // Player 1
        if (this.player == 1) {

            if (this.keyW?.isDown) {
                if (this.y > this.height / 2) { // rocket cannot fly lower than the bottom of the screen
                    this.setVelocityY(-1);
                }
            }

            if (this.keyA?.isDown) {
                if (this.x > this.width / 2) { // rocket cannot leave screen on the left
                    this.setVelocityX(-1);
                }
            }

            if (this.keyS?.isDown) {
                if (this.y < this.scene.cameras.main.height - this.height / 2) { // rocket cannot fly higher than the top of the screen
                    this.setVelocityY(1);
                }
            }

            if (this.keyD?.isDown) {
                if (this.x < this.scene.cameras.main.width - this.width / 2) {  // rocket cannot leave screen on the right
                    this.setVelocityX(1);
                }
            }
        }
        

        // Player 2
        if (this.player == 2) {

            if (this.cursors.up.isDown) {

                if (this.y > this.height / 2) { // rocket cannot fly lower than the bottom of the screen
                    this.setVelocityY(-1);
                }
            }

            if (this.cursors.left.isDown) {
                if (this.x > this.width / 2) { // rocket cannot leave screen on the left
                    this.setVelocityX(-1);
                }
            }

            if (this.cursors.down.isDown) {
                if (this.y < this.scene.cameras.main.height - this.height / 2) { // rocket cannot fly higher than the top of the screen
                    this.setVelocityY(1);
                }
            }

            if (this.cursors.right.isDown) {
                if (this.x < this.scene.cameras.main.width - this.width / 2) {  // rocket cannot leave screen on the right
                    this.setVelocityX(1);
                }
            }
        }
    }
}