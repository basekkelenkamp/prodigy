class Game {
    constructor() {
        console.log("game created!");
        this.tower1 = new Tower(1);
        this.bullet1 = new Bullet(1);
        this.enemy1 = new Enemy(1);
        this.enemy2 = new Enemy(2);
        this.enemy3 = new Enemy(3);
        this.gameLoop();
    }
    gameLoop() {
        this.bullet1.move();
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
class Bullet {
    constructor(strength) {
        this.x = 110;
        this.y = 0;
        this.strengthLevel = strength;
        this.healthPoints = strength * 100;
        this.damage = strength * 5;
        this.speed = 0.75 / this.strengthLevel;
        this.element = document.createElement("bullet");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
    }
    move() {
        if (this.x > 250) {
            this.x = 110;
        }
        this.x += this.speed;
        this.y = 11;
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}
class Tower {
    constructor(towerLevel) {
        this.x = 0;
        this.y = 0;
        this.damage = towerLevel * 5;
        this.element = document.createElement("tower");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
        this.element.style.filter = `hue-rotate(${this.strength * 90}deg)`;
    }
}
//# sourceMappingURL=main.js.map