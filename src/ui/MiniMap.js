/**
 * Creates a new object.
 *
 * @extends rune.display.Artboard
 *
 * @class
 * @classdesc
 * 
 * New minimap over game that shows players, enemies, fires and houses.
 */
class Minimap extends rune.display.Artboard {
    /**
     * Calls the constructor method of the super class.
     * 
     * @param {object} instance The game instance.
     * @param {number} x The x position of the minimap.
     * @param {number} y The y position of the minimap.
     * @param {string} type The type of the HUD.
     * 
     * @returns {undefined}
     */
    constructor(instance, x, y, type) {
        super(x, y, 93, 63);

        this.m_gameInstance = instance;
        
        this.type = type;
        this.frame = null;
    }

    /**
     * Initializes the object.
     * 
     * @returns {undefined}
     */
    init() {
        super.init();
        this.alpha = 0.85;
        this.graphics.autoClear = true;
        this.backgroundColor = '#b6e2a0';
        this.m_initFrame();
    }

    /**
     * Creates frame around the minimap.
     */
    m_initFrame() {
        this.frame = new rune.display.Graphic(this.x - 2, this.y - 2, 97, 67, 'minimapFrame');
        this.frame.alpha = 0.9;

        this.type == 'main' ? this.m_gameInstance.cameras.getCameraAt(0).addChild(this.frame) : this.application.screen.addChild(this.frame);
    }

    /**
     * Prints the forest perimeter on the minimap.
     * 
     * @returns {undefined}
     */
    m_printForest() {
        var tileMapArea = this.m_gameInstance.stage.map.widthInTiles * this.m_gameInstance.stage.map.heightInTiles;
        for (let i = 0; i < tileMapArea; i++) {
            var tile = this.m_gameInstance.stage.map.back.getTileAt(i);
            if (tile.allowCollisions != 0) {
                if (tile.value == 24) {
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

    /**
     * Prints houses on the minimap.
     * 
     * @returns {undefined}
     */
    m_printHouses() {
        const houseColors = ['#fa7aff', '#fff37e', '#7affff'];
        for (let i = 0; i < this.m_gameInstance.roofs.length; i++) {
            this.graphics.drawRectFill(this.m_gameInstance.roofs[i].x / 32 * 3, this.m_gameInstance.roofs[i].y / 32 * 3, this.m_gameInstance.roofs[i].width / 32 * 3, (this.m_gameInstance.roofs[i].height + 96) / 32 * 3, houseColors[i]);
        }
    }

    /**
     * Prints enemies on the minimap.
     * 
     * @returns {undefined}
     */
    m_printEnemies() {
        for (const enemy of this.m_gameInstance.m_enemies) {
            this.graphics.drawRectFill(enemy.x / 32 * 3, enemy.y / 32 * 3, 3, 3, '#5da0ea');
        }
    }

    /**
     * Prints fire tiles on the minimap.
     * 
     * @returns {undefined}
     */
    m_printFireTiles() {
        for (const fire of this.m_gameInstance.fireController.burningFires) {
            if (fire) {
                for (const fireTile of fire.tileArr) {
                    this.graphics.drawRectFill(fireTile.x / 32 * 3, fireTile.y / 32 * 3, 3, 3, '#f58c32');
                }
            }
        }
    }

    /**
     * Prints players on the minimap.
     * 
     * @returns {undefined}
     */
    m_printPlayers() {
        var playerColors = ['#1F51FF', '#FF3131'];
        for (let i = 0; i < this.m_gameInstance.m_players.length; i++) {
            this.graphics.drawRectFill(this.m_gameInstance.m_players[i].x / 32 * 3, this.m_gameInstance.m_players[i].y / 32 * 3, 3, 3, playerColors[i]); 
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
        // Only update the minimap if game is still running.
        if (!this.m_gameInstance.gameEnded) {
            this.m_printForest();
            this.m_printHouses();
            this.m_printPlayers();
    
            // Only print enemies and fire tiles if game has started.
            if (this.m_gameInstance.gameStarted) {
                this.m_printFireTiles();
                this.m_printEnemies();
            }
        }
    }

    /**
     * Removes the object from the stage. The process is performed in order to 
     * avoid memory leaks.
     * 
     * @returns {undefined}
     */
    dispose() {
        super.dispose();
    }
}