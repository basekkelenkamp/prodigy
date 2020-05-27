class Bullet {

    element : HTMLElement

    strength : number
    damage : number

    attackSpeed : number
    speed : number = 2

    
    //Locate middle tower
    xc : number
    yc : number

    x : number 
    xMove : number = 500

    constructor(level : number, position: DOMRect){

        //Initialize enemy: || STRENGTH || HP || DAMAGE || SPEED ||
        this.strength = level
        this.damage = level*1   

        this.xc = position.x

        //Create bullet
        this.element = document.createElement("bullet")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.element)
    }

    getRectangle() {
        return this.element.getBoundingClientRect()
    }
    
    move(){
    if (this.xMove < this.x - 200) {
        this.xMove = this.x 
    } 

    this.xMove -= this.speed

    this.element.style.transform = `translate(${this.xMove}px, ${this.y}px)`
    }
}