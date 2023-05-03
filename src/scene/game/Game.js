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
        this.scoreCounter = null;
        this.scoreTimer = null;
        this.m_totalScore = 0;
        this.m_nrOfOpenGates = 2;
        this.enemySpawnTimer = null;
        this.enemyPathTimer = null;
        this.enemyTimerRepeat = Infinity;
        this.enemySpawnRate = 2000;
        this.m_music = null;
        this.fireController = null;
        this.houses = new Array();
        this.totalFires = 0;

        this.m_cams = null;
        this.camera_is_splitted = false;

        this.allPlayersDead = false;
    }

    /**
     * This method is automatically executed once after the scene is instantiated. 
     * The method is used to create objects to be used within the scene.
     *
     * @returns {undefined}
     */
    init() {
        super.init();
        this.cameras.removeCameras(true);

        this.m_cams = [];
        this.m_cams[0] = this.cameras.createCamera(0, 0, this.application.screen.width, this.application.screen.height);
        this.cameras.addCamera(this.m_cams[0]);

        for (let i = 0; i < this.m_nrOfPlayers; i++) {
            var player = new Player(448, 320, i, this);
            if (i == 1) {
                var player = new Player(512, 320, i, this);
            }

            this.m_players.push(player);
            this.stage.addChild(player);
            this.cameras.getCameraAt(0).targets.add(player);
        }

        this.initHouses();
        //this.createMiniMap();

        /* for (let i = 0; i < 30; i++) {
            let rand1 = Math.floor(Math.random()*800) + 64;
            let rand2 = Math.floor(Math.random()*480) + 64;
            
            var tree = new Obstacle(rand1, rand2);
            this.trees.push(tree);
            this.stage.addChild(tree);
        } */

        this.fireController = new FireController(this);

        this.initMusic();
        this.initScoreTimer();
        this.initScoreCounter();

        this.initEnemySpawnTimer();
        this.updateEnemyPathTimer();
        this.stage.map.load('map');
        this.cameras.getCameraAt(0).bounderies = new rune.geom.Rectangle(0, 0, 992, 672);
    }

    initScoreTimer() {
        this.scoreTimer = this.timers.create({
            duration: 1000,
            repeat: Infinity,
            onTick: function () {
                if (this.totalFires < 20) {
                    this.m_totalScore += 5;
                } else if (this.totalFires >= 20 & this.totalFires < 40) {
                    this.m_totalScore += 4;
                } else if (this.totalFires >= 40 & this.totalFires < 60) {
                    this.m_totalScore += 3;
                } else if (this.totalFires >= 60 & this.totalFires < 80) {
                    this.m_totalScore += 2;
                } else if (this.totalFires >= 80 & this.totalFires < 100) {
                    this.m_totalScore += 1;
                }
            },
            scope: this
        });
    }

    initScoreCounter() {
        var text = 'Score: ' + this.m_totalScore.toString();
        this.scoreCounter = new rune.text.BitmapField(text, rune.text.BitmapFormat.FONT_MEDIUM);

        this.scoreCounter.x = this.cameras.getCameraAt(0).viewport.x + (this.cameras.getCameraAt(0).viewport.width / 2) - this.scoreCounter.width / 2;
        this.scoreCounter.y = this.cameras.getCameraAt(0).viewport.height - this.scoreCounter.height;

        this.stage.addChild(this.scoreCounter);
    }

    updateScoreCounter() {
        var text = 'Score: ' + this.m_totalScore.toString();
        this.scoreCounter.text = text;
    }

    initHouses() {
        for (let i = 0; i < 3; i++) {
            var house = new House(this.getHouseCoordinates(i).x, this.getHouseCoordinates(i).y, i);
            this.stage.addChild(house);
            this.houses.push(house);
        }
    }

    initMusic() {
        this.m_music = this.application.sounds.music.get("game_music", true);
        this.m_music.volume = 0.075;
        this.m_music.loop = true;
        this.m_music.play();
    }

    /* createMiniMap() {
        var miniMap = this.cameras.createCamera((this.cameras.getCameraAt(0).width / 2 - (96/2)),0,96,64);
        miniMap.viewport.zoom = 0.25;
        this.cameras.addCamera(miniMap);
    } */

    initEnemySpawnTimer() {
        this.enemySpawnTimer = this.timers.create({
            duration: this.enemySpawnRate,
            repeat: this.enemyTimerRepeat,
            onTick: this.createEnemy,
            scope: this
        }, true);
    }

    updateEnemyPathTimer() {
        this.enemyPathTimer = this.timers.create({
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
        const r = Math.floor(Math.random() * this.m_nrOfOpenGates);
        var enemy = new Enemy(this.getEnemySpawnPoints(r).x, this.getEnemySpawnPoints(r).y);
        enemy.target = Math.floor(Math.random() * this.m_nrOfPlayers);
        this.stage.addChild(enemy);

        enemy.path = this.stage.map.back.getPath(enemy.centerX, enemy.centerY, this.m_players[enemy.target].centerX, this.m_players[enemy.target].centerY, true);
        enemy.path.compress();
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

        if (this.m_players.length == 2) {
            this.calcCamera();
        }

        this.checkBulletEnemyHit();
        this.checkBulletFireHit();
        this.checkPlayerEnemyHit();
        this.checkPlayerFireHit();


        this.fireController.checkActiveFires();

        for (const player of this.m_players) {
            if (this.m_nrOfPlayers == 2) {
                this.m_players[0].status == 'dead' && this.m_players[1].status == 'dead' ? this.allPlayersDead = true : this.allPlayersDead = false;
            } else {
                player.status == 'dead'? this.allPlayersDead = true : this.allPlayersDead = false;
            }
        }

        if (this.allPlayersDead) {
            this.m_music.stop();
            this.timers.clear();

            this.application.scenes.load( [new GameOver(this.m_totalScore, this.m_nrOfPlayers)] );
        }
        this.updateScoreCounter();

        this.scoreCounter.x = this.cameras.getCameraAt(0).viewport.centerX - this.scoreCounter.width / 2;
        this.scoreCounter.y = this.cameras.getCameraAt(0).viewport.y + this.cameras.getCameraAt(0).viewport.height - this.scoreCounter.height;
    }

    calcCamera() {
        var playerOnePos = { x: this.m_players[0].globalX, y: this.m_players[0].globalY };
        var playerTwoPos = { x: this.m_players[1].globalX, y: this.m_players[1].globalY };

        if (!this.m_camera_is_splitted) {
            if (Math.abs(playerOnePos.x - playerTwoPos.x) > this.application.screen.width - 50 || Math.abs(playerOnePos.y - playerTwoPos.y) > this.application.screen.height - 50) {
                this.cameras.removeCameras(true);
                this.m_cams = [];

                this.m_cams[0] = this.cameras.createCamera(0, 0, this.application.screen.width / 2, this.application.screen.height);
                this.m_cams[0].bounderies = new rune.geom.Rectangle(0, 0, 992, 672)
                this.m_cams[1] = this.cameras.createCamera(this.application.screen.width / 2, 0, this.application.screen.width / 2, this.application.screen.height);
                this.m_cams[1].bounderies = new rune.geom.Rectangle(0, 0, 992, 672)

                this.m_cams[1].targets.add(this.m_players[1]);
                this.m_cams[0].targets.add(this.m_players[0]);

                this.cameras.addCamera(this.m_cams[0]);
                this.cameras.addCamera(this.m_cams[1]);

                this.m_camera_is_splitted = true;
            }
        }

        if (this.m_camera_is_splitted) {
            // If users are close to each other, merge the cameras
            if (Math.abs(playerOnePos.x - playerTwoPos.x) < this.application.screen.width - 50 && Math.abs(playerOnePos.y - playerTwoPos.y) < this.application.screen.height - 50) {
                this.cameras.removeCameras(true);
                this.m_cams = [];

                this.m_cams[0] = this.cameras.createCamera(0, 0, this.application.screen.width, this.application.screen.height);
                this.m_cams[0].targets.add(this.m_players[0]);
                this.m_cams[0].targets.add(this.m_players[1]);

                this.cameras.addCamera(this.m_cams[0]);
                this.m_camera_is_splitted = false;
            }
        }
    }

    checkBulletFireHit() {
        var self = this;
        for (let j = 0; j < this.m_players.length; j++) {
            for (let i = 0; i < this.m_players[j].bullets.length; i++) {
                if (this.m_players[j].bullets[i].id == 1) {
                    for (const fires of this.fireController.activeFires) {
                        for (const fire of fires.tileArr) {
                            this.m_players[j].bullets[i].hitTest(fire, function () {
                                this.dispose();
                                fires.tileArr.splice(fires.tileArr.indexOf(fire), 1);
                                fire.dispose();
                                self.m_totalScore += 10;
                                self.totalFires--;
                                fire.deathSound.play();
                                console.log('Fire put out');
                            });
                        }
                    }
                }
            }
        }
    }

    checkPlayerFireHit() {
        var self = this;
        for (let i = 0; i < this.m_players.length; i++) {
            for (const fires of this.fireController.activeFires) {
                for (const fire of fires.tileArr) {
                    this.m_players[i].hitTest(fire, function () {
                        self.cameras.getCameraAt(0).targets.remove(this);
                        this.status = 'dead';
                        this.deathSound.play();
                        //this.dispose();
                        console.log('Player ' + i + ' died');
                    });
                }
            }
        }
    }

    checkBulletEnemyHit() {
        for (let i = 0; i < this.m_players[0].bullets.length; i++) {
            if (this.m_players[0].bullets[i].id == 0) {
                for (let j = 0; j < this.m_enemies.length; j++) {
                    this.m_players[0].bullets[i].hitTest(this.m_enemies[j], function () {
                        this.m_players[0].bullets[i].dispose();
                        this.m_enemies[j].deathSound.play();
                        this.m_totalScore += 10;
                        this.m_enemies[j].dispose();
                    }, this);
                }
            }
        }
    }

    checkPlayerEnemyHit() {
        for (let i = 0; i < this.m_players.length; i++) {
            for (let j = 0; j < this.m_enemies.length; j++) {
                this.m_players[i].hitTest(this.m_enemies[j], function () {
                    this.cameras.getCameraAt(0).targets.remove(this.m_players[i]);
                    this.m_players[i].status = 'dead';
                    this.m_players[i].deathSound.play();
                    //this.m_players[i].dispose();
                    console.log('Player ' + i + ' died');
                }, this);
            }
        }
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



    getHouseCoordinates(id) {
        var coordinates = [
            {
                x: 128,
                y: 128
            },
            {
                x: 288,
                y: 384
            },
            {
                x: 608,
                y: 128
            }
        ]
        return coordinates[id];
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