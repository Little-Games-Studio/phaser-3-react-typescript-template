import * as Phaser from 'phaser';

import * as clouds_big from './../assets/images/background/clouds_big.png'
import * as clouds_small from './../assets/images/background/clouds_small.png'

import * as asteroid_png from './../assets/images/asteroid.png'
import * as racing_mp3 from './../assets/audio/racing.mp3'

import * as race_car_svg from './../gameObjects/race_car/race_car.svg'
import { RaceCar } from '../gameObjects/race_car/race_car'

import * as star_png from './../assets/images/star.png'
import { Star } from '../gameObjects/star/star'
import { Asteroid } from '../gameObjects/asteroid/asteroid';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'GameScene',
    physics: {
        arcade: {
            debug: true,
        },
        matter: {
            debug: true,
            gravity: false
        }
    },
};

export class GameScene extends Phaser.Scene {

    public speed: integer = 100;
    public score: integer = 0;
    public distance_to_goal: integer = 100;
    public collected_stars: integer = 0;

    private clouds_small: Phaser.GameObjects.TileSprite;
    private clouds_big: Phaser.GameObjects.TileSprite;

    private player_1: RaceCar;
    private player_2: RaceCar;

    private music: any;

    private speed_timer: integer;
    private spawn_timer: integer;

    private stars: Array<any>;
    private asteroids: Array<any>;

    constructor() {
        super(sceneConfig);
    }

    preload(): void {
        this.load.image('clouds_big', clouds_big);
        this.load.image('clouds_small', clouds_small);
        this.load.image('star', star_png);
        this.load.image('asteroid', asteroid_png);

        this.load.spritesheet('race_car', race_car_svg, { frameWidth: 60, frameHeight: 100 });
        
        this.load.audio('music', [racing_mp3]); 
    }

    create(): void {

        this.clouds_small = this.add.tileSprite(300, 400, 600, 1600, 'clouds_small');
        this.clouds_big = this.add.tileSprite(300, 400, 600, 1600, 'clouds_big');

        this.clouds_small.alpha = 0.3;
        this.clouds_big.alpha = 0.6;

        this.matter.world.on('collisionstart', event => {
            for (var i = 0; i < event.pairs.length; i++) {

                var bodyA = this.getRootBody(event.pairs[i].bodyA);
                var bodyB = this.getRootBody(event.pairs[i].bodyB);

                if ((bodyA.label === 'rocket' && bodyB.label === 'star')) {
                    this.collectStar(bodyB.gameObject);
                }

                if ((bodyB.label === 'rocket' && bodyA.label === 'star')) {
                    this.collectStar(bodyA.gameObject);
                }

                if ((bodyA.label === 'rocket' && bodyB.label === 'asteroid')) {
                    this.hitAsteroid();
                }

                if ((bodyB.label === 'rocket' && bodyA.label === 'asteroid')) {
                    this.hitAsteroid();
                }
            }
        });

        this.player_1 = new RaceCar(this, this.cameras.main.centerX - 100, this.cameras.main.height - 100, 1);
        this.player_2 = new RaceCar(this, this.cameras.main.centerX + 100, this.cameras.main.height - 100, 2);
        
        this.music = this.sound.add('music');
        this.music.loop = true;

        //this.music.play();

        this.input.keyboard.on('keydown-ESC', () => {
            this.pause();
        }, this);

        this.input.keyboard.on('keydown-SPACE', () => {
            this.pause();
        }, this);

        this.events.on('resume', () => {
            this.music.resume();
            this.scene.stop('PauseScene');
            console.log('Game resumed');
        })

        this.stars = [];
        this.asteroids = [];

        this.score = 0;
        this.collected_stars = 0;
        this.speed = 100;
        this.speed_timer = 0;
        this.spawn_timer = 0;
    }

    update(time, delta): void {

        /* this.speed_timer += delta; */

        //if (this.speed_timer > 1000 /*ms*/) {
        //    this.score += 1;
        //    this.speed += 1;
        //    this.speed_timer -= 1000;
        //}

        this.clouds_small.tilePositionY -= 0.15 * delta * (this.speed / 100);
        this.clouds_big.tilePositionY -= 0.2 * delta * (this.speed / 100);

        this.player_1.update();
        this.player_2.update();

        this.spawn_timer += delta * (this.speed / 100);

        if (this.spawn_timer > 1000) {

            var star = new Star(this);
            this.stars.push(star);

            var asteroid = new Asteroid(this);
            this.asteroids.push(asteroid);

            this.spawn_timer -= 1000;
        }

        this.stars.forEach((child: any) => {
            child.y += 0.3 * delta * (this.speed / 100);
        });

        this.stars.forEach((star: Phaser.GameObjects.Sprite) => {
            if (star.y > 900) {
                this.destroyStar(star);
            }
        });
 
        this.asteroids.forEach((child: any) => {
            child.y += 0.25 * delta * (this.speed / 100);
        });

        this.asteroids.forEach((child: Phaser.GameObjects.Sprite) => {
            if (child.y > 900) {
                this.asteroids.splice(this.asteroids.indexOf(child), 1);
                this.matter.world.remove(child);
                child.destroy();
            }
        });
    }

    pause() {
        this.music.pause();
        this.scene.pause('GameScene');
        this.scene.launch('PauseScene');
    }

    collectStar(star): void {
        this.collected_stars += 1;
        this.score += 10;
        this.destroyStar(star);
    }

    hitAsteroid(): void {
        this.events.emit('hitAsteroid');
        this.music.pause();
        this.scene.pause('GameScene');
        this.scene.launch('GameOverScene');
    }

    destroyStar(star) {
        this.stars.splice(this.stars.indexOf(star), 1);
        this.matter.world.remove(star);
        star.destroy();
    }

    getRootBody(body) {
        if (body.parent === body) {
            return body;
        }
        while (body.parent !== body) {
            body = body.parent;
        }
        return body;
    }
}