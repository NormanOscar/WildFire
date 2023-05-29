/**
 * Creates a new player object.
 *
 * @extends rune.display.Sprite
 * 
 * @class
 * @classdesc
 * 
 * Player sprite.
 */
class Player extends rune.display.Sprite {
    /**
     * Calls the constructor method of the super class.
     * 
     * @param {number} x The x coordinate of the object.
     * @param {number} y The y coordinate of the object.
     * @param {number} playerID The player ID.
     * @param {object} instance The game instance object.
     * 
     * @returns {undefined}
     */
    constructor(x, y, playerID, instance) {
        super(x, y, 32, 32, "player" + playerID);
        this.playerID = playerID;
        this.coPlayerID = playerID == 0 ? 1 : 0;

        this.speed = 5;
        this.m_gamepad = null;
        this.bullets = new Array();
        this.direction = 'down';
        this.can_move = true;
        this.status = 'alive';
        this.deathSound = null;
        this.shootSound = null;
        this.shootSecondSound = null;
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
        this.shotID = 0;
        this.m_gameInstance = instance;
        this.MainWeaponsText = null;
        this.SplittedWeaponsText = null;
    }
    
    /**
     * This method is automatically executed once after the sprite is instantiated.
     * This method is used to initialize the sprite.
     *
     * @returns {undefined}
     */
    init() {
        super.init();
        this.setSounds();
        this.animateCharacter();
        this.setHitbox();

        if (this.m_gameInstance.m_nrOfPlayers == 2) {
            this.initWeaponsText();
        }
    }

    /**
     * This method is used to initialize the sound effects.
     * 
     * @returns {undefined}
     */
    setSounds() {
        this.deathSound = this.application.sounds.sound.get("player_die", true);
        this.deathSound.volume = 0.5;
        if (this.playerID == 0) {
            this.shootSound = this.application.sounds.sound.get("gun_shoot", false);
            this.shootSecondSound = this.application.sounds.sound.get("water_shoot", false);
        }
        if (this.playerID == 1) {
            this.shootSound = this.application.sounds.sound.get("water_shoot", false);
            this.shootSecondSound = this.application.sounds.sound.get("gun_shoot", false);
        }
        this.shootSound.volume = 2;
        this.shootSecondSound.volume = 2;
    }
    
    /**
     * This method is used to set the hitbox of the player.
     * 
     * @returns {undefined}
     */
    setHitbox() {
        this.hitbox.set(6, 4, 19, 28);
    }

    /**
     * This method is automatically executed once per "tick". 
     * The method is used for to apply the player logic.
     *
     * @param {number} step Fixed time step.
     *
     * @returns {undefined}
     */
    update(step) {
        super.update(step);
        if (this.m_gameInstance.gameStarted) {
            this.updateInput();
            this.stage.map.back.hitTestAndSeparate(this);
    
            this.checkFireTileCollision();
            this.checkEnemyCollision();
    
            // Check if player is dead
            if (this.status == 'dead') {
                this.animation.gotoAndPlay('dead');
                this.can_move = false;
            } else {
                this.can_move = true;
            }
    
            // Check if coplayer is dead, if so then player can revive
            if (this.m_gameInstance.m_nrOfPlayers == 2) {
                if (this.m_gameInstance.m_players[this.coPlayerID].status == 'dead') {
                    this.checkRevive();
                }
            }
        }
    }

    initWeaponsText() {
        this.mainWeaponsText = new PopUpText('Player ' + (this.coPlayerID + 1) + ' can now shoot second');
        this.m_gameInstance.cameras.getCameraAt(0).addChild(this.mainWeaponsText);

        this.splittedWeaponsText = new PopUpText('Player ' + (this.playerID + 1) + ' can now shoot second');
        this.application.screen.addChild(this.splittedWeaponsText);
    }

    showWeaponsText() {
        this.m_gameInstance.m_camera_is_splitted ? this.splittedWeaponsText.visible = true : this.mainWeaponsText.visible = true;

        this.m_gameInstance.timers.create({
            duration: 1500,
            onComplete: function () {
                console.log('test');
                this.m_gameInstance.m_camera_is_splitted ? this.splittedWeaponsText.visible = false : this.mainWeaponsText.visible = false;
            },
            scope: this,
        });
    }

    /**
     * This method is used to check if player can revive.
     * 
     * @returns {undefined}
     */
    checkRevive() {
        if (this.playerID == 0) {
            if (this.hitTest(this.m_gameInstance.m_players[1]) && (this.gamepads.get(this.playerID).justPressed(2) || this.keyboard.justPressed(this.getKeyboardControls(this.playerID).revive))) {
                this.m_gameInstance.m_players[1].can_move = true;
                this.m_gameInstance.m_players[1].status = 'alive';
                this.m_gameInstance.cameras.getCameraAt(0).targets.add(this.m_gameInstance.m_players[1]);
            }
            
        } else {
            if (this.hitTest(this.m_gameInstance.m_players[0]) && (this.gamepads.get(this.playerID).justPressed(2) || this.keyboard.justPressed(this.getKeyboardControls(this.playerID).revive))) {
                this.m_gameInstance.m_players[0].can_move = true;
                this.m_gameInstance.m_players[0].status = 'alive';
                this.m_gameInstance.cameras.getCameraAt(0).targets.add(this.m_gameInstance.m_players[0]);
            }
        }
    }

