//import { Validator } from 'codelyzer/walkerFactory/walkerFn';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

function copiaClave(input: FormControl) {
  
        if (input.root.get('password') == null) {
          return null;
        }
        console.log(input.root.get('password').value);
        console.log(input.value);

        const verificar = input.root.get('password').value === input.value;
        return verificar ? null : { mismaClave : true };
    }

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor( private builder:FormBuilder  ) { 
    
  }

  emailito = new FormControl('',[Validators.required, Validators.maxLength(6)]);
  password = new FormControl('',[Validators.required]);
  passrep = new FormControl('',[Validators.required, copiaClave]);


  registroformulario:FormGroup = this.builder.group(
    {
      emailix:this.emailito,
      password:this.password,
      passrep:this.passrep

    }
  ) ; 

  ngOnInit() {
  }

  Registrar(){
    console.log(this.registroformulario.get('emailix').value); 
    console.info(this.registroformulario);
  }

}
