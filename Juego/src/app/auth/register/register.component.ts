import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  mostrarError = false;

  miFormulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    contraseña: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
    boton: new FormControl('')
  });

  enviar() {
    if (this.miFormulario.valid) {
      console.log(this.miFormulario.value);
    } else {
      console.log('Error maquina.')
    }
  }

}
