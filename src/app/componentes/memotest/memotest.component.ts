import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { JuegoMemotest } from '../../clases/juego-memotest';
import { MiFirebaseJuegoServicioService } from '../../servicios/mi-firebase-juego-servicio.service';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./estilo.css',
              './animacion.css',
              './memotest.component.css']
})

export class MemotestComponent implements OnInit {
   
  memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F'];
  memory_values = [];
  memory_tile_ids = [];
  tiles_flipped = 0;
  azulejo = [];
  nuevoJuego:JuegoMemotest;
  /*output = '';
  htmlSnippet:string;*/
  Mensajes:string;
  miServicioJuego: MiFirebaseJuegoServicioService;
//atributos para cronometrar la agilidad del usuario 
  tiempo:number = 0;
  t;
  timer_is_on:number = 0;

  private esPartidaNueva:boolean;

  constructor( private route: ActivatedRoute,
               private router: Router, servicioJuego:MiFirebaseJuegoServicioService) { 
      this.nuevoJuego = new JuegoMemotest("Memotest",false,"tito cosa");
      this.miServicioJuego = servicioJuego;
      this.esPartidaNueva = true;            
      this.newBoard();            
  }

  ngOnInit() {
    //console.log("estoy en ngOnInit");
  }
  
  ngAfterViewInit(){
    //console.log("estoy en ngAfterViewInit");
  } 

