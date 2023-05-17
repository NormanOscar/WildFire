class MenuBtn extends rune.display.Sprite {
    constructor(texture) {
        super(0, 0, 122, 30, texture);
        this.btnType = texture;
        this.selected = false;
        this.animationFrames = [1, 2];
        this.animationFrameRate = 2;
        this.loop = true;
    }

    init() {
        super.init();
        this.animate();
    }

    animate() {
        this.animation.create("idle", [0], 1, true);
        this.animation.play("idle");
        if (this.btnType == 'save_btn') {
            this.animationFrames = [1];
            this.animationFrameRate = 1;
            this.loop = false;
        }
        console.log(this);
        this.animation.create("selected", this.animationFrames, this.animationFrameRate, this.loop);
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