class FireController {
    constructor(scene) {
        this.activeFires = new Array();
        this.area = scene;

        this.activeFireTimer = null;
        this.spawnPointsIndex = 0;
        this.init();
    }

    init() {
        var fires = new Fires(this.getFireSpawnPoints(this.spawnPointsIndex).x,this.getFireSpawnPoints(this.spawnPointsIndex).y, this.area);
        this.activeFires.push(fires);
        this.spawnPointsIndex++;

        this.initActiveFireTimer();
    }
    
    initActiveFireTimer() {
        this.activeFireTimer = this.area.timers.create({
            duration: 8000,
            repeat: Infinity,
            onTick: this.createActiveFire,
            scope: this
        });
    }

    createActiveFire() {
        for (const activeFire of this.activeFires) {
            if (activeFire.tileArr.length <= 0) {
                activeFire.init();
                activeFire.status = 'active';
                return;
            }
        }

        if (this.spawnPointsIndex <= 3) {
            var fires = new Fires(this.getFireSpawnPoints(this.spawnPointsIndex).x,this.getFireSpawnPoints(this.spawnPointsIndex).y, this.area);
            this.activeFires.push(fires);
            this.spawnPointsIndex++
        }
    }

    /**
     * Runs every update in game and checks if the status of the avtice fires
     * 
     * @returns {undefined}
     */
    checkActiveFires() {
        if (this.area.allPlayersDead) {
            for (let i = 0; i < this.activeFires.length; i++) {
                this.area.timers.remove(this.activeFires[i].spawnTimer);
            }
        }

        for (let i = 0; i < this.activeFires.length; i++) {
            this.activeFires[i].checkStatus()
            if (this.activeFires[i].status == 'innactive') {
            }
            
        }
    }

    /**
     * 
     * 
     * @param {} 
     * 
     * @returns {object} Object with coordinates for spawnpoint
     */
    getFireSpawnPoints(id) {
        var spawnPoints = [
            {
                x: 64,
                y: 64
            },
            {
                x: 896,
                y: 64
            },
            {
                x: 896,
                y: 576
            },
            {
                x: 64,
                y: 576
            },
        ];
        return spawnPoints[id];
    }
}