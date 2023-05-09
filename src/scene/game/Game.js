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
     * 
     * @param {number} nr Number of players
     * 
     * @returns {undefined}
     */
    constructor(nr, menuMusic) {
        super();

        menuMusic.stop();
        this.m_nrOfPlayers = nr || 1;
        this.m_players = new Array();
        this.m_enemies = new Array();
        this.trees = new Array();
        this.scoreCounter = null;
        this.scoreTimer = null;
        this.m_totalScore = 0;
        this.m_nrOfOpenGates = 4;
        this.enemySpawnTimer = null;
        this.enemyPathTimer = null;
        this.enemyTimerRepeat = Infinity;
        this.enemySpawnRate = 1000;
        this.m_music = null;
        this.fireController = null;
        this.houses = new Array();
        this.totalFires = 0;
        this.m_nrOfPlayersAlive = nr || 1;
        this.hud = null;

        this.m_cams = new Array();
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

        this.stage.map.load('map');
        this.initMusic();

        this.initCameras();
        this.initPlayers();
        this.initHouses();

        //this.initHUD();
        this.createMiniMap();

        this.fireController = new FireController(this);

        this.initScoreTimer();
        this.initScoreCounter();
        this.initEnemySpawnTimer();
        this.updateEnemyPathTimer();
    }

    /**
     * This method is used to initialize the cameras.
     * 
     * @returns {undefined}
     */
    initCameras() {
        this.m_cams[0] = this.cameras.createCamera(0, 0, this.application.screen.width, this.application.screen.height);
        this.cameras.addCamera(this.m_cams[0]);
        this.cameras.getCameraAt(0).bounderies = new rune.geom.Rectangle(0, 0, 992, 672);

        this.m_cams[1] = this.cameras.createCamera(0, 0, this.application.screen.width / 2, this.application.screen.height);
        this.m_cams[1].visible = false;
        this.cameras.addCamera(this.m_cams[1]);
        this.cameras.getCameraAt(1).bounderies = new rune.geom.Rectangle(0, 0, 992, 672);

        this.m_cams[2] = this.cameras.createCamera(0 + this.application.screen.width / 2, 0, this.application.screen.width / 2, this.application.screen.height);
        this.m_cams[2].visible = false;
        this.cameras.addCamera(this.m_cams[2]);
        this.cameras.getCameraAt(2).bounderies = new rune.geom.Rectangle(0, 0, 992, 672);
    }
    
    initHUD() {
        this.hud = new HUD();

    }

    /**
     * This method is used to initialize the players.
     * 
     * @returns {undefined}
     */
    initPlayers() {
            if (this.m_nrOfPlayers == 1) {
                var player = new Player(448, 320, 0, this);
                this.m_players.push(player);
                this.m_cams[0].targets.add(player);
                this.stage.addChild(player);
            } 
            else if (this.m_nrOfPlayers == 2){
                var player1 = new Player(448, 320, 0, this);
                this.m_players.push(player1);
                this.m_cams[0].targets.add(player1);
                this.m_cams[1].targets.add(player1);
                this.stage.addChild(player1);
                
                var player2 = new Player(512, 320, 1, this);
                this.m_players.push(player2);
                this.m_cams[0].targets.add(player2);
                this.m_cams[2].targets.add(player2);
                this.stage.addChild(player2);
            }

    }

    /**
     * This method is used to initialize the score counter timer.
     * 
     * @returns {undefined}
     */
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

    /**
     * This method is used to initialize the score counter.
     * 
     * @returns {undefined}
     */
    initScoreCounter() {
        var text = 'Score: ' + this.m_totalScore.toString();
        this.scoreCounter = new rune.text.BitmapField(text, rune.text.BitmapFormat.FONT_MEDIUM);

        this.scoreCounter.x = this.cameras.getCameraAt(0).viewport.x + (this.cameras.getCameraAt(0).viewport.width / 2) - this.scoreCounter.width / 2;
        this.scoreCounter.y = this.cameras.getCameraAt(0).viewport.height - this.scoreCounter.height;

        this.stage.addChild(this.scoreCounter);
    }

    /**
     * This method is used to update the score counter.
     * 
     * @returns {undefined}
     */
    updateScoreCounter() {
        var text = 'Score: ' + this.m_totalScore.toString();
        this.scoreCounter.text = text;
    }

    /**
     * This method is used to create houses.
     * 
     * @returns {undefined}
     */
    initHouses() {
        for (let i = 0; i < 3; i++) {
            var house = new House(this.getHouseCoordinates(i).x, this.getHouseCoordinates(i).y, i);
            this.stage.addChild(house);
            this.houses.push(house);
        }
    }

    /**
     * This method is used to initiate the game music.
     * 
     * @returns {undefined}
     */
    initMusic() {
        this.m_music = this.application.sounds.music.get("game_music", true);
        this.m_music.volume = 0.075;
        this.m_music.loop = true;
        this.m_music.play();
    }

    /**
     * This method is used to create a minimap.
     * 
     * @returns {undefined}
     */
    createMiniMap() {
        var miniMap = new MiniMap(this);
        this.cameras.getCameraAt(0).addChild(miniMap);

    }
    /**
     * This method is used to initiate the enemy spawn timer.
     * 
     * @returns {undefined}
     */
    initEnemySpawnTimer() {
        this.enemySpawnTimer = this.timers.create({
            duration: this.enemySpawnRate,
            repeat: this.enemyTimerRepeat,
            onTick: this.createEnemy,
            scope: this
        }, true);
    }

    /**
     * This method is used to initiate the enemy path timer.
     * 
     * @returns {undefined}
     */
    updateEnemyPathTimer() {
        this.enemyPathTimer = this.timers.create({
            duration: 1000,
            repeat: Infinity,
            onTick: this.updateEnemyPath,
            scope: this
        }, true);
    }

    /**
     * This method is used to update the path of all enemies.
     * 
     * @returns {undefined}
     */
    updateEnemyPath() {
        for (const enemy of this.m_enemies) {
            enemy.path = this.stage.map.back.getPath(enemy.centerX, enemy.centerY, this.m_players[enemy.target].centerX, this.m_players[enemy.target].centerY, true);
        }
    }

    /**
     * This method is used to create a new enemy and add it to the stage.
     * 
     * @returns {undefined}
     */
    createEnemy() {
        const r = Math.floor(Math.random() * this.m_nrOfOpenGates);
        var targetIndex = Math.floor(Math.random() * this.m_nrOfPlayersAlive);
        var enemy = new Enemy(this.getEnemySpawnPoints(r).x, this.getEnemySpawnPoints(r).y, this, this.m_players[targetIndex]);
        enemy.target = targetIndex;
        this.stage.addChild(enemy);
                
        if (this.m_players[targetIndex].status != 'dead') {
            enemy.path = this.stage.map.back.getPath(enemy.centerX, enemy.centerY, this.m_players[enemy.target].centerX, this.m_players[enemy.target].centerY, true);
        }

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

        this.fireController.checkActiveFires();

        // Check if all players are dead.
        for (const player of this.m_players) {
            if (this.m_nrOfPlayers == 2) {
                this.m_players[0].status == 'dead' && this.m_players[1].status == 'dead' ? this.allPlayersDead = true : this.allPlayersDead = false;
            } else {
                player.status == 'dead'? this.allPlayersDead = true : this.allPlayersDead = false;
            }
        }

        // If all players are dead, the game is over.
        if (this.allPlayersDead) {
            this.timers.create({
                duration: 1000,
                onComplete: function () {
                    this.application.scenes.load( [new GameOver(this.m_totalScore, this.m_nrOfPlayers)] );
                    this.m_music.stop();
                },
                scope: this
            }, true);
        }

        this.updateScoreCounter();

        this.scoreCounter.x = this.cameras.getCameraAt(0).viewport.centerX - this.scoreCounter.width / 2;
        this.scoreCounter.y = this.cameras.getCameraAt(0).viewport.y + this.cameras.getCameraAt(0).viewport.height - this.scoreCounter.height;
    }

    /**
     * This method is used to change camera depending on the players position.
     * 
     * @returns {undefined}
     */
    calcCamera() {
        var playerOnePos = { x: this.m_players[0].globalX, y: this.m_players[0].globalY };
        var playerTwoPos = { x: this.m_players[1].globalX, y: this.m_players[1].globalY };

        if (!this.m_camera_is_splitted && this.m_players[0].status != 'dead' && this.m_players[1].status != 'dead') {
            // If the players are too far apart, show split screen cameras
            if (Math.abs(playerOnePos.x - playerTwoPos.x) > this.application.screen.width - 50 || Math.abs(playerOnePos.y - playerTwoPos.y) > this.application.screen.height - 50) {
                this.cameras.getCameraAt(0).visible = false;
                this.cameras.getCameraAt(1).visible = true;
                this.cameras.getCameraAt(2).visible = true;

                this.m_camera_is_splitted = true;
            }
        }

        if (this.m_camera_is_splitted) {
            // If users are close to each other, show the main camera
            if (Math.abs(playerOnePos.x - playerTwoPos.x) < this.application.screen.width - 50 && Math.abs(playerOnePos.y - playerTwoPos.y) < this.application.screen.height - 50) {
                this.cameras.getCameraAt(0).visible = true;
                this.cameras.getCameraAt(1).visible = false;
                this.cameras.getCameraAt(2).visible = false;
                this.m_camera_is_splitted = false;
            }
        }
    }

    /**
     * This method is used to return the spawn point of the enemy.
     * 
     * @param {number} id The id of the spawn point.
     * 
     * @returns {object} The spawn point.
     */
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

    /**
     * This method is used to return the coordinates of locations for the house.
     * 
     * @param {number} id The id of the house location.
     * 
     * @returns {object} The coordinates of the house location.
     */
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