import { Scene } from 'phaser';
import Player from '../objects/playerObj';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    
    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');
    }
    
    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
        // Instantiate with required arguments, e.g., scene, x, y, texture
         
        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('Game');
    }
}
