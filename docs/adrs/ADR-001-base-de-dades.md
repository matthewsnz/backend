# ADR-001: Eleccio de la base de dades

## Context

Necessitem una base de dades flexible per a emmagatzemar productes, usuaris i
comandes amb relacions no rígides.

## Decisio

Farem servir MongoDB com a base de dades principal, gestionada via Docker.

## Conseqüencies

### Positives

- Flexibilitat per a nous camps i entitats.
- Bona integracio amb Node/Express.

### Negatives

- Menys adequat per a consultes molt relacionals
