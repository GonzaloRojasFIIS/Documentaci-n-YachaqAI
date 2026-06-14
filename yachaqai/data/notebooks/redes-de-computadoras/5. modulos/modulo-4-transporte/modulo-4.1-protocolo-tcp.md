---
id: "submodulo-4.1-protocolo-tcp"
tipo: submodulo
titulo: "Tema 4.1: Protocolo TCP y Flujos Confiables"
modulo: "modulo-transporte"
---

# Tema 4.1: Protocolo TCP y Flujos Confiables

El **[[2. conceptos/tcp.md|Protocolo TCP]]** (Transmission Control Protocol) es un protocolo orientado a la conexión, confiable y que garantiza que los paquetes de datos lleguen intactos y en el orden correcto.

## El saludo de tres vías
El establecimiento de la sesión TCP se realiza mediante el **[[2. conceptos/three-way-handshake.md|Three-Way Handshake]]**:
1. **SYN**: El cliente envía sincronía.
2. **SYN-ACK**: El servidor confirma y envía su propia sincronía.
3. **ACK**: El cliente confirma.
