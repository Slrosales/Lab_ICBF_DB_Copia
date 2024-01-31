

<div align="center">
  <h1>
     Sistema de Información para el Instituto de Bienestar Familiar
  </h1>
  <h4>
    ICBF - Laboratorio de Bases de Datos
  </h4>


[![GitHub lellerena](https://img.shields.io/badge/by-lellerena-red)](https://github.com/lellerena)
[![GitHub Slrosales](https://img.shields.io/badge/by-Slrosales-purple)](https://github.com/Slrosales)
[![GitHub JuandiGo1](https://img.shields.io/badge/by-JuandiGo1-green)](https://github.com/JuandiGo1)
[![GitHub Almor21](https://img.shields.io/badge/by-Almor21-orange)](https://github.com/Almor21)
[![GitHub jfbenitezz](https://img.shields.io/badge/by-jfbenitezz-blue)](https://github.com/jfbenitezz)

</div>

## Descripción
Este proyecto es un sistema de información diseñado para el Instituto de Bienestar Familiar. Su objetivo principal es facilitar la gestión y seguimiento de los niños y sus relaciones con los padres registrados en el instituto.

## Características
- **Registro de Padres y Niños:** Permite el registro de padres sin niños y de niños sin información de padres o tutores.
- **Gestión de Datos:** Funciones para insertar, actualizar y borrar datos en las tablas `HIJO` y `PADRE`.
- **Consultas Avanzadas:** Incluye varias consultas para visualizar relaciones entre padres e hijos, como listados de padres sin hijos y viceversa.

## Modelo Entidad-Relación
<img src="Imagenes/Modelo E-R.png">

## Modelo Relacional
<img src="Imagenes/Modelo E.png">

## Tecnologías Utilizadas
- **Base de Datos Relacional:** Para almacenar y gestionar los datos. SQLite.
- **Javascript:** Lenguaje de programación para el desarrollo del menú de opciones y la lógica del sistema.

## Instalación y Uso

### Requisitos Previos
- Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema.

### Clonar el Repositorio
- Clona este repositorio usando `git clone https://github.com/Slrosales/Lab_ICBF_DB_Copia.git`.

### Instalar Dependencias
- Navega hasta el directorio del proyecto y ejecuta `npm install` para instalar todas las dependencias necesarias.

### Ejecutar el Servidor
- Dirígete a la carpeta donde se encuentra el archivo `server.js`.
- Abre una terminal en esta carpeta.
- Ejecuta `node server.js` para iniciar el servidor.

### Acceder a la Aplicación
- Una vez que el servidor esté en funcionamiento, copia el enlace proporcionado por Node.js (usualmente algo como `http://localhost:3000`).


## Equipo

-   Felipe Benítez 
-   Laura Gómez  (Backend Lead)
-   Luis Llerena (Frontend Lead)
-   Juan Maestre
-   Edinson Noriega

Profesor a cargo: Ing. Mg. Luis Llach

