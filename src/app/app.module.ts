//Componentes
import { AppComponent } from './app.component';
import { AdivinaElNumeroComponent } from './componentes/adivina-el-numero/adivina-el-numero.component';
import { ListadoDeResultadosComponent } from './componentes/listado-de-resultados/listado-de-resultados.component';
import { LoginComponent } from './componentes/login/login.component';
import { ErrorComponent } from './componentes/error/error.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { AgilidadAritmeticaComponent } from './componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { AdivinaMasListadoComponent } from './componentes/adivina-mas-listado/adivina-mas-listado.component';
import { AgilidadMasListadoComponent } from './componentes/agilidad-mas-listado/agilidad-mas-listado.component';
import { ListadoComponent } from './componentes/listado/listado.component';
import { ListadosComponent } from './componentes/listados/listados.component';
import { JuegosComponent } from './componentes/juegos/juegos.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { MenuCardComponent } from './componentes/menu-card/menu-card.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { AnagramaComponent } from './componentes/anagrama/anagrama.component';
import { SideMenuComponent } from './Componentes/side-menu/side-menu.component';
import { PiedraPapelTijeraComponent } from './Componentes/piedra-papel-tijera/piedra-papel-tijera.component';
import { MemotestComponent } from './Componentes/memotest/memotest.component';

//Módulos y configuraciones para conectarse a la base firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {firebaseconfig} from './firebase/firebaseconfig';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthData } from './providers/auth-data';

//Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
// agrego las clases para utilizar ruteo
import { RouterModule, Routes } from '@angular/router';
// declaro donde quiero que se dirija
import { RuteandoModule } from './ruteando/ruteando.module';
/* const MiRuteo = [{path: 'error' , component: ErrorComponent},
{path: 'Login' , component: LoginComponent},
{path: 'Principal' , component: PrincipalComponent , pathMatch: 'full'},
{path: 'Adivina' , component: AdivinaElNumeroComponent},
{path: 'AdivinaMasListado' , component: AdivinaMasListadoComponent},
{path: 'AgilidadaMasListado' , component: AgilidadMasListadoComponent},
{path: 'Agilidad' , component: AgilidadAritmeticaComponent},
{path: '' , component: LoginComponent , pathMatch: 'full'},

{path: '**' , component: ErrorComponent} ]; */
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { AccordionModule } from 'ngx-bootstrap';

//Servicios
import { MiHttpService } from './servicios/mi-http.service';
import { JuegoServiceService } from './servicios/juego-service.service';


@NgModule({
  declarations: [
    AppComponent,
    AdivinaElNumeroComponent,
    ListadoDeResultadosComponent,
    ErrorComponent,
    PrincipalComponent,
    LoginComponent,
    AgilidadAritmeticaComponent,
    MenuComponent,
    AdivinaMasListadoComponent,
    AgilidadMasListadoComponent,
    ListadoComponent,
    ListadosComponent,
    JuegosComponent,
    RegistroComponent,
    MenuCardComponent,
    CabeceraComponent,
    QuienSoyComponent,
    AnagramaComponent,
    SideMenuComponent,
    PiedraPapelTijeraComponent,
    MemotestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RuteandoModule,
    ReactiveFormsModule,
    HttpModule,
    // NgbModule.forRoot(MiRuteo),
    // importo el ruteo
    // RouterModule.forRoot(MiRuteo)
    AngularFireModule.initializeApp(firebaseconfig), //para firebase
    AngularFireDatabaseModule, //para firebase
    AngularFireAuthModule, //para firebase
  ],
  providers: [ JuegoServiceService,
               MiHttpService,
               AngularFireModule,
               AuthData
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
