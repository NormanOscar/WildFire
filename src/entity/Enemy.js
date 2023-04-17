class Enemy extends rune.display.Sprite {
    constructor(x, y, enemyID) {
        super(x, y, 32, 32, "enemy");
        this.enemyID = enemyID;

    }

    init() {
        super.init();
        this.hitbox.debug = true;
    }
}