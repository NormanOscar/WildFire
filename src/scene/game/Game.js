//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
class Game extends rune.scene.Scene {

    /**
     * Calls the constructor method of the super class.
     */
    constructor(nr) {
        super();

        this.m_nrOfPlayers = nr || 2;
        this.m_players = new Array();
        this.trees = new Array();
    }

    /**
     * This method is automatically executed once after the scene is instantiated. 
     * The method is used to create objects to be used within the scene.
     *
     * @returns {undefined}
     */
    init() {
        super.init();

        for (let i = 0; i < this.m_nrOfPlayers; i++) {
            var player = new Player(480, 304, i);
            if (i == 1) {
                var player = new Player(544, 304, i);
            }

            this.m_players.push(player);
            this.stage.addChild(player);
            this.cameras.getCameraAt(0).targets.add(player);
        }
        
        /* for (let i = 0; i < 30; i++) {
            let rand1 = Math.floor(Math.random()*832) + 64;
            let rand2 = Math.floor(Math.random()*512) + 64;

            var tree = new Obstacle(rand1, rand2);
            this.trees.push(tree);
            this.stage.addChild(tree);
        } */

        var enemy = new Enemy(this.getEnemySpawnPoints(0).x,this.getEnemySpawnPoints(0).y,0);
        var enemy1 = new Enemy(this.getEnemySpawnPoints(1).x,this.getEnemySpawnPoints(1).y,1);
        var enemy2 = new Enemy(this.getEnemySpawnPoints(2).x,this.getEnemySpawnPoints(2).y,2);


        this.stage.map.load('map');
        this.stage.addChild(enemy);
        this.stage.addChild(enemy1);
        this.stage.addChild(enemy2);
        this.cameras.getCameraAt(0).bounderies = new rune.geom.Rectangle(0, 0, 960, 640);
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

        /* for (let i = 0; i < this.trees.length; i++) {
            if(this.m_players[0].hitTestObject(this.trees[i])) {
                console.log('Ouch!');
            }
            
            if(this.m_players[1].hitTestObject(this.trees[i])) {
                console.log("Fuck!");
            }
        }
        if(this.m_players[0].hitTestObject(this.m_players[1])) {
            console.log("OUT OF THE WAY!");
        } */
    }

    getEnemySpawnPoints(id) {
        var spawnPoints = [
            {
                x: 656,
                y: 76
            },
            {
                x: 848,
                y: 304
            },
            {
                x: 656,
                y: 528
            }
        ]
        return spawnPoints[id];
    }

    /**
     * This method is automatically called once just before the scene ends. Use 
     * the method to reset references and remove objects that no longer need to 
     * exist when the scene is destroyed. The process is performed in order to 
     * avoid memory leaks.
     *
     * @returns {undefined}
     */
    dispose() {
        super.dispose();
    }
};