class GameOver extends rune.scene.Scene {
    constructor(score, nr) {
        super();
        this.score = score;
        this.m_nrOfPlayers = nr || 2;
    }

    init() {
        super.init();

        this.m_initBackground();
        this.m_initTitle();
        this.m_initSound();
        this.m_initScore();

        this.m_initMenu();
    }

    m_initSound() {
        this.m_sound = this.application.sounds.sound.get("menu_select", true);
        this.m_sound.volume = 0.2;
    }

    m_initBackground() {
        var m_background = new rune.display.Sprite(0, 0, 400, 225, "menu_background");
        this.stage.addChild(m_background);
    }

    m_initTitle() {
        var m_title = new rune.display.Graphic(this.cameras.getCameraAt(0).width / 2 - 134, 10, 268, 51, "gameOver");
        this.stage.addChild(m_title);
    }

    m_initScore() {
        var m_scoreTitle = new rune.text.BitmapField('Score: ', rune.text.BitmapFormat.FONT_MEDIUM);
        this.stage.addChild(m_scoreTitle);
        m_scoreTitle.x = this.cameras.getCameraAt(0).centerX - 20;
        m_scoreTitle.y = this.cameras.getCameraAt(0).centerY - 20;
        
        var m_scoreText = new rune.text.BitmapField(this.score.toString(), rune.text.BitmapFormat.FONT_MEDIUM);
        this.stage.addChild(m_scoreText);
        m_scoreText.x = this.cameras.getCameraAt(0).centerX - 5;
        m_scoreText.y = this.cameras.getCameraAt(0).centerY;
    }

    m_initMenu() {
        this.m_menu = new rune.ui.VTMenu();
        this.m_menu.onSelect(this.m_onMenuSelect, this);
        this.m_menu.add("Play again");
        this.m_menu.add("Main menu");
        this.m_menu.x = (this.cameras.getCameraAt(0).width / 2) - (this.m_menu.width / 2);
        this.m_menu.y = this.cameras.getCameraAt(0).centerY + 70;
        this.stage.addChild(this.m_menu);
    }

    m_onMenuSelect(element) {
        switch (element.text) {
            case "Play again":
                this.application.scenes.load( [new Game(this.m_nrOfPlayers)] );
                break;
            case "Main menu":
                this.application.scenes.load( [new Menu()] );
                break;
        }
    }

    update() {
        super.update();
        this.m_updateInput();
    }

    m_updateInput() {
        if (this.keyboard.justPressed("w") || /* this.gamepads.get(0).stickLeft.y < 0 */ this.gamepads.get(0).justPressed(12)) {
            if (this.m_menu.up()) {
                this.m_sound.play();
            }
        }
        
        if (this.keyboard.justPressed("s") || /* this.gamepads.get(0).stickLeft.y > 0 */ this.gamepads.get(0).justPressed(13)) {
            if (this.m_menu.down()) {
                this.m_sound.play();
            }
        }
        
        if (this.keyboard.justPressed("SPACE") || this.gamepads.justPressed(1)) {
            this.m_menu.select();
        }
    }


    dispose() {
        super.dispose();
    }
}