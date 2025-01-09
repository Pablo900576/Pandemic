import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
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
  constructor(private authService: AuthService, private router: Router){}
  pwNoCoinciden = false;

  miFormulario = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    apellido: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    nick: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    contraseña: new FormControl('', [Validators.required]),
    contraseña2: new FormControl('', [Validators.required]),
    boton: new FormControl('')
    
  });

  pwIguales(): boolean {
    return this.miFormulario.get('contraseña')?.value === this.miFormulario.get('contraseña2')?.value;
  }

  enviar() {
    if (this.miFormulario.valid) {
      if(this.miFormulario.value.contraseña==this.miFormulario.value.contraseña2){
        
        const usuario: Usuario = {
        email: this.miFormulario.value.email,
        pw: this.miFormulario.value.contraseña,
        apellido: this.miFormulario.value.apellido,
        nombre: this.miFormulario.value.nombre,
        nick: this.miFormulario.value.nick
      };
      this.authService.register(usuario).subscribe(
        response=> {
          if(response.status== 'success'){
            console.log(response.hola);
            console.log("Usuario registrado.");
            this.router.navigate(['']);
          }else{
            alert('No se ha podido registrar');
          }
        }
      );
    }else{
      this.pwNoCoinciden=true;
    }
    } else {
      console.log('Error maquina.')
      this.miFormulario.markAllAsTouched();
    }
  }

}

