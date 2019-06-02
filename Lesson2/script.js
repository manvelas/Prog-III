var matrix = []; 
var rows = 80; 
var columns = 80; 
var side = 12;
var grassArr = [];
var grassEaterArr = [];
var WolfArr = [];
var PeopleArr = [];
var TractorArr = [];
function setup() {
    for (var y = 0; y < rows; y++) {
        matrix[y] = []; 
        for (var x = 0; x < columns; x++) {
            var a = Math.floor(Math.random() * 100);
            if (a >= 0 && a < 40) {
                matrix[y][x] = 0; 
            }
            if (a >= 40 && a < 50) {
                matrix[y][x] = 1; 
            }
            else if (a >= 50 && a < 70) {
                matrix[y][x] = 2; 
            }
            else if (a >= 70 && a < 85) {
                matrix[y][x] = 3; 
            }
            else if (a >= 85 && a < 95) {
                matrix[y][x] = 4; 
            }
            else if (a >= 95 && a < 100) {
                matrix[y][x] = 5; 
            }
        }
    }
    
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var xot = new Grass(x, y, 1);
                grassArr.push(xot)
            }
            else if (matrix[y][x] == 2) {
                var newGrassEater = new GrassEater(x, y, 2);
                grassEaterArr.push(newGrassEater);        
            }
           else if (matrix[y][x] == 3) {
                var newWolf = new Wolf(x, y, 3);
                WolfArr.push(newWolf);
            }
            else if (matrix[y][x] == 4) {
                var newPeople = new People(x, y, 4);
                PeopleArr.push(newPeople);
            }
            else if (matrix[y][x] == 5) {
                var newTractor = new Tractor(x, y,5, Math.round(Math.random()));
                TractorArr.push(newTractor);
            }
        }
    }
}
function end(){
    
    for (var i in  TractorArr) {
        TractorArr.splice(i, 1);
    }
    for (var i in  grassArr) {
        grassArr.splice(i, 1);
    }
    for (var i in  grassEaterArr) {
        grassEaterArr.splice(i, 1);
    }
    for (var i in  PeopleArr) {
        PeopleArr.splice(i, 1);
    }
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x]=0;
        }
    }
}
function draw() {
   // console.log(matrix)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                    fill("yellow");
                    rect(x * side, y * side, side, side);    
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
     for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
        grassEaterArr[i].move();
        grassEaterArr[i].mul();
        grassEaterArr[i].die();
    }
    for (var i in WolfArr) {
        WolfArr[i].eat();
        WolfArr[i].move();
        WolfArr[i].mul();
        WolfArr[i].die();
    }
    for (var i in PeopleArr) {
        PeopleArr[i].eat();
        PeopleArr[i].move();
        PeopleArr[i].mul();
        PeopleArr[i].die();
    }
    for (var i in TractorArr) {
        TractorArr[i].eat();
        TractorArr[i].move();
        TractorArr[i].mul();
        TractorArr[i].die();
    }
    
}
if(grassArr.length>=3000){
    end();
}