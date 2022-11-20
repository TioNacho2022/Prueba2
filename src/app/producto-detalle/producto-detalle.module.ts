import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoDetallePageRoutingModule } from './producto-detalle-routing.module';

import { ProductoDetallePage } from './producto-detalle.page';

import { ApiUsuarioService } from "../servicios/api-usuario.service";

import { HttpClientModule } from '@angular/common/http';

import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoDetallePageRoutingModule,
    HttpClientModule,
    NgImageSliderModule
  ],
  declarations: [ProductoDetallePage],
  providers:[ApiUsuarioService]
})
export class ProductoDetallePageModule {}
