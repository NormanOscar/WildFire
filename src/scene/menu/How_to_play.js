//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

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
 class How_to_play extends rune.scene.Scene {

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
        this.m_initTitle();
        this.m_initMenu();
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
        var m_background = new rune.display.Sprite(0, 0, 400, 225, "menu_background");
        this.stage.addChild(m_background);
    }

    m_initTitle() {
        var m_title = new rune.text.BitmapField("How to play");
        m_title.hitbox.debug = true;
        m_title.x = ((this.cameras.getCameraAt(0).width / 2) - (m_title.width / 2));
        m_title.y = 40;
        this.stage.addChild(m_title);
    }

    m_updateInput() {        
        if (this.keyboard.justPressed("SPACE") || this.gamepads.justPressed(1)) {
            this.m_menu.select();
        }
    }

    m_initMenu() {
        this.m_menu = new rune.ui.VTMenu();
        this.m_menu.onSelect(this.m_onMenuSelect, this);
        this.m_menu.add("Back");
        this.m_menu.x = (this.cameras.getCameraAt(0).width / 2) - (this.m_menu.width / 2);
        this.m_menu.y = 200;
        this.stage.addChild(this.m_menu);
    }

    m_onMenuSelect(element) {
        switch (element.text) {
            case "Back":
                this.application.scenes.load( [new Menu()] );
                break;
        }
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