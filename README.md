# Seguridad Primavera (variante SQLite)

![stack: Node.js](https://img.shields.io/badge/stack--Node.js-0d9488?style=flat-square) ![stack: Express](https://img.shields.io/badge/stack--Express-0d9488?style=flat-square) ![stack: SQLite](https://img.shields.io/badge/stack--SQLite-0d9488?style=flat-square) ![stack: JavaScript](https://img.shields.io/badge/stack--JavaScript-0d9488?style=flat-square) ![IA: asistido](https://img.shields.io/badge/IA--asistido-6366f1?style=flat-square) [![Demo](https://img.shields.io/badge/demo-en%20vivo-22c55e?style=flat-square)](https://luisf2020.github.io/primavera20/)

Version de Seguridad Primavera con servidor Node/Express y persistencia en SQLite, e interfaz estatica servida desde public/.

**Tipo:** Aplicacion web + API · **Complejidad:** Intermedio

## Problema que resuelve

Llevar el control de residentes, visitas y accesos a una base de datos real en lugar del navegador, para que los datos no dependan de un dispositivo.

## Solucion implementada

Servidor Express que expone los datos y sirve la interfaz estatica; la base SQLite se crea con un script de migracion (schema.sql).

### Funcionalidades principales

- API sobre SQLite con esquema versionado (schema.sql)
- Interfaz estatica servida por Express
- Script de migracion dedicado
- Modo desarrollo con recarga (nodemon)

## Stack

- Node.js
- Express
- SQLite
- JavaScript

## Estructura

```
server.js     # API y servidor estatico
public/       # interfaz (index.html, app.js, styles.css)
schema.sql    # esquema de la base
```

## Puesta en marcha

```bash
npm install
npm run migrate
npm start        # http://localhost:3000
```

## Complejidad del proyecto

**Nivel: Intermedio** — Dos capas (servidor y cliente) con persistencia relacional y migracion de esquema.

El nivel describe la complejidad tecnica del proyecto, no el grado de dominio de quien lo escribio.

## Despliegue

Demo en vivo: <https://luisf2020.github.io/primavera20/>  
Publicado con GitHub Pages (rama `gh-pages`).

## Transparencia sobre IA

Este proyecto se desarrollo con asistencia de inteligencia artificial (generacion de codigo,
revision y documentacion). El codigo fue leido, ejecutado y probado manualmente. No se declaran
clientes, metricas ni resultados que no puedan verificarse.

## Autor

**Luis Felipe Zuniga Leon** — Desarrollador de software asistido por IA

- GitHub: <https://github.com/Luisf2020>
- Correo: developerluis2@gmail.com
- WhatsApp: +504 3237 0056

---

_Proyecto de portafolio. El desarrollo se apoyo en herramientas de IA bajo revision tecnica humana._
