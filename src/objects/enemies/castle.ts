class Castle {

    element : HTMLElement
    healthBar : HTMLElement

    // strengthLevel : number
    healthPoints : number = 1000
    // damage : number
    // speed : number

    x : number = 500
    y : number = 0

    castleImg : number = 1

    constructor(){

        //Initialize enemy: || STRENGTH || HP || DAMAGE || SPEED ||
        // this.strengthLevel = strength
        // this.healthPoints = strength*100
        // this.damage = strength*5
        // this.speed = 0.75 / this.strengthLevel 


        //Create castle
        this.element = document.createElement("castle")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.element)
        // this.element.style.filter = `hue-rotate(${this.strengthLevel*90}deg)`
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`

        //Create HP bar
        this.healthBar = document.createElement("healthbar")
        this.healthBar.innerHTML = `${this.healthPoints}HP`
        this.element.appendChild(this.healthBar)

        this.element.addEventListener("click", () => this.break())

        


    }

    break(){
        
        //als hp onder 1000 komt
        this.castleImg ++
        if (this.castleImg > 6) {
            this.castleImg = 1
        }
        this.healthPoints -= 200
        if (this.healthPoints < 0) {
            this.healthPoints = 1000
        }
        this.healthBar.innerHTML = `${this.healthPoints}HP`
        //background-image: `url(../../src/assets/images/castle/castle${i}.png)`;
        this.element.style.backgroundImage = `url(../../src/assets/images/castle/castle${this.castleImg}.png)`;

    }
    // move(){
    //     this.x += this.speed
    //     this.y = this.strengthLevel*100

    //     this.element.style.transform = `translate(${this.x}px, ${this.y}px)`

    // }

}