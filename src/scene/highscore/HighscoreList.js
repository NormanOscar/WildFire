class HighscoreList extends rune.ui.VTList {
    constructor(area, text, type) {
        super(rune.text.BitmapFormat.FONT_MEDIUM);

        this.id = null;
        this.area = area;
        this.listType = type;
        this.header = text;
    }

    init() {
        super.init();
        this.id = this.listType == 'single' ? 0 : 1;
        this.initHeader();
        this.initHighscores();
        this.centerX = this.listType == 'single' ? 74 : 326;
        this.y = 80;
    }
    
    initHeader() {
        this.add(this.header);
        const header = this.getAt(0);
        
        header.width = header.textWidth;
    }

    initHighscores() {
        
        for (let i = 0; i < 8; i++) {
            const score = this.area.highscores.get(i, this.id);
            if (score == null) {
                const errorMsg = new rune.text.BitmapField('No highscores yet', rune.text.BitmapFormat.FONT_MEDIUM);
                this.add(errorMsg);
            } else {
                const highscoreText = new rune.text.BitmapField('Nr' + (i + 1) + '. ' + score.name + ' - ' + score.score, rune.text.BitmapFormat.FONT_MEDIUM);
                this.add(highscoreText);
            }
        }
    }

    update(step) {
        super.update(step);
    }

    dispose() {
        super.dispose();
    }
}