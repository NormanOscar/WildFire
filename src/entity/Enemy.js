class Enemy extends rune.display.Sprite {
    constructor(x, y, area, targetPlayer) {
        super(x, y, 32, 32, "enemy1");
        this.startPos = {
            x: x,
            y: y
        };
        this.spawnPoint = null;
        this.target = null;
        this.targetPlayer = targetPlayer;
        this.path = null;
        this.moving = false;
        this.tweens = new rune.tween.Tweens();
        this.deathSound = null;
        this.area = area;
    }

    init() {
        super.init();
        this.initSounds();
        this.hitbox.debug = false;
        this.hitbox.debugColor = 'red';
        this.hitbox.set(7, 7, 16, 16);
    }

    initSounds() {
        this.deathSound = this.application.sounds.sound.get("enemy_die", false);
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

        if (this.area.m_nrOfPlayers == 2) {
            if (this.targetPlayer.status == 'dead') {
                if (this.target == 0) {
                    this.target = this.area.m_players[1].playerID;
                }
                if (this.target == 1) {
                    this.target = this.area.m_players[0].playerID;
                }
            }
        }
    }

    dispose() {
        super.dispose();
    }
}