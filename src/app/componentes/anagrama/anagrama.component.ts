import { Component, OnInit } from '@angular/core';
import { JuegoAnagrama } from '../../clases/juego-anagrama';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: [ './estilo.css',
               './animacion.css',
               './anagrama.component.css']
})
export class AnagramaComponent implements OnInit {
  
  //palabraOrdenada:string = "HOLA";
  nuevoJuego: JuegoAnagrama;
  miArrayDePalabras:Array<string>;
  arrayPalabraOrdenada:Array<string>;
  arrayPalabraDesordenada:Array<string>;
  palabraDesordenada:string;
  ocultarVerificar: boolean;
  Mensajes:string;
  //lista = [1,2,3,4,5,6,7,8,9];
  
  //atributos para cronometrar la agilidad del usuario 
  tiempo:number = 0;
  t;
  timer_is_on:number = 0;
  
  constructor(private builder:FormBuilder) {
    this.nuevoJuego = new JuegoAnagrama("Anagrama",false,"tito cosa");     
    this.miArrayDePalabras = ["HOLA","ARGENTINO","CARACOL","FACULTAD","MONITOR"];    
    /*console.log(this.miArrayDePalabras);
    console.log(this.miArrayDePalabras.length);*/
    this.ocultarVerificar=true;
//pruebas    
    /*this.lista = this.lista.sort(function() {return Math.random() - 0.5});
    console.log(this.lista);
    console.log(this.palabraOrdenada);
    console.log(this.palabraOrdenada.length);
    this.arrayPalabra= this.palabraOrdenada.split("");
    console.log(this.arrayPalabra);
    this.arrayPalabraDesordenada = this.arrayPalabra.sort(function() {return Math.random() - 0.5});
    console.log(this.arrayPalabraDesordenada);
    this.palabraDesordenada = this.arrayPalabraDesordenada.toString();
    let re = /,/gi;
    this.palabraDesordenada = this.palabraDesordenada.replace(re,"");
    console.log(this.palabraDesordenada);
    //alert(this.lista); // imprime por ejemplo: 7,9,1,5,2,3,6,4,8*/
  }

  respuesta = new FormControl('',[Validators.required]);
  registroFormulario:FormGroup = this.builder.group(
    {
      respuesta:this.respuesta
    }
  ) ; 

  ngOnInit() {
  }

  public NuevoJuego() {
    this.ocultarVerificar=false;
    this.nuevoJuego.respuestaPalabra = null;
    this.nuevoJuego.palabraOrdenada = this.nuevoJuego.elegirPalabra(this.miArrayDePalabras);
    console.log("Palabra seleccionada:", this.nuevoJuego.palabraOrdenada);
    this.palabraDesordenada = this.nuevoJuego.generarAnagrama(this.nuevoJuego.palabraOrdenada);
    this.startCount();//comienza el cronómetro para ver cuanto tarda el usuario en responder
  }

  verificar()
  {
    this.stopCount(); // se detiene el cronómetro sea cual sea la respuesta
    if (this.nuevoJuego.verificar()) {
      //alert("Correcto!!");
      this.stopCount();
      this.nuevoJuego.tiempoCalculoSegundos = this.tiempo;
      this.MostrarMensaje("Correcto!!! Y en solo "+this.nuevoJuego.tiempoCalculoSegundos+" segundos",true);
    }
    else {
      //alert("Incorrecto!!!");
      this.MostrarMensaje("Incorrecto!!! La respuesta era: "+this.nuevoJuego.retornarAyuda(),false);
    }
    this.ocultarVerificar=true;
    this.tiempo = 0; //el cronómetro se tiene que poner en cero
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
    private timedCount() {
      this.tiempo++;
      this.t = setTimeout(()=>{ this.timedCount() }, 1000);
    }

    private startCount() {
      if (!this.timer_is_on) {
          this.timer_is_on = 1;
          this.timedCount();
        }
    }

    private stopCount() {
      clearTimeout(this.t);
      this.timer_is_on = 0;
    }

}
