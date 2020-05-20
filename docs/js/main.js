class Game {
    constructor() {
        console.log("game created!");
        this.tower1 = new Tower(1);
        this.bullet1 = new Bullet(1);
        this.enemy1 = new Enemy(1);
        this.enemy2 = new Enemy(2);
        this.enemy3 = new Enemy(3);
        this.enemy4 = new Enemy(5);
        this.gameLoop();
    }
    gameLoop() {
        this.bullet1.move();
        this.enemy1.move();
        this.enemy2.move();
        this.enemy3.move();
        this.enemy4.move();
        requestAnimationFrame(() => this.gameLoop());
    }
}
window.addEventListener("load", () => new Game());
class Enemy {
    constructor(level) {
        this.xspeed = 0;
        this.yspeed = 0;
        this.state = 0;
        this.x = 0;
        this.y = 0;
        this.strength = level;
        this.healthPoints = level * 100;
        this.damage = level * 5;
        this.xspeed = 0.75 / this.strength;
        this.yspeed = 0;
        this.element = document.createElement("enemy");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
        this.element.style.filter = `hue-rotate(${level * 60}deg)`;
        this.healthBar = document.createElement("healthbar");
        this.healthBar.innerHTML = `${this.healthPoints}HP`;
        this.element.appendChild(this.healthBar);
    }
    move() {
        this.x += this.xspeed;
        this.y += this.yspeed;
        switch (this.state) {
            case 0:
                if (this.x > 200) {
                    this.yspeed = 0.75 / this.strength;
                    this.xspeed = 0;
                    this.state = 1;
                }
                break;
            case 1:
                if (this.y > 500) {
                    this.xspeed = 0.75 / this.strength;
                    this.yspeed = 0;
                    this.state = 2;
                }
                break;
        }
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