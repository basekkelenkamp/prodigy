class Fight {

    element : HTMLElement
    gameInstance : Game

    enemies : Enemy[] = []
    enemiesAmount : number = 4

    bulletCounter : number = 0

    constructor(level : number, gameInstance : Game){
        this.gameInstance = gameInstance

        this.gameInstance.tower1.removeDragfunction()


        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemies.push(new Enemy(i+1,this))            
        }
    }


    removeEnemy(enemy : Enemy){
        let i = this.enemies.indexOf(enemy)
        this.enemies.splice(i, 1)
        console.log(this.enemies.length)
    }



    updateFight(){
        
        // move bullets
        for (const bullet of this.gameInstance.Bullets) {
            bullet.move()
        }
        // checkcollision
                

        //For loop to move enemies
        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemies[i].move()
        }

                
    }
}