import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface ReportCard {
  title: string;
  subtitle: string;
  description: string;
  route: string;
  variant?: 'primary' | 'default';
}

@Component({
  selector: 'app-reportes-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './reportes-home.html',
  styleUrl: './reportes-home.css',
})
export class ReportesHome {
  
  reportCards: ReportCard[] = [
    {
      title: 'Relaciones por usuario',
      subtitle: 'Familiar · Médico · Responsable',
      description:
        'Revisa cuántas relaciones tiene cada usuario y el detalle por tipo: familiares, médicos y responsables asignados.',
      route: '/reportes/reporte-relaciones',
      variant: 'primary',
    },
    {
      title: 'Usuarios con más recuerdos',
      subtitle: 'Ranking por cantidad de fotos',
      description:
        'Visualiza qué usuarios han registrado más recuerdos dentro del sistema EVA, ordenados de mayor a menor.',
      route: '/reportes/fotos',   // 👈 tu nuevo reporte
      variant: 'primary',         // si quieres que sea azul, pon 'primary'
    },
    {
      title: 'Reporte de citas',
      subtitle: 'Próximamente',
      description:
        'Visualiza las citas programadas, su estado y el responsable. (Módulo en construcción).',
      route: '',
      variant: 'default',
    },
    {
      title: 'Reporte de usuarios',
      subtitle: 'Próximamente',
      description:
        'Resumen general de usuarios activos, roles y estado de registro. (Módulo en construcción).',
      route: '',
      variant: 'default',
    }
  ];

  constructor(private router: Router) {}

  irA(route: string): void {
    if (!route) return; // evita navegar si está vacío
    this.router.navigate([route]);
  }
}
