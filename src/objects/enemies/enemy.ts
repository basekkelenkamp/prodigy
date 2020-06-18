class Enemy {

    //HTML & instance variables
    element : HTMLElement
    healthBar : HTMLElement
    fightInstance : Fight


    //Position handling & parameters for the enemy
    x : number = 0
    y : number = 200
    xspeed : number = 0
    yspeed : number = 0
    strength : number
    healthPoints : number
    damage : number
    
    //State machine for movement
    state : number = 0


    constructor(level : number, fightInstance : Fight){

        this.fightInstance = fightInstance

        //Initialize enemy: || STRENGTH || HP || DAMAGE || SPEED ||
        this.strength = level
        this.healthPoints = level*100
        this.damage = level*60
        this.xspeed = 0.75 / this.strength
        this.yspeed = 0

        //Create enemy
        this.element = document.createElement("enemy")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.element)
        this.element.style.filter = `hue-rotate(${level*90}deg)`

        //Create HP bar
        this.healthBar = document.createElement("healthbar")
        this.healthBar.innerHTML = `${this.healthPoints}HP`
        this.element.appendChild(this.healthBar)

    }

    //Create rectangle around enemy
    getRectangle() {
        return this.element.getBoundingClientRect()
    }

    //Movement of the enemy
    move(){

        //speed for x & y
        this.x += this.xspeed
        this.y += this.yspeed
               
        //state machine for enemy pathing
        switch (this.state) {
            case 0 : 
                if (this.x > 350) {
                    console.log("move down")
                    this.yspeed = 0.75 / this.strength
                    this.xspeed = 0
                    this.state = 1
                }
            break;

            case 1 :
                if (this.y > 700) {
                    console.log("move right")
                    this.xspeed = 0.75 / this.strength
                    this.yspeed = 0
                    this.state = 2
                }
                break;

            case 2 :
                if (this.x > 1320){
                    console.log("move up")
                    this.yspeed = -0.75 / this.strength
                    this.xspeed = 0
                    this.state = 3
                break;
                }

            case 3 :
                if (this.y < 460){
                    console.log("move right")
                    this.xspeed = 0.75 / this.strength
                    this.yspeed = 0
                    // this.state = 4
                    break;
                }
                
                case 4 : 
                if (this.x > innerWidth - 260){
                    console.log("reset")
                this.x = 0
                this.y = 200
                this.state = 0
            }
            
        }
        //update position
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    //Update HP when hit, removes enemy when HP < 1
    updateHP(){
        this.healthBar.innerHTML = `${this.healthPoints}HP`
        this.element.appendChild(this.healthBar)
        if (this.healthPoints < 1){
            this.element.remove()
            this.fightInstance.removeEnemy(this)
        
        }
        
    }
}