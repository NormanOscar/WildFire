/**
 * Creates a new object.
 *
 * @extends rune.display.Sprite
 * 
 * @class
 * @classdesc
 * 
 * Bullet object.
 */
class Bullet extends rune.display.Sprite {
    /**
     * Calls the constructor method of the super class.
     * 
     * @param {number} x The x coordinate of the object.
     * @param {number} y The y coordinate of the object.
     * @param {number} id The id for type of bullet.
     * @param {number} direction The direction the bullet is travelling.
     * @param {object} instance The game instance.
     * @param {object} player The player object.
     * 
     * @returns {undefined}
     */
    constructor(x, y, id, direction, instance, player) {
        super(x, y, 9, 5, "bullet" + id);
        this.id = id;
        this.direction = direction;
        this.player = player;
        this.speed = 10;
        this.initPos = {
            x: x,
            y: y
        };
        this.coordinates = {
            x: 0,
            y: 0
        };
        this.m_gameInstance = instance;

        this.houseIDs = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
        this.m_disposed = false;
    }

    /**
     * Initializes the object.
     * 
     * @returns {undefined}
     */
    init() {
        super.init();

        this.changeDirection();
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

        this.moveBullet();
        
        // Check collision depending on bullet type
        this.id == 0 ? this.checkEnemyCollision() : this.checkFireCollision();

        if (!this.m_disposed) {
            // If bullet hit edge of map or houses, delete the bullet
            this.m_gameInstance.stage.map.back.hitTestObject(this, function(bullet, mapTile) {
                if (!this.houseIDs.includes(mapTile.value) && mapTile.allowCollisions != 0) {
                    bullet.dispose();
                }
            });

            // If travelled 5 or 3 tiles, delete bullet
            if (Math.abs((this.x - this.initPos.x) / 32) >= 5 || Math.abs((this.y - this.initPos.y) / 32) >= 3) {
                if (this.m_disposed) return;
                this.dispose();
            }
        }
        
    }

    /**
     * Changes the direction and hitbox of the bullet based on the player direction.
     * 
     * @returns {undefined}
     */
    changeDirection() {
        // Change direction of bullet based on player direction
        switch (this.direction) {
            case 'right':
                this.rotation = 0;
                this.coordinates.x = this.speed;
                this.coordinates.y = 0;
                this.hitbox.set(0, 0, 8, 4)
                break;
            case 'left':
                this.rotation = 180;
                this.coordinates.x = -this.speed;
                this.coordinates.y = 0;
                this.hitbox.set(0, 0, 8, 4)
                break;
            case 'up':
                this.rotation = 270;
                this.coordinates.x = 0;
                this.coordinates.y = -this.speed;
                this.hitbox.set(2, 0, 4, 6)
                break;
            case 'down':
                this.rotation = 90;
                this.coordinates.x = 0;
                this.coordinates.y = this.speed;
                this.hitbox.set(2, 0, 4, 6)
                break;
        }
    }

    /**
     * Checks if the bullet has hit any fire.
     * 
     * @returns {undefined}
     */
    checkFireCollision() {
        for (const burningFire of this.m_gameInstance.fireController.burningFires) {
            if (burningFire && burningFire.tileArr.length != 0) {
                this.hitTestContentOf(burningFire.tileArr, function() {
                    const fireTile = arguments[1];
                    this.dispose();
                    burningFire.tileArr.splice(burningFire.tileArr.indexOf(fireTile), 1);
                    fireTile.dispose();
                    this.m_gameInstance.m_totalScore += 10;
                    this.m_gameInstance.totalFireTiles--;
                    fireTile.deathSound.play();
                });
            }
        }
    }

    /**
     * Checks if the bullet has hit any enemies.
     * 
     * @returns {undefined}
     */
    checkEnemyCollision() {
        if (this.m_gameInstance.m_enemies.length != 0) {
            this.hitTestContentOf(this.m_gameInstance.m_enemies, function() {
                const enemy = arguments[1];
                this.dispose();
                this.m_gameInstance.m_enemies.splice(this.m_gameInstance.m_enemies.indexOf(enemy), 1);
                enemy.dispose();
                this.m_gameInstance.m_totalScore += 10;
                enemy.deathSound.play();
            });
        }
    }

    /**
     * Moves the bullet.
     * 
     * @returns {undefined}
     */
    moveBullet() {
        var x = this.x += this.coordinates.x;
        var y = this.y += this.coordinates.y;
        this.moveTo(x, y);
    }

    /**
     * This method removes bullet when it's out of bounds or when it hits enemy, fire or houses. The process is performed in order to 
     * avoid memory leaks.
     *
     * @returns {undefined}
     */
    dispose() {
        var bulletToDispose = this.player.bullets.splice(this.player.bullets.indexOf(this), 1);
        bulletToDispose = null;
        this.m_disposed = true;
        super.dispose();
    }
}