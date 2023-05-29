/**
 * Creates a new object.
 *
 * @extends rune.scene.Scene
 * 
 * @class
 * @classdesc
 * 
 * GameOver scene.
 */
class GameOver extends rune.scene.Scene {
    /**
     * Calls the constructor method of the super class.
     * 
     * @param {number} score The score of the game.
     * @param {number} nr The number of players.
     * 
     * @returns {undefined}
     */
    constructor(score, nr) {
        super();
        this.score = score;
        this.m_nrOfPlayers = nr;
        this.menuSelected = 0;
        this.menuBtns = [];
    }

    /**
     * Initializes the object.
     * 
     * @returns {undefined}
     */
    init() {
        super.init();

        this.m_initBackground();
        this.m_initSound();

        this.m_initScore();

        this.m_initMenu();
    }

    /**
     * Creates the sound effect.
     * 
     * @returns {undefined}
     */
    m_initSound() {
        this.m_sound = this.application.sounds.sound.get("menu_select", true);
        this.m_sound.volume = 0.2;
    }

    /**
     * Initializes the background image.
     * 
     * @returns {undefined}
     */
    m_initBackground() {
        var m_background = new rune.display.Sprite(0, 0, 400, 225, "gameover_background");
        this.stage.addChild(m_background);
    }

    /**
     * Initializes and prints the score.
     * 
     * @returns {undefined}
     */
    m_initScore() {
        var m_scoreTitle = new rune.text.BitmapField('Score:', rune.text.BitmapFormat.FONT_MEDIUM);
        m_scoreTitle.width = m_scoreTitle.textWidth;
        this.stage.addChild(m_scoreTitle);
        m_scoreTitle.centerX = this.application.screen.centerX;
        m_scoreTitle.centerY = this.newHighscore ? this.application.screen.centerY : this.application.screen.centerY - 40;
        
        var m_scoreText = new rune.text.BitmapField(this.score.toString(), rune.text.BitmapFormat.FONT_MEDIUM);
        m_scoreText.width = m_scoreText.textWidth;
        this.stage.addChild(m_scoreText);
        m_scoreText.centerX = this.application.screen.centerX;
        m_scoreText.centerY = this.newHighscore ? this.application.screen.centerY + 20 : this.application.screen.centerY - 25;
    }

    /**
     * Initializes the menu buttons.
     * 
     * @returns {undefined}
     */
    m_initMenu() {
        this.playAgainBtn = new MenuBtn("play_again_btn");
        this.playAgainBtn.centerX = this.application.screen.centerX;
        this.playAgainBtn.y = this.application.screen.height - 75;
        this.playAgainBtn.selected = true;
        this.stage.addChild(this.playAgainBtn);
        this.menuBtns.push(this.playAgainBtn);

        this.mainMenuBtn = new MenuBtn("main_menu_btn");
        this.mainMenuBtn.centerX = this.application.screen.centerX;
        this.mainMenuBtn.y = this.application.screen.height - 40;
        this.stage.addChild(this.mainMenuBtn);
        this.menuBtns.push(this.mainMenuBtn);
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
     * Updates the gamepad input.
     * 
     * @param {object} gamepad The gamepad object.
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
     * Updates the keyboard input.
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
     * Moves the selection up in the menu.
     * 
     * @returns {undefined}
     */
    up() {
        this.menuBtns[this.menuSelected].selected = false;
        this.menuSelected == 0 ? this.menuSelected++ : this.menuSelected--;
        this.menuBtns[this.menuSelected].selected = true;
        this.m_sound.play();
    }
    
    /**
     * Moves the selection down in the menu.
     * 
     * @returns {undefined}
     */
    down() {
        this.menuBtns[this.menuSelected].selected = false;
        this.menuSelected == 1 ? this.menuSelected-- : this.menuSelected++;
        this.menuBtns[this.menuSelected].selected = true;
        this.m_sound.play();
    }
    
    /**
     * Selects the current menu item and loads the appropriate scene.
     * 
     * @returns {undefined}
     */
    select() {
        if (this.menuSelected == 0) {
            this.application.scenes.load( [new Game(this.m_nrOfPlayers)] );
        } else {
            this.application.scenes.load( [new Menu()] );
        }
    }

    /**
     * Removes the game over scene. The process is performed in order to 
     * avoid memory leaks.
     */
    dispose() {
        super.dispose();
    }
}