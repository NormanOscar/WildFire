/**
 * Creates a new object.
 *
 * @extends rune.text.BitmapField
 * 
 * @class
 * @classdesc
 * 
 * Character wheel.
 */
class CharWheel extends rune.text.BitmapField {
    /**
     * Calls the constructor of the super class.
     * 
     * @param {number} x The x coordinate of the object.
     * @param {number} y The y coordinate of the object.
     * @param {object} instance The game instance.
     * @param {number} playerID The player ID.
     * 
     * @returns {undefined}
     */
    constructor(x, y, instance, playerID) {
        super('A', 'font');
        this.initX = x;
        this.initY = y
        this.playerID = playerID;
        this.selected = false;
        this.m_gameInstance = instance;

        this.m_sound = null;
        this.m_charSelectedIndex = 0;
        this.m_characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        this.arrowUp = null;
        this.arrowDown = null;
    }

    /**
     * Initializes the object.
     * 
     * @returns {undefined}
     */
    init() {
        super.init();
        this.initSound();
        this.autoSize = true;
        this.width = this.textWidth;
        this.x = this.initX;
        this.centerY = this.initY;

        this.initFrame();
        this.initArrows();
    }

    /**
     * Initializes the sound effect for menu change.
     * 
     * @returns {undefined}
     */
    initSound() {
        this.m_sound = this.application.sounds.sound.get("menu_select", true);
        this.m_sound.volume = 0.2;
    }

    /**
     * Initializes the frame for the character wheel that indicates which character wheel is selected.
     * 
     * @returns {undefined}
     */
    initFrame() {
        this.frame = new rune.display.Graphic(this.x - 4, this.y - 4, 38, 38, "charFrame_player" + (this.playerID + 1));
        this.m_gameInstance.stage.addChild(this.frame);
        if (!this.selected) {
            this.frame.visible = false;
        }
    }

    /**
     * Initializes the arrows for the character wheel to show user that they can change the character.
     * 
     * @returns {undefined}
     */
    initArrows() {
        this.arrowUp = new CharWheelArrow(this.centerX, this.centerY - 25, true);
        this.m_gameInstance.stage.addChild(this.arrowUp);
        this.arrowDown = new CharWheelArrow(this.centerX, this.centerY + 25, false);
        this.m_gameInstance.stage.addChild(this.arrowDown);
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
        if (this.selected) {
            this.frame.visible = true;
            this.m_gamepad = this.gamepads.get(this.playerID);
            this.m_updateInput();
        }
    }
    
    /**
     * Updates the input for the character wheel.
     * 
     * @returns {undefined}
     */
    m_updateInput() {
        var m_gamepad = this.gamepads.get(this.playerID);
        if (m_gamepad.connected) {
            this.updateGamepad(m_gamepad);
        } else {
            this.updateKeyboard();
        }
    }

    /**
     * Updates the keyboard input for the character wheel.
     * 
     * @returns {undefined}
     */
    updateKeyboard() {
        if (this.keyboard.justPressed(this.getPlayerControls().up)) this.up();
        if (this.keyboard.justPressed(this.getPlayerControls().down)) this.down();
    }

    /**
     * Updates the gamepad input for the character wheel.
     * 
     * @param {object} m_gamepad The gamepad object.
     * 
     * @returns {undefined}
     */
    updateGamepad(m_gamepad) {
        if (m_gamepad.stickLeftJustUp || m_gamepad.justPressed(12)) this.up();
        if (m_gamepad.stickLeftJustDown || m_gamepad.justPressed(13)) this.down();
    }
    
    /**
     * Changes character to the previous character in the character wheel.
     * 
     * @returns {undefined}
     */
    up() {
        this.m_charSelectedIndex == 0 ? this.m_charSelectedIndex = this.m_characters.length - 1 : this.m_charSelectedIndex--;
        this.text = this.m_characters[this.m_charSelectedIndex];
        this.m_sound.play();
        
        this.width = this.textWidth;
    }
    
    /**
     * Changes character to the next character in the character wheel.
     * 
     * @returns {undefined}
     */
    down() {
        this.m_charSelectedIndex == this.m_characters.length - 1 ? this.m_charSelectedIndex = 0 : this.m_charSelectedIndex++;
        this.text = this.m_characters[this.m_charSelectedIndex];
        this.m_sound.play();
        
        this.width = this.textWidth;
    }

    /**
     * Returns the keyboard controls for the player.
     * 
     * @returns {object} The keyboard controls for the player.
     */
    getPlayerControls() {
        var controls = [
            {
                up: "w",
                down: "s",
            },
            {
                up: "up",
                down: "down",
            }
        ];
        return controls[this.playerID];
    }
}