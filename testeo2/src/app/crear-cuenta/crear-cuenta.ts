import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-cuenta.html',
  styleUrls: ['./crear-cuenta.css']
})
export class CrearCuenta {
  // Datos del formulario
  formData: any = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    nacimiento: '',
    curp: ''
  };

  // Archivos (INE y comprobante domicilio)
  files: { [key: string]: File } = {};

  constructor(private apiService: ApiService,private router: Router) {}

  // Captura de archivos
  onFileChange(event: any, field: string) {
    if (event.target.files && event.target.files.length > 0) {
      this.files[field] = event.target.files[0];
    }
  }

  // Enviar datos al backend
  onSubmit() {
    if (this.formData.password !== this.formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const formDataToSend = new FormData();

    // Agregamos los datos de texto
    Object.keys(this.formData).forEach(key => {
      if (key !== 'confirmPassword') {
        formDataToSend.append(key, this.formData[key]);
      }
    });

    // Agregamos los archivos
    if (this.files['ine']) {
      formDataToSend.append('ine', this.files['ine']);
    }
    if (this.files['domicilio']) {
      formDataToSend.append('domicilio', this.files['domicilio']);
    }

    // Llamada al servicio
    this.apiService.createCliente(formDataToSend).subscribe({
      next: (res: any) => {
        if (res.success) {
          alert('Usuario creado correctamente');
          this.router.navigate(['/login']);
        } else {
          alert('Error al registrar usuario');
          alert('Intenta de nuevo');
          this.router.navigate(['/crear-cuenta']);
        }
      },
      error: (err) => {
        console.error('Error en registro:', err);
        alert('Ocurrió un error en el servidor');
      }
    });
  }
}
