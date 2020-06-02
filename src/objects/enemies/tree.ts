class Tree {
    x = 0
    y = 300
    element : HTMLElement
    boom    : number = 1

    constructor(){

        //Create tree
        this.element = document.createElement("tree")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.element)
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
        
        this.element.addEventListener("click", () => this.beweeg())
    }

    //Moves the tree
    beweeg() {
        this.boom++
        if (this.boom === 5) {
            this.boom = 1;
        }
        this.element.style.backgroundImage = `url(../images/scenery/Armored_Tree${this.boom}.png)`;
    }

}