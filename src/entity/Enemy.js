class Enemy extends rune.display.Sprite {
    constructor(x, y) {
        super(x, y, 32, 32, "enemy1");
    }

    init() {
        super.init();
        this.hitbox.debug = true;
        this.hitbox.debugColor = 'blue';
        this.hitbox.set(7, 7, 16, 16);
    }

    update(step) {
        super.update(step);

        this.y -= 2;
    }

    dispose() {
        super.dispose();
    }
}