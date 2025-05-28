import { Physics } from "phaser";

export class playerObj  extends Phaser.Physics.Arcade.Sprite{
    constructor(scene) {
        super(scene, 100,150, "playerSprite")
        scene.physics.add.existing(playerObj); // add this line
        this.scene.add.existing(playerObj);
    }

    create(){
        this.setVelocity(100, 200);
        this.setBounce(1, 1);
        this.setCollideWorldBounds(true);
    }

    
   // scene.add.existing(this); // Add to scene
    //scene.physics.add.existing(this); // Enable physics

    // Access physics body
    //this.body.setCollideWorldBounds(true);
   // this.body.setBounce(0.5);
    // constructor(
    //     frame = 'stickGuy-3.png',
    // ) {
//         super(scene, x, y, texture, frame);
        
//         // Add the sprite to the scene
//         scene.add.existing(this);
        
//         // Enable physics for the sprite
//         scene.physics.world.enable(this);

//     // The image has a bit of whitespace so use setSize and
//     // setOffset to control the size of the player's body
//     this.setSize(32, 42).setOffset(0, 22);

//     // Collide the sprite body with the world boundary
//     this.setCollideWorldBounds(true);

//     // Set the camera to follow the game object
//     //scene.cameras.main.startFollow(this);
//     scene.cameras.main.setZoom(1);

//     // Add cursor keys
//     this.cursors = this.createCursorKeys();

//     // Create sprite animations
//     //this.createAnimations();

//     // Add selector
//     this.selector = scene.physics.add.staticBody(x - 8, y + 32, 16, 16);

};

export default playerObj;
