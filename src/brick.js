import { detectCollision } from "./collisionDetection";
export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById("img_brick");
    this.game = game;

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.position = position;
    this.width = 80;
    this.height = 24;

    this.markedForDeletion = false;
  }

  update(deltaTime) {
    if (detectCollision(this.game.ball, this)) {
      this.markedForDeletion = true;
      this.game.ball.speed.y = -this.game.ball.speed.y;
    }
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
