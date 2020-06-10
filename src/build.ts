/// <reference path="objects\towers\tower.ts" />


class Build {

    element : HTMLElement
    gameInstance : Game

    
    
    
    strength : number

    damage : number

    attackSpeed : number
    counter : number = 0

    x : number = 500
    y : number = 400

    mouseX : number = 0
    mouseY : number = 0

    constructor(level : number, gameInstance : Game){
        this.gameInstance.tower1.addDragfunction()
    }

    

    updateBuild(){

        console.log("build phase");
        

    }
}