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

Für eine andere Schrift die Datei (ttf/otf/woff) in `assets/` legen und
`FONT_PATH` in `sketch.js` ändern.

Bibliotheken (in `libraries/`): p5.js 1.7.0, matter.js 0.19.0, poly-decomp
0.3.0.

## Ausführen

1. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).
2. Einen Buchstaben, eine Ziffer oder ein Zeichen tippen, um es fallen zu
   lassen.

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
  `key`. Nur einzelne druckbare Zeichen werden angenommen; Sondertasten wie
  Shift (deren `key` "Shift" ist) und die Leertaste werden ignoriert.
- **`shape.js` → `CustomShape`**: wandelt das Zeichen mit
  `font.textToPoints()` in Punkte um (alle 4 px ein Punkt,
  `SAMPLE_FACTOR`), teilt sie dort, wo zwei Punkte weit auseinanderliegen,
  in Konturen auf (z. B. Stamm und Punkt des "i") und baut mit
  `Bodies.fromVertices()` einen Körper, mit zufälliger seitlicher
  Geschwindigkeit und etwas Drehung. `restitution` bestimmt, wie stark er
  abprallt. Mit poly-decomp (in `index.html` geladen) zerlegt matter.js
  jede konkave Kontur in konvexe Teile, so folgt der Körper der Form des
  Buchstabens; Löcher wie im "o" werden gefüllt. `show()` zeichnet die
  Kontur jedes Teils (weiss) und den
  roten Buchstaben, mit dem Körper gedreht.
- **`boundary.js` → `Boundary`**: ein statischer, kreisförmiger Körper
  (`isStatic: true`) und seine Darstellung.
