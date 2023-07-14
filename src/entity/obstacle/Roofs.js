/**
 * Creates a FireTile object.
 *
 * @extends rune.display.Graphic
 * 
 * @class
 * @classdesc
 * 
 * Roof of a house.
 */
class Roofs extends rune.display.Graphic {
    /**
     * Calls the constructor method of the super class.
     * 
     * @param {number} x The x coordinate of the object.
     * @param {number} y The y coordinate of the object.
     * @param {number} id The id of the house.
     * 
     * @returns {undefined}
     */
    constructor(x,y, id, instance) {
        super(x,y,128,96,'house' + id);
        this.m_gameInstance = instance;
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
        this.hitbox.set(15,25, 98, 72);
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
        if (this.hitTestContentOf(this.m_gameInstance.m_players) || this.hitTestContentOf(this.m_gameInstance.m_enemies)) {
            this.alpha = 0.3;
        } else {
            this.alpha = 1;
        }
    }

    /**
     * This method removes roofs when scene changes. The process is performed in order to 
     * avoid memory leaks.
     *
     * @returns {undefined}
     */
    dispose() {
        super.dispose();
    }
}