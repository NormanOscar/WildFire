class Enemy extends rune.display.Sprite {
    constructor(x, y, enemyID) {
        super(x, y, 32, 32, "enemy1");
        this.enemyID = enemyID;

    }

    init() {
        super.init();
        this.hitbox.debug = true;
        this.hitbox.debugColor = 'blue';
        this.hitbox.set(7, 7, 16, 16);
    }

    dispose() {
        super.dispose();
    }
}