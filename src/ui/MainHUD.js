/**
 * Creates a new object.
 *
 * @extends rune.display.DisplayObjectContainer
 *
 * @class
 * @classdesc
 * 
 * HUD for the main camera.
 */
class MainHUD extends rune.display.DisplayObjectContainer {
    /**
     * Calls the constructor method of the super class.
     * 
     * @param {object} instance The game instance.
     * @param {number} width The width of the HUD.
     * @param {number} height The height of the HUD.
     * 
     * @returns {undefined}
     */
    constructor(instance, width, height) {
        super(0, 0, width, height);
        this.m_scoreCounter = null;
        this.m_miniMap = null;
        this.m_gameInstance = instance;
    }

    /**
     * Initializes the object.
     * 
     * @returns {undefined}
     */
    init() {
        super.init();

        this.m_initMiniMap();
        this.m_initFrame();
        this.m_initScore();

    }

    /**
     * Creates minimap.
     * 
     * @returns {undefined}
     */
    m_initMiniMap() {
        if (this.m_miniMap == null) {
            this.m_miniMap = new Minimap(this.m_gameInstance, this.m_gameInstance.cameras.getCameraAt(0).width - 96, 3, 'main');
            this.addChild(this.m_miniMap);
        }
    }

    /**
     * Creates score counter.
     * 
     * @returns {undefined}
     */
    m_initScore() {
        if (this.m_scoreCounter == null) {
            this.m_scoreCounter = new Score('Score: ' + this.m_gameInstance.m_totalScore.toString());
            this.addChild(this.m_scoreCounter);
        }
    }

    /**
     * Creates frame.
     * 
     * @returns {undefined}
     */
    m_initFrame() {
        var frame = new rune.display.Graphic(0, 0, this.width, this.height, "main_frame");
        this.addChild(frame);
    }

    /**
     * Updates the score counter.
     * 
     * @returns {undefined}
     */
    m_updateScore() {
        this.m_scoreCounter.text = 'Score: ' + this.m_gameInstance.m_totalScore.toString();
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
        this.m_updateScore();
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