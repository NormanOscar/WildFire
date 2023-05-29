/**
 * Creates a new object.
 *
 * @extends rune.display.Sprite
 * 
 * @class
 * @classdesc
 * 
 * Save button on new highsore scene.
 */
class SaveBtn extends rune.display.Sprite {
    /**
     * Calls the constructor method of the super class.
     * 
     * @returns {undefined}
     */
    constructor() {
        super(0, 0, 88, 30, "save_btn");
        this.selected = false;
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
     * Creates two states of the button.
     * 
     * @returns {undefined}
     */
    animate() {
        this.animation.create("idle", [0], 1, true);
        this.animation.create("selected", [1], 2, true);
        this.animation.play("idle");
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
        if (this.selected) {
            this.animation.gotoAndPlay("selected");
        }
        else {
            this.animation.gotoAndPlay("idle");
        }
    }
}