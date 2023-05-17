class NewHighscore extends rune.scene.Scene {
    constructor(score, nrOfPlayers) {
        super();
        this.menuItems = [];
        this.menuSelected = 0;
        this.score = score;
        this.m_nrOfPlayers = nrOfPlayers;
    }

    init() {
        super.init();
        this.m_initSound();
        
        this.m_initBackground();
        this.initTitle();

        var charWheelX = -80;
        for (let i = 0; i < 3; i++) {
            var charWheel = new CharacterWheel(charWheelX, this);

            this.menuItems.push(charWheel);
            this.stage.addChild(charWheel);
            charWheelX += 50;
        }
        this.menuItems[0].selected = true;
        console.table({
            "this.menuItems[0].selected": this.menuItems[0].selected,
            "this.menuItems[1].selected": this.menuItems[1].selected,
            "this.menuItems[2].selected": this.menuItems[2].selected
        })

        this.initSaveBtn();
    }

    m_initSound() {
        this.m_sound = this.application.sounds.sound.get("menu_select", true);
        this.m_sound.volume = 0.2;
    }
    
    m_initBackground() {
        this.stage.backgroundColor = 'Orange';
    }

    initTitle() {
        var m_title = new rune.text.BitmapField('New Highscore!', rune.text.BitmapFormat.FONT_MEDIUM);
        m_title.width = m_title.textWidth;
        this.stage.addChild(m_title);
        m_title.centerX = this.application.screen.centerX;
        m_title.y = this.application.screen.y + 40;
    }

    initSaveBtn() {
        var saveBtn = new MenuBtn("save_btn");
        saveBtn.centerX = this.application.screen.width / 4 * 3;
        saveBtn.centerY = this.application.screen.centerY;
        this.stage.addChild(saveBtn);
        this.menuItems.push(saveBtn);
    }

    update(step) {
        super.update(step);
        this.m_updateInput();
    }

    m_updateInput() {
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

        if (this.keyboard.justPressed("ENTER") || this.gamepads.justPressed(9)) {
            if (this.menuSelected == 3) {
                var name = this.menuItems[0].text + this.menuItems[1].text + this.menuItems[2].text;
                console.log(name);

                this.application.highscores.send(this.score, name, this.m_nrOfPlayers - 1);
                this.application.scenes.load([ new Menu() ]);
            }
        }
    }

    dispose() {
        super.dispose();
    }
}