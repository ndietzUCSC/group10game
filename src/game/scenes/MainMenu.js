import { ScaleModes, Scene } from 'phaser';
//import playerObj from '../objects/playerObj';
export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
       // const playerImage = new Phaser.Physics.Arcade.Sprite(this, 400, 100, );
    }
    
    create ()
    {
        let cursors = this.input.keyboard.createCursorKeys();
        const sprite = this.add.sprite(30, 25, 'playerSprite');
        sprite.physics.enable(sprite, Phaser.Physics.Arcade);
        let background = this.add.image(1024, 718, 'background');
        //sets origin point of bkg
        let gameWidth = this.sys.game.config.width;
        let gameHeight = this.sys.game.config.height;
        background.setPosition(gameWidth/2,gameHeight/2);
        this.add.existing(playerSprite);
    }
    
    
}
