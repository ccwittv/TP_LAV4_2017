import { Component, OnInit } from '@angular/core';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./estilo.css',
              './animacion.css',
              './piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {

  nuevoJuego: JuegoPiedraPapelTijera;
  Mensajes:string;
  ocultarJuegaHumano:boolean;
  mensajeCantidadGanadas:string;
  mensajeCantidadPerdidas:string;
  mensajeCantidadEmpatadas:string;
  private cantidadGanadas:number;
  private cantidadPerdidas:number;
  private cantidadEmpatadas:number;

  constructor() { 
    this.nuevoJuego = new JuegoPiedraPapelTijera("Piedra, Papel o Tijera","perdio","tito cosa");    
    this.ocultarJuegaHumano=false;
    this.cantidadGanadas = 0;
    this.cantidadPerdidas = 0; 
    this.cantidadEmpatadas = 0;
  }

  jugar(eleccion:string) {
    let mensaje:string;
    this.nuevoJuego.eleccionHumano = eleccion;
    this.nuevoJuego.generarEleccionMaquina();
    console.log("Elección Humano ", this.nuevoJuego.eleccionHumano);
    console.log("Elección Maquina ", this.nuevoJuego.eleccionMaquina);
     
    if (this.nuevoJuego.eleccionHumano==this.nuevoJuego.eleccionMaquina)
     {
        mensaje="Los dos eligieron "+this.nuevoJuego.eleccionHumano+": EMPATE";
        this.MostarMensaje(mensaje,'empate');
        this.cantidadEmpatadas++;
        this.mensajeCantidadEmpatadas = this.cantidadEmpatadas + " partidas empatadas";
     }
     
    if (this.nuevoJuego.eleccionHumano=='papel') 
     {
        if (this.nuevoJuego.eleccionMaquina=='piedra') 
          {
            mensaje="Elegiste 'papel' y la máquina 'piedra': GANASTE";
            this.MostarMensaje(mensaje,'gano');
            this.cantidadGanadas++;
            this.mensajeCantidadGanadas = this.cantidadGanadas + " partidas ganadas";
          }          
        if (this.nuevoJuego.eleccionMaquina=='tijera') 
          {
            mensaje="Elegiste 'papel' y la máquina 'tijera': PERDISTE";
            this.MostarMensaje(mensaje,'perdio');
            this.cantidadPerdidas++;
            this.mensajeCantidadPerdidas = this.cantidadPerdidas + " partidas perdidas";
          }            
        } 
        
    if (this.nuevoJuego.eleccionHumano=='piedra') 
      {
        if (this.nuevoJuego.eleccionMaquina=='papel') 
          {
            mensaje="Elegiste 'piedra' y la máquina 'papel': PERDISTE";
            this.MostarMensaje(mensaje,'perdio');
            this.cantidadPerdidas++;
            this.mensajeCantidadPerdidas = this.cantidadPerdidas + " partidas perdidas";
          }          
        if (this.nuevoJuego.eleccionMaquina=='tijera') 
          {
            mensaje="Elegiste 'piedra' y la máquina 'tijera': GANASTE";
            this.MostarMensaje(mensaje,'gano');
            this.cantidadGanadas++;
            this.mensajeCantidadGanadas = this.cantidadGanadas + " partidas ganadas";
          }            
      }   
    
    if (this.nuevoJuego.eleccionHumano=='tijera') 
      {
        if (this.nuevoJuego.eleccionMaquina=='papel') 
          {
            mensaje="Elegiste 'tijera' y la máquina 'papel': GANASTE";
            this.MostarMensaje(mensaje,'gano');
            this.cantidadGanadas++;
            this.mensajeCantidadGanadas = this.cantidadGanadas + " partidas ganadas";
          }          
        if (this.nuevoJuego.eleccionMaquina=='piedra') 
          {
            mensaje="Elegiste 'tijera' y la máquina 'piedra': PERDISTE";
            this.MostarMensaje(mensaje,'perdio');
            this.cantidadPerdidas++;
            this.mensajeCantidadPerdidas = this.cantidadPerdidas + " partidas perdidas";
          }            
      }     

  }

  MostarMensaje(mensaje:string="este es el mensaje",resultado:string) {
    var modelo=this;
    modelo.ocultarJuegaHumano=true;
    this.Mensajes=mensaje;              
    var x = document.getElementById("snackbar");
    switch (resultado) {
      case 'gano':
        x.className = "show Ganador";
        break;
      case 'perdio':
        x.className = "show Perdedor";
        break;
      case 'empate':
        x.className = "show Empate";
        break;  
      default:
        break;
    }    
    
    setTimeout(function(){ 
      x.className = x.className.replace("show", "");
      modelo.ocultarJuegaHumano=false;
     }, 3000);
    console.info("objeto",x);
  
   }  

  ngOnInit() {
  }

}
