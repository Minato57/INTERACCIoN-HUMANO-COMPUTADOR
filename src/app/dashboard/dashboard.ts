import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar';
import { FooterComponent } from '../shared/footer/footer';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('ventasChart') ventasChartRef!: ElementRef;
  @ViewChild('categoriasChart') categoriasChartRef!: ElementRef;
  @ViewChild('visitasChart') visitasChartRef!: ElementRef;

  private ventasChartInstance: Chart | null = null;
  private isBarChart = true;

  fechaHoy = new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  kpis = {
    ventasTotales: 45230.50,
    ordenesHoy: 124,
    usuariosActivos: 850,
    metaPorcentaje: 80,
    productosStock: 348,
    ticketPromedio: 365.20,
    tasaConversion: 3.2
  };

  stockCategorias = [
    { nombre: 'Cemento y Concreto', cantidad: 1240, porcentaje: 85, color: '#f97316', estado: 'OK' },
    { nombre: 'Herramientas Manuales', cantidad: 320, porcentaje: 65, color: '#3b82f6', estado: 'OK' },
    { nombre: 'Ferretería Industrial', cantidad: 180, porcentaje: 42, color: '#8b5cf6', estado: 'OK' },
    { nombre: 'Pinturas', cantidad: 95, porcentaje: 28, color: '#10b981', estado: 'Stock Bajo' },
    { nombre: 'Eléctricos', cantidad: 60, porcentaje: 18, color: '#ef4444', estado: 'Stock Bajo' },
  ];

  ultimosPedidos = [
    { id: '#1024', cliente: 'Constructora Alfa S.A.C.', fecha: '14/06/2026', estado: 'Completado', total: 1250.00 },
    { id: '#1025', cliente: 'Juan Pérez Ramos', fecha: '14/06/2026', estado: 'Pendiente', total: 320.50 },
    { id: '#1026', cliente: 'Ferretería Central', fecha: '13/06/2026', estado: 'Enviado', total: 4500.00 },
    { id: '#1027', cliente: 'María Gómez', fecha: '13/06/2026', estado: 'Pendiente', total: 85.00 },
    { id: '#1028', cliente: 'Obras y Proyectos SAC', fecha: '13/06/2026', estado: 'Procesando', total: 2100.00 },
    { id: '#1029', cliente: 'Inversiones Lima Norte', fecha: '12/06/2026', estado: 'Completado', total: 8750.00 },
    { id: '#1030', cliente: 'Carlos Mendoza', fecha: '12/06/2026', estado: 'Enviado', total: 430.75 },
    { id: '#1031', cliente: 'Constructora Andes', fecha: '11/06/2026', estado: 'Completado', total: 6300.00 },
  ];

  busquedaPedido = '';

  get pedidosFiltrados() {
    if (!this.busquedaPedido.trim()) return this.ultimosPedidos;
    const q = this.busquedaPedido.toLowerCase();
    return this.ultimosPedidos.filter(p =>
      p.cliente.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.estado.toLowerCase().includes(q)
    );
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.initVentasChart();
    this.initCategoriasChart();
    this.initVisitasChart();
  }

  initVentasChart() {
    this.ventasChartInstance = new Chart(this.ventasChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [{
          label: 'Ventas (S/)',
          data: [25000, 32000, 28000, 41000, 39000, 45230],
          backgroundColor: [
            'rgba(249,115,22,0.8)', 'rgba(249,115,22,0.8)', 'rgba(249,115,22,0.8)',
            'rgba(249,115,22,0.8)', 'rgba(249,115,22,0.8)', 'rgba(59,130,246,1)'
          ],
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `S/ ${ctx.parsed.y.toLocaleString('es-PE', {minimumFractionDigits: 2})}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { callback: (v) => `S/ ${Number(v).toLocaleString()}` }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }

  toggleLineChart() {
    if (!this.ventasChartInstance) return;
    this.isBarChart = !this.isBarChart;
    this.ventasChartInstance.destroy();
    this.ventasChartInstance = new Chart(this.ventasChartRef.nativeElement, {
      type: this.isBarChart ? 'bar' : 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [{
          label: 'Ventas (S/)',
          data: [25000, 32000, 28000, 41000, 39000, 45230],
          backgroundColor: this.isBarChart ? 'rgba(249,115,22,0.8)' : 'rgba(59,130,246,0.15)',
          borderColor: '#3b82f6',
          borderWidth: 2,
          borderRadius: this.isBarChart ? 8 : 0,
          fill: !this.isBarChart,
          tension: 0.4,
          pointBackgroundColor: '#3b82f6',
          pointRadius: 5,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { callback: (v) => `S/ ${Number(v).toLocaleString()}` }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }

  initCategoriasChart() {
    new Chart(this.categoriasChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Cemento', 'Herramientas', 'Ferretería', 'Pinturas', 'Eléctricos'],
        datasets: [{
          data: [38, 22, 20, 12, 8],
          backgroundColor: ['#f97316', '#3b82f6', '#8b5cf6', '#10b981', '#ef4444'],
          borderWidth: 3,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 15, font: { size: 12 } }
          }
        }
      }
    });
  }

  initVisitasChart() {
    new Chart(this.visitasChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom',
                 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [{
          label: 'Visitantes',
          data: [120, 145, 132, 178, 190, 210, 98, 134, 156, 143, 198, 220, 235, 180],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16,185,129,0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#10b981',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: false,
            grid: { color: 'rgba(0,0,0,0.05)' }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }

  exportarReporte() {
    const contenido = `REPORTE DIFERPA S.A.C. - ${this.fechaHoy}\n\nVentas del Mes: S/ ${this.kpis.ventasTotales}\nÓrdenes Hoy: ${this.kpis.ordenesHoy}\nClientes Activos: ${this.kpis.usuariosActivos}\nMeta Cumplida: ${this.kpis.metaPorcentaje}%`;
    const blob = new Blob([contenido], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'reporte-diferpa.txt';
    a.click();
  }
}
