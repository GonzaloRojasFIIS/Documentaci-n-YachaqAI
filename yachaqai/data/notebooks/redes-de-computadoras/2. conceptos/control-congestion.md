---
id: concepto-control-congestion
tipo: concepto
titulo: "Control de Congestión"
modulo: transporte
maestria: 0.00
estado_srs: bloqueado
proximo_repaso: null
ultimo_repaso: null
prerrequisitos:
  - 2. conceptos/tcp.md
relacionados:
  - 2. conceptos/three-way-handshake.md
  - 2. conceptos/qos.md
entidades:
  - 3. entidades/ietf.md
fuente_primaria: 1. fuentes_transformadas/computer-networking-top-down.md
---

# Control de Congestión

## Definición

Mecanismos de TCP que evitan saturar la red ajustando la tasa de envío de datos.

## Características Clave

- Mantiene una ventana de congestión dinámica.
- Implementa algoritmos como Reno y CUBIC.
- Ajusta la tasa según pérdidas, RTT y reconocimientos duplicados.

## Relación con otros conceptos

- Se relaciona con [[2. conceptos/three-way-handshake.md]] en el contexto del dominio de redes.
- Se relaciona con [[2. conceptos/qos.md]] en el contexto del dominio de redes.

## Entidades Asociadas

- [[3. entidades/ietf.md]]

## Fuente primaria

- [[1. fuentes_transformadas/computer-networking-top-down.md]]

## Notas del Usuario

BLOQUEADO. Este concepto aún no ha sido estudiado; requiere lectura activa y primer repaso para desbloquear.
