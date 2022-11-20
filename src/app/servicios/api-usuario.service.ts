import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, pipe } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiUsuarioService {

  private URL_ADD = 'https://dummyjson.com/users/add';
  private URL_LOGIN = 'https://dummyjson.com/auth/login';
  private URL_PRODUCTO = 'https://dummyjson.com/auth/products';
  private URL_PRODUCTO_ID = 'https://dummyjson.com/auth/products';
  private URL_AÑADIR_CARRITO = 'https://dummyjson.com/auth/carts/add';
  private URL_LISTAR_CARRITO = 'https://dummyjson.com/auth/users/';
  private paginaActual = 0;

  private comLista = new BehaviorSubject<Array<any>>([]);

  public listaProductos$ = this.comLista.asObservable();

  constructor(private cliente: HttpClient) { }

  public registrarUsuario(usuario: string){
    return this.cliente.post(this.URL_ADD,usuario,{
      headers: {
        'Content-Type':'application/json;charset=utf-8'
      }
    })
  }

  public iniciarSesion(usuario:any){
    return this.cliente.post(this.URL_LOGIN,usuario,{
      headers:{
        'Content-Type':'application/json;charset=utf-8'
      }
    })
  }

  public listarPrimerosProductos(token:string){
    return this.cliente.get<Array<any>>(`${this.URL_PRODUCTO}?_skip=0`,{
      headers:{
        'Content-Type':'application/json;charset=utf-8',
        'Authorization': token
      }
    }).subscribe(datos => {
      // Notifica un cambio
      this.paginaActual = this.paginaActual + 1;
      this.comLista.next(datos);
    });

  }

  public obtenerMasProductos(token:string){
    this.cliente.get<Array<any>>(`${this.URL_PRODUCTO}?_skip=${this.paginaActual}`,{
      headers:{
      'Content-Type':'application/json;charset=utf-8',
      'Authorization': token
      }
    }).pipe(
      delay(3000)
    ).subscribe(datos => {
      // [ 1 , 2 , 3 , 4] // array
      // [5, 6, 7] array2
      // array.concat(array2)
      // [ 1 , 2 , 3 , 4, 5, 6, 7]
      if(datos){
        this.paginaActual = this.paginaActual + 1;
        this.comLista.next(this.comLista.getValue().concat(datos));
      }
    })
  }

  public obtenerProductoPorID(id: number,token:string): Observable<any | null> {
    return this.cliente.get<any | null>(`${this.URL_PRODUCTO_ID}/${id}`,{
      headers:{
        'Content-Type':'application/json;charset=utf-8',
        'Authorization': token
      }
    });
  }

  public añadiCarrito(carro:any,token:string): Observable<any | null> {
    return this.cliente.post(`${this.URL_AÑADIR_CARRITO}`,carro,{
      headers:{
        'Content-Type':'application/json;charset=utf-8',
        'Authorization': token
      }
    });
  }


  public listarCarrito(id:any,token:string): Observable<any | null> {
    return this.cliente.get(`${this.URL_LISTAR_CARRITO}${id}/carts`,{
      headers:{
        'Content-Type':'application/json;charset=utf-8',
        'Authorization': token
      }
    });
  }
}


