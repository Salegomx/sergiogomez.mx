var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};

var d = document.getElementById("canvas");
var papel = d.getContext("2d");
var x = 350;
var y = 350;

dibujarLinea("black", 1, 1, 1, 700, papel);
dibujarLinea("black", 1, 700, 700, 700, papel);
dibujarLinea("black", 700, 700, 700, 1, papel);
dibujarLinea("black", 700, 1, 1, 1, papel);

document.addEventListener("keyup", dibujarT);

function dibujarLinea (color, xinicial, yinicial, xfinal, yfinal, lienzo) {
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.lineWidth = 2;
    lienzo.moveTo(xinicial, yinicial);
    lienzo.lineTo(xfinal, yfinal);
    lienzo.stroke();
    lienzo.closePath();
}

function dibujarT(evento) {
    var color = "green";
    var mov = 10;
    switch(evento.keyCode) {
        case teclas.UP:
            dibujarLinea(color, x, y, x, y - mov, papel);
            y = y - mov;
        break;
        case teclas.DOWN:
            dibujarLinea(color, x, y, x, y + mov, papel);
            y = y + mov;
        break;
        case teclas.LEFT:
            dibujarLinea(color, x, y, x - mov, y, papel);
            x = x - mov;
        break;
        case teclas.RIGHT:
            dibujarLinea(color, x, y, x + mov, y, papel);
            x = x + mov;
        break;
        default:
            console.log("otra tecla");
        break;
    }
}