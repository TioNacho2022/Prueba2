import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iif } from 'rxjs';
import { ApiUsuarioService } from '../servicios/api-usuario.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.page.html',
  styleUrls: ['./producto-detalle.page.scss'],
})
export class ProductoDetallePage implements OnInit {
  id: number = 0;
  producto;


  constructor( private api: ApiUsuarioService ,private activate:ActivatedRoute,private toast: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.activate.params.subscribe(parametros => {
      this.id = parametros.id;
      this.api.obtenerProductoPorID(this.id,localStorage.getItem('token')).subscribe(datos=> {
        this.producto =  datos;
        console.log(this.producto)
        this.hola();
      })
    });
  }


  public agregar(){
    var carro = {
      userId : Number(localStorage.getItem('userId')),
      products:[
        {
          id:this.producto.id,
          quantity:1
        }
      ]
    }

    this.api.añadiCarrito(carro,localStorage.getItem('token')).subscribe(respuesta =>{
      console.log(respuesta);
      const toast = this.toast.create({
        message: 'Producto Agregado',
        duration: 2000
      });
      toast.then(toast => toast.present())

    })
  }

  imgCollection: Array<object> = [
    {}
  ];

  public hola (){
    this.imgCollection = [
      {
        image: this!.producto?.images[0],
        thumbImage:this!.producto?.images[0]
      }, {
        image: this!.producto?.images[1],
        thumbImage: this!.producto?.images[1]

      },{
        image: this!.producto?.images[2],
        thumbImage:this!.producto?.images[2]
      },{
        image: this!.producto?.images[3],
        thumbImage: this!.producto?.images[3]

      },{
        image: this!.producto?.images[4],
        thumbImage: this!.producto?.images[4]

      }
    ];

  }

}
