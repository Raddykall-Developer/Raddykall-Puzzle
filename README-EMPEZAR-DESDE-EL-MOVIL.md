# Raddykall Puzzle Deluxe — proyecto preparado para Android

## Qué es esto

Este proyecto conserva el juego actual en `www/index.html` y las imágenes externas en `www/assets/kenney/`. Está preparado para servir el juego durante el desarrollo y empaquetarlo como aplicación Android con Capacitor. No es todavía un APK firmado para publicar en Google Play.

## La vía más sencilla si solo tienes el móvil

La compilación Android se puede hacer en la nube con GitHub Actions, sin instalar Android Studio en el teléfono.

1. Descarga y extrae este ZIP, o sube su contenido a un repositorio GitHub nuevo (no subas el ZIP como único archivo: el repositorio debe contener `package.json`, `www/`, `.github/` y los demás archivos en la raíz).
2. En GitHub, abre el repositorio y entra en **Actions**.
3. Si GitHub solicita habilitar Actions, habilítalo.
4. Selecciona el flujo **Crear APK Android** y pulsa **Run workflow**. También se inicia con un push a la rama `main`.
5. Espera a que la ejecución termine en verde. Abre la ejecución y descarga el artefacto `Raddykall-Puzzle-Android-APK`.
6. Descomprime el artefacto y abre `app-debug.apk` en tu Android. Android puede pedir permiso para instalar aplicaciones desde esa fuente; instálala solo si reconoces el origen y confías en el archivo.

La primera compilación puede tardar varios minutos. La APK `debug` sirve para pruebas, no es la versión final firmada para Google Play.

## Desarrollo y estructura

- `www/index.html`: estructura de pantallas y carga de recursos.
- `www/ui.css`: estilos existentes extraídos en su orden original.
- `www/ui-quality.css`: capa final aislada para corregir encuadre móvil, controles, tienda y espacio del anuncio.
- `www/game.js`: lógica del juego y renderizado Canvas 2D existente.
- `www/language.js`: traducciones y selección de idioma.
- `www/assets/kenney/`: imágenes del paquete Kenney referenciadas por ruta relativa.
- `package.json`: dependencias y comandos de desarrollo.
- `capacitor.config.json`: identidad y configuración del contenedor Android.
- `.github/workflows/build-android-apk.yml`: genera la plataforma Android y compila un APK de prueba en GitHub Actions.

Los recursos deben permanecer dentro de `www/` para que Capacitor los empaquete. Las rutas deben ser relativas, por ejemplo `assets/kenney/kenney-ui-01.png`.

## Comandos para un entorno Node compatible

```bash
npm install
npm run dev
npm run build
npm run android:init
npm run android:sync
```

`npm run android:init` solo se ejecuta una vez en un entorno donde se vaya a conservar la carpeta `android/`. El flujo de GitHub incluido genera Android desde cero en cada compilación, así que no exige que el usuario tenga Android Studio instalado.

## Límites conocidos

- Esta refactorización separa la hoja de estilos y los dos scripts principales del HTML monolítico, conserva el orden de la cascada y mantiene la lógica de juego existente.
- El tablero principal ya utiliza Canvas 2D. Antes de reemplazarlo por otro motor, se corrigen el cálculo del área útil, la indicación de la bomba y los controles; una migración a Godot/Unity exigiría reescribir la lógica y la integración de anuncios.
- GitHub Actions valida ahora la sintaxis de los scripts y compila el APK. La validación final del aspecto y de los anuncios cargados requiere probar la APK en un Android real.
- No subir claves de firma, contraseñas ni secretos al repositorio. Para publicar en Google Play hará falta configurar firma segura y generar un AAB de release.
- Si GitHub Actions no puede descargar dependencias o cambia algún requisito de Android, revisar el registro de la ejecución y ajustar las versiones.

## Licencia de los recursos Kenney

Los sprites incluidos proceden del paquete Kenney UI Pack y se incorporan para uso en el proyecto. Conserva la información de licencia incluida por el autor del paquete cuando distribuyas el proyecto.
