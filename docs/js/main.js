class Game {
    constructor() {
        this.bullets = [];
        this.enemies = [];
        this.enemiesAmount = 4;
        this.bulletCounter = 0;
        this.tower1 = new Tower(1, this);
        this.castle = new Castle();
        this.tree = new Tree();
        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemies.push(new Enemy(i + 1));
        }
        this.gameLoop();
    }
    checkCollision(a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    }
    gameLoop() {
        this.tower1.updateTower();
        for (const bullet of this.bullets) {
            bullet.move();
        }
        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemies[i].move();
        }
        for (let i = 0; i < this.enemies.length; i++) {
            let hit = this.checkCollision(this.enemies[i].getRectangle(), this.castle.getRectangle());
            if (hit) {
                console.log("collision is: " + hit);
                this.castle.healthPoints -= this.enemies[i].damage;
                this.castle.updateHP();
                this.enemies[i].x = 0;
                this.enemies[i].y = 200;
                this.enemies[i].state = 0;
            }
        }
        for (const bullet of this.bullets) {
            for (let i = 0; i < this.enemies.length; i++) {
                let hitEnemy = this.checkCollision(this.enemies[i].getRectangle(), bullet.getRectangle());
                if (hitEnemy) {
                    console.log("collision is: " + hitEnemy);
                    this.enemies[i].healthPoints -= bullet.damage;
                    this.enemies[i].updateHP();
                    bullet.removeBullet();
                }
            }
        }
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
    }
    getRectangle() {
        return this.element.getBoundingClientRect();
    }
    updateHP() {
        this.healthBar.innerHTML = `${this.healthPoints}HP`;
        this.element.appendChild(this.healthBar);
        if (this.healthPoints < 1000) {
            this.castleImg = 2;
            if (this.healthPoints < 800) {
                this.castleImg = 3;
                if (this.healthPoints < 600) {
                    this.castleImg = 4;
                    if (this.healthPoints < 400) {
                        this.castleImg = 5;
                        if (this.healthPoints < 200) {
                            this.castleImg = 6;
                            if (this.healthPoints < 0) {
                                this.healthPoints = 0;
                            }
                        }
                    }
                }
            }
        }
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
        this.strength = level;
        this.healthPoints = level * 100;
        this.damage = level * 60;
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
    getRectangle() {
        return this.element.getBoundingClientRect();
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
    updateHP() {
        this.healthBar.innerHTML = `${this.healthPoints}HP`;
        this.element.appendChild(this.healthBar);
        if (this.healthPoints < 1) {
            this.element.remove();
        }
    }
}
class Tree {
    constructor() {
        this.x = 0;
        this.y = 300;
        this.boom = 1;
        this.element = document.createElement("tree");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
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
class Bullet {
    constructor(level, positionX, positionY, GameInstance) {
        this.speed = 2;
        this.x = 0;
        this.y = 0;
        this.xMove = 500;
        this.gameInstance = this.gameInstance;
        this.x = positionX;
        this.y = positionY;
        this.strength = level;
        this.damage = (level * 10 + 5);
        this.distance = this.x - (level * 20 + 180);
        console.log(this.distance + "DISTANCE");
        this.element = document.createElement("bullet");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
        this.element.style.filter = `hue-rotate(${0}deg)`;
    }
    getRectangle() {
        return this.element.getBoundingClientRect();
    }
    move() {
        if (this.x < this.distance) {
            this.element.remove();
        }
        this.x -= this.speed;
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
    removeBullet() {
        this.element.remove();
    }
}
class Tower {
    constructor(level, gameInstance) {
        this.counter = 0;
        this.x = 500;
        this.y = 400;
        this.mouseX = 0;
        this.mouseY = 0;
        this.strength = level;
        this.damage = level * 60;
        this.gameInstance = gameInstance;
        this.element = document.createElement("tower");
        let game = document.getElementsByTagName("game")[0];
        this.element.id = "tower";
        this.element.draggable = true;
        game.appendChild(this.element);
        this.element.style.filter = `hue-rotate(${this.strength * 90}deg)`;
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.element.addEventListener('mousemove', () => this.hoverTower(event));
        this.element.addEventListener('mouseout', () => this.hoverTowerClear(event));
        this.element.addEventListener('dragend', () => this.dropTower(event));
        this.shoot();
    }
    getLocationY() {
        let position = this.element.getBoundingClientRect();
        console.log(position.height * 0.5 + position.y);
        return position.height * 0.5 + position.y;
    }
    getLocationX() {
        let position = this.element.getBoundingClientRect();
        console.log(position.width * 0.5 + position.x);
        return position.width * 0.5 + position.x;
    }
    shoot() {
        let bullet = new Bullet(1, this.getLocationX(), this.getLocationY(), this.gameInstance);
        this.gameInstance.bullets.push(bullet);
    }
    updateTower() {
        this.counter++;
        if (this.counter > 60) {
            this.shoot();
            this.counter = 0;
        }
    }
    hoverTower(e) {
        this.element.style.border = "groove";
        console.log(e);
    }
    hoverTowerClear(e) {
        this.element.style.border = "";
    }
    dropTower(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.element.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px)`;
    }
}
//# sourceMappingURL=main.js.map