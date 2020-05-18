class Enemy {

    element : HTMLElement
    healthBar : HTMLElement

    strengthLevel : number
    healthPoints : number
    damage : number
    speed : number

    x : number = 0
    y : number = 0

    constructor(strength : number){

        //Initialize enemy: || STRENGTH || HP || DAMAGE || SPEED ||
        this.strengthLevel = strength
        this.healthPoints = strength*100
        this.damage = strength*5
        this.speed = 0.75 / this.strengthLevel 


        //Create enemy
        this.element = document.createElement("enemy")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.element)
        this.element.style.filter = `hue-rotate(${this.strengthLevel*90}deg)`

        //Create HP bar
        this.healthBar = document.createElement("healthbar")
        this.healthBar.innerHTML = `${this.healthPoints}HP`
        this.element.appendChild(this.healthBar)

    }

    move(){
        this.x += this.speed
        this.y = this.strengthLevel*100

        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`

    }

}