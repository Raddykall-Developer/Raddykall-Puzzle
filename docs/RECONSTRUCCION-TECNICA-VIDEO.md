# Reconstrucción de Raddykall Puzzle — auditoría del vídeo

## Diagnóstico observado (vídeo de 23,6 s, grabación vertical)

1. **El tablero no controla sus mensajes de estado.** En torno a 18–20 s aparece texto rojo de ayuda/error atravesando las celdas; tapa piezas y distrae de la jugada. Los avisos deben vivir en una capa de estado propia, limitarse a una línea y desaparecer solos, sin invadir el área interactiva.
2. **La pantalla de juego tiene demasiadas capas pequeñas.** HUD, progreso, etiqueta de objetivo, tablero, bandeja de piezas y barra inferior compiten por el alto disponible. El tablero pierde espacio útil y los controles inferiores quedan muy cerca del borde del sistema.
3. **La tienda es densa y poco legible.** Muchas tarjetas y pestañas se comprimen en un teléfono alto; los nombres se cortan y los botones no establecen una jerarquía visual clara. Hace falta una vista de tienda con tarjetas consistentes, navegación horizontal de categorías y área de desplazamiento real.
4. **El aspecto es mayormente CSS/DOM con un tablero dibujado en canvas.** Los brillos y degradados no forman un sistema visual consistente; el tablero y los controles parecen componentes de distintas generaciones.
5. **El espacio publicitario y el área segura deben ser una región de layout real.** No basta con mover pantallas con reglas CSS. El juego debe recibir la altura útil disponible y recalcular el tablero, HUD, bandeja y navegación dentro de ella.
6. **La interfaz no debe depender de mensajes sobre el tablero para explicar acciones.** Añadir estados claros: pieza seleccionada, colocación válida/no válida, líneas completadas y pausa. Las animaciones no deben bloquear el input ni desplazar el tablero.

## Decisión técnica

No se elimina la versión existente ni se sobrescribe `main`. Se conserva como referencia funcional mientras se crea un prototipo de nueva presentación en la rama `rebuild/phaser-mobile-prototype`.

Se elige **Phaser 3 + JavaScript + Vite** para probar una capa de juego Canvas/WebGL con escalado móvil controlado. Es una transición incremental que permite reutilizar reglas, formas de piezas, puntuación, progresión y recursos actuales sin portar todo de golpe a otro lenguaje. No es todavía una migración completa: primero se valida una vertical slice jugable y después se trasladan, por módulos, persistencia, modos, tienda, idiomas, sonidos y anuncios.

Una migración nativa a Godot podría dar más control de escena, pero supondría reimplementar y probar más lógica existente y complicaría reutilizar directamente la base JS/Capacitor. No se justifica borrar el juego actual antes de comparar un prototipo real.

## Criterios de aceptación para la nueva base

- Layout limitado a la altura realmente disponible; barra publicitaria fija abajo, separada del área de juego y de la navegación del sistema.
- Escalado por tamaño del dispositivo, sin coordenadas de pantalla fijas.
- Tablero, HUD, bandeja y botones calculados desde el mismo rectángulo seguro.
- Mensajes de estado fuera de las celdas y sin texto rojo persistente.
- Áreas táctiles amplias, contraste alto, etiquetas legibles y animaciones breves.
- La lógica de juego no se acopla a estilos CSS ni a nodos DOM individuales.
- La versión actual permanece intacta hasta que la nueva pase pruebas de regresión.

## Alcance de este primer corte

El directorio `prototype-phaser/` contiene una prueba vertical de tablero 9×9, bandeja de tres piezas, arrastre táctil, colocación, limpieza de filas/columnas, puntuación y distribución que reserva una banda inferior para el anuncio. Es un prototipo de arquitectura, no una APK final ni sustituto de todos los modos actuales.
