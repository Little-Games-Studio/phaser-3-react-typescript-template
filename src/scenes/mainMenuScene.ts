import * as Phaser from 'phaser';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'MainMenuScene',
};

export class MainMenuScene extends Phaser.Scene {

    private startButton: any;

    constructor() {
        super(sceneConfig);
    }

    create(): void {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.startButton = this.add.text(screenCenterX, screenCenterY, 'START', { font: '28px Arial' }).setOrigin(0.5);
        this.startButton.setInteractive();
        this.startButton.once('pointerup', () => {
            this.scene.get('GameScene').scene.restart();
            this.scene.setVisible(false);
        });

        this.input.keyboard.once('keydown-ENTER', () => {
            this.scene.get('GameScene').scene.restart();
            this.scene.setVisible(false);
        }, this);

        this.events.on('pause', () => {
            console.log('maineMenuScene, Game paused');
        })
    }
}