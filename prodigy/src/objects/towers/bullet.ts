class Bullet {

    element : HTMLElement

    strength : number
    damage : number
    distance : number 
    gameInstance : Game

    attackSpeed : number
    speed : number = 2

    
    //X and Y from the bullet
    x : number = 0
    y : number = 0

    xMove : number = 500

    constructor(level : number, positionX: number, positionY: number, gameInstance : Game){

        //Set bullet to center of tower
        this.gameInstance = gameInstance
        this.x = positionX
        this.y = positionY
        
        //Initialize bullet: || DAMAGE || SPEED || Distance
        this.strength = level
        this.damage = (level * 10 + 5)
        this.distance = this.x - (level * 20 + 180)
        
        console.log(this.distance + "DISTANCE")
        

        //Create bullet
        this.element = document.createElement("bullet")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.element)

        this.element.style.filter = `hue-rotate(${0}deg)`
    }

    //Create rectangle around enemy
    getRectangle() {
        return this.element.getBoundingClientRect()
    }
    
    //Tower shoots bullets and removes them when hit or runs out of distance
    move(){
    if (this.x < this.distance) {
        this.removeBullet()
    } 

    
    this.x -= this.speed
    
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    removeBullet(){
        this.gameInstance.removeBullet(this)
        this.element.remove()


        // let i = this.gameInstance.Bullets.indexOf(this)
        // this.gameInstance.Bullets.splice(i, 1)
        // console.log(this.gameInstance.Bullets.length)

    }
}