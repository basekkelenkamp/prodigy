//file that loads the physics, config, scenes etc

class Game {

    enemy1 : Enemy
    enemy2 : Enemy
    enemy3 : Enemy
    tree   : Tree

    constructor(){
        console.log("game created!")
        this.enemy1 = new Enemy(1)
        this.enemy2 = new Enemy(2)
        this.enemy3 = new Enemy(3)
        this.tree   = new Tree()
        this.gameLoop()
    }

    gameLoop() {
        this.enemy1.move()
        this.enemy2.move()
        this.enemy3.move()
        requestAnimationFrame(() => this.gameLoop())
    }
}

window.addEventListener("load", () => new Game())