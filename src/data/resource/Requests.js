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
	this.add("bullet0", "./../asset/png/bullet0.png");
	this.add("bullet1", "./../asset/png/bullet1.png");
	this.add("enemy", "./../asset/png/enemy.png");
	this.add("enemy1", "./../asset/png/enemy1.png");
	this.add("player0", "./../asset/png/player0.png");
	this.add("player1", "./../asset/png/player1.png");
	this.add("tileset", "./../asset/png/tileset.png");
	this.add("tree", "./../asset/png/tree.png");
};