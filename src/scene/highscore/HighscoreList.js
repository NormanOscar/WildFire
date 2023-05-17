class HighscoreList extends rune.ui.VTList {
    constructor(area, text, type) {
        super(rune.text.BitmapFormat.FONT_MEDIUM);

        this.id = null;
        this.area = area;
        this.listType = type;
        this.header = text;
        this.is_empty = false;
    }

    init() {
        super.init();
        this.id = this.listType == 'single' ? 0 : 1;
        this.initHeader();
        this.initHighscores();
        this.centerX = this.application.screen.width / 4 * 3 - 25;
        this.y = 60;
    }
    
    initHeader() {
        this.add(this.header);
        const header = this.getAt(0);
        
        header.width = header.textWidth;
        this.add(' ');
    }

    initHighscores() {
        for (let i = 0; i < 8; i++) {
            const score = this.application.highscores.get(i, this.id);
            if (i == 0 && score == null) {
                this.is_empty = true;
                this.add('No highscores yet');
                return;
            } 
            if (!this.is_empty) {
                if (score == null) return;
                const d = new Date(score.date);
                const date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear().toString().slice(2, 4);
                const scoreText = ('NO' + (i + 1)) + ': ' + String(score.score) + ' - ' + score.name + ' - ' + date;
                this.add(scoreText);
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