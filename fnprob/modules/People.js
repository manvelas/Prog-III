var LivingCreature = require("./LivingCreature");
var random = require("./random");
module.exports = class People extends LivingCreature {
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
        var newCells1 = this.chooseCell(0);
        var newCells2 = this.chooseCell(1);
        var newCells = newCells1.concat(newCells2);
        var newCell = random(newCells)
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;
                  for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            this.y = newY;
            this.x = newX;
            this.energy-=2;
        }
    }
    eat() {
        var newCell1 = this.chooseCell(3);
        var newCell2 = this.chooseCell(6);
        var newCells = newCell1.concat(newCell2);
        var newCell = random(newCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            if(matrix[newY][newX] ==3){
                for (var i in WolfArr) {
                    WolfHashiv--;
                    if (newX == WolfArr[i].x && newY == WolfArr[i].y) {
                        WolfArr.splice(i, 1);
                        break;
                    }
                }
                this.energy += 2;
            }
            else if(matrix[newY][newX] ==6){
                NutellaHashiv--;
                this.energy--;
            }
            this.y = newY;
            this.x = newX;
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 18 && newCell && this.chooseCell(4)) {
            var newPeople = new People(newCell[0], newCell[1], this.index);
            PeopleHashiv++;
            PeopleArr.push(newPeople);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 10;
        }
    }
    die(){
        if (this.energy<=0){
            matrix[this.y][this.x] = 0;
            PeopleHashiv--;
            for (var i in  PeopleArr) {
                if (this.x ==  PeopleArr[i].x && this.y ==  PeopleArr[i].y) {
                    PeopleArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}