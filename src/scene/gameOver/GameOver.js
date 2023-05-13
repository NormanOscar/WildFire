class GameOver extends rune.scene.Scene {
    constructor(score, nr) {
        super();
        this.score = score || 1000;
        this.m_nrOfPlayers = nr || 1;
        this.menuSelected = 0;
        this.menuBtns = [];
    }

    init() {
        super.init();

        this.m_initBackground();
        this.m_initSound();
        this.m_initScore();

        this.m_initMenu();
    }

    m_initSound() {
        this.m_sound = this.application.sounds.sound.get("menu_select", true);
        this.m_sound.volume = 0.2;
    }

    m_initBackground() {
        var m_background = new rune.display.Sprite(0, 0, 400, 225, "gameover_background");
        this.stage.addChild(m_background);
    }

    m_initScore() {
        var m_scoreTitle = new rune.text.BitmapField('Score:', rune.text.BitmapFormat.FONT_MEDIUM);
        m_scoreTitle.width = m_scoreTitle.textWidth;
        this.stage.addChild(m_scoreTitle);
        m_scoreTitle.centerX = this.application.screen.centerX;

        m_scoreTitle.centerY = this.application.screen.centerY - 20;
        
        var m_scoreText = new rune.text.BitmapField(this.score.toString(), rune.text.BitmapFormat.FONT_MEDIUM);
        m_scoreText.width = m_scoreText.textWidth;
        this.stage.addChild(m_scoreText);
        m_scoreText.centerX = this.application.screen.centerX;
        m_scoreText.y = this.application.screen.centerY;
    }

    m_initMenu() {
        this.playAgainBtn = new MenuBtn("play_again_btn");
        this.playAgainBtn.centerX = this.application.screen.centerX;
        this.playAgainBtn.y = this.application.screen.height - 75;
        this.playAgainBtn.selected = true;
        this.stage.addChild(this.playAgainBtn);
        this.menuBtns.push(this.playAgainBtn);

        this.mainMenuBtn = new MenuBtn("main_menu_btn");
        this.mainMenuBtn.centerX = this.application.screen.centerX;
        this.mainMenuBtn.y = this.application.screen.height - 40;
        this.stage.addChild(this.mainMenuBtn);
        this.menuBtns.push(this.mainMenuBtn);
    }

    update() {
        super.update();
        this.m_updateInput();
    }

    m_updateInput() {
        if (this.keyboard.justPressed("w") || this.gamepads.get(0).stickLeftJustUp || this.gamepads.get(0).justPressed(12)) {
            this.menuBtns[this.menuSelected].selected = false;
            this.menuSelected == 0 ? this.menuSelected++ : this.menuSelected--;
            this.menuBtns[this.menuSelected].selected = true;
            this.m_sound.play();
        }
        
        if (this.keyboard.justPressed("s") || this.gamepads.get(0).stickLeftJustDown || this.gamepads.get(0).justPressed(13)) {
            this.menuBtns[this.menuSelected].selected = false;
            this.menuSelected == 1 ? this.menuSelected-- : this.menuSelected++;
            this.menuBtns[this.menuSelected].selected = true;
            this.m_sound.play();
        }
        
        if (this.keyboard.justPressed("SPACE") || this.gamepads.justPressed(0)) {
            if (this.menuSelected == 0) {
                this.application.scenes.load( [new Game(this.m_nrOfPlayers)] );
            } else {
                this.application.scenes.load( [new Menu()] );
            }
        }
    }


    dispose() {
        super.dispose();
    }
}