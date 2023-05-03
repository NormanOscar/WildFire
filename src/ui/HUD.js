class HUD extends rune.display.DisplayObjectContainer {
    constructor(score) {
        super(0, 0, 1280, 720, "");
        this.m_score = score;
    }

    init() {
        super.init();
    }

    m_initScore() {
        if (this.m_score == null) {
            this.m_score = new Score(this.m_score);
            this.m_score.x = 500;
            this.m_score.y = 200;
            this.addChild(this.m_score);
        }
    }

    update(step) {
        super.update(step);
    }
    
    dispose() {
        super.dispose();
    }
}