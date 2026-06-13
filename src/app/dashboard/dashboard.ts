import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar';
import { FooterComponent } from '../shared/footer/footer';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('ventasChart') ventasChartRef!: ElementRef;
  @ViewChild('categoriasChart') categoriasChartRef!: ElementRef;

  // KPIs Mock Data
  kpis = {
    ventasTotales: 45230.50,
    ordenesHoy: 124,
    usuariosActivos: 850,
    tasaConversion: 3.2
  };

  // Tabla Dinámica Mock Data
  ultimosPedidos = [
    { id: '#1024', cliente: 'Constructora Alfa', fecha: '2026-06-12', estado: 'Completado', total: 1250.00 },
    { id: '#1025', cliente: 'Juan Pérez', fecha: '2026-06-13', estado: 'Pendiente', total: 320.50 },
    { id: '#1026', cliente: 'Ferretería Central', fecha: '2026-06-13', estado: 'Enviado', total: 4500.00 },
    { id: '#1027', cliente: 'María Gómez', fecha: '2026-06-13', estado: 'Pendiente', total: 85.00 },
    { id: '#1028', cliente: 'Obras y Proyectos SAC', fecha: '2026-06-13', estado: 'Procesando', total: 2100.00 }
  ];

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initVentasChart();
    this.initCategoriasChart();
  }

  initVentasChart() {
    new Chart(this.ventasChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
          label: 'Ventas Mensuales (S/)',
          data: [25000, 32000, 28000, 41000, 39000, 45230],
          backgroundColor: '#0d6efd',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  initCategoriasChart() {
    new Chart(this.categoriasChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Cemento', 'Herramientas', 'Ferretería', 'Pinturas'],
        datasets: [{
          data: [45, 25, 20, 10],
          backgroundColor: ['#fd7e14', '#198754', '#0dcaf0', '#dc3545'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right' }
        }
      }
    });
  }
}
