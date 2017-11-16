import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { JuegoMemotest } from '../../clases/juego-memotest';

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
  constructor( private route: ActivatedRoute,
               private router: Router) { 
      this.nuevoJuego = new JuegoMemotest("Memotest",false,"tito cosa");            
      this.newBoard();            
  }

  ngOnInit() {
   
  }
  

  ngAfterViewInit(){
    
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

  memoryFlipTile(x,val){
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
            alert("Juego Completado... presione 'Nuevo Tablero' si quire jugar de nuevo");
          }
        } else {
          //console.log(this.memory_tile_ids);
         localStorage.tile_id_0 = this.memory_tile_ids[0];
         localStorage.tile_id_1 = this.memory_tile_ids[1];
         this.flip2Back;
         setTimeout(this.flip2Back, 700);
         // Borrar los vectores
          this.memory_values = [];
          this.memory_tile_ids = [];      
        }
      }
    }
  } 

  flip2Back(){
    var tile_1 = document.getElementById(localStorage.tile_id_0);
    var tile_2 = document.getElementById(localStorage.tile_id_1);
    console.log(tile_1);
    console.log(tile_2);
    tile_1.style.background = 'url(../../../assets/img/tile_bg.jpg) no-repeat';
          tile_1.innerHTML = "";
    tile_2.style.background = 'url(../../../assets/img/tile_bg.jpg) no-repeat';
          tile_2.innerHTML = "";
    // Borrar ambos vectores
    this.memory_values = [];
    this.memory_tile_ids = [];
}

}
