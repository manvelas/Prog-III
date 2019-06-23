function setup() {

    var socket = io();
    var side = 30;
    var matrix = [];

    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let WolfCountElement = document.getElementById('WolfCount');
    let PeopleCountElement = document.getElementById('PeopleCount');
    let TractorCountElement = document.getElementById('TractorCount');
    let NutellaCountElement = document.getElementById('NutellaCount');
    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        matrix = data.matrix;
        season = data.weather;
        var weatherP = document.getElementById("weather");
        weatherP.innerHTML = season;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        WolfCountElement.innerText = data.WolfCounter;
        PeopleCountElement.innerText = data.PeopleCounter;
        TractorCountElement.innerText = data.TractorCounter;
        NutellaCountElement.innerText = data.NuttelaCounter;

        createCanvas(matrix[0].length * side, matrix.length * side)
        
        background('#595959');
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if(data.weather == "Ձմեռ"){
                        fill("#e6ffff");
                    }
                    else if (data.weather == "Գարուն"){
                        fill("green");
                    }
                    else if (data.weather == "Ամառ"){
                        fill("#009933");
                    }
                    else if(data.weather == "Աշուն"){
                        fill("#cccc00");
                    }
                    rect(j * side, i * side, side, side);
                } 
                else if (matrix[i][j] == 2) {
                    fill("yellow");
                    rect(j * side, i * side, side, side);
                } 
                else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } 
                else if (matrix[i][j] == 3) {
                    if (data.weather == "Գարուն"){
                        fill("red");
                    }
                    else {
                        fill("#5c5c3d");
                    }
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 4) {
                    if(data.weather == "Ձմեռ"){
                        fill("blue");
                    }
                    else{
                        fill("#cc9966");
                    }
                    rect(j * side, i * side, side, side);
                } 
                else if (matrix[i][j] == 5) {
                    fill('orange');
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 6) {
                    fill('#663300');
                    rect(j * side, i * side, side, side);
                }
            }
        }
        if(data.weather == "Ձմեռ"){
            document.body.style.backgroundColor = "#00c6fb";
        }
        else if (data.weather == "Գարուն"){
            document.body.style.backgroundColor = "#4eee24";
        }
        else if (data.weather == "Ամառ"){
            document.body.style.backgroundColor = "#df1a1a";
        }
        else if(data.weather == "Աշուն"){
            document.body.style.backgroundColor = "#ff9900";
        }
    }
document.getElementById('Spanel').addEventListener("click" , spanel);
    function spanel(){       
        socket.emit("spanel" , "spanell");
    }
}