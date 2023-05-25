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
        this.menuSelected = 0;
        this.menuBtns = [];
        this.singleHsList = null;
        this.multiHsList = null;
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
        this.m_initMultiHs();

        this.timers.create({
            duration: 2500,
            repeat: Infinity,
            onTick: function() {
                if (this.currentPage == 0) {
                    this.singleHsList.visible = false;
                    this.multiHsList.visible = true;
                    this.currentPage = 1;
                } else {
                    this.singleHsList.visible = true;
                    this.multiHsList.visible = false;
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

    m_updateInput() {
        var m_gamepad = this.gamepads.get(0);
        if (m_gamepad.connected) {
            this.m_updateGamepadInput(m_gamepad);
        } else {
            this.m_updateKeyboardInput();
        }
    }

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
    
    up() {
        this.menuBtns[this.menuSelected].selected = false;
        this.menuSelected == 0 ? this.menuSelected = 2 : this.menuSelected--;
        this.menuBtns[this.menuSelected].selected = true;
        this.m_sound.play();
    }
    
    down() {
        this.menuBtns[this.menuSelected].selected = false;
        this.menuSelected == this.menuBtns.length - 1 ? this.menuSelected = 0 : this.menuSelected++;
        this.menuBtns[this.menuSelected].selected = true;
        this.m_sound.play();
    }
    
    select() {
        if (this.menuSelected == 0) {
            this.application.scenes.load( [new Game(1, this.m_music)] );
        } else if (this.menuSelected == 1) {
            this.application.scenes.load( [new Game(2, this.m_music)] );
        } else if (this.menuSelected == 2) {
            this.application.scenes.load( [new HowToPlay()] );
        }
    }

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


    m_onMenuSelect(element) {
        switch (element.text) {
            case "Single Player":
                this.application.scenes.load( [new Game(1)] );
                break;   
            case "Co-Op":
                this.application.scenes.load( [new Game(2)] );
                break;
            case "How to play":
                this.application.scenes.load( [new HowToPlay()] );
                break;
        }
    }

    m_initSingleHs() {
        this.singleHsList = new HighscoreList(this, 'Singleplayer', 'single');
        this.stage.addChild(this.singleHsList);
        
    }
    m_initMultiHs() {
        this.multiHsList = new HighscoreList(this, 'Co-Op', 'co-op');
        this.multiHsList.visible = false;
        this.stage.addChild(this.multiHsList);
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