import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: [ './animacion.css',
               './menu-card.component.css',
               /*'./vendor/bootstrap/css/bootstrap.min.css'*/]
})
export class MenuCardComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {
  }
  Juego(tipo: string) {
    switch (tipo) {
      case 'Agilidad':
          this.router.navigate(['/Juegos/Agilidad']);
        break;
      case 'AgilidadaMasListado':
          this.router.navigate(['/Juegos/AgilidadaMasListado']);
        break;
      case 'PiedraPapelTijera':
        this.router.navigate(['/Juegos/PiedraPapelTijera']);
      break;                      
      case 'Adivina':
          this.router.navigate(['/Juegos/Adivina']);
        break;      
      case 'AdivinaMasListado':
          this.router.navigate(['/Juegos/AdivinaMasListado']);
        break;            
      case 'Anagrama':
        this.router.navigate(['/Juegos/Anagrama']);
        break;
      case 'Memotest':
        this.router.navigate(['/Juegos/Memotest']);  
      break;              
    }
  }
}
