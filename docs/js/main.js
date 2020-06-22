class Game {
    constructor() {
        this.waveLevel = 3;
        this.waveCounter = 1;
        this.towers = [];
        this.bullets = [];
        this.bulletCounter = 0;
        this.buildLvl = 0;
        this._gamestate = "build";
        this.previousGamestate = "fight";
        this.towers.push(new Tower(1, this));
        this.castle = new Castle();
        let game = document.getElementsByTagName("game")[0];
        this.phase = document.createElement("phase");
        game.appendChild(this.phase);
        this.waveText = document.createElement("wavetext");
        game.appendChild(this.waveText);
        this.waveText.innerHTML = `Current wave: ${this.waveCounter}`;
        this.playAgain = document.createElement("a");
        game.appendChild(this.playAgain);
        this.playAgain.style.display = "none";
        this.playAgain.innerHTML = `Play again?`;
        this.playAgain.setAttribute("href", "index.html");
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
    }
    gameLoop() {
        if (this._gamestate === "build" && this.previousGamestate == "fight") {
            this.buildPhase = new Build(this.buildLvl, this);
            this.buildLvl++;
            this.previousGamestate = this._gamestate;
            this.waveText.innerHTML = `Current wave: ${this.waveCounter}`;
            if (this.waveLevel > 3) {
                let i = this.waveLevel - 2;
                this.towers.push(new Tower(i, this));
            }
        }
        if (this._gamestate == 'fight' && this.previousGamestate == 'build') {
            this.buildPhase.removeButton();
            this.fightPhase = new Fight(this.waveLevel, this);
            this.waveLevel += 1;
            this.waveCounter++;
            this.previousGamestate = this._gamestate;
        }
        if (this._gamestate === "build") {
            this.buildPhase.update();
        }
        if (this._gamestate === "fight") {
            this.fightPhase.updateFight();
            for (let i = 0; i < this.fightPhase.enemies.length; i++) {
                let hit = this.checkCollision(this.fightPhase.enemies[i].getRectangle(), this.castle.getRectangle());
                if (hit) {
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
        if (this.castle.healthPoints < 1) {
            this.castle.healthPoints = 0;
            this._gamestate = "gameover";
            this.playAgain.style.display = "block";
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
        this.x = 0;
        this.y = 200;
        this.xspeed = 0;
        this.yspeed = 0;
        this.boss = "";
        this.state = 0;
        this.fightInstance = fightInstance;
        this.speed = 0.85 / level;
        this.healthPoints = level * 100;
        this.damage = level * 60;
        this.yspeed = 0;
        if (level > 3) {
            this.speed = level / 15;
        }
        this.xspeed = this.speed;
        this.element = document.createElement("enemy");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
        this.element.style.filter = `hue-rotate(${level * 90}deg)`;
        if (level > 3) {
            this.boss = " BOSS";
        }
        this.healthBar = document.createElement("healthbar");
        this.healthBar.innerHTML = `${this.healthPoints}HP${this.boss}`;
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
                    this.yspeed = this.speed;
                    this.xspeed = 0;
                    this.state = 1;
                }
                break;
            case 1:
                if (this.y > 700) {
                    this.xspeed = this.speed;
                    this.yspeed = 0;
                    this.state = 2;
                }
                break;
            case 2:
                if (this.x > 1320) {
                    this.yspeed = this.speed * -1;
                    this.xspeed = 0;
                    this.state = 3;
                    break;
                }
            case 3:
                if (this.y < 460) {
                    this.xspeed = this.speed;
                    this.yspeed = 0;
                    break;
                }
            case 4:
                if (this.x > innerWidth - 260) {
                    this.x = 0;
                    this.y = 200;
                    this.state = 0;
                }
        }
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
    updateHP() {
        this.healthBar.innerHTML = `${this.healthPoints}HP${this.boss}`;
        this.element.appendChild(this.healthBar);
        if (this.healthPoints < 1) {
            this.element.remove();
            this.fightInstance.removeEnemy(this);
        }
    }
}
class Bullet {
    constructor(level, positionX, positionY, gameInstance) {
        this.x = 0;
        this.y = 0;
        this.xMove = 500;
        this.speed = 4;
        this.gameInstance = gameInstance;
        this.x = positionX;
        this.y = positionY;
        this.damage = (level * 10 + 5);
        this.distance = this.x - (level * 200 + 180);
        this.element = document.createElement("bullet");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
        this.element.style.filter = `hue-rotate(180deg)`;
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
class Tower {
    constructor(level, gameInstance) {
        this.counter = 0;
        this.x = 900;
        this.y = 160;
        this.mouseX = 0;
        this.mouseY = 0;
        this.dragged = false;
        this.gameInstance = gameInstance;
        this.strength = level;
        this.damage = level * 60;
        this.element = document.createElement("tower");
        let game = document.getElementsByTagName("game")[0];
        this.element.id = "tower";
        this.element.draggable = true;
        game.appendChild(this.element);
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.text = document.createElement("drag");
        this.text.innerHTML = `Click to drag`;
        this.element.appendChild(this.text);
        this.element.addEventListener('mousemove', () => this.hoverTower(event));
        this.element.addEventListener('mouseout', () => this.hoverTowerClear(event));
        this.element.addEventListener('dragend', () => this.dropTower(event));
    }
    getLocationY() {
        let position = this.element.getBoundingClientRect();
        return position.height * 0.5 + position.y;
    }
    getLocationX() {
        let position = this.element.getBoundingClientRect();
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
    }
    hoverTowerClear(e) {
        this.element.style.border = "";
    }
    dropTower(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.element.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px)`;
        this.text.style.display = "none";
        this.dragged = true;
    }
    addDragfunction() {
        this.element.draggable = true;
        this.element.style.cursor = "grab";
    }
    removeDragfunction() {
        this.element.draggable = false;
        this.element.style.cursor = "default";
    }
}
class Build {
    constructor(level, gameInstance) {
        this.level = level;
        this.gameInstance = gameInstance;
        for (const tower of this.gameInstance.towers) {
            tower.addDragfunction();
        }
        this.button = document.createElement("start");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.button);
        this.button.style.display = "none";
        this.gameInstance.phase.style.backgroundImage = `url(images/scenery/buildphase.png)`;
        this.button.addEventListener("click", () => this.buttonClickHandler());
    }
    update() {
        if (this.gameInstance.towers[this.level].dragged) {
            this.button.style.display = "block";
        }
    }
    removeButton() {
        this.button.remove();
    }
    buttonClickHandler() {
        this.gameInstance.gamestate = "fight";
    }
}
class Fight {
    constructor(enemies, gameInstance) {
        this.enemies = [];
        this.gameInstance = gameInstance;
        this.newWave = 0;
        this.enemiesAmount = enemies;
        this.bossLvl = enemies + 1;
        this.gameInstance.phase.style.backgroundImage = `url(images/scenery/attackphase.png)`;
        for (const tower of this.gameInstance.towers) {
            tower.removeDragfunction();
        }
        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemies.push(new Enemy(i + 0.75, this));
        }
    }
    removeEnemy(enemy) {
        let i = this.enemies.indexOf(enemy);
        this.enemies.splice(i, 1);
        this.enemiesAmount -= 1;
    }
    updateFight() {
        for (const tower of this.gameInstance.towers) {
            tower.updateTower();
        }
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
            this.enemies.push(new Enemy(0.8, this));
            this.enemies.push(new Enemy(0.7, this));
            this.enemiesAmount += 3;
            if (this.gameInstance.waveLevel > 4) {
                this.enemies.push(new Enemy(0.6, this));
                this.enemies.push(new Enemy(0.5, this));
                this.enemiesAmount += 2;
            }
            this.newWave = 2;
        }
        if (this.enemiesAmount == 1 && this.newWave == 2) {
            this.enemies.push(new Enemy(0.8, this));
            this.enemies.push(new Enemy(0.7, this));
            this.enemiesAmount += 2;
            this.newWave = 3;
        }
        if (this.enemiesAmount == 1 && this.newWave == 3) {
            this.enemies.push(new Enemy(0.8, this));
            this.enemies.push(new Enemy(0.7, this));
            this.enemiesAmount += 2;
            this.newWave = 4;
        }
        if (this.enemiesAmount == 1 && this.newWave == 4 && this.gameInstance.waveLevel > 4) {
            this.enemies.push(new Enemy(0.8, this));
            this.enemies.push(new Enemy(0.7, this));
            this.enemiesAmount += 2;
            this.newWave = 5;
        }
        if (this.enemiesAmount == 1 && this.newWave == 5 && this.gameInstance.waveLevel > 5) {
            this.enemies.push(new Enemy(0.8, this));
            this.enemies.push(new Enemy(0.7, this));
            this.enemiesAmount += 2;
            this.newWave = 6;
        }
        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemies[i].move();
        }
    }
}
//# sourceMappingURL=main.js.map