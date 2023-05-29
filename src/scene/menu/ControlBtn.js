/**
 * Creates a new object.
 *
 * @extends rune.display.Sprite
 * 
 * @class
 * @classdesc
 * 
 * Sprite that shows a control button.
 */
class ControlBtn extends rune.display.Sprite {
    /**
     * Calls the constructor method of the super class.
     * 
     * @param {number} x The x position of the sprite.
     * @param {number} y The y position of the sprite.
     * @param {number} width The width of the sprite.
     * @param {number} height The height of the sprite.
     * @param {string} texture The texture of the sprite.
     * @param {Array} animationFrames The frames of the animation.
     * @param {number} animationFrameRate The frame rate of the animation.
     * 
     * @returns {undefined}
     */
    constructor(x, y, width, height, texture, animationFrames, animationFrameRate) {
        super(x, y, width, height, texture);
        
        this.animationFrames = animationFrames;
        this.animationFrameRate = animationFrameRate;
    }

    /**
     * Initializes the object.
     * 
     * @returns {undefined}
     */
    init() {
        super.init();
        this.animate();
    }

    /**
     * Animates the sprite.
     * 
     * @returns {undefined}
     */
    animate() {
        this.animation.create("idle", this.animationFrames, this.animationFrameRate, true);
        this.animation.play("idle");
    }
}