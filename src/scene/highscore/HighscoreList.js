/**
 * Creates a new object.
 *
 * @extends rune.ui.VTList
 * 
 * @class
 * @classdesc
 * 
 * New highscore list.
 */
class HighscoreList extends rune.ui.VTList {
    /**
     * Calls the constructor method of the super class.
     * 
     * @param {string} header The header to display.
     * @param {string} type The type of list to display, singleplayer or co-op.
     * 
     * @returns {undefined} 
     */
    constructor(header, type) {
        super(rune.text.BitmapFormat.FONT_MEDIUM);

        this.id = type == 'single' ? 0 : 1;
        this.header = header;
        this.is_empty = false;
    }

    /**
     * Initializes the object.
     * 
     * @returns {undefined}
     */
    init() {
        super.init();
        this.initHeader();
        this.initHighscores();
        this.centerX = this.application.screen.width / 4 * 3 - 25;
        this.y = 60;
    }
    
    /**
     * Initializes the header of the list.
     * 
     * @returns {undefined}
     */
    initHeader() {
        this.add(this.header);
        const header = this.getAt(0);
        header.width = header.textWidth;

        // Add blank row
        this.add(' ');
    }

    /**
     * Gets and prints the highscores of the list.
     * 
     * @returns {undefined}
     */
    initHighscores() {
        for (let i = 0; i < 5; i++) {
            const score = this.application.highscores.get(i, this.id);

            // If no highscores yet
            if (i == 0 && score == null) {
                this.is_empty = true;
                this.add('No highscores yet');
                return;
            } 

            // If highscores exist, print it
            if (!this.is_empty) {
                if (score == null) return;
                const d = new Date(score.date);
                const date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear().toString().slice(2, 4);
                const scoreText = ('NO' + (i + 1)) + ': ' + String(score.score) + ' - ' + score.name + ' - ' + date;
                this.add(scoreText);
            }
        }
    }

    /**
     * This method is automatically executed once per "tick". The method is used for 
     * calculations such as application logic.
     *
     * @param {number} step Fixed time step.
     *
     * @returns {undefined}
     */
    update(step) {
        super.update(step);
    }

    /**
     * Removes list. The process is performed in order to avoid memory leaks.
     */
    dispose() {
        super.dispose();
    }
}