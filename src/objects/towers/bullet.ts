class Bullet {

    //HTML & instance variables
    element : HTMLElement
    gameInstance : Game

    
    //position handling & parameters for the bullet
    x : number = 0
    y : number = 0
    xMove : number = 500
    distance : number 
    speed : number = 2
    damage : number


    constructor(level : number, positionX: number, positionY: number, gameInstance : Game){
       
        this.gameInstance = gameInstance

        //Set bullet to center of tower
        this.x = positionX
        this.y = positionY
        
        //Initialize bullet: || DAMAGE || SPEED || Distance
        this.damage = (level * 10 + 5)
        this.distance = this.x - (level * 200 + 180)
                
        //Create bullet
        this.element = document.createElement("bullet")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.element)
        this.element.style.filter = `hue-rotate(180deg)`

    }

    
    //Get bullet hitbox
    getRectangle() {
        return this.element.getBoundingClientRect()
    }
    

    //Tower shoots bullets and removes them when enemy is hit or runs out of distance
    move(){
        
        if (this.x < this.distance) {
            this.removeBullet()
        } 

        //Set speed & move bullet
        this.x -= this.speed
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`

    }

    //Remove bullet
    removeBullet(){
        this.gameInstance.removeBullet(this)
        this.element.remove()
    }

}