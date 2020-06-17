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
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.element.addEventListener('mousemove', () => this.hoverTower(event));
        this.element.addEventListener('mouseout', () => this.hoverTowerClear(event));
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
        this.gameInstance.Bullets.push(bullet);
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
    addDragfunction() {
        this.element.addEventListener('dragend', () => this.dropTower(event));
        this.element.draggable = true;
    }
    removeDragfunction() {
        this.element.removeEventListener('dragend', () => this.dropTower(event));
        console.log("eventlistener removed");
        this.element.draggable = false;
    }
}
class Build {
    constructor(level, gameInstance) {
        this.counter = 0;
        this.x = 500;
        this.y = 400;
        this.mouseX = 0;
        this.mouseY = 0;
        this.gameInstance = gameInstance;
        gameInstance.tower1.addDragfunction();
        console.log("build phase");
        this.button = document.createElement("button");
        let game = document.getElementsByTagName("game")[0];
        this.button.innerHTML = "Ready to Fight!";
        game.appendChild(this.button);
        this.button.addEventListener("click", () => this.buttonClickHandler());
    }
    buttonClickHandler() {
        this.gameInstance.gamestate = "fight";
    }
    updateBuild() {
        console.log("build phase");
    }
}
class Fight {
    constructor(enemies, gameInstance) {
        this.enemies = [];
        this.bulletCounter = 0;
        this.gameInstance = gameInstance;
        this.newWave = 0;
        this.enemiesAmount = enemies;
        this.bossLvl = enemies + 1;
        this.gameInstance.tower1.removeDragfunction();
        console.log("attack phase");
        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemies.push(new Enemy(i + 1, this));
        }
    }
    removeEnemy(enemy) {
        let i = this.enemies.indexOf(enemy);
        this.enemies.splice(i, 1);
        console.log(this.enemies.length);
        this.enemiesAmount -= 1;
    }
    updateFight() {
        this.gameInstance.tower1.updateTower();
        for (const bullet of this.gameInstance.Bullets) {
            bullet.move();
        }
        if (this.enemiesAmount == 2 && this.newWave == 0) {
            this.enemies.push(new Enemy(this.enemiesAmount * 0.25, this));
            this.enemies.push(new Enemy(this.enemiesAmount * 0.5, this));
            this.newWave = 1;
            this.enemiesAmount += 2;
        }
        if (this.enemiesAmount == 1 && this.newWave == 1) {
            this.enemies.push(new Enemy(this.bossLvl, this));
            this.newWave = 2;
            this.enemiesAmount += 1;
        }
        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemies[i].move();
        }
    }
}
class Game {
    constructor() {
        this.waveLevel = 3;
        this.bullets = [];
        this.bulletCounter = 0;
        this._gamestate = "build";
        this.previousGamestate = "fight";
        this.tower1 = new Tower(1, this);
        this.castle = new Castle();
        this.tree = new Tree();
        this.gameLoop();
    }
    get Bullets() {
        return this.bullets;
    }
    set gamestate(gamestate) { this._gamestate = gamestate; }
    checkCollision(a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    }
    removeBullet(bullet) {
        let i = this.Bullets.indexOf(bullet);
        this.Bullets.splice(i, 1);
        console.log(this.Bullets.length);
    }
    gameLoop() {
        if (this._gamestate === "build" && this.previousGamestate == "fight") {
            this.buildPhase = new Build(1, this);
            this.previousGamestate = this._gamestate;
        }
        if (this._gamestate == 'fight' && this.previousGamestate == 'build') {
            this.fightPhase = new Fight(this.waveLevel, this);
            this.waveLevel += 1;
            this.previousGamestate = this._gamestate;
        }
        if (this._gamestate === "build") {
            this.buildPhase.updateBuild();
        }
        else {
        }
        if (this._gamestate === "fight") {
            this.fightPhase.updateFight();
            for (let i = 0; i < this.fightPhase.enemies.length; i++) {
                let hit = this.checkCollision(this.fightPhase.enemies[i].getRectangle(), this.castle.getRectangle());
                if (hit) {
                    console.log("collision is: " + hit);
                    this.castle.healthPoints -= this.fightPhase.enemies[i].damage;
                    this.castle.updateHP();
                    this.fightPhase.enemies[i].x = 0;
                    this.fightPhase.enemies[i].y = 200;
                    this.fightPhase.enemies[i].state = 0;
                }
            }
            for (const bullet of this.bullets) {
                for (let i = 0; i < this.fightPhase.enemies.length; i++) {
                    let hitEnemy = this.checkCollision(this.fightPhase.enemies[i].getRectangle(), bullet.getRectangle());
                    if (hitEnemy) {
                        console.log("collision is: " + hitEnemy);
                        this.fightPhase.enemies[i].healthPoints -= bullet.damage;
                        this.fightPhase.enemies[i].updateHP();
                        bullet.removeBullet();
                    }
                }
            }
            if (this.fightPhase.enemiesAmount === 0) {
                this._gamestate = "build";
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
        this.x = 1660;
        this.y = 390;
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
        this.element.style.backgroundImage = `url(images/castle/castle${this.castleImg}.png)`;
    }
}
class Enemy {
    constructor(level, fightInstance) {
        this.xspeed = 0;
        this.yspeed = 0;
        this.state = 0;
        this.x = 0;
        this.y = 200;
        this.fightInstance = fightInstance;
        this.strength = level;
        this.healthPoints = level * 100;
        this.damage = level * 60;
        this.xspeed = 0.75 / this.strength;
        this.yspeed = 0;
        this.element = document.createElement("enemy");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
        this.element.style.filter = `hue-rotate(${level * 90}deg)`;
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
                if (this.x > 350) {
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
                if (this.x > 1320) {
                    console.log("move up");
                    this.yspeed = -0.75 / this.strength;
                    this.xspeed = 0;
                    this.state = 3;
                    break;
                }
            case 3:
                if (this.y < 460) {
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
            this.fightInstance.removeEnemy(this);
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
        this.element.style.backgroundImage = `url(images/scenery/Armored_Tree${this.boom}.png)`;
    }
}
class Bullet {
    constructor(level, positionX, positionY, gameInstance) {
        this.speed = 2;
        this.x = 0;
        this.y = 0;
        this.xMove = 500;
        this.gameInstance = gameInstance;
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
            this.removeBullet();
        }
        this.x -= this.speed;
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
    removeBullet() {
        this.gameInstance.removeBullet(this);
        this.element.remove();
    }
}
//# sourceMappingURL=main.js.map