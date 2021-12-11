import * as Phaser from 'phaser';
import { RaceCar } from '../race_car/race_car';

export class Player extends Phaser.GameObjects.GameObject {

    public id: integer;

    public own_car: RaceCar;
    public opponents_car: RaceCar;

    public speed: integer = 0;
    public relative_speed: integer = 0;
    public speed_timer: integer = 0;
    public min_speed: integer = -40;
    public max_speed: integer = 180;
    public acceleration_rate: number = 0.2;

    public is_moving_left: boolean = false;
    public is_moving_right: boolean = false;

    private keyW: Phaser.Input.Keyboard.Key;
    private keyA: Phaser.Input.Keyboard.Key;
    private keyS: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;
    
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, id: integer) {

        super(scene, 'Player');

        this.id = id;

        // KEYS
        this.keyW = this.scene.input.keyboard.addKey('W');
        this.keyA = this.scene.input.keyboard.addKey('A');
        this.keyS = this.scene.input.keyboard.addKey('S');
        this.keyD = this.scene.input.keyboard.addKey('D');

        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }


    update(time, delta): void {

        // Player 1
        if (this.id == 1) {

            if (this.keyW?.isDown && this.speed < this.max_speed) {
                this.speed += 1 * this.acceleration_rate;
            }

            if (this.keyW?.isUp && this.speed > 0) {
                this.speed -= 1 * this.acceleration_rate;
            }

            if (this.keyS?.isDown && this.speed > this.min_speed) {
                this.speed -= 1 * this.acceleration_rate;
            }

            if (this.keyS?.isUp && this.speed < 0) {
                this.speed += 1 * this.acceleration_rate;
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

            if (this.cursors.down.isDown && this.speed > this.min_speed) {
                this.speed -= 1 * this.acceleration_rate;
            }

            if (this.cursors.down.isUp && this.speed < 0) {
                this.speed += 1 * this.acceleration_rate;
            }
        }

        this.own_car.update(time, delta);
        this.opponents_car.update(time, delta);
    }
}