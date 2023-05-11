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

        this.pathTimer = null;

        this.speed = 2;
    }

    init() {
        super.init();
        this.debug = true;
        this.initSounds();
        this.setHitbox();

        //this.updateEnemyPathTimer();
    }

    setHitbox() {
        this.hitbox.debugColor = 'blue';
        this.hitbox.debug = true;
        this.hitbox.set(7, 7, 16, 16);
    }

    /**
     * This method is used to initiate the enemy path timer.
     * 
     * @returns {undefined}
     */
    updateEnemyPathTimer() {
        this.pathTimer = this.area.timers.create({
            duration: 10,
            repeat: Infinity,
            onTick: this.updatePath,
            scope: this
        }, true);
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
            this.target = this.target == 0 ? this.area.m_players[1].playerID : this.area.m_players[0].playerID;

            /* if (this.target == 0) {
                this.target = this.area.m_players[1].playerID;
            }
            if (this.target == 1) {
                this.target = this.area.m_players[0].playerID;
            } */
        }
    }

    dispose() {
        super.dispose();
    }
}