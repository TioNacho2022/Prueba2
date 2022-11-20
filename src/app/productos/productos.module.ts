import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosPageRoutingModule } from './productos-routing.module';

import { ProductosPage } from './productos.page';

import {ApiUsuarioService} from  '../servicios/api-usuario.service';

import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ProductosPage],
  providers:[ApiUsuarioService]
})
export class ProductosPageModule {}
