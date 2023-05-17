class Fires {
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

        this.status = 'active';
        this.area = scene;
        this.spawnTimer = null;
        this.fireSpawnRate = 1000;
        
        this.emitter = new rune.particle.Emitter(0, 0, 32, 10, {
            particles: [Particle],
            capacity: 4,
            accelerationY: -0.025,
            maxVelocityY: -1.25,
            minRotation:  -2,
            maxRotation:   2,
            maxLifeSpan:   500,
            minLifeSpan:   250,
        });

        this.init();
    }
    
    init() {
        var fire = new Fire(this.startCoordinates.x, this.startCoordinates.y);
        this.area.totalFires++;
        this.tileArr.push(fire);
        this.area.stage.addChild(fire);
        
        this.spawnTimer = this.area.timers.create({
            duration: this.fireSpawnRate,
            repeat: Infinity,
            onTick: this.createFire,
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

    checkStatus() {
        if (this.tileArr.length <= 0) {
            this.status = 'innactive';
            this.area.timers.remove(this.spawnTimer);
        }
    }

    createFire() {
        if (this.status == 'active') {
            var r = Math.floor(Math.random() * this.m_fireDirections.length);
            var fireDirection = this.m_fireDirections[r];

            if (this.tileArr.length != 0) {
                var tileX = this.tileArr[this.tileArr.length -1].x + fireDirection.x;
                var tileY = this.tileArr[this.tileArr.length -1].y + fireDirection.y;
                var mapIndex = this.area.stage.map.back.getTileIndexOf(tileX, tileY);
        
                if (this.area.stage.map.back.getTileValueAt(mapIndex) == 23) {
                    var fire = new Fire(tileX, tileY);
                    this.area.totalFires++;
                    this.tileArr.push(fire);
                    this.area.stage.addChild(fire);
                }
            }
        }
    }
}