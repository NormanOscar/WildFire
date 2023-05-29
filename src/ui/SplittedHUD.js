/**
 * Creates a new object.
 *
 * @extends rune.display.DisplayObjectContainer
 *
 * @class
 * @classdesc
 * 
 * Splitted hud for when players are too far apart.
 */
class SplittedHUD extends rune.display.DisplayObjectContainer {
    /**
     * Calls the constructor method of the super class.
     * 
     * @param {number} width The width of the HUD.
     * @param {number} height The height of the HUD.
     * @param {number} playerID The player ID.
     * 
     * @returns {undefined}
     */
    constructor(width, height, playerID) {
        super(0, 0, width, height);
        this.playerID = playerID;
    }

    /**
     * Initializes the object.
     * 
     * @returns {undefined}
     */
    init() {
        super.init();

        this.m_initFrame();
        this.m_initPlayerText();
    }

    /**
     * Creates frame.
     * 
     * @returns {undefined}
     */
    m_initFrame() {
        var frame = new rune.display.Graphic(0, 0, this.width, this.height, "player" + this.playerID + "_frame");

        this.addChild(frame);
    }

    /**
     * Creates player text.
     * 
     * @returns {undefined}
     */
    m_initPlayerText() {
        this.m_playerText = new rune.text.BitmapField('Player ' + this.playerID, rune.text.BitmapFormat.FONT_MEDIUM);
        this.addChild(this.m_playerText);
        
        this.m_playerText.width = this.m_playerText.textWidth;

        this.playerID == 1 ? this.m_playerText.x = 5 : this.m_playerText.x = this.width - (this.m_playerText.width + 5);
        this.m_playerText.y = this.height - this.m_playerText.height;
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