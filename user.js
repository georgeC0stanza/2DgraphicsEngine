import {SpritesMaker, TileMap} from './main.js';
'use strict';

const { spriteSet, tilemapList } = loadResources();
const tileMap = new TileMap(tilemapList);
tileMap.setPosition(0, 0);

const spriteController = new SpritesMaker(spriteSet);
spriteController.setPosition(0, 235, 240);
spriteController.show(0); 

spriteController.setPosition(1, 235, 240);
spriteController.show(1);

let temp = spriteController.getZIndex(1) + 1;
spriteController.setZIndex(0, temp);

initializeKeyBindings();

function loadResources(){
    const img1 = 'images/ferns.jpg';
    const img2 = 'images/tulips.jpg';
    const img3 = 'images/water.jpg';

    const sprite0 = 'images/daffodil.jpg';    
    const sprite1 = 'images/eagle.jpg';    

    const spriteSet = [sprite0, sprite1];
    const tileSet = [img1, img2, img3];
    const tilemapList = `
    2 1 1 0 2 1 1 0 2 1 1 0 2 1 1 0 
    2 1 1 0 2 1 1 0 2 1 1 0 2 1 1 0 
    2 1 1 0 2 1 1 0 2 1 1 0 2 1 1 0 
    2 1 1 0 0 2 2 1 1 0 2 1 1 0 2 1 
    1 0 2 1 1 0 2 1 1 0 2 1 1 0 2 1 
    1 0 2 1 1 0 2 1 1 0 2 1 1 0 2 1 
    1 0 2 1 1 0 2 1 1 0 2 2 1 1 0 2 
    1 1 0 2 1 1 0 2 1 1 0 2 1 1 0 2 
    1 1 0 2 1 1 0 2 1 1 0 2 1 1 0 2 
    1 1 0 2 1 1 0 2 1 1 0 2 1 1 0 2
    `
      .trim()
      .split(/\s+/)
      .map(index => tileSet[index]);
    return { spriteSet, tilemapList };
}

function initializeKeyBindings(){
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
            tileMap.translate(0, 10);
        }
        else if (event.key === 'ArrowDown') {
            tileMap.translate(0, -10);
        }
        if (event.key === 'ArrowLeft') {
            tileMap.translate(10, 0);
        }
        else if (event.key === 'ArrowRight') {
            tileMap.translate(-10, 0);
        }
        if (event.key === 'w') {
            spriteController.translate(0, 0, -10);
        }
        if (event.key === 's') {
            spriteController.translate(0, 0, 10);
        }
        if (event.key === 'a') {
            spriteController.translate(0, -10, 0);
        }
        if (event.key === 'd') {
            spriteController.translate(0, 10, 0);
        }
        if (event.key === ' ') {
            spriteController.reflectY(0);
        }
        if (event.key === 'f') {
            spriteController.reflectX(0);
        }
    });
}


export {tilemap, spriteController, temp};
