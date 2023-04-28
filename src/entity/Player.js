class Player extends rune.display.Sprite {
    constructor(x, y, playerID) {
        super(x, y, 32, 32, "player" + playerID);
        this.playerID = playerID;

        this.speed = 5;
        this.m_animation = null;
        this.m_gamepad = null;
        this.bullets = new Array();
        this.direction = 'down';
        this.can_move = true;
        this.status = 'alive';
        this.deathSound = null;
        this.shootSound = null;
        this.bulletCoordinates = [
            {
                x: null,
                y: null
            },
            {
                x: null,
                y: null
            }
        ]
        this.shootID = 0;
    }
    
    init() {
        super.init();
        this.setSounds();
        this.animateCharacter();
        this.setHitbox();
    }

    setSounds() {
        this.deathSound = this.application.sounds.sound.get("player_die", true);
        this.shootSound = this.playerID == 0 ? this.application.sounds.sound.get("gun_shoot", false) : this.application.sounds.sound.get("water_shoot", false);
    }
    
    setHitbox() {
        this.hitbox.debug = true;
        this.hitbox.debugColor = 'blue';
        this.hitbox.set(6, 4, 19, 24);
    }

    update(step) {
        super.update(step);
        this.updateInput();
        this.stage.map.back.hitTestAndSeparateObject(this);
        //this.checkOOB();
    }

    checkOOB() {
        if (this.left == 0 || this.top == 0 || this.bottom == 762 || this.right == 992) {
            this.can_move = false;
        }

    }

    updateInput() {
        if (this.can_move) {
            this.m_gamepad = this.gamepads.get(this.playerID);
            if (this.m_gamepad.connected) {
                this.updateGamepad();
            } else {
                this.updateKeyboard();
            }
        }
    }

    updateGamepad() {
        if (this.m_gamepad.stickLeft) {
            this.x += this.m_gamepad.stickLeft.x * this.speed;
            this.y += this.m_gamepad.stickLeft.y * this.speed;

            if (this.m_gamepad.stickLeftRight) {
                this.direction = 'right';
                this.animation.gotoAndPlay('run_side');
                this.flippedX = false;
            }
            else if (this.m_gamepad.stickLeftDown) {
                this.direction = 'down';
                this.animation.gotoAndPlay('run_down');
            }
            else if (this.m_gamepad.stickLeftLeft) {
                this.direction = 'left';
                this.animation.gotoAndPlay('run_side');
                this.flippedX = true;
            }
            else if (this.m_gamepad.stickLeftUp) {
                this.direction = 'up';
                this.animation.gotoAndPlay('run_up');
            }
            else {
                this.playIdleAnimation();
            }
        }
        if (this.m_gamepad.justPressed(0)) {
            this.shoot();
            this.shootSound.play();
        }
    }

    updateKeyboard() {
        if (this.keyboard.justPressed(this.getKeyboardControls(this.playerID).shoot)) {
            this.shoot();
            this.shootSound.play();
        }
        if (this.keyboard.pressed(this.getKeyboardControls(this.playerID).right)) {
            this.direction = 'right';
            this.x += this.speed;
            this.animation.gotoAndPlay('run_side');
            this.flippedX = false;
        }
        else if (this.keyboard.pressed(this.getKeyboardControls(this.playerID).left)) {
            this.direction = 'left';
            this.x -= this.speed;
            this.animation.gotoAndPlay('run_side');
            this.flippedX = true;
        }
        else if (this.keyboard.pressed(this.getKeyboardControls(this.playerID).up)) {
            this.direction = 'up';
            this.y -= this.speed;
            this.animation.gotoAndPlay('run_up');
        }
        else if (this.keyboard.pressed(this.getKeyboardControls(this.playerID).down)) {
            this.direction = 'down';
            this.y += this.speed;
            this.animation.gotoAndPlay('run_down');
        }
        else {
            this.playIdleAnimation();
        }
    }
    
    playIdleAnimation() {
        switch (this.direction) {
            case 'right':
                this.animation.gotoAndPlay('idle_side');
                this.flippedX = false;
                break;
            case 'left':
                this.animation.gotoAndPlay('idle_side');
                this.flippedX = true;
                break;
            case 'up':
                this.animation.gotoAndPlay('idle_up');
                break;
            case 'down':
                this.animation.gotoAndPlay('idle_down')
                break;
        }
    }

    shoot() {
        this.shootID == 0 ? this.shootID = 1 : this.shootID = 0;

        switch (this.direction) {
            case 'right':
                this.bulletCoordinates[0].x = this.x + this.width - 5;
                this.bulletCoordinates[0].y = this.y + this.height - 10;
                this.bulletCoordinates[1].x = this.x + this.width - 5;
                this.bulletCoordinates[1].y = this.y + this.height - 10;
                break;
            case 'left':  
                this.bulletCoordinates[0].x = this.x;
                this.bulletCoordinates[0].y = this.y + this.height - 10;
                this.bulletCoordinates[1].x = this.x;
                this.bulletCoordinates[1].y = this.y + this.height - 10;
                break;
            case 'up':
                this.bulletCoordinates[0].x = this.x + this.width - 10;
                this.bulletCoordinates[0].y = this.y + this.height / 2;
                this.bulletCoordinates[1].x = this.x;
                this.bulletCoordinates[1].y = this.y + this.height / 2;
                break;
            case 'down':
                this.bulletCoordinates[0].x = this.x + this.width - 10;
                this.bulletCoordinates[0].y = this.y + this.height - 5;
                this.bulletCoordinates[1].x = this.x;
                this.bulletCoordinates[1].y = this.y + this.height - 2;
                break;
        }
        var bullet = new Bullet(this.bulletCoordinates[this.shootID].x, this.bulletCoordinates[this.shootID].y, this.playerID, this.direction);

        this.stage.addChild(bullet);
        this.bullets.push(bullet);
    }

    animateCharacter() {
        this.animation.create('idle_down', [0,1], 4, true);
        this.animation.create('run_down', [4,5,6,7], 8, true);
        this.animation.create('idle_up', [8,9], 4, true);
        this.animation.create('run_up', [12,13,14,15], 8, true);
        this.animation.create('idle_side', [16,17], 4, true);
        this.animation.create('run_side', [20,21,22,23], 8, true);
        this.animation.play('idle_down');
    }

    getKeyboardControls(id){
        var controls = [
            {
                up: 'w',
                right: 'd',
                down: 's',
                left: 'a',
                shoot: 'SPACE',
                shootSecond: 'ENTER'
            },
            {
                up: 'up',
                right: 'right',
                down: 'down',
                left: 'left',
                shoot: 'ENTER',
                shootSecond: 'SPACE'
            }
        ]
        return controls[id];
    }
}