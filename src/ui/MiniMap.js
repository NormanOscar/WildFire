class Minimap extends rune.display.Artboard {
    constructor(area, x, y, type) {
        super(x, y, 93, 63);

        this.area = area;
        
        this.p0Graphic = null;
        this.p1Graphic = null;
        this.type = type;
        this.frame = null;
        this.houseColors = ['#fa7aff', '#fff37e', '#7affff'];
        this.houseIndex = 0;
    }

    init() {
        super.init();
        this.alpha = 0.9;
        this.graphics.autoClear = true;
        this.backgroundColor = '#b6e2a0';
        this.m_initFrame();
    }

    m_initFrame() {
        this.frame = new rune.display.Graphic(this.x - 2, this.y - 2, 97, 67, 'minimapFrame');
        this.frame.alpha = 0.9;

        this.type == 'main' ? this.area.cameras.getCameraAt(0).addChild(this.frame) : this.application.screen.addChild(this.frame);
    }

    m_printForest() {
        var pathTiles = [15, 16, 17, 18, 19, 20, 21, 22];
        var tileMapArea = this.area.stage.map.widthInTiles * this.area.stage.map.heightInTiles;
        for (let i = 0; i < tileMapArea; i++) {
            var tile = this.area.stage.map.back.getTileAt(i);
            if (tile.allowCollisions != 0) {
                if (pathTiles.includes(tile.value)) {
                    this.graphics.drawRectFill(tile.x / tile.width * 3, tile.y / tile.height * 3, 3, 3, '#e9dbac');
                }
                else if(tile.value >= 25 && tile.value <= 52) {
                    continue;
                } 
                else {
                    this.graphics.drawRectFill(tile.x / tile.width * 3, tile.y / tile.height * 3, 3, 3, '#2fa569');
                }
            }
        }
    }

    m_printHouses() {
        for (let i = 0; i < this.area.houses.length; i++) {
            this.graphics.drawRectFill(this.area.houses[i].x / 32 * 3, this.area.houses[i].y / 32 * 3, this.area.houses[i].width / 32 * 3, (this.area.houses[i].height + 96) / 32 * 3, this.houseColors[i]);
        }
    }

    m_printEnemies() {
        for (const enemy of this.area.m_enemies) {
            this.graphics.drawRectFill(enemy.x / 32 * 3, enemy.y / 32 * 3, 3, 3, '#5da0ea');
        }
    }

    m_printFireTiles() {
        for (const fire of this.area.fireController.burningFires) {
            if (fire) {
                for (const fireTile of fire.tileArr) {
                    this.graphics.drawRectFill(fireTile.x / 32 * 3, fireTile.y / 32 * 3, 3, 3, '#f58c32');
                }
            }
        }
    }

    m_printPlayers() {
        var playerColors = ['#1F51FF', '#FF3131'];
        for (let i = 0; i < this.area.m_players.length; i++) {
            this.graphics.drawRectFill(this.area.m_players[i].x / 32 * 3, this.area.m_players[i].y / 32 * 3, 3, 3, playerColors[i]); 
        }
    }

    update(step) {
        super.update(step);
        if (!this.area.gameEnded) {
            this.m_printForest();
            this.m_printHouses();
            this.m_printPlayers();
    
            if (this.area.gameStarted) {
                this.m_printFireTiles();
                this.m_printEnemies();
            }
        }
    }

    dispose() {
        super.dispose();
    }
}