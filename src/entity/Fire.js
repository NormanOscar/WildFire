class Fire extends rune.display.Graphic {
    constructor(x, y) {
        super(x, y, 32, 32, "fire");
        this.hitSound = null;
    }

    init() {
        super.init();
        this.initSounds();
    }

    initSounds() {
        this.hitSound = this.application.sounds.sound.get("put_out_fire", false);
    }

    update(step) {
        super.update(step);
    }

    dispose() {
        super.dispose();
    }
}