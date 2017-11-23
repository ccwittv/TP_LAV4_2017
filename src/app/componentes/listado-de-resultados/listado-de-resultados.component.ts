
import { Component, OnInit , Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {
 @Input()
 listadoPPT: Array<any>;
 @Input() 
 listadoAA: Array<any>;
 @Input() 
 listadoAN: Array<any>;
 @Input() 
 listadoAG: Array<any>;
 @Input() 
 listadoMT: Array<any>;
 @Input() 
 listadoTodo: Array<any>;

  constructor() {

   }

  ngOnInit() {
  
  }

  ver() {
    //console.info(this.listado);
  }

}
