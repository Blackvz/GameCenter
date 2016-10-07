/**
* @author Blackvz
*/
/// <reference path="move.d.ts" />
var Player = (function () {
    function Player(dom_id) {
        this.progress = 0;
        this.move_distance = 15;
        this.start_time = new Date().getTime();
        this.max_progress = 95;
        this.interval_ms = 1000;
        this.dom_id = dom_id;
    }
    Player.prototype.move = function () {
        var speed = this.getSpeed();
        if ((this.progress + speed) > this.max_progress) {
            this.progress = this.max_progress;
        }
        else {
            this.progress += speed;
        }
        move("#" + this.dom_id)
            .set("margin-left", this.progress + "%")
            .end();
    };
    Player.prototype.getSpeed = function () {
        return Math.floor((Math.random() * this.move_distance) + 1);
    };
    Player.prototype.hasWon = function () {
        if (this.progress >= this.max_progress) {
            return true;
        }
        return false;
    };
    Player.prototype.refresh = function () {
        this.interval_id = setInterval(this.update.bind(this), this.interval_ms);
    };
    Player.prototype.update = function () {
        this.updateProgressView();
        if (!this.hasWon()) {
            this.move();
        }
        else {
            var end_time = new Date().getTime();
            var time_to_win = this.getTimeToReachAim(this.start_time, end_time);
            var time_to_win_seconds = (time_to_win / 1000);
            var result_log = document.getElementById("result_log");
            result_log.value += this.dom_id + " reached the goal! Time needed: " + time_to_win_seconds + "s \n";
            clearInterval(this.interval_id);
        }
    };
    Player.prototype.getTimeToReachAim = function (start_time, end_time) {
        return end_time - start_time;
    };
    Player.prototype.updateProgressView = function () {
        document.getElementById(this.dom_id + "_progress").innerHTML = this.progress + "%";
    };
    return Player;
}());
var button = document.getElementById("start_race");
button.onclick = function () {
    var player_1 = new Player("player_1");
    player_1.refresh();
    var player_2 = new Player("player_2");
    player_2.refresh();
};
