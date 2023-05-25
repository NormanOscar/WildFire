class FireController {
    constructor(area) {
        this.activeFires = new Array(4);
        this.area = area;

        this.activeFireTimer = null;
        this.init();
    }

    init() {
        this.createActiveFire();
        this.initActiveFireTimer();
    }
    
    initActiveFireTimer() {
        this.activeFireTimer = this.area.timers.create({
            duration: 5000,
            repeat: Infinity,
            onTick: this.createActiveFire,
            scope: this
        });
    }

    createActiveFire() {
        let allAreBurning = true;
        for (const activeFire of this.activeFires) {
            if (!activeFire) {
                allAreBurning = false;
                break;
            }
        }
        if (!allAreBurning) {
            var r = Math.floor(Math.random() * 4);

            if (!this.activeFires[r]) {
                var fire = new Fire(this.getFireSpawnPoints(r).x,this.getFireSpawnPoints(r).y, this.area);
                this.activeFires[r] = fire;
            } else {
                this.createActiveFire();
            }
        }
    }

    /**
     * Runs every update in game and checks if the status of the burning fires
     * 
     * @returns {undefined}
     */
    checkActiveFires() {
        if (this.area.allPlayersDead) {
            for (let i = 0; i < this.activeFires.length; i++) {
                if (this.activeFires[i]) {
                    this.area.timers.remove(this.activeFires[i].spawnTimer);
                }
            }
        }

        for (let i = 0; i < this.activeFires.length; i++) {
            if (this.activeFires[i] && this.activeFires[i].tileArr.length <= 0) {
                this.activeFires[i] = null;
                this.nrOfActiveFires--;
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