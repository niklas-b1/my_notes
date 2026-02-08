## Konstruktion von Programmen



### Schritt 1: Wie repräsentiere ich die für die Funktion relevanten Informationen als Daten ?

- Wie kann man die Datentstruktur definieren?
- Was könnten interessante Beispieldaten sein?


### Schritt 2: Wie könnte das Grundgerüst der Funktion aussehen?

- Welche Signatur (Datentyp) wäre für die Funktion geeignet?
- Welche kurzbeschreibung der Funktion (JavaDoc) wäre gut verständlich für neue Leser der Codebase?


### Schritt 3: Man sollte vor dem Programmieren der Funktion erst die Tests definieren

- Wie könnte man die korrektheit der Funktion gut testen?
- Die Tests sollten zunächst alle fehlschlagen außer natürlich der Dummy Wert ist zufällig richtig


### Schritt 4: Wie könnte man die Funktion implementieren?

- Fange an die Funktion zu programmieren
- Welche Funktionalitäten könnte man am besten durch eine weitere Dummy Funktion darstellen die man auch mithilfe dieser Anleitung definiert ?


### Schritt 5: Funktion testen

- Führe die vorher definierten Tests aus
- Was könnte die Ursache für fehlschlagen des Tests sein?
	- Eher Fehler in der Funktion oder eher Fehler in der Sinnhaftigkeit des Tests?
	- Wie könnte man die Funktion bzw den Test gut reparieren?
- Sobald alle Tests erfolgreich sind:
	- Könnte es noch weitere Tests geben die sinvoll wären um Randfälle zu überprüfen?

### Schritt 6: Nachbearbeitung
- Wie könnte man den Code der Funktion noch verständlicher für neue Leser der Codebase machen?
	- (z.B noch mehr Kontext erklärende Kommentare, bessere variablen Namen)
- Wie könnte man weniger Seiteneffekte verursachen?

- Teste die Funktion nach der Verbesserung erneut mithilfe von Schritt 5
