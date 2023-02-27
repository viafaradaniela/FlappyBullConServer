const NGROK = `${window.location.hostname}`;
console.log('172.30.213.141', NGROK);
let socket = io(NGROK, { path: '/real-time' });
const anchoescenario = 1280;
const largoescenario = 720;
let pantallas = 1;
let canvas;
let boton;
let boton2;
let messages = "A";
let user = {};


function setup() {
    canvas = createCanvas(anchoescenario, largoescenario);
    windowResized();

    //Botones de Cambio de pantalla
    boton = createButton('Cambiar Pantalla');
    boton.position(anchoescenario / 4 * 2.8, largoescenario);
    boton.mousePressed(cambiaPantallas);
    boton2 = createButton('Pasar al formulario');
    boton2.position(anchoescenario / 4 * 2.8, largoescenario);
    boton2.mousePressed(cambiaPantallas);

    //Recolectar datos del usuario
    inputName = createInput();
    inputName.input(UserName);
    inputName.position(anchoescenario / 2 ,260);
    inputEmail = createInput();
    inputEmail.input(UserEmail);
    inputEmail.position(anchoescenario / 2 ,300);
    sumit = createButton('Enviar');
    sumit.mousePressed(function () {
      userData(user);
      console.log(user);
  });
    sumit.position(anchoescenario / 4 * 2.8, largoescenario);
  }

  function UserName() {
    user['name'] = this.value();
}

function UserEmail() {
    user['email'] = this.value();
}





  function draw() {
    background(220);
    
    switch (pantallas) {
      //Pantalla de tap para pasar al juego y que funciona durante el juego
      case 1:
        inputName.style('display', 'none');
        inputEmail.style('display', 'none');
        boton2.style('display', 'none');
        sumit.style('display', 'none');
        textSize(30);
        text('Tap the button', anchoescenario / 3, 200);     
        rect(480, 260, 300,300);
        break;

        //Pantalla de perdida del juego
          case 2: 
          boton2.style('display', 'block');
          fill(51);
          text('Aquí perdiste y procede el formulario', 460, 360);
          
          break
        //Pantalla de Formulario
          case 3:
          fill(51);
          text('Este es el formulario', 520, 160);
          text('Nombre', 620, 300);
          text('Email', 620, 260);
          boton2.style('display', 'none');
          inputName.style('display', 'block');
          inputEmail.style('display', 'block');
          sumit.style('display', 'block');
          
      default:
        break;
    }
  }

  socket.emit('Hola',(messages)=>{
    console.log(messages);;
  })
  
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
    boton2.mousePressed(cambiaPantallas);
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
    }
    
  }

  function click(){
    if (mousePressed == true) {
        console.log('funciona el click')
    } 
  }

  //Function de guardar usuarios
  async function userData() {
    const data = {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    }
    await fetch('/user-data', data);

}



