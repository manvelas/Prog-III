var LivingCreature = require("./LivingCreature");
var random = require("./random");
module.exports = class GrassEater extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = 10;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;
            this.energy--;
        }
    }
    eat() {
        var newCell1 = this.chooseCell(1);
        var newCell2 = this.chooseCell(6);
        var newCells = newCell1.concat(newCell2);
        var newCell = random(newCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            if(matrix[newY][newX] == 1){
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
                grassHashiv--;
                this.energy += 2;
            }
            else if(matrix[newY][newX] ==6){
                NutellaHashiv--;
                this.energy+=2;
            }
            matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;
        }
    }
    mul() {
        var newCell1 = this.chooseCell(0);
        var newCell2 = this.chooseCell(1);
        var newCells = newCell1.concat(newCell2);
        var newCell = random(newCells);
        if(weateris == "Ամառ" || weateris == "Գարուն" || weateris == "Ձմեռ" ){
            if (this.energy >= 15 && newCell) {
                var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
                grassEaterHashiv++;
                grassEaterArr.push(newGrassEater);
                matrix[newCell[1]][newCell[0]] = 2;
                this.energy = 10;
            }
        }
        else if(weateris == "Աշուն"){
            if (this.energy >= 11 && newCell) {
                var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
                grassEaterHashiv++;
                grassEaterArr.push(newGrassEater);
                matrix[newCell[1]][newCell[0]] = 2;
                this.energy = 10;
            }
        }
    }
    die(){
        if (this.energy<=0){
            matrix[this.y][this.x] = 0;
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            grassEaterHashiv--;
        }
    }
}