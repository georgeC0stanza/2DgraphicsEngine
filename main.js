'use strict';

const TILEMAPSIZE = 160; // Total number of tiles displayed. Must be a multiple of TILECOLUMNS.
const TILECOLUMNS = 16; // Number of columns

let tileSet = []; // Set of all tiles to be used
let tilemapList = []; // The order in which the tiles are used via references to elements in tileSet
let spriteSet = []; // Set of all sprites to be used

loadResources(); 

let sprites = (function (){
    function createSprites(spritesList) {
        let spriteCount = 0;
        spritesList.forEach(x => {
            let sprite = document.createElement('img');
            sprite.src = x;
            sprite.className = "sprites";
            sprite.id = "sprite" + spriteCount;
            sprite.style.visibility = "hidden";
            ++spriteCount;
            document.getElementById("window").appendChild(sprite);
        });
    }

    function show(index) {
        const spriteStyle = document.getElementById("sprite" + index).style
        spriteStyle.visibility = "visible";
    }

    function hide(index) {
        spriteStyle = document.getElementById("sprite" + index).style
        spriteStyle.visibility = "hidden";
    }
    
    function reflectY(spriteIndex) {
        const sprite = "sprite" + spriteIndex;
        const transform = document.getElementById(sprite).style.transform;
        if (transform === "scale(-1, 1)"){ 
            document.getElementById(sprite).style.transform = "scale(1)";
        }
        else if (transform === "scale(1, -1)"){
            document.getElementById(sprite).style.transform = "scale(-1)";
        }
        else if (transform === "scale(-1)"){
            document.getElementById(sprite).style.transform = "scale(1, -1)";
        }
        else {
            document.getElementById(sprite).style.transform = "scale(-1, 1)";
        }
    }
    
    function reflectX(spriteIndex) {
        const sprite = "sprite" + spriteIndex;
        const transform = document.getElementById(sprite).style.transform;
        if (transform === "scale(-1, 1)"){
            document.getElementById(sprite).style.transform = "scale(-1)";
        }
        else if (transform === "scale(1, -1)"){
            document.getElementById(sprite).style.transform = "scale(1)";
        }
        else if (transform === "scale(-1)"){
            document.getElementById(sprite).style.transform = "scale(-1, 1)";
        }
        else {
            document.getElementById(sprite).style.transform = "scale(1, -1)";
        }
    }
    
    function reflect(spriteIndex, dX, dY) {
        const sprite = "sprite" + spriteIndex;
        if (dX === true && dY === true){
            document.getElementById(sprite).style.transform = "scale(1)";
        }
        else if (dX === true && dY === false){
            document.getElementById(sprite).style.transform = "scale(1, -1)";
        }
        else if (dX === false && dY === true){
            document.getElementById(sprite).style.transform = "scale(-1, 1)";
        }
        else if (dX === false && dY === false){
            document.getElementById(sprite).style.transform = "scale(-1)";
        }
    }
    
    function translate(spriteIndex, dX, dY) {
        const sprite = "sprite" + spriteIndex;
        const posLeft = parseInt(document.getElementById(sprite).style.left.slice(0, -2)) + dX;
        const posTop = parseInt(document.getElementById(sprite).style.top.slice(0, -2)) + dY;
        document.getElementById(sprite).style.left = posLeft + "px";
        document.getElementById(sprite).style.top = posTop + "px";
    }
    
    function setPosition(spriteIndex, dX, dY) {
        const sprite = "sprite" + spriteIndex;
        document.getElementById(sprite).style.left = dX +"px";
        document.getElementById(sprite).style.top = dY + "px";
    }

    function getPosition(spriteIndex) {
        const sprite = "sprite" + spriteIndex;
        return {
            x: parseInt(document.getElementById(sprite).style.left.slice(0, -2)),
            y: parseInt(document.getElementById(sprite).style.top.slice(0, -2))
        };
    }

    function getOrientation(spriteIndex) {
        const sprite = "sprite" + spriteIndex;
        const transform = document.getElementById(sprite).style.transform;
        let pair = {};

        if (transform === "scale(1)"){
            pair = {x: 1, y: 1};
        }
        else if (transform === "scale(-1)"){
            pair = {x: -1, y: -1};
        }
        else if (transform === "scale(1, -1)"){
            pair = {x: 1, y: -1};
        }
        else if (transform === "scale(-1, 1)"){
            pair = {x: -1, y: 1};
        }
        else {
            pair = {x: 0, y: 0};
        }
        return pair;
    }
    
    return{
        setPosition: setPosition,
        getPosition: getPosition,
        getOrientation: getOrientation,
        translate: translate,
        reflect: reflect,
        reflectX: reflectX,
        reflectY: reflectY,
        createSprites: createSprites,
        show: show,
        hide: hide
    };
}())

