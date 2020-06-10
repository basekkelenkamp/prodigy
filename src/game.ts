//file that loads the physics, config, scenes etc

class Game {

    tree   : Tree
    castle : Castle
    tower1 : Tower
    
    enemies : Enemy[] = []
    bullets : Bullet[] = []
    
    enemiesAmount : number = 4
    bulletCounter : number = 0

    constructor(){

        //Creates Towers || Castle || Tree || Enemies
        this.tower1 = new Tower(1, this)
        this.castle = new Castle()
        this.tree   = new Tree()

        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemies.push(new Enemy(i+1))            
        }

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

    //Animation loop of 60 FPS
    gameLoop() {

        //Updates tower
        this.tower1.updateTower()
        
        //For loop to move bullets
        for (const bullet of this.bullets) {
            bullet.move()
        }
        
        //For loop to move enemies
        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemies[i].move()
        }
    
        //Creates collision between enemies and the castle
        for (let i = 0; i < this.enemies.length; i++) {
            let hit = this.checkCollision(this.enemies[i].getRectangle(), this.castle.getRectangle())
            
            //Gives DMG to tower when hit by enemy
            if (hit) {
                console.log("collision is: " + hit)
                this.castle.healthPoints -= this.enemies[i].damage
                this.castle.updateHP()

                //reset enemy
                this.enemies[i].x = 0
                this.enemies[i].y = 200
                this.enemies[i].state = 0
            }
        }

        //Creates collision between enemies and bullets
        for (const bullet of this.bullets) {
            
            for (let i = 0; i < this.enemies.length; i++) {
                let hitEnemy = this.checkCollision(this.enemies[i].getRectangle(), bullet.getRectangle())
                
                //Gives DMG to enemies when hit by bullets
                if (hitEnemy) {
                    console.log("collision is: " + hitEnemy)
                    this.enemies[i].healthPoints -= bullet.damage
                    this.enemies[i].updateHP()

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