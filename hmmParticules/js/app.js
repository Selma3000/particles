const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.fillStyle = 'blue';
console.log(context);



class Particle {
    constructor(effect) {
      this.effect = effect;
      this.radius = 20 * Math.random();

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
      this.y += this.velocityY;
      this.x += this.velocityX;
      if (this.y >= effect.height -this.radius || this.y < 0+this.radius) {
        this.velocityY *=-1;
      }
      if (this.x >= effect.width-this.radius  || this.x < 0+this.radius) {
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
      this.numberOfParticles = 100;
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
    checkCollision() {
          this.particles.forEach((particle, index) => {
            //for every particle compare it with the others
              for (let i = index+1 ; i < this.particles.length; i++ ) {
                let other = this.particles[i];

                // distance between the particles
                let dx = other.x - particle.x;
                let dy = other.y -particle.y;
                let distance = Math.sqrt(dx*dx + dy*dy);

                let summOfrad = particle.radius+other.radius
                if (distance < summOfrad-1) {
                  let overlap = summOfrad - distance;
                  //collision detected
                  let angle = Math.atan2(dy,dx);
                  let moveX = Math.cos(angle) * overlap / 2;
                  let moveY = Math.sin(angle) * overlap / 2;

                  particle.x -= moveX;
                  particle.y -= moveY;
                  other.x += moveX;
                  other.y += moveY;
                  // velocity inversed
                  let tempVX = particle.velocityX;
                  particle.velocityX = other.velocityX;
                  other.velocityX = tempVX;

                  let tempVY = particle.velocityY;
                  particle.velocityY = other.velocityY;
                  other.velocityY = tempVY;
                }

              }
          })


    }

}
const effect = new Effect(canvas);


function animate() {
  context.clearRect(0,0,canvas.width,canvas.height)
  effect.handleParticles(context)
  effect.checkCollision()

  requestAnimationFrame(animate)
}

animate()
