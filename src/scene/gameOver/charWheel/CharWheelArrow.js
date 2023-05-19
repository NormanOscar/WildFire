class CharWheelArrow extends rune.display.Sprite {
    constructor(x, y, isFlipped) {
        super(0, 0, 10, 6, 'charwheel_arrow');
        this.initX = x;
        this.initY = y;
        this.isFlipped = isFlipped;
    }

    init() {
        super.init();

        this.flippedY = this.isFlipped;
        this.centerX = this.initX;
        this.centerY = this.initY;
    }

    update(step) {
        super.update(step);
    }

    dispose() {
        super.dispose();
    }
}