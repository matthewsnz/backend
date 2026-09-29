# ADR-002: Estructura inicial del projecte

## Context

El projecte esta format per diferents parts, com el frontend amb React i el backend amb Node i Express. Necessitem decidir com organitzarem els fitxers i el codi del projecte.

## Decisio

Farem servir repositoris separats per al frontend i el backend del projecte. El repositori del backend contindra el codi de Node i Express, la configuracio de MongoDB i la documentacio relacionada amb el backend.

## Consequencies

### Positives

- Cada part del projecte esta separada i es mes facil d'organitzar.
- Els canvis del frontend i del backend es poden gestionar de manera separada.

### Negatives

- Es te que gestionar dos repositoris diferents.
- Pot ser necessari coordinar els canvis entre frontend i backend.
