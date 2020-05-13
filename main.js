'use strict';

const TILEMAPSIZE = 160; // Total number of tiles displayed. Must be a multiple of TILECOLUMNS.
const TILECOLUMNS = 16; // Number of columns

class SpritesMaker {
    constructor(spritesList) {
        const main = document.querySelector('.main');
        this.sprites = spritesList.map(srcStr => {
            const sprite = document.createElement('img');
            sprite.src = srcStr;
            main.appendChild(sprite);
            return sprite;
        });
    }

    show(index) {
        this.sprites[index].style.visibility = 'visible';
    }

    hide(index) {
        this.sprites[index].style.visibility = 'hidden';
    }

    reflectY(index) {
        const { style } = this.sprites[index];
        const transform = style.transform;
        if (transform === "scale(-1, 1)"){ 
            style.transform = "scale(1)";
        }
        else if (transform === "scale(1, -1)"){
            style.transform = "scale(-1)";
        }
        else if (transform === "scale(-1)"){
            style.transform = "scale(1, -1)";
        }
        else {
            style.transform = "scale(-1, 1)";
        }
    }

    reflectX(index) {
        const { style } = this.sprites[index];
        const transform = style.transform;
        if (transform === "scale(-1, 1)"){
            style.transform = "scale(-1)";
        }
        else if (transform === "scale(1, -1)"){
            style.transform = "scale(1)";
        }
        else if (transform === "scale(-1)"){
            style.transform = "scale(-1, 1)";
        }
        else {
            style.transform = "scale(1, -1)";
        }
    }

    reflect(index, X, Y) {
        const { style } = this.sprites[index];
        if (!X && !Y){
            style.transform = "scale(1)";
        }
        else if (!X && Y){
            style.transform = "scale(1, -1)";
        }
        else if (X && !Y){
            style.transform = "scale(-1, 1)";
        }
        else if (X && Y){
            style.transform = "scale(-1)";
        }
    }

    translate(index, dX, dY) {
        const { style } = this.sprites[index];
        const posLeft = Number(style.left.slice(0, -2)) + dX;
        const posTop = Number(style.top.slice(0, -2)) + dY;
        style.left = posLeft + "px";
        style.top = posTop + "px";
    }

    setPosition(index, dX, dY) {
        const { style } = this.sprites[index];
        style.left = dX +"px";
        style.top = dY + "px";
    }

    getPosition(index) {
        const { style } = this.sprites[index];
        return {
            x: Number(style.left.slice(0, -2)),
            y: Number(style.top.slice(0, -2))
        };
    }

    getOrientation(index) {
        const { transform } = this.sprites[index].transform;
        if (transform === "scale(1)"){
            return {x: 1, y: 1};
        }
        else if (transform === "scale(-1)"){
            return {x: -1, y: -1};
        }
        else if (transform === "scale(1, -1)"){
            return {x: 1, y: -1};
        }
        else if (transform === "scale(-1, 1)"){
            return {x: -1, y: 1};
        }
        else {
            return {x: 0, y: 0};
        }
    }

    setImage(index, imgSource) {
        this.sprites[index].src = imgSource;
    }

    getZIndex(index) {
        return parseInt(window.getComputedStyle(this.sprites[index]).zIndex);
    }

    setZIndex(index, position) {
        this.sprites[index].style.zIndex = position;
    }
}

class TileMap {
    constructor(tilemapList){
        this.tilemapDiv = document.querySelector('.tilemap');
        // set the number of columns
        let value = "";
        for (let i = 0; i < TILECOLUMNS; ++i){
            value += "auto ";
        }
        this.tilemapDiv.style.gridTemplateColumns = value;
        
        // create the tile map
        this.tiles = [];
        for (let i = 0; i < TILEMAPSIZE; ++i){
            this.tiles.push(this.tilemapDiv.appendChild(document.createElement('div')));
        };            
        
        // insert images
        tilemapList.forEach((src, i) => {
            const img = document.createElement('img');
            img.src = src;
            this.tiles[i].appendChild(img);
        })
    }

    show() {
        this.tilemapDiv.style.visibility = "visible";
    }

    hide() {
        this.tilemapDiv.style.visibility = "hidden";
    }

    translate(dX, dY) {
        const { style } = this.tilemapDiv;
        const posLeft = Number(style.left.slice(0, -2)) + dX;
        const posTop = Number(style.top.slice(0, -2)) + dY;
        style.left = posLeft + "px";
        style.top = posTop + "px";
    }

    setPosition(dX, dY) {
        const { style } = this.tilemapDiv;
        style.top = dY + "px";
        style.left = dX + "px";
    }

    getPosition() {
        const { left, top } = this.tilemapDiv.style;
        return {
            x: left.slice(0, -2),
            y: top.slice(0, -2)
        };
    }

    setImage(index, imgSource) {
        this.tiles[index].children[0].src = imgSource;
    }
}

export {SpritesMaker, TileMap};
