class House extends rune.display.Graphic {
    constructor(x,y, id) {
        super(x,y,128,64,'house' + id);
        this.playerBehind = false;
    }

    init() {
        super.init();
        this.immovable = true;
        this.hitbox.set(5,25, 108, 49);
    }

    update(step) {
        super.update(step);
        if (this.playerBehind) {
            this.alpha = 0.4;
        } else {
            this.alpha = 1;
        }
    }
}