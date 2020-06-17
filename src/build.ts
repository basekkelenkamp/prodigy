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
        gameInstance.tower1.addDragfunction()

        // button.setAttribute("onclick", "this.buttonClickHandler()")


        console.log("build phase");
        
        this.button = document.createElement("button")
        let game = document.getElementsByTagName("game")[0]
        this.button.innerHTML = "Ready to Fight!"
        game.appendChild(this.button)

        this.button.addEventListener("click", ()=> this.buttonClickHandler())

    }




    buttonClickHandler(){
        this.gameInstance.gamestate = "fight"
        
    }

    updateBuild(){

        console.log("build phase");
        
    }
}