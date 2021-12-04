import * as Phaser from 'phaser';
import { RaceCar } from '../race_car/race_car';

export class Player extends Phaser.GameObjects.GameObject {

    public id: integer;

    public own_car: RaceCar;
    public opponents_car: RaceCar;

    public speed: integer = 0;
    public speed_timer: integer = 0;
    public max_speed: integer = 180;
    public acceleration_rate: number = 0.5;

    private keyW: Phaser.Input.Keyboard.Key;
    private keyS: Phaser.Input.Keyboard.Key;

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, id: integer) {

        super(scene, 'Player');

        this.id = id;

        // KEYS
        this.keyW = this.scene.input.keyboard.addKey('W');
        this.keyS = this.scene.input.keyboard.addKey('S');

        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }


    update(time, delta): void {

        this.own_car.update(time, delta);
        this.opponents_car.update(time, delta);

        // Player 1
        if (this.id == 1) {

            if (this.keyW?.isDown && this.speed < this.max_speed) {
                this.speed += 1 * this.acceleration_rate;
            }

            if (this.keyW?.isUp && this.speed > 0) {
                this.speed -= 1 * this.acceleration_rate;
            }

            if (this.keyS?.isDown && this.speed > 0) {
                this.speed -= 1 * this.acceleration_rate + 1;
            }
        }

        // Player 2
        if (this.id == 2) {

            if (this.cursors.up.isDown && this.speed < this.max_speed) {
                this.speed += 1 * this.acceleration_rate;
            }

            if (this.cursors.up.isUp && this.speed > 0) {
                this.speed -= 1 * this.acceleration_rate;
            }

            if (this.cursors.down.isDown && this.speed > 0) {
                this.speed -= 1 * this.acceleration_rate + 1;
            }
        }
    }
}