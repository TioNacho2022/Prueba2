import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarritoPageRoutingModule } from './carrito-routing.module';

import { CarritoPage } from './carrito.page';

import { HttpClientModule } from '@angular/common/http';

import { ApiUsuarioService } from '../servicios/api-usuario.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarritoPageRoutingModule,
    HttpClientModule
  ],
  declarations: [CarritoPage],
  providers:[ApiUsuarioService]
})
export class CarritoPageModule {}
