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
        this.m_enemies = new Array();
        this.trees = new Array();
        this.m_totalScore = 0;
        this.m_nrOfOpenGates = 2;
        this.timer = null;
        this.enemyTimerRepeat = 0;
        this.enemySpawnRate = 1000;
        this.m_fires = new Array();
        this.m_music = null;
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
            var player = new Player(448, 320, i);
            if (i == 1) {
                var player = new Player(512, 320, i);
            }

            this.m_players.push(player);
            this.stage.addChild(player);
            this.cameras.getCameraAt(0).targets.add(player);
        }
        //this.createMiniMap();

        /* for (let i = 0; i < 30; i++) {
            let rand1 = Math.floor(Math.random()*800) + 64;
            let rand2 = Math.floor(Math.random()*480) + 64;

            var tree = new Obstacle(rand1, rand2);
            this.trees.push(tree);
            this.stage.addChild(tree);
        } */

        this.initFireSpawnTimer();
        this.initMusic();
        //this.initEnemySpawnTimer();
        //this.updateEnemyPathTimer();

        this.stage.map.load('map');
        this.cameras.getCameraAt(0).bounderies = new rune.geom.Rectangle(0, 0, 992, 672);
    }

    initMusic() {
        this.m_music = this.application.sounds.music.get("game_music", true);
        this.m_music.loop = true;
        this.m_music.play();
    }

    
    createMiniMap() {
        var miniMap = this.cameras.createCamera(/* (this.cameras.getCameraAt(0).width / 2 - (96/2)) */0,0,96,64);
        miniMap.viewport.zoom = 0.25;
        this.cameras.addCamera(miniMap);
    }
    
    initFireSpawnTimer() {
        this.timers.create({
            duration: this.enemySpawnRate,
            repeat: 8,
            onTick: this.createFire,
            scope: this
        }, true);
    }

    createFire() {
        var r = Math.floor(Math.random() * 4);
        var fire = new Fire(this.getFireSpawnPoints(r).x,this.getFireSpawnPoints(r).y);
        this.m_fires.push(fire);
        this.stage.addChild(fire);
    }
    
    initEnemySpawnTimer() {
        this.timers.create({
            duration: this.enemySpawnRate,
            repeat: this.enemyTimerRepeat,
            onTick: this.createEnemy,
            scope: this
        }, true);
    }

    updateEnemyPathTimer() {
        this.timers.create({
            duration: 1000,
            repeat: Infinity,
            onTick: this.updateEnemyPath,
            scope: this
        }, true);
    }

    updateEnemyPath() {
        for (const enemy of this.m_enemies) {
            enemy.path = this.stage.map.back.getPath(enemy.centerX, enemy.centerY, this.m_players[enemy.target].centerX, this.m_players[enemy.target].centerY, true);
        }
    }
    
    createEnemy() {
        const r = Math.floor(Math.random() * 4);
        var enemy = new Enemy(this.getEnemySpawnPoints(r).x, this.getEnemySpawnPoints(r).y);
        enemy.target = Math.floor(Math.random() * this.m_nrOfPlayers);
        this.stage.addChild(enemy);
        console.log(enemy.target);
        enemy.path = this.stage.map.back.getPath(enemy.centerX, enemy.centerY, this.m_players[enemy.target].centerX, this.m_players[enemy.target].centerY, true);
        enemy.path.compress();
        console.log(enemy.path);
        this.m_enemies.push(enemy);
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
                    this.m_enemies[j].deathSound.play();
                    this.m_totalScore += 10;
                    this.m_enemies[j].dispose();
                    console.log(this.m_totalScore);
                },this);
            }
        }
        if (this.m_nrOfPlayers == 2) {
            for (let i = 0; i < this.m_players[1].bullets.length; i++) {
                for (let j = 0; j < this.m_fires.length; j++) {
                    this.m_players[1].bullets[i].hitTestObject(this.m_fires[j], function() {
                        this.m_players[1].bullets[i].dispose();
                        this.m_fires[j].hitSound.play();
                        this.m_totalScore += 10;
                        this.m_fires[j].dispose();
                        console.log(this.m_totalScore);
                    },this);
                }
            }
        }

        for (let i = 0; i < this.m_players.length; i++) {
            for (let j = 0; j < this.m_enemies.length; j++) {
                this.m_players[i].hitTestObject(this.m_enemies[j], function() {
                    this.cameras.getCameraAt(0).targets.remove(this.m_players[i]);
                    this.m_players[i].status = 'dead';
                    this.m_players[i].deathSound.play();
                    this.m_music.stop();
                    this.m_players[i].dispose();
                    console.log('Player ' + i + ' died');
                
                },this);
            }
            for (let j = 0; j < this.m_fires.length; j++) {
                this.m_players[i].hitTestObject(this.m_fires[j], function() {
                    this.cameras.getCameraAt(0).targets.remove(this.m_players[i]);
                    this.m_players[i].status = 'dead';
                    this.m_players[i].deathSound.play();
                    this.m_music.stop();
                    this.m_players[i].dispose();
                    console.log('Player ' + i + ' died');
                
                },this);
            }
        }
        
        /* while (this.m_players.length != 0) {
            this.enemyTimerRepeat = null;
            console.log(this.timers);
            //this.timers.remove()
        } */
        
        /* for (let i = 0; i < this.trees.length; i++) {
            if(this.m_players[0].hitTestAndSeparateObject(this.trees[i])) {
                console.log('Ouch!');
                this.m_players[0].can_move = false;
            }
            
            if(this.m_players[1].hitTestObject(this.trees[i])) {
                console.log("Fuck!");
            }
            if(this.m_players[0].hitTestObject(this.m_players[1])) {
                console.log("OUT OF THE WAY!");
            }
            //console.log(this.m_totalScore);
        } */
    }

    getEnemySpawnPoints(id) {
        var spawnPoints = [
            {
                x: 480,
                y: 64
            },
            {
                x: 896,
                y: 320
            },
            {
                x: 480,
                y: 576
            },
            {
                x: 64,
                y: 320
            }
        ]
        return spawnPoints[id];
    }

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