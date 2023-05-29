/**
 * Creates a new object.
 *
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 * 
 * Menu button
 */
class MenuBtn extends rune.display.Sprite {
    /**
     * Calls the constructor method of the super class.
     * 
     * @param {string} texture The texture to render.
     * 
     * @returns {undefined}
     */
    constructor(texture) {
        super(0, 0, 122, 30, texture);
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
     * Animates the button.
     * 
     * @returns {undefined}
     */
    animate() {
        this.animation.create("idle", [0], 1, true);
        this.animation.play("idle");
        this.animation.create("selected", [1, 2], 2, true);
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
    
    /**
     * Removes the object from the stage. The process is performed in order to 
     * avoid memory leaks.
     * 
     * @returns {undefined}
     */
    dispose() {
        super.dispose();
    }
}