/**
 * Creates a new object.
 *
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Menu scene.
 */
class Menu extends rune.scene.Scene {

    /**
     * Calls the constructor method of the super class.
     * 
     * @returns {undefined}
     */
    constructor() {
        super();

        this.m_sound = null;
        this.m_music = null;
        this.menuSelected = 0;
        this.menuBtns = [];
        this.singleHsList = null;
        this.coOpHsList = null;
        this.currentPage = 0;
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
        this.m_initMenu();
        this.m_initSingleHs();
        this.m_initCoOpHs();

        this.timers.create({
            duration: 2500,
            repeat: Infinity,
            onTick: function() {
                if (this.currentPage == 0) {
                    this.singleHsList.visible = false;
                    this.coOpHsList.visible = true;
                    this.currentPage = 1;
                } else {
                    this.singleHsList.visible = true;
                    this.coOpHsList.visible = false;
                    this.currentPage = 0;
                }
            },
            scope: this,
        });
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

    /**
     * Initializes sound effects for menu.
     * 
     * @returns {undefined}
     */
    m_initSound() {
        this.m_sound = this.application.sounds.sound.get("menu_select", true);
        this.m_sound.volume = 0.2;
    }

    /**
     * Initializes menu music.
     * 
     * @returns {undefined}
     */
    m_initMusic() {
        this.m_music = this.application.sounds.master.get("menu_music", true);
        this.m_music.volume = 0.1;
        this.m_music.loop = true;
        this.m_music.play();
    }

    /**
     * Creates and prints background image.
     * 
     * @returns {undefined}
     */
    m_initBackground() {
        var m_background = new rune.display.Sprite(0, 0, 400, 225, "menu_background");
        this.stage.addChild(m_background);
    }

    /**
     * Updates input from keyboard and gamepad.
     * 
     * @returns {undefined}
     */
    m_updateInput() {
        var m_gamepad = this.gamepads.get(0);
        if (m_gamepad.connected) {
            this.m_updateGamepadInput(m_gamepad);
        } else {
            this.m_updateKeyboardInput();
        }
    }

    /**
     * Update input from gamepad.
     * 
     * @param {gamepad} gamepad Gamepad object.
     * 
     * @returns {undefined}
     */
    m_updateGamepadInput(gamepad) {
        if (gamepad.stickLeftJustUp || gamepad.justPressed(12)) {
            this.up();
        }
        if (gamepad.stickLeftJustDown || gamepad.justPressed(13)) {
            this.down();
        }
        if (gamepad.justPressed(1)) {
            this.select();
        }
    }

    /**
     * Update input from keyboard.
     * 
     * @returns {undefined}
     */
    m_updateKeyboardInput() {
        if (this.keyboard.justPressed("w")) {
            this.up();
        }
        if (this.keyboard.justPressed("s")) {
            this.down();
        }
        if (this.keyboard.justPressed("SPACE")) {
            this.select();
        }
    }

    /**
     * Moves selection up.
     * 
     * @returns {undefined}
     */
    up() {
        this.menuBtns[this.menuSelected].selected = false;
        this.menuSelected == 0 ? this.menuSelected = 2 : this.menuSelected--;
        this.menuBtns[this.menuSelected].selected = true;
        this.m_sound.play();
    }
    
    /**
     * Moves selection down.
     * 
     * @returns {undefined}
     */
    down() {
        this.menuBtns[this.menuSelected].selected = false;
        this.menuSelected == this.menuBtns.length - 1 ? this.menuSelected = 0 : this.menuSelected++;
        this.menuBtns[this.menuSelected].selected = true;
        this.m_sound.play();
    }
    
    /**
     * Selects current menu item and loads corresponding scene.
     * 
     * @returns {undefined}
     */
    select() {
        if (this.menuSelected == 0) {
            this.application.scenes.load( [new Game(1, this.m_music)] );
        } else if (this.menuSelected == 1) {
            this.application.scenes.load( [new Game(2, this.m_music)] );
        } else if (this.menuSelected == 2) {
            this.application.scenes.load( [new HowToPlay()] );
        }
    }

    /**
     * Creates menu buttons.
     * 
     * @returns {undefined}
     */
    m_initMenu() {
        this.singleplayerBtn = new MenuBtn("singleplayer_btn");
        this.singleplayerBtn.centerX = this.application.screen.width / 4 - 10;
        this.singleplayerBtn.y = 70;
        this.singleplayerBtn.selected = true;
        this.stage.addChild(this.singleplayerBtn);
        this.menuBtns.push(this.singleplayerBtn);

        this.coOpBtn = new MenuBtn("co-op_btn");
        this.coOpBtn.centerX = this.application.screen.width / 4 - 10;
        this.coOpBtn.y = 110;
        this.stage.addChild(this.coOpBtn);
        this.menuBtns.push(this.coOpBtn);

        this.howToPlayBtn = new MenuBtn("how_to_play_btn");
        this.howToPlayBtn.centerX = this.application.screen.width / 4 - 10;
        this.howToPlayBtn.y = 150;
        this.stage.addChild(this.howToPlayBtn);
        this.menuBtns.push(this.howToPlayBtn);
    }

    /**
     * Creates highscore lists for single player.
     * 
     * @returns {undefined}
     */
    m_initSingleHs() {
        this.singleHsList = new HighscoreList('Singleplayer', 'single');
        this.stage.addChild(this.singleHsList);
    }

    /**
     * Creates highscore lists for co-op.
     * 
     * @returns {undefined}
     */
    m_initCoOpHs() {
        this.coOpHsList = new HighscoreList('Co-Op', 'co-op');
        this.coOpHsList.visible = false;
        this.stage.addChild(this.coOpHsList);
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