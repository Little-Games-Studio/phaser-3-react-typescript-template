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

    constructor(player: Player, scene: Phaser.Scene, x: number, y: number, frame: number, type_of_belonging: string) {

        super(scene.matter.world, x, y, 'race_car', frame, { label: 'race_car', isSensor: false, vertices: shape });

        this.player = player;
        this.type_of_belonging = type_of_belonging;

        scene.add.existing(this);
    }
/*
    update(time, delta, gameSpeed): void {

        this.setVelocity(0, 0);

        //this.y += delta * (this.speed / 100);

        this.speed_timer += delta * 30;

        if (this.keyW?.isDown) {
            
            if (this.player.id == 1 && this.type_of_belonging === "own") {
                if (this.player.speed_timer > 1000 && this.player.speed > 0) {
                    this.player.speed++;
                    this.player.speed_timer -= 1000;
                }
            
                /* if (this.type_of_belonging === "own") {
                    this.setVelocityY(-1);
                } */
/*             }

            if (this.player.id == 2 && this.type_of_belonging === "own") {
                this.setVelocityY(1);
            }
        } */

/*         if (this.keyS?.isDown) {

            if (this.player.id == 1) {
                if (this.speed_timer > 1000 && this.speed > 0) {
                    this.speed--;
                    this.speed_timer -= 1000;
                }

                if (this.type_of_belonging === "own") {
                    this.setVelocityY(1);
                }
            }

            if (this.player.id == 2 && this.type_of_belonging === "own") {
                this.setVelocityY(-1);
            }
        } */

        // Player 1
/*         if (this.player.id == 1) { */

            

/*             if (this.keyW?.isUp) {
                /* if (this.y > this.height / 2) { */
                /* if (this.speed_timer > 1000 && this.speed > 0) {
                    this.speed = gameSpeed - 1;
                    this.speed_timer -= 1000;
                } */
                //this.setVelocityY(-1);
                /* } */
            /*} */

            
            
/*             if (this.keyA?.isDown) {
                if (this.x > this.width / 2) {
                    this.setVelocityX(-1);
                }
            }

            if (this.keyD?.isDown) {
                if (this.x < this.scene.cameras.main.width - this.width / 2) {
                    this.setVelocityX(1);
                }
            }
        } */
        

/*         // Player 2
        if (this.player.id == 2) {

            if (this.cursors.up.isDown) {

                //if (this.y > this.height / 2) { // rocket cannot fly lower than the bottom of the screen
                    if (this.speed_timer > 1000 && this.speed < this.max_speed) {
                        this.speed = gameSpeed + 1;
                        this.speed_timer -= 1000;
                    }
                //}
            }

            if (this.cursors.up.isUp) {

                //if (this.y > this.height / 2) { // rocket cannot fly lower than the bottom of the screen
                if (this.speed_timer > 1000 && this.speed > 0) {
                    this.speed = gameSpeed - 1;
                    this.speed_timer -= 1000;
                }
                //}
            } */

            /* if (this.cursors.down.isDown) {
    if (this.y < this.scene.cameras.main.height - this.height / 2) { // rocket cannot fly higher than the top of the screen
        this.setVelocityY(1);
    }
} */

/*             if (this.cursors.left.isDown) {
                if (this.x > this.width / 2) { // rocket cannot leave screen on the left
                    this.setVelocityX(-1);
                }
            }

            if (this.cursors.right.isDown) {
                if (this.x < this.scene.cameras.main.width - this.width / 2) {  // rocket cannot leave screen on the right
                    this.setVelocityX(1);
                }
            }
        }
    } */
}