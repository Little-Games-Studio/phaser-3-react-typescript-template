import * as Phaser from 'phaser';

import * as road from './../assets/images/background/road.png'
import * as racing_mp3 from './../assets/audio/racing.mp3'
import * as race_car_svg from './../gameObjects/race_car/race_car.svg'

import { Player } from '../gameObjects/player/player';
import { RaceCar } from '../gameObjects/race_car/race_car';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: true,
    visible: true,
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

    public speed: integer = 0;
    public score: integer = 0;
    public distance_to_goal: integer = 100;
    public collected_stars: integer = 0;

    public road_left: Phaser.GameObjects.TileSprite;
    public road_right: Phaser.GameObjects.TileSprite;

    public player_1: Player;
    public player_2: Player;

    private music: any;

    constructor() {
        super(sceneConfig);
    }

    preload(): void {
        this.load.image('road', road);

        this.load.spritesheet('race_car', race_car_svg, { frameWidth: 60, frameHeight: 100 });
        
        this.load.audio('music', [racing_mp3]); 
    }

    create(): void {

        this.road_left = this.add.tileSprite(0, 0, 780, 768, 'road').setOrigin(0);
        this.road_right = this.add.tileSprite(780, 0, 780, 768, 'road').setOrigin(0)
        this.road_right.flipX = true;

        this.player_1 = new Player(this, 1);
        this.player_2 = new Player(this, 2);

        this.player_1.own_car = new RaceCar(this.player_1, this, this.cameras.main.centerX - 500, this.cameras.main.height - 250, 0, "own");

        this.player_1.opponents_car = new RaceCar(this.player_2, this, this.cameras.main.centerX - 230, this.cameras.main.height - 250, 1, "opponents");

        this.player_2.own_car = new RaceCar(this.player_2, this, this.cameras.main.centerX + 500, this.cameras.main.height - 250, 1, "own");

        this.player_2.opponents_car = new RaceCar(this.player_1, this, this.cameras.main.centerX + 230, this.cameras.main.height - 250, 0, "opponents");

        this.music = this.sound.add('music');
        this.music.loop = true;


        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause('GameScene');
            this.scene.launch('MainMenuScene', { is_paused: true });
        }, this);

        this.events.on('pause', () => {
            this.music.pause();
            console.log('Game paused');
        })

        this.events.on('resume', () => {
            this.music.resume();
            console.log('Game resumed');
        })

        this.score = 0;

        this.music.pause();
        this.scene.pause('GameScene');
    }

    update(time, delta): void {

        this.player_1.update(time, delta);
        this.player_2.update(time, delta);

        this.road_left.tilePositionY -= this.player_1.speed / 10;
        this.road_right.tilePositionY -= this.player_2.speed / 10;
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