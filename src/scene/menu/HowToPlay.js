/**
 * Creates a new object.
 *
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * How to play scene to show rules and controls.
 */
 class HowToPlay extends rune.scene.Scene {

    /**
     * Calls the constructor method of the super class.
     * 
     * @returns {undefined}
     */
    constructor() {
        super();

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

        const backText = this.createText(this.cameras.getCameraAt(0).centerX, this.cameras.getCameraAt(0).height - 15, 'Press B to go back');
        this.stage.addChild(backText);

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

    /**
     * Creates and prints the background image.
     * 
     * @returns {undefined}
     */
    m_initBackground() {
        var m_background = new rune.display.Sprite(0, 0, 400, 225, "how_to_play_background");
        this.stage.addChild(m_background);
    }

    /**
     * Updates the input.
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
     * Updates the keyboard input.
     * 
     * @returns {undefined}
     */
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

    /**
     * Updates the gamepad input.
     * 
     * @param {object} gamepad The gamepad object.
     * 
     * @returns {undefined}
     */
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

    /**
     * Changes to different page.
     * 
     * @returns {undefined}
     */
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

        // Restarts the timer when page is changed.
        this.pageTimer.restart();
    }

    /**
     * Creates page for controls.
     * 
     * @returns {undefined}
     */
    m_initControlsPage() {
        this.m_controlsPage = new rune.display.DisplayObjectContainer(0, 0, 400, 225);
        this.m_singlePlayerConrols();
        this.m_multiPlayerConrols();
        this.m_initPageCounter(1);
        this.stage.addChild(this.m_controlsPage);
    }

    /**
     * Creates single player controls.
     * 
     * @returns {undefined}
     */
    m_singlePlayerConrols() {
        const modeTitle = this.createText(this.application.width / 4 + 10, 50, "Single Player");
        this.m_controlsPage.addChild(modeTitle);
        
        // Movement
        this.createBtn(this.application.width / 4 - 60, 75, 42, 42, "moveStick", [0, 1, 0, 2, 0, 3, 0, 4], 4);
        const moveText = this.createText(this.application.width / 4 + 10, 75, "MOVE");
        this.m_controlsPage.addChild(moveText);
        const moveCharacter = this.createCharacterAnimation(this.application.width / 4 + 40, 75, 32, 32, "player0", [20 ,21 ,22 ,23], 8);
        this.m_controlsPage.addChild(moveCharacter);

        // Shoot bullet
        this.createBtn(this.application.width / 4 - 60, 110, 32, 32, "shootBtn", [0, 1], 2);
        const bulletText = this.createText(this.application.width / 4 + 10, 110, "BULLET");
        this.m_controlsPage.addChild(bulletText);
        const shootCharacter = this.createCharacterAnimation(this.application.width / 4 + 45, 110, 52, 27, "shoot", [0, 0, 0, 0, 1, 2, 3, 4], 8);
        this.m_controlsPage.addChild(shootCharacter);

        // Shoot water
        this.createBtn(this.application.width / 4 - 60, 145, 32, 32, "shootSecondBtn", [0, 1], 2);
        const waterText = this.createText(this.application.width / 4 + 10, 145, "WATER");
        this.m_controlsPage.addChild(waterText);
        const shootSecondCharacter = this.createCharacterAnimation(this.application.width / 4 + 45, 145, 52, 27, "shootSecond", [0, 0, 0, 0, 1, 2, 3, 4], 8);
        this.m_controlsPage.addChild(shootSecondCharacter);
    }

    /**
     * Creates co-op controls.
     * 
     * @returns {undefined}
     */
    m_multiPlayerConrols() {
        const modeTitle = this.createText(this.application.width / 4 * 3 - 10, 50, "Co-Op");
        this.m_controlsPage.addChild(modeTitle);
        
        // Movement
        this.createBtn(this.application.width / 4 * 3 - 80, 75, 42, 42, "moveStick", [0, 1, 0 , 2, 0, 3, 0, 4], 4);
        const moveText = this.createText(this.application.width / 4 * 3 - 10, 75, "MOVE");
        this.m_controlsPage.addChild(moveText);
        const moveAnimation = this.createCharacterAnimation(this.application.width / 4 * 3 + 40, 75, 32, 32, "player1", [20,21,22,23], 8);
        this.m_controlsPage.addChild(moveAnimation);

        // Shoot
        this.createBtn(this.application.width / 4 * 3 - 80, 110, 32, 32, "shootBtn", [0, 1], 2);
        const shootText = this.createText(this.application.width / 4 * 3 - 10, 110, "SHOOT");
        this.m_controlsPage.addChild(shootText);
        const shootAnimation = this.createCharacterAnimation(this.application.width / 4 * 3 + 45, 110, 52, 32, "fireman_shoot", [0, 0, 0, 0, 1, 2, 3, 4], 8);
        this.m_controlsPage.addChild(shootAnimation);

        // Shoot second
        this.createBtn(this.application.width / 4 * 3 - 80, 145, 32, 32, "shootSecondBtn", [0, 1], 2);
        const shootSecondText = this.createText(this.application.width / 4 * 3 - 10, 145, "SHOOT SECOND");
        this.m_controlsPage.addChild(shootSecondText);
        const shootSecondAnimation = this.createCharacterAnimation(this.application.width / 4 * 3 + 45, 145, 52, 32, "fireman_shootSecond", [0, 0, 0, 0, 1, 2, 3, 4], 8);
        this.m_controlsPage.addChild(shootSecondAnimation);

        // Revive
        this.createBtn(this.application.width / 4 * 3 - 80, 180, 32, 32, "reviveBtn", [0, 1], 2);
        const reviveText = this.createText(this.application.width / 4 * 3 - 10, 180, "REVIVE");
        this.m_controlsPage.addChild(reviveText);
        const reviveAnimation = this.createCharacterAnimation(this.application.width / 4 * 3 + 45, 180, 52, 32, "revive", [0, 1, 2, 3, 4, 4, 0, 0], 8);
        this.m_controlsPage.addChild(reviveAnimation);
    }

    /**
     * Creates and prints button sprite.
     * 
     * @param {number} x The x position of the sprite.
     * @param {number} y The y position of the sprite.
     * @param {number} width The width of the sprite.
     * @param {number} height The height of the sprite.
     * @param {string} texture The texture of the sprite.
     * @param {array} animationFrames The animation frames of the sprite.
     * @param {number} animationFrameRate The animation frame rate of the sprite.
     * 
     * @returns {undefined}
     */
    createBtn(x, y, width, height, texture, animationFrames, animationFrameRate) {
        var m_button = new ControlBtn(0, 0, width, height, texture, animationFrames, animationFrameRate);
        m_button.centerX = x;
        m_button.centerY = y;
        this.m_controlsPage.addChild(m_button);
    }

    /**
     * Creates and prints text.
     * 
     * @param {number} x The x position of the text.
     * @param {number} y The y position of the text.
     * @param {string} text The text.
     * 
     * @returns {object} m_text The text element.
     */
    createText(x, y, text) {
        var m_text = new rune.text.BitmapField(text, rune.text.BitmapFormat.FONT_MEDIUM);
        m_text.width = m_text.textWidth;
        m_text.centerX = x;
        m_text.centerY = y;
        return m_text;
    }

    /**
     * Creates and prints character animation.
     * 
     * @param {number} x The x position of the sprite.
     * @param {number} y The y position of the sprite.
     * @param {number} width The width of the sprite.
     * @param {number} height The height of the sprite.
     * @param {string} texture The texture of the sprite.
     * @param {array} animationFrames The animation frames of the sprite.
     * @param {number} animationFrameRate The animation frame rate of the sprite.
     * 
     * @returns {object} m_character The character sprite.
     */
    createCharacterAnimation(x, y, width, height, texture, animationFrames, animationFrameRate) {
        const m_character = new rune.display.Sprite(x, 0, width, height, texture);
        m_character.centerY = y;
        m_character.animation.create('move', animationFrames, animationFrameRate, true);
        m_character.animation.play('move');
        return m_character;
    }

    /**
     * Creates page for game rules.
     * 
     * @returns {undefined}
     */
    m_initRulesPage() {
        this.m_rulesPage = new rune.display.DisplayObjectContainer(0, 0, 400, 225);
        this.m_rulesPage.visible = false;

        this.m_initP1();
        this.m_initP2();

        const m_generalRulesTitle = this.createText(this.application.screen.centerX, 160, "If co-player is dead, second weapon is unlocked", rune.text.BitmapFormat.FONT_MEDIUM);
        this.m_rulesPage.addChild(m_generalRulesTitle);

        this.m_initPageCounter(2);
        this.stage.addChild(this.m_rulesPage);
    }
    
    /**
     * Creates player 1 rules.
     * 
     * @returns {undefined}
     */
    m_initP1() {
        const playerTitle = this.createText(this.application.width / 4, 50, "Pistol");
        this.m_rulesPage.addChild(playerTitle);

        const mainText = this.createText(this.application.width / 4, 65, "Kill the enemies");
        this.m_rulesPage.addChild(mainText);
        
        const shootCharacter = this.createCharacterAnimation(this.application.width / 4 - 13, 96, 52, 27, "shoot", [0, 0, 0, 0, 1, 2, 3, 4], 8)
        this.m_rulesPage.addChild(shootCharacter);

        const extraText = this.createText(this.application.width / 4, 130, "Can only shoot enemies");
        this.m_rulesPage.addChild(extraText);

    }
    
    /**
     * Creates player 2 rules.
     * 
     * @returns {undefined}
     */
    m_initP2() {
        const playerTitle = this.createText(this.application.width / 4 * 3, 50, "Watergun");
        this.m_rulesPage.addChild(playerTitle);

        const mainText = this.createText(this.application.width / 4 * 3, 65, "Extinguish the fire");
        this.m_rulesPage.addChild(mainText);
        
        const firemanShoot = this.createCharacterAnimation(this.application.width / 4 * 3 - 13, 96, 52, 32, "fireman_shoot", [0, 0, 0, 0, 1, 2, 3, 4], 8);
        this.m_rulesPage.addChild(firemanShoot);

        const extraText = this.createText(this.application.width / 4 * 3, 130, "Can only shoot fires");
        this.m_rulesPage.addChild(extraText);
    }

    /**
     * Creates pagination for game controls.
     * 
     * @param {number} pageNr The page number.
     * 
     * @returns {undefined}
     */
    m_initPageCounter(pageNr) {
        const pageCounter = this.createText(this.application.screen.width - 60, this.cameras.getCameraAt(0).height - 15, '< Page ' + pageNr + '/2 >');
        pageNr == 1 ? this.m_controlsPage.addChild(pageCounter) : this.m_rulesPage.addChild(pageCounter);
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