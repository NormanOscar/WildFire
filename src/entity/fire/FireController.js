/**
 * Creates a FireController object.
 * 
 * @class
 * @classdesc
 * 
 * Object handling logistics for new fires.
 */
class FireController {
    /**
     * Calls the constructor method.
     * 
     * @param {object} instance The game instance.
     * 
     * @returns {undefined}
     */
    constructor(instance) {
        this.burningFires = new Array(4);
        this.m_gameInstance = instance;

        this.burningFireTimer = null;
        this.init();
    }

    /**
     * Initializes the object.
     * 
     * @returns {undefined}
     */
    init() {
        this.createFire();
        this.initFireTimer();
    }
    
    /**
     * Initializes the fire timer.
     * 
     * @returns {undefined}
     */
    initFireTimer() {
        this.burningFireTimer = this.m_gameInstance.timers.create({
            duration: 5000,
            repeat: Infinity,
            onTick: this.createFire,
            scope: this
        });
    }

    /**
     * Creates a new fire in randomized spot and starts fire after a while when it's been put out.
     * 
     * @returns {undefined}
     */
    createFire() {
        let allAreBurning = true;
        for (const burningFire of this.burningFires) {
            if (!burningFire) {
                allAreBurning = false;
                break;
            }
        }
        if (!allAreBurning) {
            var r = Math.floor(Math.random() * 4);

            if (!this.burningFires[r]) {
                var fire = new Fire(this.getFireSpawnPoint(r).x,this.getFireSpawnPoint(r).y, this.m_gameInstance);
                this.burningFires[r] = fire;
            } else {
                this.createFire();
            }
        }
    }

    /**
     * Runs every update in game and checks if a fire is alive or not.
     * 
     * @returns {undefined}
     */
    checkFires() {
        if (this.m_gameInstance.allPlayersDead) {
            for (let i = 0; i < this.burningFires.length; i++) {
                if (this.burningFires[i]) {
                    this.m_gameInstance.timers.remove(this.burningFires[i].spawnTimer);
                }
            }
        }

        for (let i = 0; i < this.burningFires.length; i++) {
            if (this.burningFires[i] && this.burningFires[i].tileArr.length <= 0) {
                this.burningFires[i] = null;
                this.nrOfActiveFires--;
            }
        }
    }

    /**
     * Returns coordinates for spawnpoints.
     * 
     * @param {number} id Id for spawnpoint
     * 
     * @returns {object} Object with coordinates for spawnpoint
     */
    getFireSpawnPoint(id) {
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