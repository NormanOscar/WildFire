class ControlBtn extends rune.display.Sprite {
    constructor(x, y, width, height, texture, animationFrames, animationFrameRate) {
        super(x, y, width, height, texture);
        
        this.animationFrames = animationFrames;
        this.animationFrameRate = animationFrameRate;
    }

    init() {
        super.init();
        this.animate();
    }

    animate() {
        this.animation.create("moving", this.animationFrames, this.animationFrameRate, true);
        this.animation.play("moving");
    }

    update(step) {
        super.update(step);
    }

    dispose() {
        super.dispose();
    }
}