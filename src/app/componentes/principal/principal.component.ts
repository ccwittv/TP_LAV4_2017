import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'] //<!-- Custom Styles CSS and Fonts -->
})
export class PrincipalComponent implements OnInit {
 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  constructor() {  }

  ngOnInit() {
  }

}
