
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = window.innerWidth;
var height = window.innerHeight;

canvas.width = width;
canvas.height = height;

var t = 0;

function lienzoCanva(){
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
}

lienzoCanva();

function circulo(x,y,radio){
  ctx.beginPath();
  ctx.arc(x,y,radio,0,4*Math.PI);
  ctx.closePath();
}

var seedsL = 0;
var seeds = [];
var angles = [18, 28, 18];

//comienzo de ramas
for(var i = 0; i < 1; i++){
  seeds.push(new Seed(width/2 * i+1 + (width/2), height, angles[i], -180, 140));
}

function loop(){
//dibujamos las ramas
  for(var i = 0; i < seeds.length; i++){
    seeds[i].move();
    seeds[i].draw();

    if(seeds[i].dead){
      seeds.splice(i, 1);
    }
  }
  
  requestAnimationFrame(loop);
  t++;
}

function Seed(x, y, startingAngle, angle, maxLife){
  this.startingAngle = startingAngle;
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.radio = 2;
  this.color = 'black';
  this.life = 0;
  this.maxLife = maxLife;
  this.speed = 1;//velocidad de px
  this.dead = false;
  this.resetSeeds = false;

  this.move = function(){
    this.life++;

    if(this.maxLife>1){
      if(this.life < this.maxLife){
        this.x += this.speed * Math.sin(Math.PI / 4 * this.angle);
        this.y += this.speed * Math.cos(Math.PI / 4 * this.angle);
      }else{
        if(!this.dead){
          //aqui se hace las ramas mas extensa a mayor numero
          var seed1 = new Seed(this.x, this.y, this.startingAngle, this.angle - this.startingAngle, this.maxLife/1.5);
          seeds.push(seed1);
          var seed2 = new Seed(this.x, this.y, this.startingAngle, this.angle + this.startingAngle, this.maxLife/1.5);
          seeds.push(seed2);
          
          this.dead = true;
        }
      }
    }else{
      this.dead = true;
    }

  }

  this.draw = function(){
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.radio, this.radio);
  }
}

loop();

