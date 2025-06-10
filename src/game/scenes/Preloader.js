import { Scene } from 'phaser';
import Player from '../objects/playerObj';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

  preload() {
    // --- Load all needed assets here ---
    this.load.spritesheet('walking', 'assets/img/walking.png', {
      frameWidth: 8,
      frameHeight: 15
    });

    this.load.image('background', 'assets/img/background.png');
    this.load.image('playerSprite', 'assets/img/player.png');
    //this.load.image('itemKey', 'assets/img/item_key.png');
    //this.load.image('furnitureFridge', 'assets/img/fridge.png');
    // Add more asset loads as needed...

    // Example: Loading bar (optional)
    /*
    let progressBar = this.add.graphics();
    this.load.on('progress', value => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(0, this.cameras.main.centerY, 800 * value, 20);
    });
    */
  }

  create() {
    // Go to the main game scene
    this.scene.start('Game');
  }
}