    /**
     * This method is used to check collision between player and fire.
     * 
     * @returns {undefined}
     */
    checkFireTileCollision() {
        if (this.status != 'dead') {
            for (const fire of this.m_gameInstance.fireController.burningFires) {
                if (fire) {
                    this.hitTestContentOf(fire.tileArr, function () {
                        const player = arguments[0];
                        player.m_gameInstance.cameras.getCameraAt(0).targets.remove(player);
                        player.status = 'dead';
                        if (this.m_gameInstance.m_players[this.coPlayerID].status != 'dead') {
                            this.showWeaponsText();
                        }
                        player.deathSound.play();
                    }, this);
                }
            }
        }
    }

    /**
     * This method is used to check collision between player and enemy.
     * 
     * @returns {undefined}
     */
    checkEnemyCollision() {
        if (this.status != 'dead') {
            this.hitTestContentOf(this.m_gameInstance.m_enemies, function () {
                const player = arguments[0];
                player.m_gameInstance.cameras.getCameraAt(0).targets.remove(player);
                player.status = 'dead';
                if (this.m_gameInstance.m_players[this.coPlayerID].status != 'dead') {
                    this.showWeaponsText();
                }
                player.deathSound.play();
            }, this);
        }
    }

    /**
     * This method is used to update the input of the player.
     * 
     * @returns {undefined}
     */
    updateInput() {
        if (this.can_move) {
            var m_gamepad = this.gamepads.get(this.playerID);
            if (m_gamepad.connected) {
                this.updateGamepad(m_gamepad);
            } else {
                this.updateKeyboard();
            }
        }
    }

    /**
     * This method is used to update the gamepad input of the player.
     * 
     * @returns {undefined}
     */
    updateGamepad(m_gamepad) {
        if (m_gamepad.stickLeft) {
            this.x += m_gamepad.stickLeft.x * this.speed;
            this.y += m_gamepad.stickLeft.y * this.speed;

            if (m_gamepad.stickLeftRight) {
                this.direction = 'right';
                this.animation.gotoAndPlay('run_side');
                this.flippedX = false;
            }
            else if (m_gamepad.stickLeftDown) {
                this.direction = 'down';
                this.animation.gotoAndPlay('run_down');
            }
            else if (m_gamepad.stickLeftLeft) {
                this.direction = 'left';
                this.animation.gotoAndPlay('run_side');
                this.flippedX = true;
            }
            else if (m_gamepad.stickLeftUp) {
                this.direction = 'up';
                this.animation.gotoAndPlay('run_up');
            }
            else {
                this.playIdleAnimation();
            }
        }
        if (m_gamepad.justPressed(1)) {
            this.shoot();
            this.shootSound.play();
        }
        if (this.m_gameInstance.m_nrOfPlayers == 1 || this.m_gameInstance.m_players[this.coPlayerID].status == 'dead') {
            if (m_gamepad.justPressed(0)) {
                this.shootSecond();
                this.shootSecondSound.play();
            }   
        }
    }

    /**
     * This method is used to update the keyboard input of the player.
     * 
     * @returns {undefined}
     */
    updateKeyboard() {
        if (this.m_gameInstance.m_nrOfPlayers == 1 || this.m_gameInstance.m_players[this.coPlayerID].status == 'dead') {
            if (this.keyboard.justPressed(this.getKeyboardControls(this.playerID).shootSecond)) {
                this.shootSecond();
                this.shootSecondSound.play();
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
    
    /**
     * This method is used to play the idle animation of the player depending on the direction.
     * 
     * @returns {undefined}
     */
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

    /**
     * This method is used to create a bullet and add it to the stage.
     * 
     * @returns {undefined}
     */
    shoot() {
        this.shotID == 0 ? this.shotID = 1 : this.shotID = 0;

        this.changeBulletDirection();
        var bullet = new Bullet(this.bulletCoordinates[this.shotID].x, this.bulletCoordinates[this.shotID].y, this.playerID, this.direction, this.m_gameInstance, this);

        this.stage.addChild(bullet);
        this.bullets.push(bullet);
    }

    /**
     * This method is used to create a secondary bullet and add it to the stage.
     * 
     * @returns {undefined}
     */
    shootSecond() {
        this.shotID == 0 ? this.shotID = 1 : this.shotID = 0;

        this.changeBulletDirection();
        var bullet = new Bullet(this.bulletCoordinates[this.shotID].x, this.bulletCoordinates[this.shotID].y, this.coPlayerID, this.direction, this.m_gameInstance, this);

        this.stage.addChild(bullet);
        this.bullets.push(bullet);
    }

    /**
     * This method is used to change the bullet coordinates depending on the direction of the player.
     * 
     * @returns {undefined}
     */
    changeBulletDirection() {
        switch (this.direction) {
            case 'right':
                this.bulletCoordinates[0].x = this.x + this.width - 5;
                this.bulletCoordinates[0].y = this.y + this.height - 10;
                this.bulletCoordinates[1].x = this.x + this.width - 5;
                this.bulletCoordinates[1].y = this.y + this.height - 10;
                break;
            case 'left':  
                this.bulletCoordinates[0].x = this.x - 5;
                this.bulletCoordinates[0].y = this.y + this.height - 10;
                this.bulletCoordinates[1].x = this.x - 5;
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

    /**
     * This method is used to animate the character.
     * 
     * @returns {undefined}
     */
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

    /**
     * This method is used to get the keyboard controls of the player.
     * 
     * @param {type} id The id of the player.
     * 
     * @returns {object} The keyboard controls of the player.
     */
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
                shootSecond: 'SPACE'
            }
        ]
        return controls[id];
    }
}