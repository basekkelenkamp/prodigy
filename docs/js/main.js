class Game {
    constructor() {
        console.log("game created!");
        this.tower1 = new Tower(1);
        this.bullet1 = new Bullet(1);
        this.castle = new Castle();
        this.enemy1 = new Enemy(1);
        this.enemy2 = new Enemy(2);
        this.enemy3 = new Enemy(3);
        this.tree = new Tree();
        this.enemy4 = new Enemy(5);
        this.enemy5 = new Enemy(0.2);
        this.gameLoop();
    }
    gameLoop() {
        this.bullet1.move();
        this.enemy1.move();
        this.enemy2.move();
        this.enemy3.move();
        this.enemy4.move();
        this.enemy5.move();
        requestAnimationFrame(() => this.gameLoop());
    }
}
window.addEventListener("load", () => new Game());
class Castle {
    constructor() {
        this.healthPoints = 1000;
        this.x = 0;
        this.y = 0;
        this.castleImg = 1;
        this.element = document.createElement("castle");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
        this.x = innerWidth - this.element.clientWidth;
        this.y = 300;
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
        this.element.style.backgroundImage = `url(../src/assets/images/castle/castle${this.castleImg}.png)`;
    }
}
class Enemy {
    constructor(level) {
        this.xspeed = 0;
        this.yspeed = 0;
        this.state = 0;
        this.x = 0;
        this.y = 200;
        console.log(`h:${innerHeight} w:${innerWidth}`);
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
                if (this.x > 300) {
                    console.log("move down");
                    this.yspeed = 0.75 / this.strength;
                    this.xspeed = 0;
                    this.state = 1;
                }
                break;
            case 1:
                if (this.y > 700) {
                    console.log("move right");
                    this.xspeed = 0.75 / this.strength;
                    this.yspeed = 0;
                    this.state = 2;
                }
                break;
            case 2:
                if (this.x > 1100) {
                    console.log("move up");
                    this.yspeed = -0.75 / this.strength;
                    this.xspeed = 0;
                    this.state = 3;
                    break;
                }
            case 3:
                if (this.y < 400) {
                    console.log("move right");
                    this.xspeed = 0.75 / this.strength;
                    this.yspeed = 0;
                    this.state = 4;
                    break;
                }
            case 4:
                if (this.x > innerWidth - 260) {
                    console.log("reset");
                    this.x = 0;
                    this.y = 200;
                    this.state = 0;
                }
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
class Tree {
    constructor() {
        this.boom = 1;
        this.element = document.createElement("tree");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
        this.element.addEventListener("click", () => this.beweeg());
    }
    beweeg() {
        this.boom++;
        if (this.boom === 5) {
            this.boom = 1;
        }
        this.element.style.backgroundImage = `url(../src/assets/images/scenery/Armored_Tree${this.boom}.png)`;
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