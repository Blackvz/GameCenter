/**
 * @author Blackvz
 */

/**
 * Class Player
 *
 * @param dom_id
 * @constructor
 */
function Player(dom_id) {
    this.progress = 0;
    this.dom_id = dom_id;
    this.move_distance = 15;
    this.interval_id = 0;
    this.max_progress = 95;
    this.interval_ms = 1000;
}

Player.prototype.move = function () {

    var speed = this.getSpeed();
    if ((this.progress + speed) > this.max_progress) {
        this.progress = this.max_progress;
    } else {
        this.progress += speed;
    }

    move("#" + this.dom_id)
        .set('margin-left', this.progress + "%")
        .end();
};

Player.prototype.getSpeed = function () {
    return Math.floor((Math.random() * this.move_distance) + 1);
};

Player.prototype.hasWon = function() {
    if (this.progress >= this.max_progress) {
        return true;
    }
    return false;
};

Player.prototype.refresh = function() {
    this.interval_id = setInterval(this.update.bind(this), this.interval_ms);
};

Player.prototype.update = function() {
    if (!this.hasWon()) {
        this.move();
    } else {
        $result_log = document.getElementById('result_log');
        $result_log.value += this.dom_id + " reached the goal! \n";
        clearInterval(this.interval_id);
    }
};

var button = document.getElementById('start_race');

button.onclick = function () {

    var player_1 = new Player('player_1');
    player_1.refresh();

    var player_2 = new Player('player_2');
    player_2.refresh();
};