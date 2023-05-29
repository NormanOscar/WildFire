/**
 * Creates a new object.
 *
 * @extends rune.display.Artboard
 *
 * @class
 * @classdesc
 * 
 * New counter for the score of the game.
 */
class Score extends rune.text.BitmapField {
    /**
     * Calls the constructor method of the super class.
     * 
     * @param {number} score The score of the game.
     * 
     * @returns {undefined}
     */
    constructor(score) {
        super(score, rune.text.BitmapFormat.FONT_MEDIUM);
    }

    /**
     * Initializes the object.
     * 
     * @returns {undefined}
     */
    init() {
        super.init();
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
        this.width = this.textWidth;
        this.x = this.application.screen.width / 2 - this.width / 2;
        this.y = this.application.screen.height - this.height;
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