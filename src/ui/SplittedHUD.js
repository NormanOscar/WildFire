class SplittedHUD extends rune.display.DisplayObjectContainer {
    constructor(area, width, height, playerID) {
        super(0, 0, width, height);
        this.area = area;
        this.playerID = playerID;
    }

    init() {
        super.init();

        this.m_initFrame();
        this.m_initPlayerText();
    }

    m_initFrame() {
        var frame = new rune.display.Graphic(0, 0, this.width, this.height, "player" + this.playerID + "_frame");

        this.addChild(frame);
    }

    m_initPlayerText() {
        this.m_playerText = new rune.text.BitmapField('Player ' + this.playerID, rune.text.BitmapFormat.FONT_MEDIUM);
        this.addChild(this.m_playerText);
        
        this.m_playerText.width = this.m_playerText.textWidth;

        console.log(this.m_playerText.width, this.m_playerText.height);

        this.playerID == 1 ? this.m_playerText.x = 5 : this.m_playerText.x = this.width - (this.m_playerText.width + 5);
        this.m_playerText.y = this.height - this.m_playerText.height;
    }

    update(step) {
        super.update(step);
    }
    
    dispose() {
        super.dispose();
    }
}