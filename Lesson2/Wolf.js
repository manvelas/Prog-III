class Wolf extends LivingCreature {
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = 10;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x-2,this.y-2],
            [this.x-1,this.y-2],
            [this.x  ,this.y-2],
            [this.x+1,this.y-2],
            [this.x+2,this.y-2],
            
            [this.x-2,this.y-1],
            [this.x-1,this.y-1],
            [this.x  ,this.y-1],
            [this.x+1,this.y-1],
            [this.x+2,this.y-1],
            
            [this.x-2,this.y  ],
            [this.x-1,this.y  ],
            [this.x+1,this.y  ],
            [this.x+2,this.y  ],
        
            [this.x-2,this.y+1],
            [this.x-1,this.y+1],
            [this.x  ,this.y+1],
            [this.x+1,this.y+1],
            [this.x+2,this.y+1],
            
            [this.x-2,this.y+2],
            [this.x-1,this.y+2],
            [this.x  ,this.y+2],
            [this.x+1,this.y+2],
            [this.x+2,this.y+2],
            ];        
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        var newCells1 = this.chooseCell(0);
        var newCells2 = this.chooseCell(1);
        var newCells = newCells1.concat(newCells2);
        var newCell = random(newCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;
                  for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            this.y = newY;
            this.x = newX;
            this.energy--;
        }
    }
    eat() {
        var newCell1 = this.chooseCell(2);
        var newCell2 = this.chooseCell(6);
        var newCells = newCell1.concat(newCell2);
        var newCell = random(newCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            if(matrix[newY][newX] == 2){
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
                this.energy += 2;
            }
            else if(matrix[newY][newX] == 6){
                this.energy--;
            }
            this.y = newY;
            this.x = newX;
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 15 && newCell) {
            var newWolf = new Wolf(newCell[0], newCell[1], this.index);
            WolfArr.push(newWolf);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 10;
        }
    }
    die(){
        if (this.energy<=0){
            matrix[this.y][this.x] = 0;
            for (var i in  WolfArr) {
                if (this.x ==  WolfArr[i].x && this.y ==  WolfArr[i].y) {
                    WolfArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}