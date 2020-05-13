import {SpritesMaker, TileMap} from './main.js';
'use strict';

const { spriteSet, tilemapList } = loadResources();
const tileMap = new TileMap(tilemapList);
tileMap.setPosition(0, 0);

const spriteController = new SpritesMaker(spriteSet);
spriteController.setPosition(0, 235, 300);
spriteController.show(0); 

spriteController.setPosition(1, 235, 350);
spriteController.show(1);

spriteController.setPosition(2, 500, 40);
spriteController.show(2);

let temp = spriteController.getZIndex(1) + 1;
spriteController.setZIndex(0, temp);

initializeKeyBindings();


var worker = new Worker('worker.js');

worker.addEventListener('message', function(e) {
    console.log(e.data);
});
  
worker.postMessage(['Happy Birthday', spriteController, TileMap]);


function loadResources(){
    const img0 = 'images/sky.png';
    const img1 = 'images/ground.png';
    const img2 = 'images/ground2.png';
    const img3 = 'images/groundcorner.png';
    const img4 = 'images/bush.png';
    const img5 = 'images/water.png';

    const sprite0 = 'images/face.png';    
    const sprite1 = 'images/body.png';  
    const sprite2 = 'images/bird.png';

    const spriteSet = [sprite0, sprite1, sprite2];
    const tileSet = [img0, img1, img2, img3, img4, img5];
    const tilemapList = `
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 
    2 2 3 0 0 0 0 0 0 0 0 4 4 0 0 0 
    1 1 1 2 2 2 2 2 2 2 2 2 2 2 2 2 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
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
            spriteController.translate(1, 0, -10);
        }
        if (event.key === 's') {
            spriteController.translate(0, 0, 10);
            spriteController.translate(1, 0, 10);
        }
        if (event.key === 'a') {
            spriteController.translate(0, -10, 0);
            spriteController.translate(1, -10, 0);
            spriteController.reflect(0, true, false);
            spriteController.reflect(1, true, false);
        }
        if (event.key === 'd') {
            spriteController.translate(0, 10, 0);
            spriteController.translate(1, 10, 0);
            spriteController.reflect(0, false, false);
            spriteController.reflect(1, false, false);
        }
        if (event.key === ' ') {
            spriteController.translate(0, 0, -30);
            spriteController.translate(1, 0, -30);
        }
        if (event.key === 'f') {

        }
    });
}


export {tileMap, spriteController, temp};
