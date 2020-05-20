class Game {
    constructor() {
        console.log("game created!");
        this.enemy1 = new Enemy(1);
        this.enemy2 = new Enemy(2);
        this.enemy3 = new Enemy(3);
        this.castle = new Castle();
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
class Castle {
    constructor() {
        this.healthPoints = 1000;
        this.x = 500;
        this.y = 0;
        this.castleImg = 1;
        this.element = document.createElement("castle");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.healthBar = document.createElement("healthbar");
        this.healthBar.innerHTML = `${this.healthPoints}HP`;
        this.element.appendChild(this.healthBar);
        this.element.addEventListener("click", () => this.break());
    }
    break() {
        this.castleImg++;
        if (this.castleImg > 6) {
            this.castleImg = 1;
        }
        this.healthPoints -= 200;
        if (this.healthPoints < 0) {
            this.healthPoints = 1000;
        }
        this.healthBar.innerHTML = `${this.healthPoints}HP`;
        this.element.style.backgroundImage = `url(../../src/assets/images/castle/castle${this.castleImg}.png)`;
    }
}
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