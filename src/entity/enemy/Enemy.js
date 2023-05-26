/**
 * Creates a new object.
 *
 * @extends rune.scene.Scene
 * 
 * @param {number} x The x coordinate of the object.
 * @param {number} y The y coordinate of the object.
 * @param {object} instance The game instance.
 * @param {object} player The targetplayer object.
 * @param {number} speed The speed of the enemy.
 *
 * @class
 * @classdesc
 * 
 * Enemy object.
 */
class Enemy extends rune.display.Sprite {
    constructor(x, y, instance, targetPlayer, speed) {
        super(x, y, 32, 32, "enemy1");
        
        this.targetPlayer = targetPlayer;
        this.path = null;
        this.deathSound = null;
        this.m_gameInstance = instance;

        this.pathTimer = null;

        this.speed = speed;
    }

    /**
     * Initializes the object.
     * 
     * @returns {undefined}
     */
    init() {
        super.init();
        this.initSounds();
        this.animate();
        this.setHitbox();
    }

    /**
     * Creates the animation for the enemy.
     * 
     * @returns {undefined}
     */
    animate() {
        this.animation.create('walking', [0, 1, 2, 3], 4, true);
        this.animation.play('walking');
    }

    /**
     * Sets the hitbox for the enemy.
     * 
     * @returns {undefined}
     */
    setHitbox() {
        this.hitbox.set(5, 9, 20, 20);
    }

    /**
     * Initializes the sounds for the enemy.
     * 
     * @returns {undefined}
     */
    initSounds() {
        this.deathSound = this.application.sounds.sound.get("enemy_die", false);
    }

    /**
     * This method is used to update the path of the enemies.
     * 
     * @returns {undefined}
     */
    updatePath() {
        this.path = this.m_gameInstance.stage.map.back.getPath(this.centerX, this.centerY, this.targetPlayer.centerX, this.targetPlayer.centerY, true);
    }

    /**
     * This method is automatically executed once per "tick". The method is used for 
     * calculations such as application logic.
     *
     * @param {number} step Fixed time step.
     *
     * @returns {undefined}
     */
    update(step) {
        super.update(step);

        this.updatePath();
        this.checkHouseCollision();

        this.move();

        if (this.m_gameInstance.m_nrOfPlayers == 2) {
            this.changeTarget();
        }
    }

    /**
     * This method is used to check collision between enemy and houses.
     * 
     * @returns {undefined}
     */
     checkHouseCollision() {
        for (const house of this.m_gameInstance.houses) {
            if (this.hitTest(house)) {
                house.enemyBehind = true;
            } else {
                house.enemyBehind = false;
            }
        }
    }

    /**
     * Move enemy along path towards target.
     * 
     * @returns {undefined}
     */
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

    /**
     * Changes the target of the enemy when previous target is dead.
     * 
     * @returns {undefined}
     */
    changeTarget() {
        if (this.targetPlayer.status == 'dead') {
            if (this.targetPlayer.playerID == 0) {
                this.targetPlayer = this.m_gameInstance.m_players[1];
            }
            else if (this.targetPlayer.playerID == 1) {
                this.targetPlayer = this.m_gameInstance.m_players[0];
            }
        }
    }

    /**
     * This method removes enemy when it dies. The process is performed in order to 
     * avoid memory leaks.
     *
     * @returns {undefined}
     */
    dispose() {
        super.dispose();
    }
}