import * as Phaser from 'phaser';
import { RaceCar } from '../race_car/race_car';

export class Player extends Phaser.GameObjects.GameObject {

    public id: integer;

    public own_car: RaceCar;
    public opponents_car: RaceCar;

    public speed: integer = 0;
    public speed_timer: integer = 0;
    public max_speed: integer = 180;

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

        if (id == 1) {
            this.own_car = new RaceCar(this, scene, scene.cameras.main.centerX - 500, scene.cameras.main.height - 250, 0, "own");
            this.opponents_car = new RaceCar(this, scene, scene.cameras.main.centerX - 230, scene.cameras.main.height - 250, 1, "opponents");
        }
        else {
            this.opponents_car = new RaceCar(this, scene, scene.cameras.main.centerX + 230, scene.cameras.main.height - 250, 0, "opponents");
            this.own_car = new RaceCar(this, scene, scene.cameras.main.centerX + 500, scene.cameras.main.height - 250, 1, "own");
        }
    }


    update(): void {

        // Player 1
        if (this.id == 1) {

            if (this.keyW?.isDown && this.speed < this.max_speed) {
                this.speed++;
            }

            if (this.keyS?.isDown && this.speed > 0) {
                this.speed--;
            }
        }

        // Player 2
        if (this.id == 2) {

            if (this.cursors.up.isDown && this.speed < this.max_speed) {
                this.speed++;
            }

            if (this.cursors.down.isDown && this.speed > 0) {
                this.speed--;
            }
        }
    }
}