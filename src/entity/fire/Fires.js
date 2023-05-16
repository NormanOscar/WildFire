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