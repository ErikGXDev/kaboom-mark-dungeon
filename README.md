# Kaboom  Template

A pre-made template for quick-starting a kaboom project.

## Contents


### FILES
- index.js
  - The index.js file contains the webserver used to server the bundled javascript and html.
- public (folder)
  - This folder contains the sounds and sprites folder, where you can put your sounds and sprites. You can access the sprites and sounds with `loadSprite("sprites/e.png")`
- src (folder)
  - Contains main.js, the javascript file which will get bundled. You can add more javascript files and have the main.js file import them.
- dist (folder)
  - Contains the bundled "dist.js" and the index.html file.


### NPM SCRIPTS
- `runServer` starts the index.js file.
- `testServer` starts the index.js file with nodemon (You can install nodemon with `npm i -g nodemon`)
- `buildJs` bundles and minifies your javascript file.
- `noMinifyJs` is the same as buildJs, but skips the minifying process.
- `buildJsOnce` is just like buildJs, but without watch-mode.

### SETUP
1. Use the template to create a new repository
2. Clone your new repository
3. Run `npm install` to install all the required packages
4. Edit dist/index.html or src/main.js
5. Run the `buildJs` npm script and then run `runServer` to start hosting.

### HOSTING

#### REPLIT

- Go to the https://replit.com dashboard and import your project from github.

#### ITCH.IO

- Make a zip containing the files in your workspace
- Mainly include:
  - the dist/ folder
  - the sounds/ folder
  - the sprites/ folder
  - the index.html file

- Remember to build your javascript with the npm scripts above

*Additional info: The buildJs script is set to watch-mode. You only have to run it once and it will always bundle your javascript when you change something. It can also throw Javascript errors. If you want to only build once, run the buildJsOnce script.*
