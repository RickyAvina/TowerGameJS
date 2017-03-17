'use strict'

class Bullet extends Mover {
    constructor(level, loc, angle) {
        super();             // required
        this.level = level;  // access to all the other objects.  e.g. this.level.boids or this.level.game.canvas
        this.locX = loc.x;
        this.locY = loc.y;
        this.image = new Image();
        this.image.src = "images/bullets/b2.png";
        this.myTime = 0.0;
        this.angle = angle;
        this.speed = 5;
        // other Player properties
    }
    run() {
        // do whatever actions
        this.render();
        this.update();
        }
    render() {
        // draw whatever
        game.context.save();
        game.context.translate(this.locX, this.locY);
        game.context.drawImage(this.image, 0, 0);
        game.context.restore();
        }
    // other Player methods ...
    update() {
      // if is in range
      var cos = Math.cos(this.angle);
      var sin = Math.sin(this.angle);
      this.locX += cos * this.speed;
      this.locY += sin * this.speed;
    }
}
