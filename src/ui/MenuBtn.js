class MenuBtn extends rune.display.Sprite {
    constructor(texture) {
        super(0, 0, 122, 30, texture);
        this.selected = false;
    }

    init() {
        super.init();
        this.animate();
    }

    animate() {
        this.animation.create("idle", [0], 1, true);
        this.animation.play("idle");
        this.animation.create("selected", [1, 2], 2, true);
    }

    update(step) {
        super.update(step);
        if (this.selected) {
            this.animation.gotoAndPlay("selected");
        }
        else {
            this.animation.gotoAndPlay("idle");
        }
    }
    
    dispose() {
        super.dispose();
    }
}