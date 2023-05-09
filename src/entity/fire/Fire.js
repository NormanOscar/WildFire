class Fire extends rune.display.Graphic {
    constructor(x, y) {
        super(x, y, 32, 32, "fire");
        this.deathSound = null;
    }

    init() {
        super.init();
        this.initSounds();

        this.hitbox.debug = false;
        this.hitbox.debugColor = 'purple';
    }

    initSounds() {
        this.deathSound = this.application.sounds.sound.get("put_out_fire", false);
    }

    update(step) {
        super.update(step);
    }

    dispose() {
        super.dispose();
    }
}