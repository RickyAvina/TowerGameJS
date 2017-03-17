
class Cell{
  constructor(loc){
    this.loc = new vector2d(loc.x, loc.y);
    this.occupied = false;
    this.color = "rgba(20, 20, 0, 0.5)";
    this.occupied = false;
    this.column;
    this.row;
    this.visited = false;
  }

  run(){
    this.update();
    this.render();
  }

  update(){

  }

  render(){
    game.levels[0].pf.currentInstance.context.strokeStyle = 'white';
    game.levels[0].pf.currentInstance.context.strokeRect(this.loc.x, this.loc.y, game.levels[0].pf.currentInstance.w, game.levels[0].pf.currentInstance.w);
    game.levels[0].pf.currentInstance.context.fillStyle = this.color;
    game.levels[0].pf.currentInstance.context.fillRect(this.loc.x, this.loc.y, game.levels[0].pf.currentInstance.w, game.levels[0].pf.currentInstance.w);
  }
}
