class Fire extends rune.display.Sprite {
    constructor(x, y) {
        super(x, y, 32, 32, "fire");
        this.deathSound = null;
    }

    init() {
        super.init();

        this.initSounds();
        this.animate();
        this.setHitbox();
    }
    
    setHitbox() {
        this.hitbox.debug = false;
        this.hitbox.debugColor = 'purple';
        this.hitbox.set(2, 1, 28, 30);
    }

    initSounds() {
        this.deathSound = this.application.sounds.sound.get("put_out_fire", false);
    }

    animate() {
        this.animation.create('burning', [0,1], 4, true);
        this.animation.play('burning');
    }

    update(step) {
        super.update(step);
    }

    dispose() {
        super.dispose();
    }
}