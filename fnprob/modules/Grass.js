var LivingCreature = require("./LivingCreature");
var random = require("./random");
module.exports = class Grass extends LivingCreature {
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if(weateris == "Ամառ" || weateris == "Գարուն" || weateris == "Աշուն" ){
            if (this.multiply >= 7 && newCell) {
                grassHashiv++;
                var newGrass = new Grass(newCell[0], newCell[1], this.index);
                grassArr.push(newGrass);
                matrix[newCell[1]][newCell[0]] = 1;
                this.multiply = 0;
            }
        }
        else if(weateris == "Ձմեռ"){
            if (this.multiply >= 9 && newCell) {
                grassHashiv++;
                var newGrass = new Grass(newCell[0], newCell[1], this.index);
                grassArr.push(newGrass);
                matrix[newCell[1]][newCell[0]] = 1;
                this.multiply = 0;
            }
        }
    }
}