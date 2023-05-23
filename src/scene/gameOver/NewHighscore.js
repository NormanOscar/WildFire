class NewHighscore extends rune.scene.Scene {
    constructor(score, nrOfPlayers) {
        super();
        this.menuItems = [];
        this.menuSelected = 0;
        this.playerTwoMenuItems = [];
        this.playerTwoMenuSelected = 0;
        this.score = score || 100;
        this.m_nrOfPlayers = nrOfPlayers || 2;
        this.m_sound = null;
        this.title = null;
        this.scoreTitle = null;
        this.scoreText = null;
        this.namePickerTitle = null;
    }

    init() {
        super.init();
        this.m_initSound();
        
        this.m_initBackground();
        this.initTitle();
        this.initScoreTitle();
        this.initScoreText();
        
        this.initNamePickerTitle();

        if (this.m_nrOfPlayers == 1) {
            this.initOneCharWheels();
        } else {
            this.initTwoPlayerCharWheels();
        }        
    }

    m_initSound() {
        this.m_sound = this.application.sounds.sound.get("menu_select", true);
        this.m_sound.volume = 0.2;
    }
    
    m_initBackground() {
        var m_background = new rune.display.Sprite(0, 0, 400, 225, "newHighscore_background");
        this.stage.addChild(m_background);
    }

    initTitle() {
        this.title = new rune.display.Sprite(0, 0, 272, 26, "newHighscore_title");
        this.title.centerX = this.application.screen.centerX;
        this.title.y = this.m_nrOfPlayers == 1 ? 20 : 10;
        this.title.animation.create("idle", [0, 1, 2, 3], 6, true);
        this.title.animation.play("idle");
        this.stage.addChild(this.title);
    }

    initScoreTitle() {
        this.scoreTitle = new rune.text.BitmapField('Score:', rune.text.BitmapFormat.FONT_MEDIUM);
        this.scoreTitle.width = this.scoreTitle.textWidth;
        this.scoreTitle.centerX = this.application.screen.centerX;
        this.scoreTitle.centerY = this.m_nrOfPlayers == 1 ? this.application.screen.centerY - 40 : this.application.screen.centerY - 60;
        this.stage.addChild(this.scoreTitle);
    }
    
    initScoreText() {
        this.scoreText = new rune.text.BitmapField(this.score.toString(), rune.text.BitmapFormat.FONT_MEDIUM);
        this.scoreText.width = this.scoreText.textWidth;
        this.scoreText.centerX = this.application.screen.centerX;
        this.scoreText.centerY = this.scoreTitle.centerY + 15;
        this.stage.addChild(this.scoreText);
    }

    initNamePickerTitle() {
        this.namePickerTitle = new rune.text.BitmapField('Pick your name:', rune.text.BitmapFormat.FONT_MEDIUM);
        this.namePickerTitle.width = this.namePickerTitle.textWidth;
        this.namePickerTitle.centerX = this.application.screen.centerX;
        this.namePickerTitle.centerY = this.m_nrOfPlayers == 1 ? this.application.screen.centerY + 20 : this.application.screen.centerY - 20;
        this.stage.addChild(this.namePickerTitle);
    }

    initOneCharWheels() {
        var charWheelX = 80;
        var charWheelY = this.application.screen.centerY + 60;
        for (let i = 0; i < 3; i++) {
            var charWheel = new CharWheel(charWheelX, charWheelY, this, 0);

            this.menuItems.push(charWheel);
            this.stage.addChild(charWheel);
            charWheelX += 50;
        }
        this.menuItems[0].selected = true;
        this.initSaveBtn(80, charWheelY);
    }

    initTwoPlayerCharWheels() {
        var charWheelX = 120;
        var charWheelY = this.application.screen.centerY + 20;
        for (let i = 0; i < 3; i++) {
            var charWheel = new CharWheel(charWheelX, charWheelY, this, 0);
            this.menuItems.push(charWheel);
            this.stage.addChild(charWheel);
            charWheelX += 50;
        }
        this.menuItems[0].selected = true;
        this.initPlayerTitle(30, charWheelY, 1);

        var playerTwoCharWgeelX = 120;
        var playerTwoCharWheelY = this.application.screen.centerY + 80;
        for (let i = 0; i < 3; i++) {
            var charWheel = new CharWheel(playerTwoCharWgeelX, playerTwoCharWheelY, this, 1);
            this.playerTwoMenuItems.push(charWheel);
            this.stage.addChild(charWheel);
            playerTwoCharWgeelX += 50;
        }
        this.playerTwoMenuItems[0].selected = true;
        this.initPlayerTitle(30, playerTwoCharWheelY, 2);
        this.initSaveBtn(30, charWheelY);
    }

    initPlayerTitle(initX, initY, id) {
        var playerTitle = new rune.text.BitmapField('Player ' + id + ':', rune.text.BitmapFormat.FONT_MEDIUM);
        playerTitle.width = playerTitle.textWidth;
        playerTitle.x = initX;
        playerTitle.centerY = initY;
        this.stage.addChild(playerTitle);
    }

    initSaveBtn(initX, initY) {
        var saveBtn = new SaveBtn();
        saveBtn.x = this.application.screen.width - saveBtn.width - initX;
        saveBtn.centerY = initY;
        this.stage.addChild(saveBtn);
        this.menuItems.push(saveBtn);
    }

    update(step) {
        super.update(step);
        this.m_updateInput();
    }

    m_updateInput() {
        this.updatePlayerOneInput();

        if (this.m_nrOfPlayers == 2) {
            this.updatePlayerTwoInput();
        }
    }
    
    updatePlayerOneInput() {
        if (this.keyboard.justPressed("a") || this.gamepads.get(0).stickLeftJustLeft || this.gamepads.get(0).justPressed(14)) {
            if (this.menuSelected != 0) {
                this.menuItems[this.menuSelected].selected = false;
                if (this.menuSelected != 3) {
                    this.menuItems[this.menuSelected].frame.visible = false;
                }
                this.menuSelected--;
                this.menuItems[this.menuSelected].selected = true;
                this.m_sound.play();
            }
        }
        
        if (this.keyboard.justPressed("d") || this.gamepads.get(0).stickLeftJustRight || this.gamepads.get(0).justPressed(15)) {
            if (this.menuSelected != 3) {
                this.menuItems[this.menuSelected].selected = false;
                this.menuItems[this.menuSelected].frame.visible = false;
    
                this.menuSelected++;
                this.menuItems[this.menuSelected].selected = true;
                this.m_sound.play();
            }
        }
    
        if (this.keyboard.justPressed("SPACE") || this.gamepads.get(0).justPressed(1)) {
            if (this.menuSelected == 3) {
                var name = this.menuItems[0].text + this.menuItems[1].text + this.menuItems[2].text;
                console.log(name);
                if (this.m_nrOfPlayers == 2) {
                    name += "&" + this.playerTwoMenuItems[0].text + this.playerTwoMenuItems[1].text + this.playerTwoMenuItems[2].text;
                }
    
                this.application.highscores.send(this.score, name, this.m_nrOfPlayers - 1);
                this.application.scenes.load([ new Menu() ]);
            }
        }
    }

    updatePlayerTwoInput() {
        if (this.keyboard.justPressed("left") || this.gamepads.get(1).stickLeftJustLeft || this.gamepads.get(1).justPressed(14)) {
            if (this.playerTwoMenuSelected != 0) {
                this.playerTwoMenuItems[this.playerTwoMenuSelected].selected = false;
                this.playerTwoMenuItems[this.playerTwoMenuSelected].frame.visible = false;
                this.playerTwoMenuSelected--;
                this.playerTwoMenuItems[this.playerTwoMenuSelected].selected = true;
                this.m_sound.play();
            }
        }
        
        if (this.keyboard.justPressed("right") || this.gamepads.get(1).stickLeftJustRight || this.gamepads.get(1).justPressed(15)) {
            if (this.playerTwoMenuSelected != 2) {
                this.playerTwoMenuItems[this.playerTwoMenuSelected].selected = false;
                this.playerTwoMenuItems[this.playerTwoMenuSelected].frame.visible = false;
    
                this.playerTwoMenuSelected++;
                this.playerTwoMenuItems[this.playerTwoMenuSelected].selected = true;
                this.m_sound.play();
            }
        }
    }

    dispose() {
        super.dispose();
    }
}