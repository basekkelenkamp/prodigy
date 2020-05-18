class Game {
    constructor() {
        console.log("game created!");
        this.enemy1 = new Enemy(1);
        this.enemy2 = new Enemy(2);
        this.enemy3 = new Enemy(3);
        this.gameLoop();
    }
    gameLoop() {
        this.enemy1.move();
        this.enemy2.move();
        this.enemy3.move();
        requestAnimationFrame(() => this.gameLoop());
    }
}
window.addEventListener("load", () => new Game());
class Enemy {
    constructor(strength) {
        this.x = 0;
        this.y = 0;
        this.strengthLevel = strength;
        this.healthPoints = strength * 100;
        this.damage = strength * 5;
        this.speed = 0.75 / this.strengthLevel;
        this.element = document.createElement("enemy");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
        this.element.style.filter = `hue-rotate(${this.strengthLevel * 90}deg)`;
        this.healthBar = document.createElement("healthbar");
        this.healthBar.innerHTML = `${this.healthPoints}HP`;
        this.element.appendChild(this.healthBar);
    }
    move() {
        this.x += this.speed;
        this.y = this.strengthLevel * 100;
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}
//# sourceMappingURL=main.js.map