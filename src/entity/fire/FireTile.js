/**
 * Creates a FireTile object.
 *
 * @extends rune.display.Sprite
 * 
 * @class
 * @classdesc
 * 
 * FireTile object.
 */
class FireTile extends rune.display.Sprite {
    /**
     * Calls the constructor method of the super class.
     * 
     * @param {number} x The x coordinate of the object.
     * @param {number} y The y coordinate of the object.
     * 
     * @returns {undefined}
     */
    constructor(x, y) {
        super(x, y, 32, 32, "fireTile");
        this.deathSound = null;
    }

    /**
     * Initializes the object.
     * 
     * @returns {undefined}
     */
    init() {
        super.init();

        this.initSounds();
        this.animate();
        this.setHitbox();
    }
    
    /**
     * Sets the hitbox for the object.
     * 
     * @returns {undefined}
     */
    setHitbox() {
        this.hitbox.set(2, 1, 28, 30);
    }

    /**
     * Initializes the sounds for the object.
     * 
     * @returns {undefined}
     */
    initSounds() {
        this.deathSound = this.application.sounds.sound.get("put_out_fire", false);
    }

    /**
     * Animates the fire.
     * 
     * @returns {undefined}
     */
    animate() {
        this.animation.create('burning', [0,1], 4, true);
        this.animation.play('burning');
    }

    /**
     * This method is automatically executed once per "tick". The method is used for 
     * calculations such as application logic.
     *
     * @param {number} step Fixed time step.
     *
     * @returns {undefined}
     */
    update(step) {
        super.update(step);
    }

    /**
     * This method removes fireTile from scenes. The process is performed in order to 
     * avoid memory leaks.
     *
     * @returns {undefined}
     */
    dispose() {
        super.dispose();
    }
}