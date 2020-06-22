class Fight {

    //HTML & instance variables
    element : HTMLElement
    gameInstance : Game

    //Enemies handling variables
    enemies : Enemy[] = []
    enemiesAmount : number
    newWave : number
    bossLvl : number


    constructor(enemies : number, gameInstance : Game){
        this.gameInstance = gameInstance
        this.newWave = 0
        this.enemiesAmount = enemies
        this.bossLvl = enemies+1


        //Changes top sticker to attack phase
        this.gameInstance.phase.style.backgroundImage = `url(images/scenery/attackphase.png)`;

        //loop through tower & remove drag functionality
        for (const tower of this.gameInstance.towers) {
            tower.removeDragfunction()
        }

        //Wave 1 of enemies
        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemies.push(new Enemy(i+0.75,this))            
        }
    }

    //Removes enemy when HP =< 0
    removeEnemy(enemy : Enemy){
        let i = this.enemies.indexOf(enemy)
        this.enemies.splice(i, 1)
        this.enemiesAmount -=1
    }


    //continuous update function
    updateFight(){

        //loop through towers to make them shoot
        for (const tower of this.gameInstance.towers) {
            tower.updateTower()
        }
        
        // move bullets
        for (const bullet of this.gameInstance.Bullets) {
            bullet.move()
        }


        //Wave 2 of enemies, newWave checks the state of the wave
        if(this.enemiesAmount == 2 && this.newWave == 0){
            this.enemies.push(new Enemy(this.enemiesAmount * 0.25,this))
            this.enemies.push(new Enemy(this.enemiesAmount * 0.5,this))
            this.newWave = 1
            this.enemiesAmount += 2
        }

        //Boss wave with minions
        if(this.enemiesAmount == 1 && this.newWave == 1) {
            this.enemies.push(new Enemy(this.bossLvl,this))
            this.enemies.push(new Enemy(0.8,this))
            this.enemies.push(new Enemy(0.7,this))
            this.enemiesAmount += 3

            if(this.gameInstance.waveLevel > 4) {
            this.enemies.push(new Enemy(0.6,this))
            this.enemies.push(new Enemy(0.5,this))
            this.enemiesAmount += 2
            }

            this.newWave = 2
        }

        //Wave 3 of enemies
        if(this.enemiesAmount == 1 && this.newWave == 2) {
            this.enemies.push(new Enemy(0.8,this))
            this.enemies.push(new Enemy(0.7,this))

            this.enemiesAmount += 2
            this.newWave = 3
        }

        //Wave 4 of enemies
        if(this.enemiesAmount == 1 && this.newWave == 3) {
            this.enemies.push(new Enemy(0.8,this))
            this.enemies.push(new Enemy(0.7,this))

            this.enemiesAmount += 2
            this.newWave = 4
        }

        //Wave 5 of enemies
        if(this.enemiesAmount == 1 && this.newWave == 4 && this.gameInstance.waveLevel > 4) {
            this.enemies.push(new Enemy(0.8,this))
            this.enemies.push(new Enemy(0.7,this))

            this.enemiesAmount += 2
            this.newWave = 5
        }
        
        //Wave 6 of enemies
        if(this.enemiesAmount == 1 && this.newWave == 5 && this.gameInstance.waveLevel > 5) {
            this.enemies.push(new Enemy(0.8,this))
            this.enemies.push(new Enemy(0.7,this))

            this.enemiesAmount += 2
            this.newWave = 6
        } 

        //For loop to move enemies
        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemies[i].move()
        }

                
    }
}