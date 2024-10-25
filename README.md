## SafeHaven
## Descripción

Una aplicación web para prevención de violencia de género a su vez concienciar a
las personas acerca de la violencia de genero. 

# Entregables
- - EP 2.1 :  Implementación de 7 mockups UI en el framework Ionic. Adi-
cional los dos formularios de inicio de sesión y registro.
- - EP 2.2: Hacer lectura de datos desde un archivo JSON (puede ser local, o alguna fuente externa de datos), y mostrarlos en alguna de las pantallas.
- - EP2.3 Definir ell modelo de la base de datos. Algunos motores de bases de datos que se pueden utilizar son: MySQL, PostgreSQL, SQLite, MongoDB, Firebase, entre otros. Se deben incluir al menos 3 tablas o documentos. __Justificar la selección del tipo de base de datos__.
- - EP2.4 Hacer uso de al menos dos (2) __patrones de diseño__, ya sea web o móvil, en la implementación de las pantallas, teniendo como foco principal el uso desde un dispositivo móvil. [Ver presentación de patrones de diseño](EP2/patronesdediseno.pdf)


## Análisis de las Funcionalidades

- “Denuncia Anónima”  
- “Test de autoevaluación”
- "Foro de Apoyo Comunitario"
- "Contactos Expertos"
- "Notificaciones"
- "Tu actividad"

-Extras: Registro e incio de sesion.

## Prototipado en Figma

[Prototipo Wireframe](https://www.figma.com/design/eHXJPaEuQlYqWZK2uedIW9/Safe-haven?node-id=8-295&t=GmgngqGF5UMBCQ7j-1)

## Maquetación Responsiva
La aplicación será desarrollada con HTML5, CSS3 y JavaScript, utilizando frameworks como Bootstrap para la
maquetación responsiva.

#Base de datos

La base de datos que he seleccionado es relacional, el motor de la base de datos ha usar es MySQL 


#Justificacion 
- - 1. Rendimiento y escalabilidad
En un sistema que gestiona interacciones entre usuarios, publicaciones, notificaciones, expertos y actividades, es fundamental que la base de datos sea eficiente en la manipulación de grandes cantidades de datos. MySQL sigue siendo una excelente opción debido a su capacidad para manejar consultas rápidas, incluso cuando se trata de realizar operaciones complejas como generar publicaciones o conexiones entre usuarios y expertos. Además, la escalabilidad de MySQL permite gestionar tanto sistemas pequeños como aquellos con un tráfico elevado... lo cual es crucial en aplicaciones sociales con gran número de usuarios y actividades simultáneas.
- - 2. Fácil integración con tecnologías web populares
Se integra fácilmente con lenguajes como PHP, Python y JavaScript - perfecto para manejar datos de autoevaluaciones, notificaciones y denuncias en tiempo real. Además, es compatible con stacks populares como LAMP.

- - 3. Popularidad y comunidad de soporte
MySQL cuenta con una gran comunidad y mucha documentación, lo que facilita encontrar soluciones rápidas a problemas comunes (por ejemplo: en la gestión de notificaciones y eventos); también hay muchas herramientas de monitoreo y administración disponibles...

- - 4. Código abierto y coste
Al ser open-source (versión Community), es una opción económica para sistemas complejos que manejan entidades como usuarios y actividades. La versión Enterprise ofrece características avanzadas para proyectos más grandes.

- - 5. Soporte para grandes volúmenes de datos
MySQL está optimizado para manejar millones de registros - ideal para bases de datos en constante crecimiento (como las que gestionan publicaciones y denuncias).

- - 6. Facilidad de uso y administración
Fácil de configurar y administrar - MySQL simplifica la gestión de tablas de usuarios, actividades y notificaciones, lo que reduce tiempos de desarrollo.

Resumen
MySQL es una opción eficiente para proyectos de ingeniería social y gestión de usuarios debido a su rendimiento, escalabilidad y facilidad de integración. Perfecto para manejar datos que crecen con el tiempo.

[Modelo de la BD](image_1.png)
