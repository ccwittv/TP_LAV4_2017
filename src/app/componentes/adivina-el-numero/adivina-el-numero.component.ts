
import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAdivina } from '../../clases/juego-adivina';
import { MiFirebaseJuegoServicioService } from '../../servicios/mi-firebase-juego-servicio.service'

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./estilo.css',
              './animacion.css',
              './adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit {
 @Output() enviarJuego: EventEmitter<any>= new EventEmitter<any>();

  nuevoJuego: JuegoAdivina;
  Mensajes:string;
  //contador:number;
  ocultarVerificar:boolean;
  miServicioJuego:MiFirebaseJuegoServicioService
 
  constructor(servicioJuego:MiFirebaseJuegoServicioService) { 
    this.nuevoJuego = new JuegoAdivina("Adivina el número",false,"tito cosa");
    //console.info("numero Secreto:",this.nuevoJuego.numeroSecreto);  
    this.ocultarVerificar=false;
    /*console.log("ocultar Verificar:",this.ocultarVerificar);
    console.log("Ganó? Constructor componente adivina",this.nuevoJuego.resultado);*/
    this.miServicioJuego = servicioJuego;
  }
  generarnumero() {
    this.nuevoJuego.generarnumero();
    this.nuevoJuego.contador=0;
  }
  verificar()
  {
    this.nuevoJuego.contador++;
    this.ocultarVerificar=true;
    console.info("numero Secreto:",this.nuevoJuego.resultado);  
    if (this.nuevoJuego.verificar()){
      
      this.enviarJuego.emit(this.nuevoJuego);
      this.MostarMensaje("Sos un Genio!!!",true);
      this.nuevoJuego.numeroSecreto=0;
//Se guarda el juego en la base de datos firebase      
      this.nuevoJuego.jugador = localStorage.usuarioLogueado;
      let fecha = new Date();
      this.nuevoJuego.fechajuego = fecha.getDay().toString() +"/"+fecha.getMonth().toString()+"/"+fecha.getFullYear().toString();
      this.nuevoJuego.horajuego = fecha.getHours().toString()+":"+fecha.getMinutes().toString()+":"+fecha.getSeconds().toString();
      this.nuevoJuego.identificador = "AN";
      this.nuevoJuego.resultado = "ganó";
      this.nuevoJuego.observacion = "en "+this.nuevoJuego.contador.toString()+" intentos";
      console.log("Ganaste!!!",this.nuevoJuego);
      if (this.nuevoJuego.jugador != null) //se guarda si el jugador no está vacío
        this.miServicioJuego.guardarJuego(this.nuevoJuego);      
      
    }else{

      let mensaje:string;
      switch (this.nuevoJuego.contador) {
        case 1:
          mensaje="No, intento fallido, animo";
          break;
          case 2:
          mensaje="No,Te estaras Acercando???";
          break;
          case 3:
          mensaje="No es, Yo crei que la tercera era la vencida.";
          break;
          case 4:
          mensaje="No era el  "+this.nuevoJuego.numeroIngresado;
          break;
          case 5:
          mensaje=" intentos y nada.";
          break;
          case 6:
          mensaje="Afortunado en el amor";
          break;
      
        default:
            mensaje="Ya le erraste "+ this.nuevoJuego.contador+" veces";
          break;
      }
      this.MostarMensaje("#"+this.nuevoJuego.contador+" "+mensaje+" ayuda :"+this.nuevoJuego.retornarAyuda());
     

    }
    console.info("numero Secreto:",this.nuevoJuego.resultado);  
  }  

  MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false) {
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
      modelo.ocultarVerificar=false;
     }, 3000);
    console.info("objeto",x);
  
   }  
  ngOnInit() {
  }

}
