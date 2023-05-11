class MainHUD extends rune.display.DisplayObjectContainer {
    constructor(area, width, height) {
        super(0, 0, width, height);
        this.m_scoreCounter = null;
        this.m_miniMap = null;
        this.area = area;
    }

    init() {
        super.init();

        this.m_initMiniMap();
        this.m_initFrame();
        this.m_initScore();

    }

    m_initMiniMap() {
        if (this.m_miniMap == null) {
            this.m_miniMap = new Minimap(this.area, this.area.cameras.getCameraAt(0).width - 96, 3, 'main');
            this.addChild(this.m_miniMap);
        }
    }

    m_initScore() {
        if (this.m_scoreCounter == null) {
            this.m_scoreCounter = new Score('Score: ' + this.area.m_totalScore.toString());

            this.addChild(this.m_scoreCounter);
        }
    }

    m_initFrame() {
        var frame = new rune.display.Graphic(0, 0, this.width, this.height, "main_frame");

        this.addChild(frame);
    }

    m_updateScore() {
        this.m_scoreCounter.text = 'Score: ' + this.area.m_totalScore.toString();
    }

    update(step) {
        super.update(step);
        this.m_updateScore();
    }
    
    dispose() {
        super.dispose();
    }
}