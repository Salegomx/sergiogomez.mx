var texto = document.getElementById("texto_lineas");
var boton = document.getElementById("go");
boton.addEventListener("click", dibujoPorClick);

var d = document.getElementById("dibujito");
var lienzo = d.getContext("2d");

dibujarLinea("black", 1, 1, 1, 700);
dibujarLinea("black", 1, 700, 700, 700);
dibujarLinea("black", 700, 700, 700, 1);
dibujarLinea("black", 700, 1, 1, 1);

function dibujarLinea (color, xinicial, yinicial, xfinal, yfinal) {
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.moveTo(xinicial, yinicial);
    lienzo.lineTo(xfinal, yfinal);
    lienzo.stroke();
    lienzo.closePath();
}

function dibujoPorClick() {
    var lineas = parseInt(texto.value);
    var l = 0;
    var yi, xf, xi, yf;

    for (l = 0; l < lineas; l++) {
        yi = (700 / lineas) * l;
        xf = (700 / lineas) * (l + 1);
    dibujarLinea("green", 0, yi, xf, 700);
    dibujarLinea("red", yi, 0, 700, xf);
    dibujarLinea("purple", 700 - yi, 0, 0, xf);
    dibujarLinea("blue", 700, yi, 700 - xf, 700);
    }
}