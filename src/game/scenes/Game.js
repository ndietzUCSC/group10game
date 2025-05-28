import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }
    preload()
    {
        this.load.spritesheet('walking', 'assets/img/walking.png', {
        frameWidth: 8,    // Width of each frame
        frameHeight: 15,   // Height of each frame
        endFrame: -1       // -1 means "use all available frames"
    });
    }
    
    create ()
    {
        let gameWidth = this.sys.game.config.width;
        let gameHeight = this.sys.game.config.height;
        this.cameras.main.setBackgroundColor(0x00ff00);
        let cursors = this.input.keyboard.createCursorKeys();
        let background = this.add.image(1024, 718, 'background');
       
        //sets origin point of bkg
        background.setPosition(gameWidth/2,gameHeight/2);
        Game.player = this.physics.add.sprite(300, 250, 'playerSprite');
        Game.player.setScale(6);
        //const battery = this.add.sprite(350,400, 'batterySprite');
        Game.player.setCollideWorldBounds(true);
        
        this.anims.create({
        key: 'walk',       // Name for this animation
        frames: this.anims.generateFrameNumbers('walking'), // All frames
        frameRate: 12,     // Adjust speed as needed
        repeat: -1        // -1 means loop indefinitely
        });
    

    }
    

    update() 
    {   
        const player = Game.player;
        const cursors = this.input.keyboard.createCursorKeys();
    
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.setFlipX(true);
        if(!player.anims.isPlaying){
        player.play('walk');  }
      }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.setFlipX(false);
        if(!player.anims.isPlaying){
        player.play('walk');  }
    }
    else if (cursors.up.isDown) {
        player.setVelocityY(-160);
        if(!player.anims.isPlaying){
        player.play('walk');  }  
    }
    else if(cursors.down.isDown){
        player.setVelocityY(160);
        if(!player.anims.isPlaying){
        player.play('walk');  } 
    }
    else{
        player.setVelocity(0);
        player.anims.stop();
        player.setFrame(2); 
       // player.sprite.
    }
        //const prevVelocity = player.velocity.clone();

        // Stop any previous movement from the last frame
        // playerBody.setVelocity(0);

        //Horizontal movement
        // switch (true) {
        // case cursors.left.isDown:
        // case cursors.a.isDown:
        // playerBody.setVelocityX(-Velocity.Horizontal);
        // break;

        // case cursors.right.isDown:
        // case cursors.d.isDown:
        // playerBody.setVelocityX(Velocity.Horizontal);
        // break;
    }

    // Vertical movemen
//     switch (true) {
//         case cursors.up.isDown: 
//         case cursors.w.isDown:
//         playerBody.setVelocityY(-Velocity.Vertical);
//        break;

//        case cursors.down.isDown:
//        case cursors.s.isDown:
//        playerBody.setVelocityY(Velocity.Vertical);
//        break;
//     }
//    }
}


