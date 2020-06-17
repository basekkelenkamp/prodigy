/// <reference path="objects\towers\tower.ts" />


class Build {

    element : HTMLElement
    button : HTMLElement

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
        this.gameInstance = gameInstance


        //loop through towers
        for (const tower of this.gameInstance.towers) { 
           tower.addDragfunction()
        }


        console.log("build phase");
        
        this.button = document.createElement("start")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.button)


        this.gameInstance.phase.style.backgroundImage = `url(images/scenery/buildphase.png)`;

        this.button.addEventListener("click", ()=> this.buttonClickHandler())

    }


    removeButton(){
        this.button.remove()
    }


    buttonClickHandler(){
        this.gameInstance.gamestate = "fight"
        
    }

    updateBuild(){

        console.log("build phase");

    }
}