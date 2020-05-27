class Tower {

    element : HTMLElement

    strength : number

    damage : number

    attackSpeed : number

    x : number = 1000
    y : number = 100

    constructor(level : number){

         //Initialize enemy: || STRENGTH || HP || DAMAGE || SPEED ||
         this.strength = level
         this.damage = level*60

         
         //Create tower
         this.element = document.createElement("tower")
         let game = document.getElementsByTagName("game")[0]
         game.appendChild(this.element)
         this.element.style.filter = `hue-rotate(${this.strength*90}deg)`
         
         //Tower move
         this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
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


}