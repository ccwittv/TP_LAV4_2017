import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-side-menu-listado',
  templateUrl: './side-menu-listado.component.html',
  styleUrls: ['./side-menu-listado.component.css']
})
export class SideMenuListadoComponent implements OnInit {

  hayAlguienLogueado:boolean;
  usuarioLogueado:string;
  constructor() { 
    this.usuarioLogueado = localStorage.usuarioLogueado;
    if ( this.usuarioLogueado != undefined)  
       this.hayAlguienLogueado = true;
  }

  ngOnInit() {
  }

  //Custom scripts for this template  
ngAfterViewInit() {
  // Closes the sidebar menu
  $("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
  });

  // Opens the sidebar menu
  $("#menu-toggle").click(function(e) {
    //alert("hola tarolas");
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $("#sidebar-wrapper").removeClass("active");
  });

  //#to-top button appears after scrolling
  var fixed = false;
  $(document).scroll(function() {
    if ($(this).scrollTop() > 250) {
      if (!fixed) {
        fixed = true;
        $('#to-top').show("slow", function() {
          $('#to-top').css({
            position: 'fixed',
            display: 'block'
          });
        });
      }
    } else {
      if (fixed) {
        fixed = false;
        $('#to-top').hide("slow", function() {
          $('#to-top').css({
            display: 'none'
          });
        });
      }
    }
  });

}

}
