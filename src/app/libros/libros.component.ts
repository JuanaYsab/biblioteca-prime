import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { Libro } from '../interfaces/libro.interface';
import { LibrosService } from '../servicios/libros.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  listaLibros: Libro[] = [];     //Guarda la lista de libros
  cargando: boolean = false;    //Muestra la animación de carga
  dialogoVisible: boolean = false;    //Indica si el dialogo esta visible u oculto

mensajes: Message[] = [];

  constructor(
    private servicioLibros: LibrosService
  ) { }

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void{
    this.cargando = true;
    this.servicioLibros.get().subscribe({
      next: (datos) =>{
        this.listaLibros = datos;
        this.cargando = false;
      },
      error: (e) => {
        console.log(e);
        this.cargando = false;
        this.mensajes = [{severity: 'error', summary: 'Error al cargar libros', detail: e.message}]
      }
    });
  }

  mostrarDialogo(){
    this.dialogoVisible= true;
  }
}
