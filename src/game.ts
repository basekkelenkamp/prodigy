class Game {

    //HTML & instance variables
    phase : HTMLElement
    waveText : HTMLElement
    buildPhase : Build
    fightPhase : Fight
    castle : Castle
    playAgain : HTMLElement

    //Wave & properties variables
    waveLevel : number = 3
    waveCounter : number = 1
    towers : Tower[] = []
    private bullets : Bullet[] = []
    bulletCounter : number = 0
    buildLvl : number = 0
    
    //Phase handler
    private _gamestate : string = "build"
    private previousGamestate : string = "fight"


    //getter for bullets
    public get Bullets() : Bullet[] {
        return this.bullets
    }

    //setter for gamestate
    public set gamestate(gamestate : string) {this._gamestate = gamestate;}

    constructor(){

        //Creates Towers || Castle || Enemies
        this.towers.push(new Tower(1, this))
        this.castle = new Castle()

        //Create phase sticker 
        let game = document.getElementsByTagName("game")[0]
        this.phase = document.createElement("phase")
        game.appendChild(this.phase)

            //Create "current wave" text
            this.waveText = document.createElement("wavetext")
            game.appendChild(this.waveText)
            this.waveText.innerHTML = `Current wave: ${this.waveCounter}`

        
        //Play again
        this.playAgain = document.createElement("a")
        game.appendChild(this.playAgain)
        this.playAgain.style.display = "none"
        this.playAgain.innerHTML = `Play again?`
        this.playAgain.setAttribute("href","index.html")
        

        //Starts gameLoop
        this.gameLoop()
        
    }

    //Checks collision between two objects
    checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
        }
        
        //Removes bullet from array
        removeBullet(bullet : Bullet){
            let i = this.Bullets.indexOf(bullet)
            this.Bullets.splice(i, 1)
        }
        
        //Animation loop of 60 FPS
        gameLoop() {
            
            //phase switch from fight to build
            if(this._gamestate === "build" && this.previousGamestate == "fight") {
                this.buildPhase = new Build(this.buildLvl, this)
                this.buildLvl++
                this.previousGamestate = this._gamestate
                this.waveText.innerHTML = `Current wave: ${this.waveCounter}`

                //If it's not build phase 1, add new tower every new build phase.
                if(this.waveLevel > 3){
                    let i = this.waveLevel - 2
                    this.towers.push(new Tower(i, this))                    
                }
            }  

            //phase switch from build to fight
            if (this._gamestate == 'fight' && this.previousGamestate == 'build'){
            
                //remove button, create new fight phase with wave level, initializion 
                this.buildPhase.removeButton()
                this.fightPhase = new Fight(this.waveLevel, this)
                this.waveLevel +=1
                this.waveCounter ++
                this.previousGamestate = this._gamestate
            }


            //Update build
            if(this._gamestate === "build") {
                this.buildPhase.update()
            }


        //checks if gamestate is fight
        if(this._gamestate === "fight") {

            //continuous update function while fight
            this.fightPhase.updateFight()

                //Creates collision between fightPhase.enemies and the castle
                for (let i = 0; i < this.fightPhase.enemies.length; i++) {
                    let hit = this.checkCollision(this.fightPhase.enemies[i].getRectangle(), this.castle.getRectangle())
                    
                    //Removes healthpoints to castle when hit by enemy
                    if (hit) {
                        this.castle.healthPoints -= this.fightPhase.enemies[i].damage
                        this.castle.updateHP()

                        //reset enemy to starting position
                        this.fightPhase.enemies[i].x = 0
                        this.fightPhase.enemies[i].y = 200
                        this.fightPhase.enemies[i].state = 0
                    }
                }

            //Checks collision between enemies and bullets
            for (const bullet of this.bullets) {
                
                for (let i = 0; i < this.fightPhase.enemies.length; i++) {
                    let hitEnemy = this.checkCollision(this.fightPhase.enemies[i].getRectangle(), bullet.getRectangle())
                    
                    //Removes healthpoints from enemies when hit by bullets
                    if (hitEnemy) {
                        this.fightPhase.enemies[i].healthPoints -= bullet.damage
                        this.fightPhase.enemies[i].updateHP()

                        //Removes bullet when enemy is hit
                        bullet.removeBullet()
                    }
                }
            }

            //Changes to build phase when all enemies are dead
            if(this.fightPhase.enemiesAmount === 0){
                this._gamestate = "build"
            }
        }

        //GAME OVER
        if(this.castle.healthPoints < 1){
            this.castle.healthPoints = 0
            this._gamestate = "gameover"
            this.playAgain.style.display = "block"
        }

        
    //Game loop initialisation
    requestAnimationFrame(() => this.gameLoop())
    }
}

//Load game
window.addEventListener("load", () => new Game())