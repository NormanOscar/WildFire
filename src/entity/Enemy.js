class Enemy extends rune.display.Sprite {
    constructor(x, y) {
        super(x, y, 32, 32, "enemy1");
        this.startPos = {
            x: x,
            y: y
        };
        this.spawnPoint = null;
        this.target = null;
        this.path = null;
        this.moving = false;
        this.tweens = new rune.tween.Tweens();
        this.deathSound = null;
    }

    init() {
        super.init();
        this.initSounds();
        this.hitbox.debug = true;
        this.hitbox.debugColor = 'red';
        this.hitbox.set(7, 7, 16, 16);

        this.initTimer();
    }

    initSounds() {
        this.deathSound = this.application.sounds.sound.get("enemy_die", false);
    }

    initTimer() {

    }

    update(step) {
        super.update(step);

        this.tweens.update(step);

        if (this.left == 0 || this.top == 0 || this.bottom == 762 || this.right == 992) {
            this.dispose();           
        }

        if (this.path != null && !this.moving) {
            this.moving = true;
            this.tweens.create({
                target: this,
                duration: 1000,
                args: {
                    x: this.path.first.x,
                    y: this.path.first.y
                },
                scope: this,
                onDispose: function() {
                    this.moving = false;
                    this.path.removeAt(0);
                },
                easing: rune.tween.Linear.easeIn
            })
        }
    }

    dispose() {
        super.dispose();
    }
}