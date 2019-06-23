var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Wolf = require("./modules/Wolf.js");
var People = require("./modules/People.js");
var Tractor = require("./modules/Tractor.js");
let random = require('./modules/random');

grassArr = [];
grassEaterArr = [];
WolfArr = [];
PeopleArr = [];
TractorArr = []; 
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
WolfHashiv = 0;
PeopleHashiv = 0;
TractorHashiv = 0;
NutellaHashiv = 0;
function matrixGenerator(matrixSize, grass, grassEater, Wolf , People , Tractor) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); 
        let customY = Math.floor(random(matrixSize)); 
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < Wolf; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < People; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < Tractor; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20,350,25,15,8,2);

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassHashiv++;
                var grass = new Grass(x, y);
                grassArr.push(grass);
                
            }
            else if (matrix[y][x] == 2) {
                grassEaterHashiv++;
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
               
            } 
            else if (matrix[y][x] == 3) {
                WolfHashiv++;
                var wolf = new Wolf(x, y);
                WolfArr.push(wolf);
                
            }
            else if (matrix[y][x] == 4) {
                PeopleHashiv++;
                var people = new People(x, y);
                PeopleArr.push(people);
                
            }
            else if (matrix[y][x] == 5) {
                TractorHashiv++;
                var tractor = new Tractor(x, y);
                TractorArr.push(tractor);
                
            }
        }
    }
}
creatingObjects();
let season = 0;
weateris = "Ձմեռ";
function chweather(){
    season++;
    if(season>=0 && season<=15){
        weateris = "Ձմեռ";
    }
    else if(season<=32){
        weateris = "Գարուն";
    }
    else if(season<=48){
        weateris = "Ամառ";
    }
    else if(season<=64){
        weateris = "Աշուն";
    }
    else{
        season = 0;
    }
}
function game() {
    chweather();
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
            grassEaterArr[i].mul();
            grassEaterArr[i].move();
        }
    }
    if (WolfArr[0] !== undefined) {
        for (var i in WolfArr) {
            WolfArr[i].eat();
            WolfArr[i].mul();
            WolfArr[i].move();
        }
    }
    if (PeopleArr[0] !== undefined) {
        for (var i in PeopleArr) {
            PeopleArr[i].eat();
            PeopleArr[i].mul();
            PeopleArr[i].move();
        }
    }
    if (TractorArr[0] !== undefined) {
        for (var i in TractorArr) {
            TractorArr[i].eat();
            TractorArr[i].mul();
            TractorArr[i].move();
        }
    }
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        WolfCounter: WolfHashiv,
        PeopleCounter: PeopleHashiv,
        TractorCounter: TractorHashiv,
        NutellaCounter: NutellaHashiv,
        weather: weateris 
    }
    io.sockets.emit("data", sendData);
}
function mah(){
    for(let y = 0; y < matrix.length; y++){
        for(let x =0; x < matrix[0].lenght; x++){
            matrix[y][x] = 0;
        console.log(matrix[y][x]);
        }
    }
    grassArr = [];
    grassEaterArr = [];
    WolfArr = [];
    PeopleArr = [];
    TractorArr = []; 
}
io.on('connection',function(socket){
    socket.on("spanel",mah)
});
setInterval(game, 1000);