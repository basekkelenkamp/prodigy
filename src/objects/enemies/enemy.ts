class Enemy {

    element : HTMLElement
    healthBar : HTMLElement

    strength : number
    healthPoints : number
    damage : number
    xspeed : number = 0
    yspeed : number = 0
    state : number = 0

    x : number = 0
    y : number = 200

    constructor(level : number){

        console.log(`h:${innerHeight} w:${innerWidth}`)

        //Initialize enemy: || STRENGTH || HP || DAMAGE || SPEED ||
        this.strength = level
        this.healthPoints = level*100
        this.damage = level*5
        this.xspeed = 0.75 / this.strength
        this.yspeed = 0


        //Create enemy
        this.element = document.createElement("enemy")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.element)
        this.element.style.filter = `hue-rotate(${level*60}deg)`

        //Create HP bar
        this.healthBar = document.createElement("healthbar")
        this.healthBar.innerHTML = `${this.healthPoints}HP`
        this.element.appendChild(this.healthBar)

    }

    move(){

        this.x += this.xspeed
        this.y += this.yspeed
         
        switch (this.state) {
            case 0 : 
                if (this.x > 300) {
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
                if (this.x > 1100){
                    console.log("move up")
                    this.yspeed = -0.75 / this.strength
                    this.xspeed = 0
                    this.state = 3
                break;
                }

            case 3 :
                if (this.y < 400){
                    console.log("move right")
                    this.xspeed = 0.75 / this.strength
                    this.yspeed = 0
                    this.state = 4
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
    



        
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`

    }

}