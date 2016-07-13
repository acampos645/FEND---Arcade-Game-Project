"use strict";

// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Sets the initial x beyond the visible scope of the canvas element
    this.x = -88;

    // Sets the initial y position randomly on one of the three roads
    // -22 adjusts for enemy image file dimensions so that it aligns on the road
    this.y = ((Math.floor(Math.random() * 3) + 1) * 83) - 22;

    // Randomly sets the speed of the enemy between 100-400
    this.speed = Math.floor(Math.random() * 300) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);

    // If the position of the enemy is offscreen, it will randomly be reset on th left
    if (this.x >= 505) {
        this.x = 0;
        this.y = ((Math.floor(Math.random() * 3) + 1) * 83) - 22;
        this.speed = Math.floor(Math.random() * 300) + 100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png'

    // Initial position is bottom center tile of screen
    this.x = 202;
    this.y = 380;
};

Player.prototype.update = function() {

    // Resets player position if it is has reached the water
    if (this.y <= 35) {
        this.x = 202;
        this.y = 380;
    }

    // Checks to see if the player has come in contact with an enemy.
    // First, it checks to see whether the player and enemy x coordinates
    // overlap.  If they do, it tests whether they are in the same row.
    // If so, the player is reset to the starting point.

    allEnemies.forEach(function(enemyNum) {
        if ((enemyNum.x + 60) >= player.x && enemyNum.x <= player.x + 60 && (enemyNum.y - 13) == this.y) {
            this.x = 202;
            this.y = 380;   
        }
    }.bind(this));
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Moves the player according to user input, but keeps player
// contained in the playable area by ensuring it will not
// cross the outer boundaries
Player.prototype.handleInput = function(move) {
    if (move == "left" && this.x > 0) {
        this.x = this.x - 101;
    };
    if (move == "right" && this.x < 404) {
        this.x = this.x + 101;
    };
    if (move == "up" && this.y > 35) {
        this.y = this.y - 83;
    }
    if (move == "down" && this.y < 380) {
        this.y = this.y + 83;
    }
};


// Now instantiate your objects.

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();

// Place all enemy objects in an array called allEnemies

var allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

// Place the player object in a variable called player

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});