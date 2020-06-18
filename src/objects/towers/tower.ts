class Tower {

    //HTML & instance variables
    element : HTMLElement
    gameInstance : Game


    //position handling & parameters for the tower
    strength : number
    damage : number
    counter : number = 0
    x : number = 900
    y : number = 160
    mouseX : number = 0
    mouseY : number = 0

    constructor(level : number, gameInstance : Game){

        this.gameInstance = gameInstance         

        //Initialize tower: || STRENGTH || DAMAGE ||
        this.strength = level
        this.damage = level*60

        //Create tower
        this.element = document.createElement("tower")
        let game = document.getElementsByTagName("game")[0]
        this.element.id = "tower"
        this.element.draggable = true
        game.appendChild(this.element)
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`

        //Eventlisteners
        this.element.addEventListener('mousemove', ()=> this.hoverTower(event))
        this.element.addEventListener('mouseout', ()=> this.hoverTowerClear(event))
        this.element.addEventListener('dragend', ()=> this.dropTower(event))

    }
    
        //Defines center height of the tower
        public getLocationY(){
            let position = this.element.getBoundingClientRect()
            console.log(position.height*0.5 + position.y)
            return position.height*0.5 + position.y
        }

        //Defines center width of the tower
        public getLocationX(){
            let position = this.element.getBoundingClientRect()
            console.log(position.width*0.5 + position.x)
            return position.width*0.5 + position.x
        }

        //Function of tower shooting
        shoot(){
            let bullet : Bullet = new Bullet(1, this.getLocationX(), this.getLocationY(), this.gameInstance)
            this.gameInstance.Bullets.push(bullet)
        }

        //Tower shoots every second
        updateTower(){
            this.counter++
            if(this.counter > 60){
                this.shoot()
                this.counter = 0
            }            
        }

        //Create highlight box on hover
        hoverTower(e){
            this.element.style.border = "groove"
            console.log(e)
        }
        
        //Removes highlight box on hover
        hoverTowerClear(e){
            this.element.style.border = ""
        }

        //Drops Tower on new position
        dropTower(e){
            this.mouseX = e.clientX
            this.mouseY = e.clientY
            this.element.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px)`
        }

        //Enables drag functionality
        addDragfunction(){
            this.element.draggable = true
            this.element.style.cursor = "grab"
        }

        //Disables drag functionality
        removeDragfunction(){
            console.log("eventlistener removed");
            this.element.draggable = false
            this.element.style.cursor = "default"
        }
        
}