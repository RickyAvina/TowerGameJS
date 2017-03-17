class Enemy {

  constructor(loc, path){
    this.loc = new vector2d(loc.x, loc.y);
    this.vel = new vector2d(0.1, 0.1);
    this.currentIndex = 0;
    this.path = path;
    this.reachedTarget = false;
    this.currentCell = this.path[this.currentIndex];
    this.targetCell = this.path[this.currentIndex+1];
    this.died = false;
    this.speed = 3.3;
    this.accConst = -1.1;
  }

  run(){
    this.update();
    this.render();
  }

  update(){

    if (!this.died && !this.loc.copy().sub(this.targetCell.loc).length() <= 10){

      if (this.loc.copy().sub(this.targetCell.loc).length() <= 10){
            this.findNextTarget();
      }

      if (this.targetCell != undefined){

        var acc = this.loc.copy().sub(this.targetCell.loc);

        acc.normalize();
        acc.scale(this.accConst);

      //  console.log("Acceleration: ", acc);
        //console.log("Velocity: ", this.vel);

        this.vel.add(acc);
        this.vel.normalize();
        this.vel.scale(this.speed);
        this.loc.add(this.vel);
      } else {
        this.died = true;
      }
  } else {
    this.died = true;
  }
}

  render(){
    game.context.fillStyle = "blue";
    game.context.fillRect(this.loc.x, this.loc.y, 10 , 10);
  }

  findNextTarget(){

    this.currentIndex+=1;

    this.currentCell = this.path[this.currentIndex];
    this.targetCell =  this.path[this.currentIndex+1];

    if (this.targetCell == undefined){
      console.log("Cell has gone off!");
      this.died = true;
    }
  }
}
