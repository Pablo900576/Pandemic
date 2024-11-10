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
  });

  enviar() {
    if (this.miFormulario.valid) {
      console.log(this.miFormulario.value);
    } else {
      console.log('Error maquina.')
    }
  }

  mensaje() {
    if (this.miFormulario.invalid) {
      this.mostrarError = true;
      
      setTimeout(() => {
        this.mostrarError = false;
      }, 3000);
    }
  }

}
