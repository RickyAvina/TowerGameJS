class PathFinder{

  constructor(){
    this.isRunning = true;
    this.mouseX = 0;
    this.mouseY = 0;
    this.w = 100;

    this.enemies = [];
    // get and validate canvas and context
    this.canvas = document.getElementById('canvas');
    if (!this.canvas || !this.canvas.getContext)
    throw "No valid canvas found!";
    this.context = this.canvas.getContext("2d");
    if(!this.context)
    throw "No valid context found!";

    this.grid = [];
    this.cols = Math.floor(this.canvas.width / this.w);
    this.rows = Math.floor(this.canvas.height / this.w);

    this.cc = 0;
    this.rr = 0;
    // init class methods
  }

  passInstance(currentInstance){
     this.currentInstance = currentInstance;
  //  console.log("currentInstance: ", currentInstance);
    this.init();
  }

  init(){
    this.loadGrid();

    //  add listeners
    this.canvas.addEventListener('mousedown',function(evt){
      game.levels[0].pf.currentInstance.mouseX = evt.offsetX;
      game.levels[0].pf.currentInstance.mouseY = evt.offsetY;
      let row = Math.floor(game.levels[0].pf.currentInstance.mouseY/game.levels[0].pf.currentInstance.w);
      let col = Math.floor(game.levels[0].pf.currentInstance.mouseX/game.levels[0].pf.currentInstance.w);
      if(game.levels[0].pf.currentInstance.grid[col][row].color === "pink"){
        game.levels[0].pf.currentInstance.grid[col][row].color = "black";
        game.levels[0].pf.currentInstance.grid[col][row].occupied = true;
      } else if(game.levels[0].pf.currentInstance.grid[col][row].color === "black"){
        game.levels[0].pf.currentInstance.grid[col][row].color = "pink";
        game.levels[0].pf.currentInstance.grid[col][row].occupied = false;
      }

      //currentInstance.findPath();
    }, false );

    this.canvas.addEventListener('mousemove',function(evt){
    //  console.log(game.levels[0].pf.currentInstance);
      game.levels[0].pf.currentInstance.mouseX = evt.offsetX;
      game.levels[0].pf.currentInstance.mouseY = evt.offsetY;
    }, false );
  }

  run(){
    this.render();
    this.updateEnemies();
  }

  updateEnemies(){
      //console.log("enemies: ", this.enemies);
  }

  checkCell(c, r, addToArray){
    if (this.grid[c] !== undefined && this.grid[c][r] !== undefined){
      var thisCell = this.grid[c][r];

      if (addToArray == true){
        if (thisCell.occupied == false ){
          if (thisCell.visited == false){
            this.avaliableOptions.push(thisCell);
          } else {
            //console.log("Cell has already been chosen");
          }
        }
      } else{
        return thisCell;
      }
    } else {
      return undefined;
    }
  }

  findPath(){
    this.path = [];

    this.currentCell = this.startingPoint;
    var targetCell = this.endingPoint;

    while (this.currentCell !== null  && this.currentCell.loc !== targetCell.loc){
      this.path.push(this.currentCell);

      if (this.path.length > 10000000000){
        for (let i = 0; i < this.path.length; i ++){
          this.path[i].color = "red";
        }
        console.log("THE ONE");
        return this.path;
      }

      this.currentCell = this.findNextCell(this.currentCell.column, this.currentCell.row);
      if (this.currentCell.loc == targetCell.loc){
        console.log("LAST ONE");
        this.path.push(this.currentCell);
      }
    }

    for (let i = 0; i < this.path.length; i ++){
      this.path[i].color = "red";
    }

    console.log ("Path Generated Successfully!");

    var startingPoint = new vector2d(0,0);
    //game.levels[0].enemy = new Enemy(startingPoint, this.path);

    document.getElementById("spawnEnemy").addEventListener("click", function(){
      game.levels[0].pf.enemies.push(new Enemy(startingPoint, game.levels[0].pf.path));
    });

    return this.path;
  }

  findNextCell(column, row){
    var c = column;
    var r = row;
    this.avaliableOptions = [];
    /*Look at every avaliable option */

    this.checkCell(c+1, r, true);
    this.checkCell(c-1, r, true);
    this.checkCell(c, r-1, true);
    this.checkCell(c, r+1, true);

    var lowestOption = 1000000;
    var chosenCell = null;

    for (let i = 0; i < this.avaliableOptions.length; i++){
      if((this.avaliableOptions[i].loc.dist(this.endingPoint.loc)) < lowestOption){
        lowestOption = this.avaliableOptions[i].loc.dist(this.endingPoint.loc);
        chosenCell = this.avaliableOptions[i];
      }
    }

    if (lowestOption == 1000000){ // blocked
      console.log("blocked");
      this.path.pop();
      return this.path[this.path.length-1];
    }

    //console.log(chosenCell, this.avaliableOptions);
    chosenCell.visited = true;

    //console.log("ChosenCell", chosenCell);
    return chosenCell;
    /* for every enemy
    - look at every possible option
    - use vector math (either distance or angle to target) to determine what the best step is
    - go to the closest cell, add it to an array (Path)
    - if you backtrack, take the path you just went on and delete it from the path
    */
  }

  render(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(let i = 0; i < this.cols; i++){
      for(let j = 0; j < this.rows; j++){
        this.grid[i][j].render();
      }
    }
  }

  loadGrid(){

    for(let i = 0; i < this.cols; i++){
      this.grid[i] = [];
      for(let j = 0; j < this.rows; j++){
        this.grid[i].push(new Cell(new MyVector((i*this.w), (j*this.w))));
        this.grid[i][j].column = i;
        this.grid[i][j].row = j;
      }
    }

    this.startingPoint = this.grid[0][0];
    this.startingPoint.visited = true;
    this.endingPoint = this.grid[this.grid.length-1][this.grid[0].length-1];

    console.log("ENDING POINT: ", this.endingPoint);

    this.startingPoint.color = "blue";
    this.endingPoint.color = "blue";

  //  console.log("Starting point: (" + this.startingPoint.loc.x + ", " + this.startingPoint.loc.y + ")");
  //  console.log("Ending Point: (" + this.endingPoint.loc.x + ", " + this.endingPoint.loc.y + ")")
  }
}
