class Castle {

    element : HTMLElement
    healthBar : HTMLElement

    healthPoints : number = 1000

    x : number = 500
    y : number = 0

    castleImg : number = 1

    constructor(){
        //Create castle
        this.element = document.createElement("castle")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.element)
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`

        //Create HP bar
        this.healthBar = document.createElement("healthbar")
        this.healthBar.innerHTML = `${this.healthPoints}HP`
        this.element.appendChild(this.healthBar)

        this.element.addEventListener("click", () => this.break())

        


    }

    break(){
        
        this.castleImg ++
        if (this.castleImg > 6) {
            this.castleImg = 1
        }
        this.healthPoints -= 200
        if (this.healthPoints < 0) {
            this.healthPoints = 1000
        }
        this.healthBar.innerHTML = `${this.healthPoints}HP`
        this.element.style.backgroundImage = `url(../../src/assets/images/castle/castle${this.castleImg}.png)`;

    }


}