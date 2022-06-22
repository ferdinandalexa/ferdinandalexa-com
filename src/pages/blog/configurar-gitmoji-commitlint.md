---
title: Cómo configurar gitmoji con commitlint
date: 2022/06/28
description: Crea un mejor historial de tu proyecto y deja que los commits hablen por ti. Aprende a configurar gitmoji para que funcione con commitlint.
layout: '../../layouts/post-layout.astro'
draft: true
---

## ¿Por qué usar un linter para tus commits?

La legibilidad no solo debe estar en el código que escribes, también en tus *commits*. 

Tener un linter en este caso nos ayuda a **estandarizar las prácticas de nuestro proyecto**. Cualquier contribución que recibamos seguirá las mismas reglas.

Incluso ganas más si sigues una buena convención, como ***conventional commits***, para tus mensajes:

- Comunicar la naturaleza de los cambios
- Búsquedas más sencillas por tu historial de git.
- Automatizar la creación de documentación.

## ¿Qué son gitmoji y commitlint?

`gitmoji` nos permitirá añadir un emoji representativo del tipo de cambio que estamos realizando al inicio de nuestro mensaje. 

Personalmente este sencillo añadido hace que nuestro historial de git sea aún más agrable de seguir y de identificar cambios.

`commitlint` es la dependencia que se encargará de verificar que nuestros *git commits* sigan una convención. 

En nuestro caso nos aseguraremos que los *commits* sean semánticos con la siguiente estructura:

```html
:emoji: <type>(<scope?>): description
body?
```

Los *types* estarán listados en el archivo de configuración que instalemos. Estos estan basados en los propuestos por la *Angular Convention*.

## Instalación y configuración

### 1.- Instala las dependencias necesarias: `gitmoji`, `commitlint` y `commitlint-config-gitmoji`

```bash
npm install gitmoji-cli commitlint-config-gitmoji -D
```

Además necesitaremos de `husky`, dependencia que se encargará de ejecutar el _linter_ automáticamente cuando hagamos un `git commmit`

```bash
npm install husky -D
```

### 2.- Crea el archivo de configuración:

```bash
echo "module.exports = {extends: ['gitmoji']};" > .commitlintrc.js
```
`commitlintrc.js` será leído por commitlint y cargará los emojis seleccionables para nuestros commits.


### 3.- Inicializamos manualmente la configuración de `husky`

```bash
npm set-script prepare "husky install"
```

Este comando añadirá el *script*  `prepare` en nuestro package.json. Llegados a este punto debemos tener nuestro *git repository* listo. Si no has inicializado git puedes ejecutar el comando `git init`.

Con nuestro repositorio local inicializado corremos el script prepare:

```bash
npm run prepare
```

Este comando inicializa `husky` y crea la carpeta `.husky/` en la raíz de tu proyecto. 

Solo nos queda asignar la acción a la que queremos que actue.

### 4.- Añadimos la acción a reaccionar: `commit-msg`

```bash
npx husky add .husky/commit-msg
```

Este añadira el fichero `commit-msg.sh`

En la línea de comandos puedes ejecutar el siguiente código para añadir las instrucciones al archivo:

```bash
cat <<EEE > .husky/commit-msg
#!/bin/sh
. "\$(dirname "\$0")/_/husky.sh"

npx --no -- commitlint --edit "\${1}"
EEE
```

Tambien puedes copiar directamente en el archivo si se te dificulta aún moverte por la terminal:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit "${1}"
```

### 5- Por último le damos permisos al hook de ejecutarse. De lo contrario al hacer un commit el linter no se ejecutará.

```bash
chmod a+x .husky/commit-msg
```

### 6.- Añadirmos un comando para ejecutar gitmoji.

`gitmoji` lanzará un prompt por la terminal que nos ayudará a escribir el commit.

```bash
"scripts": {
    "cm": "gitmoji -c"
  }
```

Ejecutamos el script con `npm run cm` y el prompt de gitmoji se ejecutará.

Verás algo como lo siguiente:

```bash
npm run cm

> cm
> gitmoji -c

? Choose a gitmoji: 🚨  - Fix compiler / linter warnings.
? Enter the commit title [39/48]: build(lint): add linter for git commits
? Enter the commit message:
```

Si el commit no sigue la convención establecida saldrá la siguiente advertencia y el commit no se llevará acabo.

```bash
npm run cm

> cm
> gitmoji -c

? Choose a gitmoji: 👷  - Add or update CI build system.
? Enter the commit title [19/48]: add .gitignore file
? Enter the commit message:
⧗  input: :construction_worker: add .gitignore file
✖  subject may not be empty [subject-empty]
✖  type may not be empty [type-empty]

✖  found 2 problems, 0 warnings
ⓘ  Get help: 
    https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg hook exited with code 1 (error)

 Oops! An error ocurred. There is likely additional logging output above.
 You can run the same commit with this command:
         git commit -m ":construction_worker: add .gitignore file" -m ""
```

## Otras herramientas:

Puedes complementarlo esta configuración con herramientas como `commitizen` o con alguna otra convención. Solo asegurate de preparar los scripts para que tu equipo haga los commits con el mismo formato.