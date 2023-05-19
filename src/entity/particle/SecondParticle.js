class SecondParticle extends rune.particle.Particle {
    constructor() {
        super(0, 0, 8, 8, 'secondParticle');
    }

    init() {
        super.init();
        this.scaleX = 1;
        this.scaleY = 1;
    }

    update(step) {
        super.update(step);
        var cX = this.centerX;
        var cY = this.centerY;

        this.scaleX += 0.02;
        this.scaleY += 0.02;
        this.centerX = cX;
        this.centerY = cY;
    }

    dispose() {
        super.dispose();
    }
}