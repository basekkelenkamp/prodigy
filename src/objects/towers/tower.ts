class Tower {

    element : HTMLElement
    gameInstance : Game

    strength : number

    damage : number

    attackSpeed : number
    counter : number = 0

    x : number = 500
    y : number = 400

    constructor(level : number, gameInstance : Game){

         //Initialize enemy: || STRENGTH || HP || DAMAGE || SPEED ||
         this.strength = level
         this.damage = level*60
         this.gameInstance = gameInstance
         

         //Create tower
         this.element = document.createElement("tower")
         let game = document.getElementsByTagName("game")[0]
         game.appendChild(this.element)
         this.element.style.filter = `hue-rotate(${this.strength*90}deg)`
         
         //Tower move
         this.element.style.transform = `translate(${this.x}px, ${this.y}px)`

         this.shoot()
        }
    


    public getLocationY(){
        let position = this.element.getBoundingClientRect()
        console.log(position.height*0.5 + position.y)
        return position.height*0.5 + position.y
    }

    public getLocationX(){
        let position = this.element.getBoundingClientRect()
        console.log(position.width*0.5 + position.x)
        return position.width*0.5 + position.x
    }

    shoot(){
        let bullet : Bullet = new Bullet(1, this.getLocationX(), this.getLocationY(), this.gameInstance)
        this.gameInstance.bullets.push(bullet)
    }

    updateTower(){

        this.counter++
        if(this.counter > 60){
            this.shoot()
            this.counter = 0


        }

                    //DRIVEBY TOWER 
                    // this.element.style.transform = `translate(${this.x -=1}px, ${this.y += 0.1}px)`

    }


}