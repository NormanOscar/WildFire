class Bullet extends rune.display.Graphic {
    constructor(x, y, id, direction, area) {
        super(x, y, 9, 5, "bullet" + id);
        this.id = id;
        this.direction = direction;
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
    }

    init() {
        super.init();

        this.changeDirection();

        this.hitbox.debugColor = 'pink';
        this.hitbox.debug = false;
    }

    update(step) {
        super.update(step);
        this.moveBullet();

        this.id == 0 ? this.checkEnemyCollision() : this.checkFireCollision();

        // If bullet hit edge of map, delete bullet
        if (this.x < 64 || this.x > 928 || this.y < 64 || this.y > 608) {
            this.dispose();
        }
        // If travelled 5 or 3 tiles, delete bullet
        else if (Math.abs((this.x - this.initPos.x) / 32) >= 5 || Math.abs((this.y - this.initPos.y) / 32) >= 3) {
            this.dispose();
        };
    }

    changeDirection() {
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
            for (const fire of fires.tileArr) {
                this.hitTest(fire, function () {
                    this.dispose();
                    fires.tileArr.splice(fires.tileArr.indexOf(fire), 1);
                    fire.dispose();
                    this.area.m_totalScore += 10;
                    this.area.totalFires--;
                    fire.deathSound.play();
                }, this);
            }
        }
    }

    checkEnemyCollision() {
        for (const enemy of this.area.m_enemies) {
            this.hitTest(enemy, function () {
                this.dispose();
                this.area.m_enemies.splice(this.area.m_enemies.indexOf(enemy), 1);
                enemy.deathSound.play();
                this.area.m_totalScore += 10;
                enemy.dispose();
            }, this);
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
        super.dispose();
    }
}