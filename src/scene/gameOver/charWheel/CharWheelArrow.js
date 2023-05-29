/**
 * Creates a new object.
 *
 * @extends rune.display.Sprite
 * 
 * @class
 * @classdesc
 * 
 * Character wheel arrow.
 */
class CharWheelArrow extends rune.display.Sprite {
    /**
     * Calls the constructor method of the super class.
     * 
     * @param {number} x The x coordinate of the object.
     * @param {number} y The y coordinate of the object.
     * @param {boolean} isFlipped If the arrow is pointing up or down.
     */
    constructor(x, y, isFlipped) {
        super(0, 0, 10, 6, 'charwheel_arrow');
        this.initX = x;
        this.initY = y;
        this.isFlipped = isFlipped;
    }

    /**
     * Initializes the object.
     * 
     * @returns {undefined}
     */
    init() {
        super.init();

        this.flippedY = this.isFlipped;
        this.centerX = this.initX;
        this.centerY = this.initY;
    }
}