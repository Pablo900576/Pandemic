import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario} from '../../models/usuarios.model';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(private router: Router, private authService: AuthService, private perfilService: PerfilService){}

  miFormulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    contraseña: new FormControl('', [Validators.required]),
    boton: new FormControl('')
  });

  enviar() {
    if (this.miFormulario.valid) {
      const usuario: Usuario = {
        email: this.miFormulario.value.email,
        pw: this.miFormulario.value.contraseña,
      };

      this.authService.login(usuario).subscribe(
        response=> {
            console.log("Usuario logeado.");
            this.router.navigate(['/menu']);

            const usuarioCompleto: Usuario={
              nombre: response.nombre,
              nick: response.nick,
              email: usuario.email
            }
            this.perfilService.setUsuario(usuarioCompleto);
          },
          error =>{
            console.error("Error al iniciar sesion:", error);
          }
      );
    } else {
      console.log('Error maquina.')
      this.miFormulario.markAllAsTouched();
    }
  }

}