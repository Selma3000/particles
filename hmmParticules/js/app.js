const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.fillStyle = 'white';

console.log(context);



class Particle {
    constructor(effect) {
      this.effect = effect;
      this.radius = 10 * Math.random();

      this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
      this.y = this.radius + Math.random() * (this.effect.height -this.radius * 2);
      this.velocityX = Math.random()*10-3;
      this.velocityY = Math.random()*10-3;

    }
    // run 60 times per second
    draw(context){
      context.fillStyle = 'hsl('+ Math.random() *40+',80%,66%)'

      context.beginPath();
      context.arc(this.x, this.y, this.radius,0,Math.PI*2);
      context.fill();
      context.stroke();
    }
    update() {
      //this.x += this.velocityX;
      this.y += this.velocityY
      this.x += this.velocityX
     /* if (this.y < canvas.height) {
          this.y = canvas.height+10
      }
      if (this.x < canvas.width) {
        this.x = canvas.width+10
      }*/
      if (this.y >= effect.height -this.radius || this.y < 0+this.radius) {
        this.velocityY *=-1;
      }
      if (this.x >= effect.width  || this.x < 0+this.radius) {
        this.velocityX *=-1;
      }

    }
}
class Effect {
    constructor(canvas) {
      this.canvas = canvas ;
      this.width= this.canvas.width;
      this.height = this.canvas.height
      this.particles = [];
      this.numberOfParticles = 50;
      this.createParticles();
    }
    createParticles() {
      for (let i = 0; i <this.numberOfParticles; i++) {
        // array push method takes what we pass to it and
        // pushed that to the end of the array
        this.particles.push(new Particle(this))    }
    }
    handleParticles(context) {
      this.particles.forEach(particle => {
          particle.draw(context)
        particle.update()
        }
      )
    }
}
const effect = new Effect(canvas);


function animate() {
  context.clearRect(0,0,canvas.width,canvas.height)
  effect.handleParticles(context)
  requestAnimationFrame(animate)
}

animate()
