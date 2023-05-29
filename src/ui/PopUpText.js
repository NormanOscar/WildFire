/**
 * Creates a new object.
 *
 * @extends rune.text.BitmapField
 *
 * @class
 * @classdesc
 * 
 * Pop up text that appears for a few seconds.
 */
class PopUpText extends rune.text.BitmapField {
    /**
     * Calls the constructor method of the super class.
     * 
     * @returns {undefined}
     */
    constructor() {
        super("A new gate has opened", rune.text.BitmapFormat.FONT_MEDIUM);
    }

    /**
     * Initializes the object.
     * 
     * @returns {undefined}
     */
    init() {
        super.init();
        this.width = this.textWidth;
        this.centerX = this.application.screen.centerX;
        this.centerY = this.application.screen.centerY;
        this.visible = false;
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
     * Removes the object from the stage. The process is performed in order to 
     * avoid memory leaks.
     * 
     * @returns {undefined}
     */
    dispose() {
        super.dispose();
    }
}