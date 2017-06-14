class Game {
  constructor() {
    this.particlesCount = 10000;
    this.particles = [];
    this.lastFrameTime = 0;

    this.tick = this.tick.bind(this);

    this.initCanvas();
    this.initParticles();
  }

  initCanvas() {
    this.canvas = document.getElementById('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.backgroundColor = '#000';

    this.ctx = canvas.getContext('2d');
    this.ctx.width = window.innerWidth;
    this.ctx.height = window.innerHeight;
  }

  initParticles() {
    for (let i = 0; i < this.particlesCount; i++) {
      this.particles.push(new Particle({
        x: this.ctx.width/2,
        y: this.ctx.height/2,
        speed: 300,
        direction: (Math.PI * i) / (this.particlesCount / 2),
        maxWidth: this.ctx.width,
        maxHeight: this.ctx.height,
        color: '#fff'
      }));
    }
  }

  start() {
    requestAnimationFrame(this.tick);
  }

  tick(timestamp) {
    this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);

    this.particles.forEach((particle) => {
      const timeSinceLastFrame = timestamp - this.lastFrameTime;
      particle.update(timeSinceLastFrame);
    });

    this.particles.forEach((particle) => {
      this.ctx.fillStyle = particle.color;
      this.ctx.fillRect(Math.round(particle.x), Math.round(particle.y), particle.size, particle.size);
    });

    if (!this.stopped) {
      requestAnimationFrame(this.tick);
    }
    this.lastFrameTime = timestamp;
  };

  stop() {
    this.stopped = true;
  }
}

class Particle {
  constructor({x, y, mass, color, size, speed, direction, maxWidth, maxHeight}) {
    this.x = x;
    this.y = y;
    this.speed = speed / 1000;
    this.direction = direction; // radians
    this.color = color;
    this.size = size || 1;
    this.maxHeight = maxHeight;
    this.maxWidth = maxWidth;
  }
  update(timeSinceLastUpdate) {
    this.x = this.x + (Math.cos(this.direction) * this.speed * timeSinceLastUpdate);
    this.y = this.y + (Math.sin(this.direction) * this.speed * timeSinceLastUpdate);

    if (0 >= this.y || this.y >= this.maxHeight) {
      this.direction = -this.direction;
      if (this.y < 0) {
        this.y = -this.y;
      } else {
        this.y = this.maxHeight - (this.y - this.maxHeight);
      }
    }
    if (0 >= this.x || this.x >= this.maxWidth) {
      this.direction = (this.direction + ((Math.PI / 2) - this.direction) * 2) % (Math.PI * 2);
      if (this.x < 0) {
        this.x = -this.x;
      } else {
        this.x = this.maxWidth - (this.x - this.maxWidth);
      }
    }
  };
}
