import * as Phaser from 'phaser';

// import * as background_img from './../assets/images/background_img.png'
// import * as background_music from './../assets/audio/background_music.mp3'

import { Player } from '../gameObjects/player/player';

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

    public player: Player;

    private keyW: Phaser.Input.Keyboard.Key;
    private keyA: Phaser.Input.Keyboard.Key;
    private keyS: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    private music: any;

    constructor() {
        super(sceneConfig);
    }

    preload(): void {

        // this.load.image('background_img', background_img);
        // this.load.audio('music', [background_music]);

        // KEYS
        this.keyW = this.input.keyboard.addKey('W');
        this.keyA = this.input.keyboard.addKey('A');
        this.keyS = this.input.keyboard.addKey('S');
        this.keyD = this.input.keyboard.addKey('D');

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create(): void {

        // this.music = this.sound.add('music');
        // this.music.loop = true;

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

        this.music.pause();
        this.scene.pause('GameScene');
    }

    update(time, delta): void {

        this.player.update(time, delta);
    }
}