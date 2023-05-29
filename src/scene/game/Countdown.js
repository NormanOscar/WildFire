/**
 * Creates a new object.
 *
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 * 
 * Countdown object, counts down before game starts.
 */
class Countdown extends rune.display.Sprite {
    /**
     * Calls the constructor method of the super class.
     * 
     * @returns {undefined}
     */
    constructor() {
        super(0, 0, 140, 32, "countdown");
    }

    /**
     * Initializes the object.
     * 
     * @returns {undefined}
     */
    init() {
        super.init();

        this.centerX = this.application.screen.centerX;
        this.centerY = this.application.screen.centerY;
        this.animate();
    }

    /**
     * Creates the animation for the object.
     * 
     * @returns {undefined}
     */
    animate() {
        this.animation.create('countdown', [0, 1, 2, 3, 4], 1, false);
        this.animation.play('countdown');
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
     * This method removes the countdown when it's over. The process is performed in order to 
     * avoid memory leaks.
     *
     * @returns {undefined}
     */
    dispose() {
        super.dispose();
    }
}