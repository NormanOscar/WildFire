class Fire {
    constructor(x, y, scene) {
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

        this.area = scene;
        this.fireController = this.area.fireController;
        this.spawnTimer = null;
        this.fireSpawnRate = 1000;
        
        this.emitter = new rune.particle.Emitter(0, 0, 32, 10, {
            particles: [Particle, SecondParticle],
            capacity: 4,
            accelerationY: -0.025,
            maxVelocityY: -1.25,
            minRotation:  -2,
            maxRotation:   2
        });

        this.init();
    }
    
    init() {
        var fireTile = new FireTile(this.startCoordinates.x, this.startCoordinates.y);
        this.area.totalFires++;
        this.tileArr.push(fireTile);
        this.area.stage.addChild(fireTile);
        
        this.spawnTimer = this.area.timers.create({
            duration: this.fireSpawnRate,
            repeat: Infinity,
            onTick: this.createFireTile,
            scope: this
        }, true);
        
        this.area.stage.addChild(this.emitter);
        this.particleTimer = this.area.timers.create({
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
    
    emitSmoke() {
        if (this.tileArr.length > 0) {
            var r = Math.floor(Math.random() * this.tileArr.length);
            this.emitter.x = this.tileArr[r].x;
            this.emitter.y = this.tileArr[r].y;
        
            this.emitter.emit(3);
        }
    }

    createFireTile() {
        var r = Math.floor(Math.random() * this.m_fireDirections.length);
        var fireDirection = this.m_fireDirections[r];

        if (this.tileArr.length != 0) {
            var tileX = this.tileArr[this.tileArr.length -1].x + fireDirection.x;
            var tileY = this.tileArr[this.tileArr.length -1].y + fireDirection.y;
            var mapIndex = this.area.stage.map.back.getTileIndexOf(tileX, tileY);
    
            if (this.area.stage.map.back.getTileValueAt(mapIndex) == 23 || this.area.stage.map.back.getTileValueAt(mapIndex) == 24) {
                var fireTile = new FireTile(tileX, tileY);
                this.area.totalFires++;
                this.tileArr.push(fireTile);
                this.area.stage.addChild(fireTile);
            }
        }
    }
}