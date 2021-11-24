import * as Phaser from 'phaser';
import { GameScene } from './gameScene';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: true,
    visible: true,
    key: 'HUD',
};

export class HUDScene extends Phaser.Scene {

    private score_text: any;
    private collected_stars_text: any;
    private speed_text: any;
    private myGame: GameScene;

    constructor() {
        super(sceneConfig);
    }

    create() {

        //  Grab a reference to the Game Scene
        this.myGame = this.scene.get('GameScene') as GameScene;

        // Player 1
        this.score_text = this.add.text(10, 10, 'Player 1', { font: '28px Arial' });
        this.score_text = this.add.text(10, 50, 'Score: 0', { font: '18px Arial' });
        this.speed_text = this.add.text(10, 80, 'Speed: 0 km/h', { font: '18px Arial' });

        // Player 2
        this.score_text = this.add.text(this.cameras.main.width - 130, 10, 'Player 2', { font: '28px Arial' });
        this.score_text = this.add.text(this.cameras.main.width - 130, 50, 'Score: 0', { font: '18px Arial' });
        this.speed_text = this.add.text(this.cameras.main.width - 130, 80, 'Speed: 0 km/h', { font: '18px Arial' });
    }

    update(): void {
        this.score_text.setText('Score: ' + this.myGame.score);
        this.speed_text.setText('Speed: ' + this.myGame.speed + ' km/h');
    }
}