class Castle {

    element : HTMLElement
    healthBar : HTMLElement

    healthPoints : number = 1000

    x : number = 0
    y : number = 0

    castleImg : number = 1

    constructor(){

        //Create castle
        this.element = document.createElement("castle")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.element)

        //Place castle
        this.x = innerWidth - this.element.clientWidth
        this.y = 300
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`

        //Create HP bar
        this.healthBar = document.createElement("healthbar")
        this.healthBar.innerHTML = `${this.healthPoints}HP`
        this.element.appendChild(this.healthBar)
    }

    //Create rectangle around castle
    getRectangle() {
        return this.element.getBoundingClientRect()
    }

    //Update HP and image when hit
    updateHP(){
        this.healthBar.innerHTML = `${this.healthPoints}HP`
        this.element.appendChild(this.healthBar)

        if (this.healthPoints < 1000) {
            this.castleImg = 2
            if(this.healthPoints < 800) {
                this.castleImg = 3
                if(this.healthPoints < 600){
                    this.castleImg = 4
                    if(this.healthPoints < 400){
                        this.castleImg = 5
                        if(this.healthPoints < 200){
                            this.castleImg = 6
                            if(this.healthPoints < 0){
                                this.healthPoints = 0
                            }
                        }
                    }
                }
            }
        }

        this.element.style.backgroundImage = `url(/docs/images/castle/castle${this.castleImg}.png)`;

    }

}