/// <reference path="objects\towers\tower.ts" />

//file that loads the physics, config, scenes etc

class Game {

    buildPhase : Build
    fightPhase : Fight

    tower1 : Tower

    private bullets : Bullet[] = []

    tree   : Tree
    castle : Castle


    bulletCounter : number = 0

    private gamestate : string = "build"
    private previousGamestate : string = "fight"
    // Properties
    
    public get Bullets() : Bullet[] {
        return this.bullets
    }
    

    constructor(){

        //Creates Towers || Castle || Tree || Enemies
        // this.fightPhase = new Fight(1, this)
        // this.buildPhase = new Build(1, this)
        this.tower1 = new Tower(1, this)
        this.castle = new Castle()
        this.tree   = new Tree()

        //Starts gameLoop()
        this.gameLoop()
        
    }

    //Checks collision between two objects
    checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
        }

        removeBullet(bullet : Bullet){
            let i = this.Bullets.indexOf(bullet)
            this.Bullets.splice(i, 1)
            console.log(this.Bullets.length)
        }

    //Animation loop of 60 FPS
    gameLoop() {

        
        
        if(this.gamestate === "build" && this.previousGamestate == "fight") {
            this.buildPhase = new Build(1, this)
            this.buildPhase.updateBuild()
            this.previousGamestate = this.gamestate
            
            //als er in build.ts op oke klikt verandert dee gamestate naar fight
        } else if(this.gamestate === "fight") {
            this.fightPhase = new Fight(1, this)
            this.fightPhase.updateFight()
            this.previousGamestate = this.gamestate
            
                if(this.fightPhase.enemies.length == 0 && this.previousGamestate == "fight") {
                    this.gamestate = "build"
                }
        }
        

        this.previousGamestate = this.gamestate


        //Updates tower
        // this.tower1.updateTower()

        // this.buildPhase.updateBuild()

        

        //For loop to move bullets
        // for (const bullet of this.bullets) {
        //     bullet.move()
        // }

        //Creates collision between fightPhase.enemies and the castle
        for (let i = 0; i < this.fightPhase.enemies.length; i++) {
            let hit = this.checkCollision(this.fightPhase.enemies[i].getRectangle(), this.castle.getRectangle())
            
            //Gives DMG to tower when hit by enemy
            if (hit) {
                console.log("collision is: " + hit)
                this.castle.healthPoints -= this.fightPhase.enemies[i].damage
                this.castle.updateHP()

                //reset enemy
                this.fightPhase.enemies[i].x = 0
                this.fightPhase.enemies[i].y = 200
                this.fightPhase.enemies[i].state = 0
            }
        }

        //Creates collision between fightPhase.enemies and bullets
        for (const bullet of this.bullets) {
            
            for (let i = 0; i < this.fightPhase.enemies.length; i++) {
                let hitEnemy = this.checkCollision(this.fightPhase.enemies[i].getRectangle(), bullet.getRectangle())
                
                //Gives DMG to fightPhase.enemies when hit by bullets
                if (hitEnemy) {
                    console.log("collision is: " + hitEnemy)
                    this.fightPhase.enemies[i].healthPoints -= bullet.damage
                    this.fightPhase.enemies[i].updateHP()

                    //Removes bullet
                    bullet.removeBullet()
                }
            }
        }
    
    //Game loop initialisation
    requestAnimationFrame(() => this.gameLoop())
    }
}

//Load game
window.addEventListener("load", () => new Game())