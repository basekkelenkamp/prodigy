//file that loads the physics, config, scenes etc

class Game {

    tower1 : Tower

    bullet1 : Bullet

    enemy1 : Enemy
    enemy2 : Enemy
    enemy3 : Enemy

    constructor(){
        console.log("game created!")
        this.tower1 = new Tower(1)

        this.bullet1 = new Bullet(1)
        
        this.enemy1 = new Enemy(1)
        this.enemy2 = new Enemy(2)
        this.enemy3 = new Enemy(3)


        this.gameLoop()
    }

    gameLoop() {
        this.bullet1.move()
        this.enemy1.move()
        this.enemy2.move()
        this.enemy3.move()

        requestAnimationFrame(() => this.gameLoop())
    }
}

window.addEventListener("load", () => new Game())