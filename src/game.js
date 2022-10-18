import InputHandler from "./input";
import Paddle from "/src/paddle";
import Ball from "/src/ball";
import { buildLevel, level1, level2, level3, winEmpty } from "/src/levels";

const initial_value = 3;
const final_stage = 3;
const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  WINNER: 5,
  RESET: 6
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.levels = [level1, level2, level3, winEmpty];
    this.currentLevel = 1;
    this.gameObjects = [];
    this.bricks = [];
    this.lives = initial_value;
    new InputHandler(this.paddle, this);
  }

  start() {
    if (
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.NEWLEVEL ||
      this.gamestate === GAMESTATE.RESET
    ) {
      this.bricks = buildLevel(this, this.levels[this.currentLevel - 1]);
      this.ball.reset();
      this.gameObjects = [this.ball, this.paddle];
      this.gamestate = GAMESTATE.RUNNING;
    } else return;
  }
  update(deltaTime) {
    if (
      this.currentLevel === final_stage + 1 &&
      this.gamestate !== GAMESTATE.RESET
    ) {
      // console.log(this.currentLevel);
      this.gamestate = GAMESTATE.WINNER;
    } else if (
      this.bricks.length === 0 &&
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.RESET
    ) {
      this.currentLevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }

    if (this.lives === 0 && this.gamestate !== GAMESTATE.RESET)
      this.gamestate = GAMESTATE.GAMEOVER;

    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER ||
      this.gamestate === GAMESTATE.WINNER
    )
      return;

    if (this.gamestate === GAMESTATE.RESET) {
      this.currentLevel = 1;
      this.lives = initial_value;
      this.start();
    }

    [...this.gameObjects, ...this.bricks].forEach((object) =>
      object.update(deltaTime)
    );

    this.bricks = this.bricks.filter((object) => !object.markedForDeletion);
  }
  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));
    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACEBAR To Start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
    if (this.gamestate === GAMESTATE.WINNER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "CONGRATULATIONS! \n YOU WON THE GAME:D",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "50px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }
  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
  requireReset() {
    if (
      this.gamestate === GAMESTATE.WINNER ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      this.gamestate = GAMESTATE.RESET;
  }
}
