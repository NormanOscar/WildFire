class CharacterWheel extends rune.text.BitmapField {
    constructor(x, area) {
        super('A', 'font');
        this.x = x;
        this.selected = false;
        this.area = area;

        this.m_sound = null;
        this.m_charSelectedIndex = 0;
        this.m_characters= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    }

    init() {
        super.init();
        this.autoSize = true;
        this.width = this.textWidth;
        this.centerX = this.application.screen.centerX + this.x;
        this.centerY = this.application.screen.centerY;

        this.initFrame();
    }

    initFrame() {
        this.frame = new rune.display.Graphic(this.x - 2, this.y - 2 , 34, 34, "charFrame");
        this.area.stage.addChild(this.frame);
        if (!this.selected) {
            this.frame.visible = false;
        }
    }
    
    update(step) {
        super.update(step);
        if (this.selected) {
            this.frame.visible = true;
            this.m_updateInput();
        }
    }
    
    m_updateInput() {
        if (this.keyboard.justPressed("w") || this.gamepads.get(0).stickLeftJustUp || this.gamepads.get(0).justPressed(12)) {
            this.m_charSelectedIndex == 0 ? this.m_charSelectedIndex = this.m_characters.length - 1 : this.m_charSelectedIndex--;
            this.text = this.m_characters[this.m_charSelectedIndex];
            this.width = this.textWidth;
        }
        
        if (this.keyboard.justPressed("s") || this.gamepads.get(0).stickLeftJustDown || this.gamepads.get(0).justPressed(13)) {
            this.m_charSelectedIndex == this.m_characters.length - 1 ? this.m_charSelectedIndex = 0 : this.m_charSelectedIndex++;
            this.text = this.m_characters[this.m_charSelectedIndex];
            this.width = this.textWidth;
        }
    }

    dispose() {
        super.dispose();
    }
}