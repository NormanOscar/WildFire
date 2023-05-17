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
	this.add("game_music_alternative", "./../asset/mp3/music/game_music_alternative.mp3");
	this.add("menu_music", "./../asset/mp3/music/menu_music.mp3");
	this.add("enemy_die", "./../asset/mp3/sounds/enemy_die.mp3");
	this.add("gun_shoot", "./../asset/mp3/sounds/gun_shoot.mp3");
	this.add("player_die", "./../asset/mp3/sounds/player_die.mp3");
	this.add("put_out_fire", "./../asset/mp3/sounds/put_out_fire.mp3");
	this.add("gameover_background", "./../asset/png/backgrounds/gameover_background.png");
	this.add("how_to_play_background", "./../asset/png/backgrounds/how_to_play_background.png");
	this.add("menu_background", "./../asset/png/backgrounds/menu_background.png");
	this.add("bullet0", "./../asset/png/bullets/bullet0.png");
	this.add("bullet1", "./../asset/png/bullets/bullet1.png");
	this.add("co-op_btn", "./../asset/png/buttons/co-op_btn.png");
	this.add("how_to_play_btn", "./../asset/png/buttons/how_to_play_btn.png");
	this.add("main_menu_btn", "./../asset/png/buttons/main_menu_btn.png");
	this.add("play_again_btn", "./../asset/png/buttons/play_again_btn.png");
	this.add("save_btn", "./../asset/png/buttons/save_btn.png");
	this.add("singleplayer_btn", "./../asset/png/buttons/singleplayer_btn.png");
	this.add("charFrame", "./../asset/png/charFrame.png");
	this.add("enemy", "./../asset/png/enemy/enemy.png");
	this.add("fire", "./../asset/png/fire/fire.png");
	this.add("particle", "./../asset/png/fire/particle.png");
	this.add("font", "./../asset/png/fonts/font.png");
	this.add("house0", "./../asset/png/houses/house0.png");
	this.add("house1", "./../asset/png/houses/house1.png");
	this.add("house2", "./../asset/png/houses/house2.png");
	this.add("b-button", "./../asset/png/howToPlay/b-button.png");
	this.add("fireman_shoot", "./../asset/png/howToPlay/fireman_shoot.png");
	this.add("fireman_shootSecond", "./../asset/png/howToPlay/fireman_shootSecond.png");
	this.add("moveStick", "./../asset/png/howToPlay/moveStick.png");
	this.add("revive", "./../asset/png/howToPlay/revive.png");
	this.add("reviveBtn", "./../asset/png/howToPlay/reviveBtn.png");
	this.add("shoot", "./../asset/png/howToPlay/shoot.png");
	this.add("shootBtn", "./../asset/png/howToPlay/shootBtn.png");
	this.add("shootSecond", "./../asset/png/howToPlay/shootSecond.png");
	this.add("shootSecondBtn", "./../asset/png/howToPlay/shootSecondBtn.png");
	this.add("verticalLine", "./../asset/png/howToPlay/verticalLine.png");
	this.add("player0", "./../asset/png/players/player0.png");
	this.add("player1", "./../asset/png/players/player1.png");
	this.add("tileset", "./../asset/png/tileset/tileset.png");
	this.add("countdown", "./../asset/png/ui/countdown.png");
	this.add("main_frame", "./../asset/png/ui/main_frame.png");
	this.add("minimapFrame", "./../asset/png/ui/minimapFrame.png");
	this.add("player1_frame", "./../asset/png/ui/player1_frame.png");
	this.add("player2_frame", "./../asset/png/ui/player2_frame.png");
	this.add("game_music", "./../asset/wav/music/game_music.wav");
	this.add("menu_select", "./../asset/wav/sounds/menu_select.wav");
	this.add("water_shoot", "./../asset/wav/sounds/water_shoot.wav");
};