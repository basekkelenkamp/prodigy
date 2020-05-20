class Tower {

    element : HTMLElement

    strength : number

    damage : number
    attackSpeed : number

    x : number = 0
    y : number = 0

    constructor(towerLevel : number){
        //Initialize : || STRENGTH || DAMAGE || ATTACKSPEED ||
        this.damage = towerLevel*5


        //Create tower
        this.element = document.createElement("tower")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.element)
        this.element.style.filter = `hue-rotate(${this.strength*90}deg)`
    }
}