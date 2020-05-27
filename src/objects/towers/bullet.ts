class Bullet {

    element : HTMLElement

    strength : number
    damage : number
    distance : number 

    attackSpeed : number
    speed : number = 2

    
    //X and Y from the bullet
    x : number = 0
    y : number = 0

    xMove : number = 500

    constructor(level : number, positionX: number, positionY: number){

        //Initialize bullet: || DAMAGE || SPEED || Distance ||
        this.strength = level
        this.damage = level*1
        this.distance = this.x - (level * 20 + 130)

        console.log(this.distance + "DISTANCE")

        this.x = positionX
        this.y = positionY

        //Create bullet
        this.element = document.createElement("bullet")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.element)
    }

    getRectangle() {
        return this.element.getBoundingClientRect()
    }
    
    move(){
    if (this.x < this.distance) {
        this.element.remove()
    } 

    this.x -= this.speed

    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}