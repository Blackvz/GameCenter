/**
* @author Blackvz
*/
/// <reference path="move.d.ts" />

class Player {
  protected progress: number = 0;
  protected dom_id: string;
  protected move_distance: number = 15;
  protected start_time: number = new Date().getTime();

  private interval_id: number;
  private max_progress: number = 95;
  private interval_ms: number = 1000;


  constructor(dom_id: string) {
    this.dom_id = dom_id;
  }

  public move() {
    let speed: number = this.getSpeed();
    if ((this.progress + speed) > this.max_progress) {
        this.progress = this.max_progress;
    } else {
        this.progress += speed;
    }

    moveJs.move("#" + this.dom_id)
        .set("margin-left", this.progress + "%")
        .end();
  }

  public getSpeed() {
    return Math.floor((Math.random() * this.move_distance) + 1);
  }

  private hasWon() {
    if (this.progress >= this.max_progress) {
        return true;
    }
    return false;
  }

  public refresh() {
    this.interval_id = setInterval(this.update.bind(this), this.interval_ms);
  }

  private update() {
    this.updateProgressView();

    if (!this.hasWon()) {
        this.move();
    } else {
        let end_time: number = new Date().getTime();

        let time_to_win: number = this.getTimeToReachAim(this.start_time, end_time);
        let time_to_win_seconds: number = (time_to_win / 1000);

        let result_log: HTMLInputElement = <HTMLInputElement> document.getElementById("result_log");
        result_log.value += this.dom_id + " reached the goal! Time needed: " + time_to_win_seconds + "s \n";
        clearInterval(this.interval_id);
    }
  }

  private getTimeToReachAim(start_time, end_time) {
    return end_time - start_time;
  }

  public updateProgressView() {
    document.getElementById(this.dom_id + "_progress").innerHTML = this.progress + "%";
  }
}

let button: HTMLElement = document.getElementById("start_race");

button.onclick = function () {

    let player_1: Player = new Player("player_1");
    player_1.refresh();

    let player_2: Player = new Player("player_2");
    player_2.refresh();
};
