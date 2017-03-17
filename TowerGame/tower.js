'use strict'

class Tower extends Mover {
    constructor(level, imageSrc, mouse) {
        super();               // required
        this.level = level;  // access to all the other objects.  e.g. this.level.boids or this.level.game.canvas
        this.image = new Image();
        this.image.src = imageSrc;
        this.mouse = mouse;
        this.loc = {x:this.mouse.x+this.image.width/2, y:this.mouse.y+this.image.height/2};

        this.bullets = []

        this.timeFired = Date.now();

        this.image.addEventListener('load', function(){
        } ,false);
        this.image.addEventListener('error', function() { console.log(" failed to load"); }, false);
        // other Player properties
    }
    run() {
        // do whatever actions
        this.update();
        this.render();
        }

    render() {
        //game.context.fillStyle = "green";
        game.context.save();
        game.context.translate(this.loc.x, this.loc.y);
        game.context.rotate(this.angle + (Math.PI/2));
        game.context.drawImage(this.image, 0-this.image.width/2, 0-this.image.height/2);
        game.context.restore();
    }

    update(){
      let mouseX = game.canvas.mouse.x;
      let mouseY = game.canvas.mouse.y;
      let dx = mouseX - this.loc.x;
      let dy = mouseY - this.loc.y;
      this.angle = Math.atan2(dy, dx);

      // if is in range && timePassed
      if ((Date.now() - this.timeFired > 500) && (this.isInRange())){
        this.bullets.push(new Bullet(game.levels[0], this.loc, this.angle));
        this.timeFired = Date.now();
      }

      for (let i = 0; i < this.bullets.length; i++){
          this.bullets[i].run();
          if (this.bullets[i].locX < 0-5 || this.bullets[i].locX > window.innerWidth - 10 || this.bullets[i].locY < 0-5 || this.bullets[i].locY > window.innerHeight-10){
            this.bullets.splice(i, 1);
          }
      }
    }

    isInRange(){
      var dist = Math.sqrt(Math.pow((game.canvas.mouse.x - this.loc.x), 2) + Math.pow((game.canvas.mouse.y - this.loc.y), 2));
      return (dist < 200);
      }
}
