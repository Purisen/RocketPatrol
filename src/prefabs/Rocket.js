// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, keyL, keyR, keyFire) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        // track rocket firing status
        this.isFiring = false;
        // pixels per frame;
        this.moveSpeed = 2;
        // rocket sfx
        //this.sfxRocket = scene.sound.add('sfx_rocket'); 

        // modded sfx
        this.sfxGun = scene.sound.add('sfx_gunshot'); 
        this.keyLft = keyL;
        this.keyRht = keyR;
        this.keyFi = keyFire;
    }

    update() {
        // left/right movement  (NOW DURING FIRE)
        //if(!this.isFiring) {
            if (this.keyLft.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (this.keyRht.isDown && this.x <= game.config.width - 
            borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        // }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(this.keyFi) && !this.isFiring) {
            this.isFiring = true;
            this.sfxGun.play(); // play sfx
        }
        // if fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}