  memory_tile_shuffle(memoria_cadena:Array<string>):Array<string> {
    let i = memoria_cadena.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = memoria_cadena[j];
        memoria_cadena[j] = memoria_cadena[i];
        memoria_cadena[i] = temp;
    }
    return memoria_cadena;
}

  newBoard(){
    this.tiles_flipped = 0;
    this.memory_array = this.memory_tile_shuffle(this.memory_array);
    
    for(var i = 0; i < this.memory_array.length; i++){
      this.azulejo[i] = this.memory_array[i];
      //console.log(this.azulejo[i]);     

    }
    
  }

  nuevaPartida() {    
    for(var i = 0; i < this.memory_array.length; i++){
      let tile_1 = document.getElementById("tile_"+i);      
      tile_1.style.background = 'url(../../../assets/img/tile_bg.jpg) no-repeat';      
      tile_1.innerHTML = "";
     }
    this.newBoard();
    this.stopCount();
    this.tiempo = 0;
    this.esPartidaNueva = true; 
  }

  memoryFlipTile(x,val){
    if (this.esPartidaNueva) {
      this.startCount();
      this.esPartidaNueva = false;
    }

    var tile = document.getElementById(x);
    console.log(tile);
    if(tile.innerHTML == "" && this.memory_values.length < 2){
      //console.log(tile);
      tile.style.background = '#AAA';
      tile.innerHTML = val;
      if(this.memory_values.length == 0){
        this.memory_values.push(val);
        this.memory_tile_ids.push(tile.id);
        //console.log(this.memory_tile_ids);
      } else if(this.memory_values.length == 1){
        this.memory_values.push(val);
        this.memory_tile_ids.push(tile.id);
        //console.log(this.memory_values);
        //console.log(this.memory_tile_ids)
        if(this.memory_values[0] == this.memory_values[1]){
          this.tiles_flipped += 2;
          // Clear both arrays
          this.memory_values = [];
          this.memory_tile_ids = [];
          //console.log(this.memory_tile_ids);
          // Verificar juego completado
          if(this.tiles_flipped == this.memory_array.length){
            console.log("Juego Completado... presione 'Nuevo Tablero' si quire jugar de nuevo");
            //alert("Juego Completado... presione 'Nuevo Tablero' si quire jugar de nuevo");            
            this.nuevoJuego.tiempoCalculoSegundos = this.tiempo;
            this.stopCount();
            this.tiempo = 0;
            //this.nuevoJuego.resultado = true;            
            this.MostrarMensaje("Juego Completado!!! Y en solo "+this.nuevoJuego.tiempoCalculoSegundos+" segundos",true);
            //Se guarda el juego en la base de datos firebase      
            this.nuevoJuego.jugador = localStorage.usuarioLogueado;
            let fecha = new Date();
            this.nuevoJuego.fechajuego = fecha.getDay().toString() +"/"+fecha.getMonth().toString()+"/"+fecha.getFullYear().toString();
            this.nuevoJuego.horajuego = fecha.getHours().toString()+":"+fecha.getMinutes().toString()+":"+fecha.getSeconds().toString();
            this.nuevoJuego.identificador = "MT";
            this.nuevoJuego.resultado = "ganó";
            this.nuevoJuego.observacion = "en "+this.nuevoJuego.tiempoCalculoSegundos+" segundos";
            if (this.nuevoJuego.jugador != null) //se guarda si el jugador no está vacío
              this.miServicioJuego.guardarJuego(this.nuevoJuego);   
          }
        } else {
          //console.log(this.memory_tile_ids);
         //Tengo que usar el localStorage porque el setTimeout me hace perder el scope cuando se ejecuta la función flip2Back. 
         //La pérdida del scope hace que this.memory_tile_ids[0] y this.memory_tile_ids[0] queden vacías entonces tile_1 y tile_2 contienen
         //valores undefined o null.
         /*localStorage.tile_id_0 = this.memory_tile_ids[0];
         localStorage.tile_id_1 = this.memory_tile_ids[1];*/
         /*this.flip2Back;
         setTimeout(this.flip2Back, 700);*/
         // Borrar los vectores
         /* this.memory_values = [];
          this.memory_tile_ids = [];*/

          //con el setTimeout el método flip2Back se tiene que llamar de esta de esta manera (usando ()=>) sino pierde el scope dentro de la función.
          //La pérdida del scope hace que las variable/metodo this.memory_tile_ids esten en estado undefinned dentro del método flip2Back,
          //produciendo un error cuando se intenta poner en espera volver a dar vuelta los dos azulejos que no coinciden.
          setTimeout(()=>{ this.flip2Back() }, 700);
          
          /*setTimeout(function(){ 
            var tile_1 = document.getElementById(this.memory_tile_ids[0]);
            var tile_2 = document.getElementById(this.memory_tile_ids[1]);
            //var tile_1 = document.getElementById(localStorage.tile_id_0);
            //var tile_2 = document.getElementById(localStorage.tile_id_1);
            console.log(tile_1);
            console.log(tile_2);
            tile_1.style.background = 'url(../../../assets/img/tile_bg.jpg) no-repeat';
                  tile_1.innerHTML = "";
            tile_2.style.background = 'url(../../../assets/img/tile_bg.jpg) no-repeat';
                  tile_2.innerHTML = "";
            // Borrar ambos vectores
            this.memory_values = [];
            this.memory_tile_ids = [];
           }, 700);      */
        }
      }
    }
  } 

  flip2Back(){
    //La pérdida del scope hace que this.memory_tile_ids[0] y this.memory_tile_ids[0] queden vacías entonces tile_1 y tile_2 contienen
    //valores undefined o null.
    var tile_1 = document.getElementById(this.memory_tile_ids[0]);
    var tile_2 = document.getElementById(this.memory_tile_ids[1]);
    //var tile_1 = document.getElementById(localStorage.tile_id_0);
    //var tile_2 = document.getElementById(localStorage.tile_id_1);
    //console.log(tile_1);
    //console.log(tile_2);
    tile_1.style.background = 'url(../../../assets/img/tile_bg.jpg) no-repeat';
          tile_1.innerHTML = "";
    tile_2.style.background = 'url(../../../assets/img/tile_bg.jpg) no-repeat';
          tile_2.innerHTML = "";
    // Borrar ambos vectores
    this.memory_values = [];
    this.memory_tile_ids = [];
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
