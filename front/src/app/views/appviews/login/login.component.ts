import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuth } from 'app/views/entities/login/userauth';
import swal from 'sweetalert2';
import { ChangePassword } from '../../entities/login/changepasword';

@Component({
  selector: 'app-login',
  templateUrl: 'login.template.html'
})
export class LoginComponent implements OnInit {
  userAuth: UserAuth;
  route: Router;
  userExist: boolean;
  user: ChangePassword;

  constructor(_router: Router) {

  }

  ngOnInit() {
  

  }

  swalForError() {
    swal({
      title: 'Error',
      text: 'Se ha producido un error, porfavor recargue la página o intente mas tarde',
      type: 'warning',
      confirmButtonText: 'Aceptar',
      showCancelButton: false
    });
  }

  resetPassword() {
    swal({
      title: 'Recuperar Contraseña',
      text: 'Ingrese su correo electrónico',
      input: 'text',
      inputValidator: (element) => {
        return new Promise(result => {
          if (element) {
            result();
          } else {
            result('Ingrese un correo electrónico');
          }
        });
      }
    }).then(process => {
     
    });
  }

  
}

