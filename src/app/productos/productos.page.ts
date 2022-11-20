import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiUsuarioService } from "../servicios/api-usuario.service";
import { IonInfiniteScroll } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  @ViewChild(IonInfiniteScroll)
  public scroll: IonInfiniteScroll;
  public productos;


  constructor(private api:ApiUsuarioService,private alerta:AlertController,private router:Router) { }

  ngOnInit() {


  }

  ionViewWillEnter(){
    this.api.listarPrimerosProductos(localStorage.getItem('token'))
    this.api.listaProductos$.subscribe(datosActualizados => {
      this.productos = datosActualizados;
      this.productos = this.productos.products;
      if(this.scroll){
        this.scroll.complete();
      }
    })
  }

  public cargarMasDatos(){
    this.api.obtenerMasProductos(localStorage.getItem('token'));
  }

  public async cerrarSesion(){
    const mensaje = await this.alerta.create({
      header: '¿Seguro quiere cerrar sesion?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {

            this.router.navigate(['']);
            localStorage.removeItem('token');
            localStorage.removeItem('userId');

          }
        }
      ]
    });
    await mensaje.present();

  }

}
