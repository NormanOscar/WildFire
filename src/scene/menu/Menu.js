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
        this.m_music = null;
    }

    /**
     * This method is automatically executed once after the scene is instantiated. 
     * The method is used to create objects to be used within the scene.
     *
     * @returns {undefined}
     */
    init() {
        super.init();

        this.m_initSound();
        this.m_initMusic();
        this.m_initBackground();
        this.m_initTitle();
        this.m_initMenu();
        //this.m_initSingleHs();
        //this.m_initMultiHs();
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

    m_initSound() {
        this.m_sound = this.application.sounds.sound.get("menu_select", true);
        this.m_sound.volume = 0.2;
    }
    m_initMusic() {
        this.m_music = this.application.sounds.master.get("menu_music", true);
        this.m_music.volume = 0.1;
        this.m_music.loop = true;
        this.m_music.play();
    }

    m_initBackground() {
        var m_background = new rune.display.Sprite(0, 0, 400, 225, "menu_background");
        this.stage.addChild(m_background);
    }

    m_initTitle() {
        var m_title = new rune.display.Graphic(this.cameras.getCameraAt(0).width / 2 - 116, 20, 232, 51, "title");
        this.stage.addChild(m_title);
    }

    m_updateInput() {
        if (this.keyboard.justPressed("w") || this.gamepads.get(0).stickLeftJustUp || this.gamepads.get(0).justPressed(12)) {
            if (this.m_menu.up()) {
                this.m_sound.play();
            }
        }
        
        if (this.keyboard.justPressed("s") || this.gamepads.get(0).stickLeftJustDown || this.gamepads.get(0).justPressed(13)) {
            if (this.m_menu.down()) {
                this.m_sound.play();
            }
        }
        
        if (this.keyboard.justPressed("SPACE") || this.gamepads.justPressed(0)) {
            this.m_menu.select();
        }
    }

    m_initMenu() {
        this.m_menu = new rune.ui.VTMenu();
        this.m_menu.onSelect(this.m_onMenuSelect, this);
        this.m_menu.add("Single Player");
        this.m_menu.add("Co-Op");
        this.m_menu.add("How to play");
        this.m_menu.x = (this.cameras.getCameraAt(0).width / 2) - (this.m_menu.width / 2);
        this.m_menu.y = 120;
        this.stage.addChild(this.m_menu);
    }

    m_onMenuSelect(element) {
        switch (element.text) {
            case "Single Player":
                this.application.scenes.load( [new Game(1, this.m_music)] );
                break;   
            case "Co-Op":
                this.application.scenes.load( [new Game(2, this.m_music)] );
                break;
            case "How to play":
                this.application.scenes.load( [new How_to_play()] );
                break;
        }
    }

    m_initSingleHs() {
        const singleHsList = new HighscoreList(this, 'Singleplayer', 'single');
        this.stage.addChild(singleHsList);
        
    }
    m_initMultiHs() {
        const multiHsList = new HighscoreList(this, 'Co-Op', 'co-op');
        this.stage.addChild(multiHsList);
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