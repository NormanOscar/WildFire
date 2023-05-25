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
        this.m_controlsPage = null;
        this.m_rulesPage = null;

        this.currentPage = 0;
        this.pageTimer = null;
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
        this.m_initRulesPage();

        this.pageTimer = this.timers.create({
            duration: 5000,
            repeat: Infinity,
            onTick: function() {
                this.changePage();
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

    m_initBackground() {
        var m_background = new rune.display.Sprite(0, 0, 400, 225, "how_to_play_background");
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

    m_updateKeyboardInput() {
        if (this.keyboard.justPressed("a")) {
            this.changePage();
        }
        if (this.keyboard.justPressed("d")) {
            this.changePage();
        }
        if (this.keyboard.justPressed("SPACE")) {
            this.application.scenes.load([new Menu()]);
        }
    }

    m_updateGamepadInput(gamepad) {
        if (gamepad.stickLeftJustLeft || gamepad.justPressed(14)) {
            this.changePage();
        }
        if (gamepad.stickLeftJustRight || gamepad.justPressed(15)) {
            this.changePage();
        }
        if (gamepad.justPressed(0)) {
            this.application.scenes.load([new Menu()]);
        }
    }

    changePage() {
        if (this.currentPage == 0) {
            this.m_controlsPage.visible = false;
            this.m_rulesPage.visible = true;
            this.currentPage = 1;
        } else {
            this.m_controlsPage.visible = true;
            this.m_rulesPage.visible = false;
            this.currentPage = 0;
        }
        this.pageTimer.restart();
    }

    m_initControlsPage() {
        this.m_controlsPage = new rune.display.DisplayObjectContainer(0, 0, 400, 225);
        this.m_singlePlayerConrols();
        this.m_multiPlayerConrols();
        this.m_initPageCounter(1);
        this.stage.addChild(this.m_controlsPage);
    }

    m_singlePlayerConrols() {
        this.m_initModeTitle("Single Player", this.application.width / 4 + 10, 45);
        
        this.createBtn(this.application.width / 4 - 60, 75, 42, 42, "moveStick", [0, 1, 0 , 2, 0, 3, 0, 4], 4);
        this.createText(this.application.width / 4 + 10, 75, "MOVE");
        this.createCharacterAnimation(this.application.width / 4 + 40, 75, 32, 32, "player0", [20,21,22,23], 8);

        this.createBtn(this.application.width / 4 - 60, 110, 32, 32, "shootBtn", [0, 1], 2);
        this.createText(this.application.width / 4 + 10, 110, "BULLET");
        this.createCharacterAnimation(this.application.width / 4 + 45, 110, 52, 27, "shoot", [0, 0, 0, 0, 1, 2, 3, 4], 8);

        this.createBtn(this.application.width / 4 - 60, 145, 32, 32, "shootSecondBtn", [0, 1], 2);
        this.createText(this.application.width / 4 + 10, 145, "WATER");
        this.createCharacterAnimation(this.application.width / 4 + 45, 145, 52, 27, "shootSecond", [0, 0, 0, 0, 1, 2, 3, 4], 8);
    }

    m_multiPlayerConrols() {
        this.m_initModeTitle("Co-Op", this.application.width / 4 * 3 - 10, 45);
        
        this.createBtn(this.application.width / 4 * 3 - 80, 75, 42, 42, "moveStick", [0, 1, 0 , 2, 0, 3, 0, 4], 4);
        this.createText(this.application.width / 4 * 3 - 10, 75, "MOVE");
        this.createCharacterAnimation(this.application.width / 4 * 3 + 40, 75, 32, 32, "player1", [20,21,22,23], 8);

        this.createBtn(this.application.width / 4 * 3 - 80, 110, 32, 32, "shootBtn", [0, 1], 2);
        this.createText(this.application.width / 4 * 3 - 10, 110, "SHOOT");
        this.createCharacterAnimation(this.application.width / 4 * 3 + 45, 110, 52, 32, "fireman_shoot", [0, 0, 0, 0, 1, 2, 3, 4], 8);

        this.createBtn(this.application.width / 4 * 3 - 80, 145, 32, 32, "shootSecondBtn", [0, 1], 2);
        this.createText(this.application.width / 4 * 3 - 10, 145, "SHOOT SECOND");
        this.createCharacterAnimation(this.application.width / 4 * 3 + 45, 145, 52, 32, "fireman_shootSecond", [0, 0, 0, 0, 1, 2, 3, 4], 8);

        this.createBtn(this.application.width / 4 * 3 - 80, 180, 32, 32, "reviveBtn", [0, 1], 2);
        this.createText(this.application.width / 4 * 3 - 10, 180, "REVIVE");
        this.createCharacterAnimation(this.application.width / 4 * 3 + 45, 180, 52, 32, "revive", [0, 1, 2, 3, 4, 4, 0, 0], 8);
    }

    createBtn(x, y, width, height, texture, animationFrames, animationFrameRate) {
        var m_button = new ControlBtn(0, 0, width, height, texture, animationFrames, animationFrameRate);
        m_button.centerX = x;
        m_button.centerY = y;
        this.m_controlsPage.addChild(m_button);
    }

    createText(x, y, text) {
        var m_text = new rune.text.BitmapField(text, rune.text.BitmapFormat.FONT_MEDIUM);
        m_text.width = m_text.textWidth;
        m_text.centerX = x;
        m_text.centerY = y;
        this.m_controlsPage.addChild(m_text);
    }

    createCharacterAnimation(x, y, width, height, texture, animationFrames, animationFrameRate) {
        var m_character = new rune.display.Sprite(x, 0, width, height, texture);
        m_character.centerY = y;
        m_character.animation.create('move', animationFrames, animationFrameRate, true);
        m_character.animation.play('move');
        this.m_controlsPage.addChild(m_character);
    }

    m_initModeTitle(text, x, y) {
        var m_modeTitle = new rune.text.BitmapField(text, rune.text.BitmapFormat.FONT_MEDIUM);
        m_modeTitle.width = m_modeTitle.textWidth;
        m_modeTitle.centerX = x;
        m_modeTitle.y = y;
        this.m_controlsPage.addChild(m_modeTitle);
    }

    m_initRulesPage() {
        this.m_rulesPage = new rune.display.DisplayObjectContainer(0, 0, 400, 225);
        this.m_rulesPage.visible = false;

        this.m_initP1();
        this.m_initP2();
        this.m_initGeneralRules();

        this.m_initPageCounter(2);
        this.stage.addChild(this.m_rulesPage);
    }
    
    m_initP1() {
        this.createPlayerTitle("Pistol", this.application.width / 4);
        this.createMainTaskText("Kill the enemies", this.application.width / 4);
        this.createMainRulesText("(Can only shoot enemies)", this.application.width / 4);
        this.createPlayerAnimation(this.application.width / 4 + 10, 72, 27, "shoot");
    }
    
    m_initP2() {
        this.createPlayerTitle("Watergun", this.application.width / 4 * 3);
        this.createMainTaskText("Extinguish the fire", this.application.width / 4 * 3);
        this.createMainRulesText("(Can only shoot fires)", this.application.width / 4 * 3);
        this.createPlayerAnimation(this.application.width / 4 * 3 + 10, 72, 32, "fireman_shoot");
    }

    m_initGeneralRules() {
        var m_generalRulesTitle = new rune.text.BitmapField("If co-player is dead, second weapon is unlocked", rune.text.BitmapFormat.FONT_MEDIUM);
        m_generalRulesTitle.width = m_generalRulesTitle.textWidth;
        m_generalRulesTitle.centerX = this.application.screen.centerX;
        m_generalRulesTitle.y = 140;
        this.m_rulesPage.addChild(m_generalRulesTitle);
    }

    createMainRulesText(text, x) {
        var m_mainRulesText = new rune.text.BitmapField(text, rune.text.BitmapFormat.FONT_MEDIUM);
        m_mainRulesText.width = m_mainRulesText.textWidth;
        m_mainRulesText.centerX = x;
        m_mainRulesText.y = 105;
        this.m_rulesPage.addChild(m_mainRulesText);
    }

    createPlayerTitle(text, x) {
        var m_playerTitle = new rune.text.BitmapField(text, rune.text.BitmapFormat.FONT_MEDIUM);
        m_playerTitle.width = m_playerTitle.textWidth;
        m_playerTitle.centerX = x;
        m_playerTitle.y = 45;
        this.m_rulesPage.addChild(m_playerTitle);
    }

    createMainTaskText(text, x) {
        var m_mainTaskText = new rune.text.BitmapField(text, rune.text.BitmapFormat.FONT_MEDIUM);
        m_mainTaskText.width = m_mainTaskText.textWidth;
        m_mainTaskText.centerX = x;
        m_mainTaskText.y = 60;
        this.m_rulesPage.addChild(m_mainTaskText);
    }

    createPlayerAnimation(x, y, height, texture) {
        var player = new rune.display.Sprite(0, 0, 52, height, texture);
        player.centerX = x;
        player.y = y;
        player.animation.create('move', [0, 0, 0, 0, 1, 2, 3, 4], 8, true);
        player.animation.play('move');
        this.m_rulesPage.addChild(player);
    }

    m_initPageCounter(pageNr) {
        this.pageCounter = new rune.text.BitmapField('Page ' + pageNr + '/2', rune.text.BitmapFormat.FONT_MEDIUM);
        this.pageCounter.width = this.pageCounter.textWidth;
        this.pageCounter.centerX = this.application.screen.width - 50;
        this.pageCounter.y = this.application.screen.height - 20;
        pageNr == 1 ? this.m_controlsPage.addChild(this.pageCounter) : this.m_rulesPage.addChild(this.pageCounter);
    }

    m_initBackText() {
        this.backText = new rune.text.BitmapField('Press B to go back', rune.text.BitmapFormat.FONT_MEDIUM);
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