/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
 class HowToPlay extends rune.scene.Scene {

    /**
     * Calls the constructor method of the super class.
     */
    constructor() {
        super();

        this.m_menu = null;
        this.m_sound = null;
    }

    /**
     * This method is automatically executed once after the scene is instantiated. 
     * The method is used to create objects to be used within the scene.
     *
     * @returns {undefined}
     */
    init() {
        super.init();

        this.m_initBackground();
        this.m_initBackText();

        this.m_initControlsPage();
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
        this.m_updateInput();
    }

    m_initBackground() {
        var m_background = new rune.display.Sprite(0, 0, 400, 225, "how_to_play_background");
        this.stage.addChild(m_background);
    }

    m_updateInput() {        
        if (this.keyboard.justPressed("SPACE") || this.gamepads.justPressed(1)) {
            this.application.scenes.load([new Menu()]);
        }
    }

    m_initControlsPage() {
        this.m_singlePlayerConrols();
        this.m_multiPlayerConrols();
    }

    m_singlePlayerConrols() {
        this.m_initModeTitle("Single Player", this.application.width / 4, 45);
        
        this.createBtn(this.application.width / 4 - 70, 75, 42, 42, "moveStick", [0, 1, 0 , 2, 0, 3, 0, 4], 4);
        this.createText(this.application.width / 4, 75, "MOVE");
        this.createCharacterAnimation(this.application.width / 4 + 50, 75, 32, 32, "player0", [20,21,22,23], 8);

        this.createBtn(this.application.width / 4 - 70, 110, 32, 32, "shootBtn", [0, 1], 2);
        this.createText(this.application.width / 4, 110, "BULLET");
        this.createCharacterAnimation(this.application.width / 4 + 55, 110, 52, 27, "shoot", [0, 0, 0, 0, 1, 2, 3, 4], 8);

        this.createBtn(this.application.width / 4 - 70, 145, 32, 32, "shootSecondBtn", [0, 1], 2);
        this.createText(this.application.width / 4, 145, "WATER");
        this.createCharacterAnimation(this.application.width / 4 + 55, 145, 52, 27, "shootSecond", [0, 0, 0, 0, 1, 2, 3, 4], 8);
    }

    m_multiPlayerConrols() {
        this.m_initModeTitle("Co-Op", this.application.width / 4 * 3, 45);
        
        this.createBtn(this.application.width / 4 * 3 - 70, 75, 42, 42, "moveStick", [0, 1, 0 , 2, 0, 3, 0, 4], 4);
        this.createText(this.application.width / 4 * 3, 75, "MOVE");
        this.createCharacterAnimation(this.application.width / 4 * 3 + 50, 75, 32, 32, "player1", [20,21,22,23], 8);

        this.createBtn(this.application.width / 4 * 3 - 70, 110, 32, 32, "shootBtn", [0, 1], 2);
        this.createText(this.application.width / 4 * 3, 110, "SHOOT");
        this.createCharacterAnimation(this.application.width / 4 * 3 + 55, 110, 52, 27, "shoot", [0, 0, 0, 0, 1, 2, 3, 4], 8);

        this.createBtn(this.application.width / 4 * 3 - 70, 145, 32, 32, "shootSecondBtn", [0, 1], 2);
        this.createText(this.application.width / 4 * 3, 145, "SHOOT SECOND");
        this.createCharacterAnimation(this.application.width / 4 * 3 + 55, 145, 52, 27, "shootSecond", [0, 0, 0, 0, 1, 2, 3, 4], 8);

        this.createBtn(this.application.width / 4 * 3 - 70, 180, 32, 32, "reviveBtn", [0, 1], 2);
        this.createText(this.application.width / 4 * 3, 180, "REVIVE");
    }

    createBtn(x, y, width, height, texture, animationFrames, animationFrameRate) {
        var m_button = new ControlBtn(0, 0, width, height, texture, animationFrames, animationFrameRate);
        m_button.centerX = x;
        m_button.centerY = y;
        this.stage.addChild(m_button);
    }

    createText(x, y, text) {
        var m_text = new rune.text.BitmapField(text, rune.text.BitmapFormat.FONT_MEDIUM);
        m_text.width = m_text.textWidth;
        m_text.centerX = x;
        m_text.centerY = y;
        this.stage.addChild(m_text);
    }

    createCharacterAnimation(x, y, width, height, texture, animationFrames, animationFrameRate) {
        var m_character = new rune.display.Sprite(x, 0, width, height, texture);
        m_character.centerY = y;
        m_character.animation.create('move', animationFrames, animationFrameRate, true);
        m_character.animation.play('move');
        this.stage.addChild(m_character);
    }

    m_verticalLine() {
        var m_verticalLine = new rune.display.Graphic(this.cameras.getCameraAt(0).width / 2 - 0.5, 55, 1, 100, "verticalLine");
        this.stage.addChild(m_verticalLine);
    }


    m_initModeTitle(text, x, y) {
        var m_modeTitle = new rune.text.BitmapField(text, rune.text.BitmapFormat.FONT_MEDIUM);
        m_modeTitle.width = m_modeTitle.textWidth;
        m_modeTitle.centerX = x;
        m_modeTitle.y = y;
        this.stage.addChild(m_modeTitle);
    }

    m_initBackText() {
        this.backText = new rune.text.BitmapField('Press A to go back', rune.text.BitmapFormat.FONT_MEDIUM);
        this.backText.width = this.backText.textWidth;
        this.backText.x = this.cameras.getCameraAt(0).centerX - this.backText.width / 2;
        this.backText.y = this.cameras.getCameraAt(0).height - 20;
        this.stage.addChild(this.backText);
    }

    /**
     * This method is automatically called once just before the scene ends. Use 
     * the method to reset references and remove objects that no longer need to 
     * exist when the scene is destroyed. The process is performed in order to 
     * avoid memory leaks.
     *
     * @returns {undefined}
     */
    dispose() {
        super.dispose();
    }
};