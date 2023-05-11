class Score extends rune.text.BitmapField {
    constructor(score) {
        super(score, rune.text.BitmapFormat.FONT_MEDIUM);
    }

    init() {
        super.init();
    }
    
    update(step) {
        super.update(step);
        this.width = this.textWidth;
        this.x = this.application.screen.width / 2 - this.width / 2;
        this.y = this.application.screen.height - this.height;
    }
    
    dispose() {
        super.dispose();
    }
}