import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {  Usuario } from "../../models/usuarios.model";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  constructor(private authService: AuthService){}
  mostrarError = false;

  miFormulario = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    apellido: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contraseña: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
    contraseña2: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
    boton: new FormControl('')
    
  });

  enviar() {
    if (this.miFormulario.valid) {
      const usuario: Usuario = {
        email: this.miFormulario.value.email,
        password: this.miFormulario.value.contraseña,
        apellido: this.miFormulario.value.apellido,
        nombre: this.miFormulario.value.nombre
      };
      this.authService.register(usuario).subscribe(
        response=> {
          console.log("Usuario logeadooooooooooooooooo.")
        }
      );

    } else {
      console.log('Error maquina.')
      this.miFormulario.markAllAsTouched();
    }
  }

}

