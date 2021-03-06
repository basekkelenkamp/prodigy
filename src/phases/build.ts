class Build {

    //HTML & instance variables
    element : HTMLElement
    button : HTMLElement
    gameInstance : Game
    level : number 


    constructor(level : number, gameInstance : Game){
        this.level = level
        this.gameInstance = gameInstance

        //loop through towers & adds drag functionality
        for (const tower of this.gameInstance.towers) { 
           tower.addDragfunction()
        }

        //Creates start button
        this.button = document.createElement("start")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.button)
        this.button.style.display = "none"
        

        //Changes top sticker to build phase
        this.gameInstance.phase.style.backgroundImage = `url(images/scenery/buildphase.png)`;

        //Eventlistener
        this.button.addEventListener("click", ()=> this.buttonClickHandler())

    }

    update(){
        if(this.gameInstance.towers[this.level].dragged){
            this.button.style.display = "block"
        }
        
    }
    
    //Removes start button
    removeButton(){
        this.button.remove()
    }

    //On button click changes to fight phase
    buttonClickHandler(){
        this.gameInstance.gamestate = "fight"
    }

}