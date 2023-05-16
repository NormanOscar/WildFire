class Countdown extends rune.display.Sprite {
    constructor() {
        super(0, 0, 140, 32, "countdown");
    }

    init() {
        super.init();

        this.centerX = this.application.screen.centerX;
        this.centerY = this.application.screen.centerY;
        this.animate();
    }

    animate() {
        this.animation.create('countdown', [0, 1, 2, 3, 4], 1, false);
        this.animation.play('countdown');
    }

    update(step) {
        super.update(step);
    }

    dispose() {
        super.dispose();
    }
}