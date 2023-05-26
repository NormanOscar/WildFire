class DifficultyText extends rune.text.BitmapField {
    constructor() {
        super("A new gate has opened", rune.text.BitmapFormat.FONT_MEDIUM);
    }

    init() {
        super.init();
        this.width = this.textWidth;
        this.centerX = this.application.screen.centerX;
        this.centerY = this.application.screen.centerY;
        this.visible = false;
    }

    update(step) {
        super.update(step);
    }

    dispose() {
        super.dispose();
    }
}