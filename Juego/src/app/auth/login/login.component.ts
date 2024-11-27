import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario} from '../../models/usuarios.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(private router: Router, private authService: AuthService){}
  mostrarError = false;

  miFormulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    contraseña: new FormControl('', [Validators.required]),
    boton: new FormControl('')
  });

  enviar() {
    if (this.miFormulario.valid) {
      const usuario: Usuario = {
        email: this.miFormulario.value.email,
        pw: this.miFormulario.value.contraseña
      };
      this.authService.login(usuario).subscribe(
        response=> {
          if(response.status=='success'){
            console.log("Usuario logeado.")
            this.router.navigate(['/menu'])
          }else{
            alert('Usuario o contraseña incorrecta.')
            console.log(response.message);
          }
          
        }
      );

      //this.router.navigate(['/menu'])
    } else {
      console.log('Error maquina.')
      this.miFormulario.markAllAsTouched();
    }
  }

}