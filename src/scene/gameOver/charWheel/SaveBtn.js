class SaveBtn extends rune.display.Sprite {
    constructor() {
        super(0, 0, 88, 30, "save_btn");
        this.selected = false;
    }

    init() {
        super.init();
        this.animate();
    }

    animate() {
        this.animation.create("idle", [0], 1, true);
        this.animation.create("selected", [1], 2, true);
        this.animation.play("idle");
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