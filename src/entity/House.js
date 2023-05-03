class House extends rune.display.Graphic {
    constructor(x,y, id) {
        super(x,y,150,176,'house' + id);
    }

    init() {
        super.init();
        this.immovable = true;
        this.hitbox.debugColor = 'orange';
        this.hitbox.debug = true;
        this.hitbox.set(5,75, 140, 100);
    }
}