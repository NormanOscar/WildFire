/**
 * Creates a Fire object.
 * 
 * @param {number} x The x coordinate of the object.
 * @param {number} y The y coordinate of the object.
 * @param {object} instance The game instance.
 * 
 * @class
 * @classdesc
 * 
 * A burning fire object.
 */
class Fire {
    constructor(x, y, instance) {
        this.tileArr = new Array();
        this.m_fireDirections = [
            {
                x: 0,
                y: -32
            },
            {
                x: 32,
                y: 0
            },
            {
                x: 0,
                y: 32
            },
            {
                x: -32,
                y: 0
            }
        ];
        this.startCoordinates = {
            x: x,
            y: y
        }

        this.m_gameInstance = instance;
        this.spawnTimer = null;
        this.fireTileSpawnRate = 1000;
        
        this.emitter = new rune.particle.Emitter(0, 0, 32, 10, {
            particles: [Particle, SecondParticle],
            capacity: 4,
            accelerationY: -0.025,
            maxVelocityY: -1.25,
            minRotation:  -2,
            maxRotation:   2
        });
        this.forestIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

        this.init();
    }
    
    /**
     * Initializes the object.
     * 
     * @returns {undefined}
     */
    init() {
        var fireTile = new FireTile(this.startCoordinates.x, this.startCoordinates.y);
        this.m_gameInstance.totalFires++;
        this.tileArr.push(fireTile);
        this.m_gameInstance.stage.addChild(fireTile);
        this.m_gameInstance.stage.addChild(this.emitter);
        
        this.initSpawnTimer();
        this.initParticleTimer();
    }
    
    /**
     * Initializes the spawn timer for the fire.
     * 
     * @returns {undefined}
     */
    initSpawnTimer() {
        this.spawnTimer = this.m_gameInstance.timers.create({
            duration: this.fireTileSpawnRate,
            repeat: Infinity,
            onTick: this.createFireTile,
            scope: this
        }, true);
    }

    /**
     * Initializes the particle timer for the fire.
     * 
     * @returns {undefined}
     */
    initParticleTimer() {
        this.particleTimer = this.m_gameInstance.timers.create({
            duration: 1500,
            repeat: Infinity,
            onTick: function() {
                var r = Math.floor(Math.random() * 3 + 1);
                for (let i = 0; i < r; i++) {
                    this.emitSmoke();
                }
            },
            scope: this
        });
    }

    /**
     * Emits smoke from the fire.
     * 
     * @returns {undefined}
     */
    emitSmoke() {
        if (this.tileArr.length > 0) {
            var r = Math.floor(Math.random() * this.tileArr.length);
            this.emitter.x = this.tileArr[r].x;
            this.emitter.y = this.tileArr[r].y;
        
            this.emitter.emit(3);
        }
    }

    /**
     * Creates a new fire tile on a tile that isn't the forest.
     * 
     * @returns {undefined}
     */
    createFireTile() {
        var r = Math.floor(Math.random() * this.m_fireDirections.length);
        var fireDirection = this.m_fireDirections[r];

        if (this.tileArr.length != 0) {
            var tileX = this.tileArr[this.tileArr.length -1].x + fireDirection.x;
            var tileY = this.tileArr[this.tileArr.length -1].y + fireDirection.y;
            var mapIndex = this.m_gameInstance.stage.map.back.getTileIndexOf(tileX, tileY);
    
            if (!this.forestIDs.includes(this.m_gameInstance.stage.map.back.getTileValueAt(mapIndex))) {
                var fireTile = new FireTile(tileX, tileY);
                this.m_gameInstance.totalFireTiles++;
                this.tileArr.push(fireTile);
                this.m_gameInstance.stage.addChild(fireTile);
            }
        }
    }
}