//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * Creates a new Requests object.
 * 
 * @constructor
 * @extends rune.resource.Requests
 * 
 * @class
 * @classdesc
 * 
 * This class includes (bakes) resource files used by the application. A 
 * resource file is made available by reference (URI) or base64-encoded string. 
 * Tip: Use Rune-tools to easily bake resource files into this class.
 */
wildfire.data.Requests = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend rune.resource.Requests
     */
    rune.resource.Requests.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

wildfire.data.Requests.prototype = Object.create(rune.resource.Requests.prototype);
wildfire.data.Requests.prototype.constructor = wildfire.data.Requests;

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
wildfire.data.Requests.prototype.m_construct = function() {
    rune.resource.Requests.prototype.m_construct.call(this);
    this.add("map", "./../asset/json/map.json");
	this.add("enemy_die", "./../asset/mp3/enemy_die.mp3");
	this.add("game_music_alternative", "./../asset/mp3/game_music_alternative.mp3");
	this.add("gun_shoot", "./../asset/mp3/gun_shoot.mp3");
	this.add("menu_music", "./../asset/mp3/menu_music.mp3");
	this.add("player_die", "./../asset/mp3/player_die.mp3");
	this.add("put_out_fire", "./../asset/mp3/put_out_fire.mp3");
	this.add("b-button", "./../asset/png/b-button.png");
	this.add("bullet0", "./../asset/png/bullet0.png");
	this.add("bullet1", "./../asset/png/bullet1.png");
	this.add("co-op_btn", "./../asset/png/co-op_btn.png");
	this.add("enemy", "./../asset/png/enemy.png");
	this.add("fire", "./../asset/png/fire.png");
	this.add("gameover_background", "./../asset/png/gameover_background.png");
	this.add("house0", "./../asset/png/house0.png");
	this.add("house1", "./../asset/png/house1.png");
	this.add("house2", "./../asset/png/house2.png");
	this.add("how_to_play_background", "./../asset/png/how_to_play_background.png");
	this.add("how_to_play_btn", "./../asset/png/how_to_play_btn.png");
	this.add("main_frame", "./../asset/png/main_frame.png");
	this.add("main_menu_btn", "./../asset/png/main_menu_btn.png");
	this.add("menu_background", "./../asset/png/menu_background.png");
	this.add("minimapFrame", "./../asset/png/minimapFrame.png");
	this.add("moveStick", "./../asset/png/moveStick.png");
	this.add("play_again_btn", "./../asset/png/play_again_btn.png");
	this.add("player0", "./../asset/png/player0.png");
	this.add("player1", "./../asset/png/player1.png");
	this.add("player1_frame", "./../asset/png/player1_frame.png");
	this.add("player2_frame", "./../asset/png/player2_frame.png");
	this.add("reviveBtn", "./../asset/png/reviveBtn.png");
	this.add("shoot", "./../asset/png/shoot.png");
	this.add("shootBtn", "./../asset/png/shootBtn.png");
	this.add("shootSecond", "./../asset/png/shootSecond.png");
	this.add("shootSecondBtn", "./../asset/png/shootSecondBtn.png");
	this.add("singleplayer_btn", "./../asset/png/singleplayer_btn.png");
	this.add("tileset", "./../asset/png/tileset.png");
	this.add("verticalLine", "./../asset/png/verticalLine.png");
	this.add("game_music", "./../asset/wav/game_music.wav");
	this.add("menu_select", "./../asset/wav/menu_select.wav");
	this.add("water_shoot", "./../asset/wav/water_shoot.wav");
};