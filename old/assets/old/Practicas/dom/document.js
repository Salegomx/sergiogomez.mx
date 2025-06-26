var ruta = window.location
document.write("Estás en: " + ruta);

while (l < lineas) {
    yi = 40 * l;
    xf = 40 * (l + 1);
dibujarLinea("blue", 0, yi, xf, 1200);
l = l + 1;
}