let tilemap = (function (){
    function create(){
        // create the tile map
        for (let i = 0; i < TILEMAPSIZE; ++i){
            let tile = document.createElement('div');
            tile.className = "tile";
            tile.id = "tile" + i;
            document.getElementById("tilemap").appendChild(tile);
        };            
        // set the number of columns
        let value = "";
        for (let i = 0; i < TILECOLUMNS; ++i){
            value += "auto ";
        }
        document.getElementById("tilemap").style.gridTemplateColumns = value;
        // insert images
        let index = 0;
        tilemapList.forEach(x => {
            let img = document.createElement('img');
            img.src = x;
            img.className = "tileImage";
            document.getElementById("tile" + index).appendChild(img);
            ++index; 
        })
    }

    function show() {
        spriteStyle = document.getElementById("tilemap").style
        spriteStyle.visibility = "visible";
    }

    function hide() {
        spriteStyle = document.getElementById("tilemap").style
        spriteStyle.visibility = "hidden";
    }
        
    function translate(dX, dY) {
        const posLeft = parseInt(document.getElementById("viewport").style.left.slice(0, -2)) + dX;
        const posTop = parseInt(document.getElementById("viewport").style.top.slice(0, -2)) + dY;
        document.getElementById("viewport").style.left = posLeft + "px";
        document.getElementById("viewport").style.top = posTop + "px";
    }
    
    function setPosition(dX, dY) {
        document.getElementById("viewport").style.top = dY + "px";
        document.getElementById("viewport").style.left = dX + "px";
    }

    function getPosition() {
        return {
            x: parseInt(document.getElementById("viewport").style.left.slice(0, -2)),
            y: parseInt(document.getElementById("viewport").style.top.slice(0, -2))
        };
    }
    
    return{
        setPosition: setPosition,
        getPosition: getPosition,
        translate: translate,
        show: show,
        hide: hide,
        create: create};   
}())

initializeKeyBindings();

tilemap.setPosition(0, 0);
tilemap.create();

sprites.createSprites(spriteSet);
sprites.setPosition(0, 300, 300);
sprites.show(0); 

function initializeKeyBindings(){
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
            tilemap.translate(0, 10);
        }
        else if (event.key === 'ArrowDown') {
            tilemap.translate(0, -10);
        }
        if (event.key === 'ArrowLeft') {
            tilemap.translate(10, 0);
        }
        else if (event.key === 'ArrowRight') {
           tilemap.translate(-10, 0);
        }
        if (event.key === 'w') {
            sprites.translate(0, 0, -10);
        }
        if (event.key === 's') {
            sprites.translate(0, 0, 10);
        }
        if (event.key === 'a') {
            sprites.translate(0, -10, 0);
        }
        if (event.key === 'd') {
            sprites.translate(0, 10, 0);
        }
        if (event.key === ' ') {
            sprites.reflectY(0);
        }
        if (event.key === 'f') {
            sprites.reflectX(0);
        }
    });
}

function loadResources(){
    const img1 = 'https://georgec0stanza.github.io/2DgraphicsEngine/images/ferns.jpg';
    const img2 = 'https://georgec0stanza.github.io/2DgraphicsEngine/images/tulips.jpg';
    const img3 = 'https://georgec0stanza.github.io/2DgraphicsEngine/images/water.jpg';
    
    const sprite0 = 'https://georgec0stanza.github.io/2DgraphicsEngine/images/daffodil.jpg';    
    const sprite1 = 'https://georgec0stanza.github.io/2DgraphicsEngine/images/eagle.jpg';    

    spriteSet = [sprite0, sprite1];
    tileSet = [img1, img2, img3];
    tilemapList = [tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0], tileSet[0] , tileSet[2], tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] , tileSet[2], tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] ,tileSet[2], tileSet[1] , tileSet[1] , tileSet[0] , tileSet[2]];    
}
