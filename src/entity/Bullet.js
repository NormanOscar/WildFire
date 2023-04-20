class Bullet extends rune.display.Graphic {
    constructor(x, y, playerID, direction) {
        super(x, y, 9, 5, "bullet" + playerID);
        this.direction = direction;
        this.speed = 8;
        this.coordinates = {
            x: 0,
            y: 0
        };
    }

    init() {
        super.init();

        switch (this.direction) {
            case 'right':
                this.rotation = 0;
                this.coordinates.x = this.speed;
                this.coordinates.y = 0;
                break;
            case 'left':
                this.rotation = 180;
                this.coordinates.x = -this.speed;
                this.coordinates.y = 0;
                break;
            case 'up':
                this.rotation = 270;
                this.coordinates.x = 0;
                this.coordinates.y = -this.speed;
                break;
            case 'down':
                this.rotation = 90;
                this.coordinates.x = 0;
                this.coordinates.y = this.speed;
                break;
        }
    }

    update(step) {
        super.update(step);
        this.moveBullet();
        //this.stage.map.back.hitTestAndSeparateObject(this);
        if (this.x < 64 || this.x > 928 || this.y < 64 || this.y > 608 ) {
            this.dispose();
        };
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