class HUD extends rune.display.DisplayObjectContainer {
    constructor(area, score) {
        super(0, 0, this.application.screen.width, this.application.screen.height);
        this.m_scoreCounter = score;
        this.m_miniMap = null;
        this.area = area;
    }

    init() {
        super.init();
        //this.m_initScore();
        this.m_initMiniMap();
    }

    m_initMiniMap() {
        if (this.m_miniMap == null) {
            this.m_miniMap = new MiniMap(this.area);
            this.addChild(this.m_miniMap);
        }
    }

    m_initScore() {
        if (this.m_scoreCounter == null) {
            this.m_scoreCounter = new Score(this.m_scoreCounter);

            this.addChild(this.m_scoreCounter);
        }
    }

    update(step) {
        super.update(step);
    }
    
    dispose() {
        super.dispose();
    }
}