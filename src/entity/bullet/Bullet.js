class Bullet extends rune.display.Graphic {
    constructor(x, y, id, direction, area, player) {
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
        this.area = area;

        this.m_disposed = false;
    }

    init() {
        super.init();

        this.changeDirection();
    }

    update(step) {
        super.update(step);

        this.moveBullet();
        
        this.id == 0 ? this.checkEnemyCollision() : this.checkFireCollision();

        if (!this.m_disposed) {
            
            // If bullet hit edge of map, delete bullet
            if (this.x < 32 || (this.x + this.width) > 960 || this.y < 32 || (this.y + this.height) > 640) {
                this.dispose();
            }
            // If travelled 5 or 3 tiles, delete bullet
            else if (Math.abs((this.x - this.initPos.x) / 32) >= 5 || Math.abs((this.y - this.initPos.y) / 32) >= 3) {
                this.dispose();
            }
        }
        
    }

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

    checkFireCollision() {
        for (const fires of this.area.fireController.activeFires) {
            if (fires && fires.tileArr.length != 0) {
                this.hitTestContentOf(fires.tileArr, function() {
                    const fire = arguments[1];
                    this.dispose();
                    fires.tileArr.splice(fires.tileArr.indexOf(fire), 1);
                    fire.dispose();
                    this.area.m_totalScore += 10;
                    this.area.totalFires--;
                    fire.deathSound.play();
                });
            }
        }
    }

    checkEnemyCollision() {
        if (this.area.m_enemies.length != 0) {
            this.hitTestContentOf(this.area.m_enemies, function() {
                const enemy = arguments[1];
                this.dispose();
                this.area.m_enemies.splice(this.area.m_enemies.indexOf(enemy), 1);
                enemy.dispose();
                this.area.m_totalScore += 10;
                enemy.deathSound.play();
            });
        }
    }

    moveBullet() {
        var x = this.x += this.coordinates.x;
        var y = this.y += this.coordinates.y;
        this.moveTo(x, y);
    }

    /**
     * This method is automatically called once just before the scene ends. Use 
     * the method to reset references and remove objects that no longer need to 
     * exist when the scene is destroyed. The process is performed in order to 
     * avoid memory leaks.
     *
     * @returns {undefined}
     */
    dispose() {
        this.player.bullets.splice(this.player.bullets.indexOf(this), 1);
        this.m_disposed = true;
        super.dispose();
    }
}