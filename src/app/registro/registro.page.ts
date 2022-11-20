import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ApiUsuarioService } from "../servicios/api-usuario.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formRegistro : FormGroup;
  constructor(
    public fb : FormBuilder,
    public alertController: AlertController,
    private api: ApiUsuarioService,
    private router:Router) {
      this.formRegistro = this.fb.group({
        firstName : new FormControl("",[Validators.required,Validators.minLength(1), Validators.maxLength(15)]),
        lastName : new FormControl("",[Validators.required,Validators.minLength(4), Validators.maxLength(20)]),
        age : new FormControl("",[Validators.required,Validators.min(18), Validators.max(98)]),
        username : new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(10)]),
        password : new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(16)]),
        birthDate : new FormControl("",[Validators.required,]),
        gender: new FormControl("",[Validators.required]),

      });
  }


  public campo(control: string) {
    return this.formRegistro.get(control);
  }
  public fueTocado(control: string){
    return this.formRegistro.get(control).touched;
  }
  public estaSucio(control: string){
    return this.formRegistro.get(control).dirty;
  }

  async registrar(){
    if (this.formRegistro.invalid){

      const alert = await this.alertController.create({
        header:'Datos invalidos!',
        message: 'Llenar, todos los campos',
        buttons: ['Aceptar'],
      });

      await alert.present();

      return;

    }else{
      this.api.registrarUsuario(this.formRegistro.value).subscribe(async resultado => {
        if(resultado){
          this.formRegistro.reset();
          this.formRegistro.updateValueAndValidity();
          const alert = await this.alertController.create({
            header: 'Usuario Registrado',
            buttons: ['Aceptar'],
          });
          await alert.present();
          this.router.navigate(['login']);
          return;

        }
      })
    }





  }



  ngOnInit() {
  }

}
