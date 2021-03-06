// Number of rows and columns of the board
var numRows = 6;
var numCols = 5;
// Column height and row width in pixels.  
// Should probably be called rowHeight and colWidth.  Oh well.
var rowWidth = 101;
var colHeight = 83;
// Offset so that players and enemies aren't hanging off the edge
var yOffset = 30;
// Column and row that player starts on
var playerStartingCol = 2;
var playerStartingRow = 5;
// boolean detailing whether a game is currently going
var gameOn = true;

// Enemies our player must avoid
var Enemy = function(startingRow) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // var column = Math.floor(Math.random() * 3) + 1
    this.y = colHeight * startingRow - yOffset;

    this.x = this.startingX = Math.floor(Math.random() * 1600) * -1;
    // this.x = 120 + 82 + 82;
    this.speed = Math.floor(Math.random() * 166) + 110;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    if (this.x > numCols * rowWidth) 
        this.x = this.startingX;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.col = playerStartingCol;
    this.row = playerStartingRow;
    this.lives = 3;
    this.score = 0;
}

Player.prototype.resetPosition = function() {
    this.col = playerStartingCol;
    this.row = playerStartingRow;
}

Player.prototype.update = function(dt) {
    this.x = this.col * rowWidth;
    this.y = this.row * colHeight - yOffset; // 30 pixel offset so the character isn't teetering on the edge
    if (player.row === 0) {
        console.log("Score is incrementing");
        player.score++;
        player.resetPosition();
    }
}

Player.prototype.handleInput = function(direction) {
    // Don't allow input if we're game over
    if (gameOn) {
        // handle input.  stop at the edge of the screen.  
        if (direction === 'left' && player.col >= 1)
            player.col--;
        if (direction === 'right' && player.col < numCols - 1) 
            player.col++;
        if (direction === 'up' && player.row >= 1)
            player.row--;
        if (direction === 'down' && player.row < numRows - 1) 
            player.row++;
    } 
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = []
for (var i = 0; i < 12; i++) {
    allEnemies.push(new Enemy(i % 3 + 1)); 
}
// allEnemies.push(new Enemy(3));
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
