import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-test-usuarios',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './test-usuarios.html',
})
export class TestUsuarios implements OnInit {
  usuarios$!: Observable<any[]>; // Observable de array

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.usuarios$ = this.http.get<any[]>('http://localhost:3000/usuarios');
  }
}
