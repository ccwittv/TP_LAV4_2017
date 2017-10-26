import { Injectable } from '@angular/core';
import { Http, Response  } from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MiHttpService {

  constructor(public http:Http) { }

  dameUnaPromesa(url:string){

    return this.http.get(url).toPromise().then(this.extraerDatos).catch(this.manejadorError);

  }

  manejadorError(error:Response|any){
    return error;
  }

  extraerDatos(respuesta:Response){
    return respuesta.json()||{};
  }


}
