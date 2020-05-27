//file that loads the physics, config, scenes etc

class Game {

    tower1 : Tower

    bullet : Bullet

    enemy1 : Enemy
    enemy2 : Enemy
    enemy3 : Enemy
    tree   : Tree
    enemy4 : Enemy
    enemy5 : Enemy
    castle : Castle

    enemies : Enemy[] = []
    enemiesAmount : number = 4

    bulletCounter : number = 0

    constructor(){
        console.log("game created!")


        this.tower1 = new Tower(1)
        this.bullet = new Bullet(1, this.tower1.getLocationX(), this.tower1.getLocationY())
        this.castle = new Castle()
        this.tree   = new Tree()

        // this.enemy1 = new Enemy(1)
        // this.enemy2 = new Enemy(2)
        // this.enemy3 = new Enemy(3)
        // this.enemy4 = new Enemy(5)
        // this.enemy5 = new Enemy(0.2)


        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemies.push(new Enemy(i+1))            
        }

        this.gameLoop()
    }

    checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
        }


    gameLoop() {

        this.bulletCounter++ 
        if (this.bulletCounter > 60){
            console.log("Fire!")
            
            this.bulletCounter = 0
        }

        // For loop om alle bullets te Move()
        this.bullet.move()

        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemies[i].move()
        }
    
        for (let i = 0; i < this.enemies.length; i++) {
            let hit = this.checkCollision(this.enemies[i].getRectangle(), this.castle.getRectangle())
            
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

        for (let i = 0; i < this.enemies.length; i++) {
            let hitEnemy = this.checkCollision(this.enemies[i].getRectangle(), this.bullet.getRectangle())
            
            if (hitEnemy) {
                console.log("collision is: " + hitEnemy)
                this.enemies[i].healthPoints -= this.bullet.damage
                this.enemies[i].updateHP()

                //reset bullet
                this.bullet.xMove = this.bullet.x

            }
        }

        requestAnimationFrame(() => this.gameLoop())
    }
}

window.addEventListener("load", () => new Game())