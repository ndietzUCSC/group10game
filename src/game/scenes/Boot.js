import { Scene } from 'phaser';
export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    create ()
    {
         // Set scale and screen alignment
        this.scale.scaleMode = Phaser.Scale.FIT;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scene.start('Preloader');
    }
}
