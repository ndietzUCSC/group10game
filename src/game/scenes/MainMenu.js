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
        sprite.physics.enable(sprite, Phaser.Physics.ARCADE);
        let background = this.add.image(1024, 718, 'background');
        //sets origin point of bkg
        let gameWidth = this.sys.game.config.width;
        let gameHeight = this.sys.game.config.height;
        background.setPosition(gameWidth/2,gameHeight/2);
        this.add.existing(playerSprite);
    }
    
    
//     update() 
//     {
//         const { cursors } = this.cursors;
        
//         playerSprite.setScale(4);
//         playerSprite.setPosition(200,175);
//         const playerBody = create.sprite.body;
//         const prevVelocity = playerBody.velocity.clone();

//         // Stop any previous movement from the last frame
//         playerBody.setVelocity(0);

//         //Horizontal movement
//         switch (true) {
//         case cursors.left.isDown:
//         case cursors.a.isDown:
//         playerBody.setVelocityX(-Velocity.Horizontal);
//         break;

//         case cursors.right.isDown:
//         case cursors.d.isDown:
//         playerBody.setVelocityX(Velocity.Horizontal);
//         break;
//     }

//     // Vertical movemen
//     switch (true) {
//          case cursors.up.isDown:
//        // case cursors.w.isDown:
//        // playerBody.setVelocityY(-Velocity.Vertical);
//        // break;

//        // case cursors.down.isDown:
//        // case cursors.s.isDown:
//        // playerBody.setVelocityY(Velocity.Vertical);
//        // break;
//     }
//    }
}
