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

        this.m_singlePlayerConrols();
        this.m_verticalLine();
        this.m_multiPlayerConrols();
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
        var m_title = new rune.display.Graphic(this.cameras.getCameraAt(0).width / 2 - 142, 5, 284, 39, "howToPlay");
        this.stage.addChild(m_title);
    }

    m_updateInput() {        
        if (this.keyboard.justPressed("SPACE") || this.gamepads.justPressed(1)) {
            this.m_menu.select();
        }
    }

    m_singlePlayerConrols() {
        this.m_initModeTitle("Single Player", this.cameras.getCameraAt(0).width / 4, 50);

        var m_moveStick = new rune.display.Sprite(9, 60, 42, 42, "moveStick");
        m_moveStick.animation.create('move', [0, 1, 0 , 2, 0, 3, 0, 4], 4, true);
        m_moveStick.animation.play('move');
        this.stage.addChild(m_moveStick);

        var m_moveText = new rune.text.BitmapField('MOVE', rune.text.BitmapFormat.FONT_MEDIUM);
        m_moveText.width = m_moveText.textWidth;
        m_moveText.x = 65;
        m_moveText.y = 77;
        this.stage.addChild(m_moveText);

        var m_move = new rune.display.Sprite(120, 60, 32, 32, "player0");
        m_move.animation.create('move', [20,21,22,23], 8, true);
        m_move.animation.play('move');
        this.stage.addChild(m_move);

        var m_shootBtn = new rune.display.Sprite(14, 100, 32, 32, "shootBtn");
        m_shootBtn.animation.create('shoot', [0, 1], 2, true);
        m_shootBtn.animation.play('shoot');
        this.stage.addChild(m_shootBtn);

        var m_shootText = new rune.text.BitmapField('BULLET', rune.text.BitmapFormat.FONT_MEDIUM);
        m_shootText.width = m_shootText.textWidth;
        m_shootText.x = 65;
        m_shootText.y = 112;
        this.stage.addChild(m_shootText);

        var m_shoot = new rune.display.Sprite(126, 100, 52, 27, "shoot");
        m_shoot.animation.create('shoot', [0, 0, 0, 0, 1, 2, 3, 4], 8, true);
        m_shoot.animation.play('shoot');
        this.stage.addChild(m_shoot);

        var m_shootSecondBtn = new rune.display.Sprite(14, 135, 32, 32, "shootSecondBtn");
        m_shootSecondBtn.animation.create('shootSecond', [0, 1], 2, true);
        m_shootSecondBtn.animation.play('shootSecond');
        this.stage.addChild(m_shootSecondBtn);

        var m_shootSecondText = new rune.text.BitmapField('WATER', rune.text.BitmapFormat.FONT_MEDIUM);
        m_shootSecondText.width = m_shootSecondText.textWidth;
        m_shootSecondText.x = 65;
        m_shootSecondText.y = 147;
        this.stage.addChild(m_shootSecondText);

        var m_shootSecond = new rune.display.Sprite(126, 135, 52, 27, "shootSecond");
        m_shootSecond.animation.create('shootSecond', [0, 0, 0, 0, 1, 2, 3, 4], 8, true);
        m_shootSecond.animation.play('shootSecond');
        this.stage.addChild(m_shootSecond);
    }

    m_verticalLine() {
        var m_verticalLine = new rune.display.Graphic(this.cameras.getCameraAt(0).width / 2 - 0.5, 55, 1, 100, "verticalLine");
        this.stage.addChild(m_verticalLine);
    }

    m_multiPlayerConrols() {
        this.m_initModeTitle("Multiplayer", this.cameras.getCameraAt(0).width / 4 * 3, 50);

        var m_moveStick = new rune.display.Sprite(this.cameras.getCameraAt(0).width / 4 * 2 + 9, 60, 42, 42, "moveStick");
        m_moveStick.animation.create('move', [0, 1, 0 , 2, 0, 3, 0, 4], 4, true);
        m_moveStick.animation.play('move');
        this.stage.addChild(m_moveStick);

        var m_moveText = new rune.text.BitmapField('MOVE', rune.text.BitmapFormat.FONT_MEDIUM);
        m_moveText.width = m_moveText.textWidth;
        m_moveText.x = 264;
        m_moveText.y = 77;
        this.stage.addChild(m_moveText);

        var m_move = new rune.display.Sprite(309, 60, 32, 32, "player0");
        m_move.animation.create('move', [20,21,22,23], 8, true);
        m_move.animation.play('move');
        this.stage.addChild(m_move);

        var m_shootBtn = new rune.display.Sprite(this.cameras.getCameraAt(0).width / 4 * 2 + 14, 100, 32, 32, "shootBtn");
        m_shootBtn.animation.create('shoot', [0, 1], 2, true);
        m_shootBtn.animation.play('shoot');
        this.stage.addChild(m_shootBtn);

        var m_shootText = new rune.text.BitmapField('SHOOT', rune.text.BitmapFormat.FONT_MEDIUM);
        m_shootText.width = m_shootText.textWidth;
        m_shootText.x = 264;
        m_shootText.y = 112;
        this.stage.addChild(m_shootText);

        var m_shoot = new rune.display.Sprite(315, 100, 52, 27, "shoot");
        m_shoot.animation.create('shoot', [0, 0, 0, 0, 1, 2, 3, 4], 8, true);
        m_shoot.animation.play('shoot');
        this.stage.addChild(m_shoot);

        var m_reviveBtn = new rune.display.Sprite(this.cameras.getCameraAt(0).width / 4 * 2 + 14, 135, 32, 32, "reviveBtn");
        m_reviveBtn.animation.create('revive', [0, 1], 2, true);
        m_reviveBtn.animation.play('revive');
        this.stage.addChild(m_reviveBtn);
        
        var m_reviveText = new rune.text.BitmapField('REVIVE', rune.text.BitmapFormat.FONT_MEDIUM);
        m_reviveText.width = m_reviveText.textWidth;
        m_reviveText.x = 264;
        m_reviveText.y = 147;
        this.stage.addChild(m_reviveText);
    }

    m_initModeTitle(text, x, y) {
        var m_modeTitle = new rune.text.BitmapField(text, rune.text.BitmapFormat.FONT_MEDIUM);
        m_modeTitle.width = m_modeTitle.textWidth;
        m_modeTitle.x = x - m_modeTitle.width / 2;
        m_modeTitle.y = y;
        this.stage.addChild(m_modeTitle);
    }

    m_initMenu() {
        this.m_menu = new rune.ui.VTMenu();
        this.m_menu.onSelect(this.m_onMenuSelect, this);
        this.m_menu.add("Back");
        this.m_menu.x = this.cameras.getCameraAt(0).centerX - this.m_menu.width / 2;
        this.m_menu.y = this.cameras.getCameraAt(0).height - this.m_menu.height;
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