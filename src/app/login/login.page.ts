import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ApiUsuarioService } from "../servicios/api-usuario.service";
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin : FormGroup;

  constructor(
    public fb : FormBuilder,
    public alertController: AlertController,
    private api: ApiUsuarioService,
    private router:Router
  ){
    this.formLogin = this.fb.group({
      username : new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(10)]),
      password : new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(16)]),


    });
  }


  public campo(control: string) {
    return this.formLogin.get(control);
  }
  public fueTocado(control: string){
    return this.formLogin.get(control).touched;
  }
  public estaSucio(control: string){
    return this.formLogin.get(control).dirty;
  }

  public async ingresar(){
    if (this.formLogin.invalid){

      const alert = await this.alertController.create({
        header:'Datos invalidos!',
        message: 'User name o password',
        buttons: ['Aceptar'],
      });

      await alert.present();

      return;

    }else{
      this.api.iniciarSesion(this.formLogin.value).subscribe(async (resultado:any) => {
        if(resultado){
          localStorage.setItem('token',resultado.token);
          localStorage.setItem('userId',resultado.id);
          this.formLogin.reset();
          this.formLogin.updateValueAndValidity();
          const alert = await this.alertController.create({
            header: 'Sesion Iniciada',
            buttons: ['Aceptar'],
          });
          await alert.present();
          this.router.navigate(['/productos']);
          return;
        }
      })
    }





  }

  ngOnInit() {
  }

}
