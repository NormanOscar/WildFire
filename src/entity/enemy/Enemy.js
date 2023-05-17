class Enemy extends rune.display.Sprite {
    constructor(x, y, area, targetPlayer, speed) {
        super(x, y, 32, 32, "enemy");
        this.startPos = {
            x: x,
            y: y
        };
        this.spawnPoint = null;
        this.targetPlayer = targetPlayer;
        this.path = null;
        this.moving = false;
        this.tweens = new rune.tween.Tweens();
        this.deathSound = null;
        this.area = area;

        this.pathTimer = null;

        this.speed = speed;
    }

    init() {
        super.init();
        this.initSounds();
        this.animate();
        this.setHitbox();
    }

    animate() {
        this.animation.create('walking', [0, 1, 2, 3], 4, true);
        this.animation.play('walking');
    }

    setHitbox() {
        this.hitbox.debugColor = 'blue';
        this.hitbox.set(5, 9, 20, 20);
    }

    initSounds() {
        this.deathSound = this.application.sounds.sound.get("enemy_die", false);
    }

    /**
     * This method is used to update the path of all enemies.
     * 
     * @returns {undefined}
     */
    updatePath() {
        this.path = this.area.stage.map.back.getPath(this.centerX, this.centerY, this.targetPlayer.centerX, this.targetPlayer.centerY, true);
    }

    update(step) {
        super.update(step);

        this.updatePath();

        this.move();

        if (this.area.m_nrOfPlayers == 2) {
            this.changeTarget();
        }
    }

    move() {
        if (this.path != null && this.path.m_nodes.length > 1) {
            var nextTile = this.path.m_nodes[1];
            var distanceX = nextTile.x - this.centerX;
            var distanceY = nextTile.y - this.centerY;

            var distanceTotal = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));

            var fraction = this.speed / distanceTotal;
            if (distanceTotal > 0) {
                this.centerX += distanceX * fraction;
                this.centerY += distanceY * fraction;

            }
            if (distanceTotal <= 0) {
                this.centerX -= distanceX * fraction;
                this.centerY -= distanceY * fraction;
            }
            this.path.m_nodes.shift();
        }
    }

    changeTarget() {
        if (this.targetPlayer.status == 'dead') {
            if (this.targetPlayer.playerID == 0) {
                this.targetPlayer = this.area.m_players[1];
            }
            else if (this.targetPlayer.playerID == 1) {
                this.targetPlayer = this.area.m_players[0];
            }
        }
    }

    dispose() {
        super.dispose();
    }
}