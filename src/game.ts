//file that loads the physics, config, scenes etc

class Game {

    tower1 : Tower

    bullet1 : Bullet

    enemy1 : Enemy
    enemy2 : Enemy
    enemy3 : Enemy
    tree   : Tree
    enemy4 : Enemy
    enemy5 : Enemy
    castle : Castle

    enemiesLvl1 : Enemy[] = []
    enemiesAmount : number = 3



    constructor(){
        console.log("game created!")
        this.tower1 = new Tower(1)
        this.bullet1 = new Bullet(1)
        this.castle = new Castle()
        this.tree   = new Tree()

        // this.enemy1 = new Enemy(1)
        // this.enemy2 = new Enemy(2)
        // this.enemy3 = new Enemy(3)
        // this.enemy4 = new Enemy(5)
        // this.enemy5 = new Enemy(0.2)


        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemiesLvl1.push(new Enemy(1))            
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

        this.bullet1.move()
        // this.enemy1.move()
        // this.enemy2.move()
        // this.enemy3.move()
        // this.enemy4.move()
        // this.enemy5.move()

        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemiesLvl1[i].move()
        }
    
        for (let i = 0; i < this.enemiesLvl1.length; i++) {
            let hit = this.checkCollision(this.enemiesLvl1[i].getRectangle(), this.castle.getRectangle())
            
            if (hit) {
                console.log("collision is: " + hit)

            }
        }


        requestAnimationFrame(() => this.gameLoop())
    }
}

window.addEventListener("load", () => new Game())