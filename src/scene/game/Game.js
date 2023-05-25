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
    constructor(nr) {
        super();

        this.application.sounds.master.clear();

        this.m_nrOfPlayers = nr || 1;
        this.m_players = new Array();
        this.m_enemies = new Array();
        this.scoreTimer = null;
        this.m_totalScore = 0;
        this.m_nrOfOpenGates = 2;
        this.enemySpawnRate = 1500;
        this.enemySpeed = 1.5;

        this.m_music = null;
        this.fireController = null;
        this.houses = new Array();
        this.totalFires = 0;
        this.m_nrOfPlayersAlive = nr || 1;
        this.mainHUD = null;
        this.p1HUD = null;
        this.p2HUD = null;
        this.splittedMinimap = null;
        this.splittedMinimapFrame = null;
        this.scoreCounter = null;

        this.m_cams = new Array();
        this.m_camera_is_splitted = false;

        this.dificultyTimer = null;
        this.dificulty = 1;

        this.allPlayersDead = false;

        this.newHighscore = false;
        this.gameStarted = false;
        this.gameEnded = false;
    }

    /**
     * This method is automatically executed once after the scene is instantiated. 
     * The method is used to create objects to be used within the scene.
     *
     * @returns {undefined}
     */
    init() {
        super.init();
        this.stage.map.load('map');
        this.cameras.removeCameras(true);
        this.initCameras();
        this.initPlayers();
        this.initHouses();
        this.initMainHUD();
        
        this.initCountdown();
        this.countdownTimer = this.timers.create({
            duration: 3000,
            onComplete: this.startGame,
            scope: this,
        });
    }

    initCountdown() {
        var countdown = new Countdown();
        this.cameras.getCameraAt(0).addChild(countdown);
    }
    
    startGame() {
        this.gameStarted = true;
        
        this.initMusic();

        this.fireController = new FireController(this);

        this.initScoreTimer();
        this.initEnemySpawnTimer();

        this.initDificultyTimer();
    }

    initDificultyTimer() {
        this.dificultyTimer = this.timers.create({
            duration: 10000,
            repeat: Infinity,
            onTick: this.checkScore,
            scope: this,
        });
    }

    checkScore() {
        if (this.m_totalScore >= 500 && this.m_totalScore < 1000) {
            console.log("Dificulty changed to 2");
            this.dificulty++;
            this.chageDificulty();
        } else if (this.m_totalScore >= 1000 && this.m_totalScore < 1500) {
            console.log("Dificulty changed to 3");
            this.dificulty++;
            this.chageDificulty();
        } else if (this.m_totalScore >= 1500 && this.m_totalScore < 2000) {
            console.log("Dificulty changed to 4");
            this.dificulty++;
            this.chageDificulty();
        } else if (this.m_totalScore >= 2000){
            console.log("Dificulty changed to 5");
            this.dificulty++;
            this.chageDificulty();
        }
    }

    chageDificulty() {
        if (this.dificulty <= 3) this.m_nrOfOpenGates++;

        this.enemySpawnRate -= 100;
        this.enemySpeed += 0.1;
        for (const activeFire of this.fireController.activeFires) {
            activeFire.fireSpawnRate -= 100;
        }
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

    initMainHUD() {
        this.mainHUD = new MainHUD(this, this.application.screen.width, this.application.screen.height);
        this.cameras.getCameraAt(0).addChild(this.mainHUD);
    }

    initP1HUD() {
        this.p1HUD = new SplittedHUD(this, this.application.screen.width / 2, this.application.screen.height, 1);
        this.cameras.getCameraAt(1).addChild(this.p1HUD);
    }
    
    initP2HUD() {
        this.p2HUD = new SplittedHUD(this, this.application.screen.width / 2, this.application.screen.height, 2);
        this.cameras.getCameraAt(2).addChild(this.p2HUD);
    }

    initSplittedMiniMap() {
        this.splittedMinimap = new Minimap(this, this.application.screen.centerX - 46.5, 2, 'splitted');
        this.application.screen.addChild(this.splittedMinimap);
    }

    initSplittedScoreCounter() {
        this.splittedScoreCounter = new Score('Score: ' + this.m_totalScore.toString());
        this.application.screen.addChild(this.splittedScoreCounter);
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
        else if (this.m_nrOfPlayers == 2) {
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
     * This method is used to initiate the enemy spawn timer.
     * 
     * @returns {undefined}
     */
    initEnemySpawnTimer() {
        this.timers.create({
            duration: this.enemySpawnRate,
            repeat: Infinity,
            onTick: this.createEnemy,
            scope: this
        }, true);
    }

    /**
     * This method is used to create a new enemy and add it to the stage.
     * 
     * @returns {undefined}
     */
    createEnemy() {
        const r = Math.floor(Math.random() * this.m_nrOfOpenGates);
        var targetIndex = Math.floor(Math.random() * this.m_players.length);
        
        if (this.m_players[targetIndex].status != 'dead') {
            var enemy = new Enemy(this.getEnemySpawnPoints(r).x, this.getEnemySpawnPoints(r).y, this, this.m_players[targetIndex], this.enemySpeed);
            this.stage.addChild(enemy);
            enemy.path = this.stage.map.back.getPath(enemy.centerX, enemy.centerY, enemy.targetPlayer.centerX, enemy.targetPlayer.centerY, true);
            this.m_enemies.push(enemy);
        }
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

        if (this.gameStarted) {

            if (this.m_players.length == 2) {
                this.calcCamera();
            }
    
            this.fireController.checkActiveFires();
    
            // Check if all players are dead.
            for (const player of this.m_players) {
                if (this.m_nrOfPlayers == 2) {
                    this.m_players[0].status == 'dead' && this.m_players[1].status == 'dead' ? this.allPlayersDead = true : this.allPlayersDead = false;
                } else {
                    player.status == 'dead' ? this.allPlayersDead = true : this.allPlayersDead = false;
                }
            }
    
            // If all players are dead, the game is over.
            if (this.allPlayersDead) {
                this.timers.create({
                    duration: 1000,
                    onComplete: this.gameOver,
                    scope: this
                }, true);
            }
        }

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

                this.mainHUD.dispose();
                this.initP1HUD();
                this.initP2HUD();
                this.initSplittedMiniMap();
                this.initSplittedScoreCounter();

                this.m_camera_is_splitted = true;
            }
        }

        if (this.m_camera_is_splitted) {
            // If users are close to each other, show the main camera
            if (Math.abs(playerOnePos.x - playerTwoPos.x) < this.application.screen.width - 50 && Math.abs(playerOnePos.y - playerTwoPos.y) < this.application.screen.height - 50) {
                this.cameras.getCameraAt(0).visible = true;
                this.cameras.getCameraAt(1).visible = false;
                this.cameras.getCameraAt(2).visible = false;

                this.p1HUD.dispose();
                this.p2HUD.dispose();
                this.splittedMinimap.frame.dispose();
                this.splittedMinimap.dispose();
                this.splittedScoreCounter.dispose();
                this.initMainHUD();

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
                y: 32
            },
            {
                x: 480,
                y: 608
            },
            {
                x: 928,
                y: 320
            },
            {
                x: 32,
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

    gameOver() {
        this.gameEnded = true;
        if (this.m_camera_is_splitted) {
            this.splittedMinimap.frame.dispose();
            this.splittedMinimap.dispose();
            this.splittedScoreCounter.dispose();
        }
        if (this.application.highscores.test(this.m_totalScore, this.m_nrOfPlayers - 1) != -1) {
            this.application.scenes.load([new NewHighscore(this.m_totalScore, this.m_nrOfPlayers)]);
        } else {
            this.application.scenes.load([new GameOver(this.m_totalScore, this.m_nrOfPlayers, this.newHighscore)]);
        }
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