import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad';
import { MiFirebaseJuegoServicioService } from '../../servicios/mi-firebase-juego-servicio.service'

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./estilo.css',
              './animacion.css',
              './agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
  @Output() enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;
  ocultarVerificar: boolean;
  Mensajes:string;
  miServicioJuego:MiFirebaseJuegoServicioService
 //atributos para cronometrar la agilidad del usuario 
  tiempo:number = 0;
  t;
  timer_is_on:number = 0;
  
  ngOnInit() {
  }
   constructor(servicioJuego:MiFirebaseJuegoServicioService) {
    this.ocultarVerificar=true;
    this.nuevoJuego = new JuegoAgilidad("Agilidad Aritmética",false,"tito cosa");
    this.miServicioJuego=servicioJuego;
  }
  
  NuevoJuego() {
    this.ocultarVerificar=false;
    this.nuevoJuego.respuestaOperacion = null;
    this.nuevoJuego.primerNumero = this.nuevoJuego.generarNumero(10);
    this.nuevoJuego.segundoNumero = this.nuevoJuego.generarNumero(10);
    this.nuevoJuego.operacion = this.nuevoJuego.generarOperador(4);
    this.nuevoJuego.totalOperacion = this.nuevoJuego.efectuarOperacion(this.nuevoJuego.primerNumero,this.nuevoJuego.segundoNumero,this.nuevoJuego.operacion);
    this.startCount(); //comienza el cronómetro para ver cuanto tarda el usuario en responder
  }
  verificar()
  {
    this.stopCount(); // se detiene el cronómetro sea cual sea la respuesta
    if (this.nuevoJuego.verificar()) {
      //alert("Correcto!!");
      this.enviarJuego.emit(this.nuevoJuego);
      this.nuevoJuego.tiempoCalculoSegundos = this.tiempo;
      this.nuevoJuego.observacion = "con la "+this.nuevoJuego.operacion+" se tardó " + this.nuevoJuego.tiempoCalculoSegundos.toString()+" segundos";
      this.nuevoJuego.resultado = "ganó";
      this.MostrarMensaje("Correcto!!! Y en solo "+this.nuevoJuego.tiempoCalculoSegundos+" segundos",true);
    }
    else {
      //alert("Incorrecto!!!");
      this.nuevoJuego.tiempoCalculoSegundos = 0;
      this.nuevoJuego.observacion = "con la "+this.nuevoJuego.operacion;
      this.nuevoJuego.resultado = "perdió"
      this.MostrarMensaje("Incorrecto!!! La respuesta era: "+this.nuevoJuego.retornarAyuda(),false);
    }
    this.ocultarVerificar=true;
    this.tiempo = 0; //el cronómetro se tiene que poner en cero
    
    //Se guarda el juego en la base de datos firebase      
    this.nuevoJuego.jugador = localStorage.usuarioLogueado;
    let fecha = new Date();
    this.nuevoJuego.fechajuego = fecha.getDay().toString() +"/"+fecha.getMonth().toString()+"/"+fecha.getFullYear().toString();
    this.nuevoJuego.horajuego = fecha.getHours().toString()+":"+fecha.getMinutes().toString()+":"+fecha.getSeconds().toString();
    this.nuevoJuego.identificador = "AA";
    if (this.nuevoJuego.jugador != null) //se guarda si el jugador no está vacío
     this.miServicioJuego.guardarJuego(this.nuevoJuego);   

  }  

  MostrarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false) {
    this.Mensajes=mensaje;    
    var x = document.getElementById("snackbar");
    if(ganador)
      {
        x.className = "show Ganador";
      }else{
        x.className = "show Perdedor";
      }
    var modelo=this;
    setTimeout(function(){ 
      x.className = x.className.replace("show", "");
      //modelo.ocultarVerificar=false;
     }, 3000);
    console.info("objeto",x);
  
   } 
//métodos para cronometrar la agilidad del usuario   
  timedCount() {
    this.tiempo++;
    this.t = setTimeout(()=>{ this.timedCount() }, 1000);
  }

  startCount() {
    if (!this.timer_is_on) {
        this.timer_is_on = 1;
        this.timedCount();
      }
  }

  stopCount() {
    clearTimeout(this.t);
    this.timer_is_on = 0;
  }

}
