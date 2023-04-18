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
class Menu extends rune.scene.Scene {

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
        //this.m_initTitle();
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

    m_initTitle() {
        /* var m_title = new rune.text.BitmapField('Wildfire');
        m_title.center = this.cameras.getCameraAt(0).viewport.center;
        this.stage.addChild(m_title); */
    }

    m_updateInput() {
        if (this.keyboard.justPressed("up") || this.gamepads.get(0).stickLeft.y < 0) {
            if (this.m_menu.up()) {
                
            }
        }
        
        if (this.keyboard.justPressed("down") || this.gamepads.get(0).stickLeft.y > 0) {
            if (this.m_menu.down()) {
            }
        }
        
        if (this.keyboard.justPressed("ENTER") || this.gamepads.justPressed(1)) {
            this.m_menu.select();
        }
    }

    m_initMenu() {
        this.m_menu = new rune.ui.VTMenu();
        this.m_menu.onSelect(this.m_onMenuSelect, this);
        this.m_menu.add("Single Player");
        this.m_menu.add("Multiplayer");
        this.m_menu.center = this.cameras.getCameraAt(0).viewport.center;
        this.stage.addChild(this.m_menu);
    }

    m_onMenuSelect(element) {
        switch (element.text) {
            case "Single Player":
                this.application.scenes.load( [new Game(1)] );
                break;
                
            case "Multiplayer":
                this.application.scenes.load( [new Game(2)] );
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