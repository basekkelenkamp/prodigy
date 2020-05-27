class Tower {

    element : HTMLElement

    strength : number

    damage : number

    attackSpeed : number

    x : number = 0
    y : number = 0

    constructor(level : number){

         //Initialize enemy: || STRENGTH || HP || DAMAGE || SPEED ||
         this.strength = level
         this.damage = level*60

         //Tower center 
        
        
        //Create tower
        this.element = document.createElement("tower")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.element)
        this.element.style.filter = `hue-rotate(${this.strength*90}deg)`
    }

    public getLocation(){
        // xc = rect1.top + rect1.height * 0.5;
        // yc = rect1.top + rect1.height * 0.5;
        let position = this.element.getBoundingClientRect()
        // console.log(position.)
        return position
    }


}