---
id: concepto-smtp
tipo: concepto
titulo: "SMTP"
modulo: seguridad-servicios
maestria: 0.00
estado_srs: bloqueado
proximo_repaso: null
ultimo_repaso: null
prerrequisitos:
  - 2. conceptos/tcp.md
  - 2. conceptos/puertos.md
relacionados:
  - 2. conceptos/tls.md
entidades:
  - 3. entidades/ietf.md
fuente_primaria: 1. fuentes_transformadas/computer-networking-top-down.md
---

# SMTP

## Definición

Protocolo simple de transferencia de correo para el envío de mensajes entre servidores de correo.

## Características Clave

- Usa los puertos 25 o 587 sobre TCP.
- Comandos principales: HELO/EHLO, MAIL FROM, RCPT TO, DATA.
- Trabaja junto a POP3 o IMAP para la recepción de correo.

## Relación con otros conceptos

- Se relaciona con [[2. conceptos/tls.md]] en el contexto del dominio de redes.

## Entidades Asociadas

- [[3. entidades/ietf.md]]

## Fuente primaria

- [[1. fuentes_transformadas/computer-networking-top-down.md]]

## Notas del Usuario

BLOQUEADO. Este concepto aún no ha sido estudiado; requiere lectura activa y primer repaso para desbloquear.
