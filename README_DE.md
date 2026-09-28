# P5.js: Physics

[English](readme.md)

Buchstaben als physikalische Körper mit
[matter.js](https://brm.io/matter-js/): Jede getippte Taste lässt das
entsprechende Zeichen in die Szene fallen. Die Glyphen-Kontur wird in Punkte
umgewandelt und als matter.js-Körper verwendet, der auf zwei statische
Kreise fällt. Basiert auf Beispielen aus
[The Nature of Code](https://natureofcode.com/physics-libraries/).

## Installation

Voraussetzungen: ein aktueller Browser.

1. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).
2. Eine beliebige Taste drücken, um den Buchstaben fallen zu lassen.

Für eine andere Schrift die Datei (ttf/otf/woff) in `assets/` legen und
`FONT_PATH` in `sketch.js` ändern.

Bibliotheken (in `libraries/`): p5.js 1.7.0, matter.js 0.19.0.

## Coding-Hilfe

- **`sketch.js` → globale Variablen**: `FONT_PATH` zeigt auf die Schrift
  (`assets/cmunrb.otf`), die in `preload()` geladen wird. Die
  matter.js-Module (`Engine`, `Bodies`, `Composite`, `Body`, `Vector`)
  werden zuoberst entpackt.
- **`setup()`**: erstellt die matter.js-`engine` und zwei
  `Boundary`-Kreise am unteren Rand.
- **`draw()`**: rechnet die Physik mit `Engine.update()` weiter, zeichnet
  alle Formen und Begrenzungen und entfernt Formen, die unter die
  Zeichenfläche gefallen sind.
- **`keyPressed()`**: erzeugt oben in der Mitte eine `CustomShape` für
  `key`. Sondertasten wie Shift übergeben ihren Namen (z. B. "Shift") als
  Text.
- **`shape.js` → `CustomShape`**: wandelt das Zeichen mit
  `font.textToPoints()` in Punkte um und baut mit `Bodies.fromVertices()`
  einen Körper, mit zufälliger seitlicher Geschwindigkeit und etwas
  Drehung. `restitution` bestimmt, wie stark er abprallt. Ohne die
  poly-decomp-Bibliothek kann matter.js konkave Konturen nicht zerlegen und
  verwendet stattdessen die konvexe Hülle – das zeigt die schwarze Kontur.
  `show()` zeichnet diese Kontur und den roten Buchstaben, mit dem Körper
  gedreht.
- **`boundary.js` → `Boundary`**: ein statischer, kreisförmiger Körper
  (`isStatic: true`) und seine Darstellung.
