class CharWheel extends rune.text.BitmapField {
    constructor(x, y, area, playerID) {
        super('A', 'font');
        this.initX = x;
        this.initY = y
        this.playerID = playerID;
        this.selected = false;
        this.area = area;

        this.m_sound = null;
        this.m_charSelectedIndex = 0;
        this.m_characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        this.arrowUp = null;
        this.arrowDown = null;
    }

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

    initSound() {
        this.m_sound = this.application.sounds.sound.get("menu_select", true);
        this.m_sound.volume = 0.2;
    }

    initFrame() {
        this.frame = new rune.display.Graphic(this.x - 4, this.y - 4, 38, 38, "charFrame_player" + (this.playerID + 1));
        this.area.stage.addChild(this.frame);
        if (!this.selected) {
            this.frame.visible = false;
        }
    }

    initArrows() {
        this.arrowUp = new CharWheelArrow(this.centerX, this.centerY - 25, true);
        this.area.stage.addChild(this.arrowUp);
        this.arrowDown = new CharWheelArrow(this.centerX, this.centerY + 25, false);
        this.area.stage.addChild(this.arrowDown);
    }
    
    update(step) {
        super.update(step);
        if (this.selected) {
            this.frame.visible = true;
            this.m_gamepad = this.gamepads.get(this.playerID);
            this.m_updateInput();
        }
    }
    
    m_updateInput() {
        var m_gamepad = this.gamepads.get(this.playerID);
        if (m_gamepad.connected) {
            this.updateGamepad(m_gamepad);
        } else {
            this.updateKeyboard();
        }
    }

    updateKeyboard() {
        if (this.keyboard.justPressed(this.getPlayerControls().up)) this.up();
        if (this.keyboard.justPressed(this.getPlayerControls().down)) this.down();
    }

    updateGamepad(m_gamepad) {
        if (m_gamepad.stickLeftJustUp || m_gamepad.justPressed(12)) this.up();
        if (m_gamepad.stickLeftJustDown || m_gamepad.justPressed(13)) this.down();
    }
    
    up() {
        this.m_charSelectedIndex == 0 ? this.m_charSelectedIndex = this.m_characters.length - 1 : this.m_charSelectedIndex--;
        this.text = this.m_characters[this.m_charSelectedIndex];
        this.m_sound.play();
        
        this.width = this.textWidth;
    }
    
    down() {
        this.m_charSelectedIndex == this.m_characters.length - 1 ? this.m_charSelectedIndex = 0 : this.m_charSelectedIndex++;
        this.text = this.m_characters[this.m_charSelectedIndex];
        this.m_sound.play();
        
        this.width = this.textWidth;
    }

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

    dispose() {
        super.dispose();
    }
}