import * as Phaser from 'phaser';
import { Player } from './../player/player';

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

    private player: Player;
    private type_of_belonging: string;

    private keyA: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(player: Player, scene: Phaser.Scene, x: number, y: number, frame: number, type_of_belonging: string) {

        super(scene.matter.world, x, y, 'race_car', frame, { label: 'race_car', isSensor: false, vertices: shape });

        this.player = player;
        this.type_of_belonging = type_of_belonging;

        // KEYS
        this.keyA = this.scene.input.keyboard.addKey('A');
        this.keyD = this.scene.input.keyboard.addKey('D');

        this.cursors = this.scene.input.keyboard.createCursorKeys();

        scene.add.existing(this);
    }

    update(time, delta): void {

        this.setVelocity(0, 0);

        // Player 1
        if (this.player.id == 1) {

            if (this.keyA?.isDown) {
                if (this.x > this.width / 2) { // cannot leave screen on the left
                    this.setVelocityX(-1);
                }
            }

            if (this.keyD?.isDown) {  // cannot leave screen on the right
                if (this.x < this.scene.cameras.main.width - this.width / 2) {
                    this.setVelocityX(1);
                }
            }
        }
        
        // Player 2
        if (this.player.id == 2) {

            if (this.cursors.left.isDown) {
                if (this.x > this.width / 2) { // cannot leave screen on the left
                    this.setVelocityX(-1);
                }
            }

            if (this.cursors.right.isDown) {
                if (this.x < this.scene.cameras.main.width - this.width / 2) {  // cannot leave screen on the right
                    this.setVelocityX(1);
                }
            }
        }
    } 
}