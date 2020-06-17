class Fight {

    element : HTMLElement
    gameInstance : Game

    enemies : Enemy[] = []
    enemiesAmount : number
    newWave : number
    bossLvl : number

    bulletCounter : number = 0

    constructor(enemies : number, gameInstance : Game){
        this.gameInstance = gameInstance
        this.newWave = 0
        this.enemiesAmount = enemies
        this.bossLvl = enemies+1


        this.gameInstance.tower1.removeDragfunction()

        console.log("attack phase")

        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemies.push(new Enemy(i+1,this))            
        }
    }


    removeEnemy(enemy : Enemy){
        let i = this.enemies.indexOf(enemy)
        this.enemies.splice(i, 1)
        console.log(this.enemies.length)
        this.enemiesAmount -=1
    }



    updateFight(){

        this.gameInstance.tower1.updateTower()
        
        // move bullets
        for (const bullet of this.gameInstance.Bullets) {
            bullet.move()
        }


        //Wave 2
        if(this.enemiesAmount == 2 && this.newWave == 0){
            this.enemies.push(new Enemy(this.enemiesAmount * 0.25,this))
            this.enemies.push(new Enemy(this.enemiesAmount * 0.5,this))
            this.newWave = 1
            this.enemiesAmount += 2
        }

        //Wave 3
        if(this.enemiesAmount == 1 && this.newWave == 1) {
            this.enemies.push(new Enemy(this.bossLvl,this))
            this.newWave = 2
            this.enemiesAmount += 1
        }
                

        //For loop to move enemies
        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemies[i].move()
        }

                
    }
}