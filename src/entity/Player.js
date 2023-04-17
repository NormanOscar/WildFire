class Player extends rune.display.Sprite {
    constructor(x, y, playerID) {
        super(x, y, 32, 32, "player" + playerID);
        this.playerID = playerID;

        this.speed = 5;
        this.m_animation = null;
        this.m_gamepad = null;
        this.m_score = null;
        this.bullets = new Array();
        this.direction = 'down';
    }
    
    init() {
        super.init();
        this.animateCharacter();
        this.setHitbox();
    }
    
    setHitbox() {
        this.hitbox.debug = true;
        this.hitbox.debugColor = 'blue';
        this.hitbox.set(4, 2, 23, 26);
    }

    update(step) {
        super.update(step);
        this.updateInput();
        this.stage.map.back.hitTestAndSeparateObject(this);
    }

    updateInput() {
        this.updateGamepad();
        this.updateKeyboard();
    }

    updateGamepad() {
        this.m_gamepad = this.gamepads.get(this.playerID);
        if (this.m_gamepad.connected) {
            if (this.m_gamepad.stickLeft) {
                this.x += this.m_gamepad.stickLeft.x * this.speed;
                this.y += this.m_gamepad.stickLeft.y * this.speed;
            }
            if (this.m_gamepad.justPressed(1)) {
                this.shoot();
            }
        }
    }

    updateKeyboard() {
        if (this.keyboard.justPressed(this.getKeyboardControls(this.playerID).shoot)) {
            this.shoot();
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
    }

    shoot() {
        var x = this.x + (this.width / 2 - 5);
        var y = this.y + (this.height / 2 - 2);
        var bullet = new Bullet(x, y, this.playerID, this.direction);

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
                shoot: 'SPACE'
            },
            {
                up: 'up',
                right: 'right',
                down: 'down',
                left: 'left',
                shoot: 'ENTER'
            }
        ]
        return controls[id];
    }
}