'use strict'

// The Level class contains most of the assets.
class Level {

  constructor(game, number) {
    this.game = game;
    this.number = number;
    this.init();
  }

  init() {    // needs to be called each time a level is re-started
    // different level numbers should have different behavior
    this.pf = new PathFinder();
    this.pf.passInstance(this.pf);

    this.predator = new Predator(this);
    this.player = new Player(this);
    this.safeArea = new SafeArea(this);

    this.numBoids = 100;
    this.boids = [];
    for(let i = 0; i < this.numBoids; i++)
    this.boids.push(new Boid(this));

    this.img = new Image();
    this.img.src = "images/towers/tow1.png";

    this.img.addEventListener("load", function () {
      console.log("Image Loaded");
    });

    this.img.addEventListener("error", function(){
      console.log("Image failed to load");
    });

    this.towers = []

    canvas.addEventListener("mousemove", function(e){
      game.mouseMoved = true;
      game.canvas.mouse = getMousePos(canvas, e);
    });
  }

  run() {
    this.pf.run();

    this.render();
    this.player.run();
    this.predator.run();
    this.safeArea.run();
    this.runBoids();
    this.runTowers();

    for (let j = 0; j < game.levels[0].pf.enemies.length; j++){

      game.levels[0].pf.enemies[j].run();

      if (game.levels[0].pf.enemies[j].died){
        game.levels[0].pf.enemies.splice(j, 1);
      }
    }
  }

  runBoids() {    // give every boid some time
    for(let i = 0; i < this.numBoids; i++)
    this.boids[i].run();
  }

  runTowers() {    // give every boid some time
    for(let i = 0; i < this.towers.length; i++)
    this.towers[i].run();
  }

  render() {
    // draw whatever
    // here is some place holder
    var context = this.game.context;
    context.save();
    // draw a gray background
    context.fillStyle = "gray";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    // draw the level text
    var levelText = ["Zero", "One", "Two","Three"];
    context.fillStyle = "white";
    context.font = "48px sans-serif";
    context.fillText("Level " + levelText[this.number], 250,300);

  //  console.log("Is clicking? " + game.isClicking);

    if (game.currentImage != null)
        context.drawImage(game.currentImage, game.canvas.mouse.x - game.currentImage.width/2, game.canvas.mouse.y - game.currentImage.height/2);

    canvas.addEventListener("click", function(e){
      if (game.currentImage!=null){
        var stringIndex = game.currentImage.src.search(".png") - 1;
        var index = game.currentImage.src.charAt(stringIndex);
        var tower = new Tower(game.levels[0], "images/towers/d" + index + ".png", game.canvas.mouse);
        game.levels[0].towers.push(tower);
    } else {
      
    }

    game.currentImage = null;

    });

    game.mouseMoved = false;
    context.restore();
  }


}
