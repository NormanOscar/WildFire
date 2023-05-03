class Player extends rune.display.Sprite {
    constructor(x, y, playerID, area) {
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
        this.area = area;
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
        this.shootSound.volume = 2;
    }
    
    setHitbox() {
        this.hitbox.debug = true;
        this.hitbox.debugColor = 'blue';
        this.hitbox.set(6, 4, 19, 24);
    }

    update(step) {
        super.update(step);
        this.updateInput();
        this.stage.map.back.hitTestAndSeparate(this);

        this.checkHouseHit();

        if (this.status == 'dead') {
            this.animation.gotoAndPlay('dead');
            this.can_move = false;
        } else {
            this.can_move = true;
        }

        if (this.area.m_nrOfPlayers == 2) {
            if (this.area.m_players[0].status == 'dead' || this.area.m_players[1].status == 'dead') {
                this.checkRevive();
            }
        }
    }

    checkRevive() {
        if (this.playerID == 0) {
            if (this.hitTest(this.area.m_players[1]) && (this.gamepads.get(this.playerID).justPressed(4) || this.keyboard.justPressed(this.getKeyboardControls(this.playerID).revive))) {
                this.area.m_players[1].can_move = true;
                this.area.m_players[1].status = 'alive';
                console.log(this);
                this.area.cameras.getCameraAt(0).targets.add(this.area.m_players[1]);
                console.log('revived');
            }
            
        } else {
            if (this.hitTest(this.area.m_players[0]) && (this.gamepads.get(this.playerID).justPressed(4) || this.keyboard.justPressed(this.getKeyboardControls(this.playerID).revive))) {
                
                this.area.m_players[0].can_move = true;
                this.area.m_players[0].status = 'alive';
                this.area.cameras.getCameraAt(0).targets.add(this.area.m_players[0]);
                console.log('revived');
            }
        }
    }

    checkHouseHit() {
            for (let i = 0; i < this.area.houses.length; i++) {
                this.hitTestAndSeparate(this.area.houses[i], function() {
                    console.log('ouch!');
                });
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
        if (this.area.m_nrOfPlayers == 1) {
            if (this.m_gamepad.justPressed(1)) {
                this.shootSecond();
                this.shootSound.play();
            }   
        }
    }

    updateKeyboard() {
        if (this.area.m_nrOfPlayers == 1) {
            if (this.keyboard.justPressed(this.getKeyboardControls(0).shootSecond)) {
                this.shootSecond();
                this.shootSound.play();
            }   
        }

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

        this.changeBulletDirection();
        var bullet = new Bullet(this.bulletCoordinates[this.shootID].x, this.bulletCoordinates[this.shootID].y, this.playerID, this.direction);

        this.stage.addChild(bullet);
        this.bullets.push(bullet);
    }

    shootSecond() {
        this.shootID == 0 ? this.shootID = 1 : this.shootID = 0;

        this.changeBulletDirection();
        var bullet = new Bullet(this.bulletCoordinates[this.shootID].x, this.bulletCoordinates[this.shootID].y, 1, this.direction);

        this.stage.addChild(bullet);
        this.bullets.push(bullet);
    }

    changeBulletDirection() {
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
                this.bulletCoordinates[0].y = this.y + this.height / 2 - 4;
                this.bulletCoordinates[1].x = this.x;
                this.bulletCoordinates[1].y = this.y + this.height / 2 - 4;
                break;
            case 'down':
                this.bulletCoordinates[0].x = this.x + this.width - 10;
                this.bulletCoordinates[0].y = this.y + this.height - 5;
                this.bulletCoordinates[1].x = this.x;
                this.bulletCoordinates[1].y = this.y + this.height - 2;
                break;
        }
    }

    animateCharacter() {
        this.animation.create('idle_down', [0,1], 4, true);
        this.animation.create('run_down', [4,5,6,7], 8, true);
        this.animation.create('idle_up', [8,9], 4, true);
        this.animation.create('run_up', [12,13,14,15], 8, true);
        this.animation.create('idle_side', [16,17], 4, true);
        this.animation.create('run_side', [20,21,22,23], 8, true);
        this.animation.create('dead', [24], 1, false);
        this.animation.play('idle_down');
    }

    getKeyboardControls(id){
        var controls = [
            {
                up: 'w',
                right: 'd',
                down: 's',
                left: 'a',
                revive: 'r',
                shoot: 'SPACE',
                shootSecond: 'ENTER'
            },
            {
                up: 'up',
                right: 'right',
                down: 'down',
                left: 'left',
                revive: 'p',
                shoot: 'ENTER',
            }
        ]
        return controls[id];
    }
}