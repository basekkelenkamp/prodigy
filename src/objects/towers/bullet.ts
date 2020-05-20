class Bullet {

    element : HTMLElement
    healthBar : HTMLElement

    strengthLevel : number
    healthPoints : number
    damage : number
    speed : number

    x : number = 110
    y : number = 0

    constructor(strength : number){

        //Initialize enemy: || STRENGTH || HP || DAMAGE || SPEED ||
        this.strengthLevel = strength
        this.healthPoints = strength*100
        this.damage = strength*5
        this.speed = 0.75 / this.strengthLevel 


        //Create bullet
        this.element = document.createElement("bullet")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.element)

    }

    
    move(){
    if (this.x > 250) {
        this.x = 110
        
    } 

    this.x += this.speed
    this.y = 11

    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}