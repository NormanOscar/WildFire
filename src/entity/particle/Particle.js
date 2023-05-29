/**
 * Creates a Particle object.
 *
 * @extends rune.display.Graphic
 *
 * @class
 * @classdesc
 * 
 * Particle object.
 */
class Particle extends rune.particle.Particle {
    /**
     * Calls the constructor method of the super class.
     * 
     * @returns {undefined}
     */
    constructor() {
        super(0, 0, 8, 8, 'particle');
    }

    /**
     * Initializes the object.
     * 
     * @returns {undefined}
     */
    init() {
        super.init();
        this.scaleX = 1;
        this.scaleY = 1;
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
        var cX = this.centerX;
        var cY = this.centerY;

        this.scaleX += 0.02;
        this.scaleY += 0.02;
        this.centerX = cX;
        this.centerY = cY;
    }

    /**
     * Disposes the object. The process is performed in order to 
     * avoid memory leaks.
     * 
     * @returns {undefined}
     */
    dispose() {
        super.dispose();
    }
}