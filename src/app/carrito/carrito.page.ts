import { Component, OnInit } from '@angular/core';
import { ApiUsuarioService } from '../servicios/api-usuario.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  carrito;
  constructor(private api: ApiUsuarioService) { }

  ngOnInit() {
    this.api.listarCarrito(Number(localStorage.getItem('userId')),localStorage.getItem('token')).subscribe(respuesta =>{
      this.carrito= respuesta.carts
      console.log(this.carrito= respuesta.carts)
    })
  }

}
