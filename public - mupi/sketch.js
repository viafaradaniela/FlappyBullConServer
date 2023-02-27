const NGROK = `${window.location.hostname}`;
let socket = io(NGROK, { path: '/real-time' });
console.log('172.30.213.141', NGROK);

const anchoescenario = 1280;
const largoescenario = 720;
let pantallas = 1;
let canvas;
let toro;
let boton;
let limite;
let tubos = [];
let vellimite = 5;
let gravedad = false;
let fps = 0;

function setup() {
  canvas = createCanvas(anchoescenario, largoescenario);
  windowResized();
  toro = new Toro();
  limite = new Limite();
  tubos.push(new Tubo);
  boton = createButton('Cambiar Pantalla');
  boton.position(anchoescenario / 4 * 2.8, largoescenario);
  boton.mousePressed(cambiaPantallas);
}

function draw() {
  background(220);
  
  switch (pantallas) {
    case 1:
      textSize(30);
      text('Aqui va el código QR del mupi', anchoescenario / 3, 200);     
      rect(480, 260, 300,300);
      break;
      
      case 2:      
      text('Aquí van las instrucciones', 460, 360);
      break;
      
      case 3 :
        boton.style('display', 'none');
        toro.pintar();
        limite.pintar();
        for (const tubo of tubos) {
          tubo.pintar()
        }
      
        if (fps * vellimite % 400 == 0) {
          tubos.push(new Tubo)
        }
      
        if (gravedad) {
          fps ++
        }

        break;

        case 4: 
        perder();
        fill(51);
        text('Aquí perdiste y procede el formulario', 460, 360);
        
        break;
        
  }
}

function windowResized(){
  if (windowWidth < anchoescenario) {
    canvas.style('transform', `scale(${windowWidth / width})`)
  }
}

function keyPressed() {
  click();
}

function mousePressed() { 
  boton.mousePressed(cambiaPantallas);
  click();
}

function cambiaPantallas() {
  switch (pantallas) {
    case 1:      
        pantallas = 2
       break;
       case 2: 
      pantallas = 3
      break;
      case 3:
        pantallas = 4
       default:
      break;
  }
  
}


//aqui se agrega la función que conecta con el cel
function click(){
  if (gravedad) {
    toro.gravedadtoro.set(createVector(0,-5))
  } else {
    toro.resetVariable()
    gravedad = true
    fps = 0
    tubos = []
  }
}

function perder() {
  gravedad = false
  pantallas = 4
}


function Toro() {
    this. radio = 60
    this.resetVariable = function() {
      this.vector = createVector(width / 2, height / 2)
      this.gravedadtoro = createVector(0,0)
    }
  this.resetVariable()
  this.pintar = function(){
    fill ('red')
    circle(this.vector.x, this.vector.y, this.radio)
    if (gravedad) {
      this.gravedadtoro.add(createVector(0,0.2))
      this.vector.add(this.gravedadtoro)      
    }
    if (this.hit().collideRect(limite.hit())) {
      perder()
    }
    for (const tubo of tubos) {
      let hittubos = tubo.hit()
      for (const hit of hittubos) {
        
        if (this.hit().collideRect(hit)) {
          perder()
        }
      }
    }
  }
  this.hit = function(){
    return new Circle(this.vector.x,this.vector.y,this.radio)
  }
}

function Limite() {
  this.width = anchoescenario
  this.height = 30
  this.x = 0
  this.y = largoescenario - this.height
  this.pintar = function(){
    fill('black')
    rect(this.x,this.y,this.width,this.height)
  }
  this.hit = function(){
    return new Rectangle(this.x, this.y, this.width, this.height)
  }
}

function Tubo() {
  const division = 170
  let randomheight = 300 * Math.random() - 200
  this.width = 100
  this.height = 550
  this.x = width
  this.y = (height / 2) + randomheight
  this.y2 = this.y - this.height - division
  this.pintar = function(){
    fill('orange')
    rect(this.x, this.y, this.width, this.height)
    rect(this.x, this.y2, this.width, this.height)
    if (gravedad) {
      this.x -= vellimite
    }
  }
  this.hit = function(){
    return [
      new Rectangle(this.x, this.y, this.width, this.height),
      new Rectangle(this.x, this.y2, this.width, this.height),
      
    ]
  }
}
socket.on('display-Hola', messages => {
  console.log(messages)
})

