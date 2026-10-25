# Raddykall Puzzle — prototipo Phaser

Prototipo separado de la versión actual. No reemplaza todavía `www/` ni la APK.

## Ejecutar

```sh
cd prototype-phaser
npm install
npm run dev
```

## Qué prueba

- Phaser 3 con renderizado Canvas/WebGL y redimensionamiento.
- Tablero 9×9, bandeja de tres piezas y arrastre táctil.
- Colocación de piezas, limpieza de filas/columnas y puntuación.
- Zona de navegación y banda publicitaria reservadas abajo; el tablero se calcula dentro del alto disponible.

## Pendiente antes de reemplazar el juego actual

Portar y validar guardado/progreso, tienda, misiones, idiomas, sonidos, tutorial, niveles, anuncios nativos y todas las reglas especiales. La APK actual sigue construyéndose desde `www/`.
