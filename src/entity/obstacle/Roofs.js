/**
 * Creates a FireTile object.
 *
 * @extends rune.display.Graphic
 * 
 * @param {number} x The x coordinate of the object.
 * @param {number} y The y coordinate of the object.
 * @param {number} id The id of the house.
 *
 * @class
 * @classdesc
 * 
 * Roof of a house.
 */
class Roofs extends rune.display.Graphic {
    constructor(x,y, id) {
        super(x,y,128,96,'house' + id);
        this.playerBehind = false;
        this.enemyBehind = false;
    }

    /**
     * Initializes the object.
     * 
     * @returns {undefined}
     */
    init() {
        super.init();
        this.immovable = true;
        this.setHitbox();
    }
    
    /**
     * Sets the hitbox for the object.
     * 
     * @returns {undefined}
     */
    setHitbox() {
        this.hitbox.set(15,25, 98, 69);
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
        if (this.playerBehind || this.enemyBehind) {
            this.alpha = 0.4;
        } else {
            this.alpha = 1;
        }
    }
}