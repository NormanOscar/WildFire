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

        this.m_nrOfPlayers = nr || 1;
        this.m_players = new Array();
        this.m_enemies = new Array();
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
            var player = new Player(480, 320, i);
            if (i == 1) {
                var player = new Player(544, 320, i);
            }

            this.m_players.push(player);
            this.stage.addChild(player);
            this.cameras.getCameraAt(0).targets.add(player);
        }
        
        for (let i = 0; i < 30; i++) {
            let rand1 = Math.floor(Math.random()*800) + 64;
            let rand2 = Math.floor(Math.random()*480) + 64;

            var tree = new Obstacle(rand1, rand2);
            this.trees.push(tree);
            this.stage.addChild(tree);
        }

        for (let i = 0; i < 4; i++) {
            var enemy = new Enemy(this.getEnemySpawnPoints(i).x,this.getEnemySpawnPoints(i).y,i);
            this.stage.addChild(enemy);
            this.m_enemies.push(enemy);
        }

        this.stage.map.load('map');
        console.log(this.stage.map);
        this.cameras.getCameraAt(0).bounderies = new rune.geom.Rectangle(0, 0, 992, 672);
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

        for (let i = 0; i < this.m_players[0].bullets.length; i++) {
            for (let j = 0; j < this.m_enemies.length; j++) {
                this.m_players[0].bullets[i].hitTestObject(this.m_enemies[j], function() {
                    this.m_players[0].bullets[i].dispose();
                    this.m_players[0].m_score += 10;
                    this.m_enemies[j].dispose();
                },this);
            }
        }
        
        for (let i = 0; i < this.trees.length; i++) {
            if(this.m_players[0].hitTestObject(this.trees[i])) {
                console.log('Ouch!');
            }
            
            /* if(this.m_players[1].hitTestObject(this.trees[i])) {
                console.log("Fuck!");
            } */
        }
        /* if(this.m_players[0].hitTestObject(this.m_players[1])) {
            console.log("OUT OF THE WAY!");
        } */
    }

    getEnemySpawnPoints(id) {
        var spawnPoints = [
            {
                x: 512,
                y: 64
            },
            {
                x: 896,
                y: 320
            },
            {
                x: 512,
                y: 576
            },
            {
                x: 64,
                y: 320
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