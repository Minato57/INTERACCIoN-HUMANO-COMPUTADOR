import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CONTACTO_WHATSAPP, CONTACTO_TELEFONO, ENVIO_GRATIS_MINIMO } from '../../constants';
import { ProductService } from '../../product/product.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent implements OnInit {
  readonly anio = new Date().getFullYear();
  readonly whatsapp = CONTACTO_WHATSAPP;
  readonly telefono = CONTACTO_TELEFONO;
  readonly envioMinimo = ENVIO_GRATIS_MINIMO;
  categoriasBackend: string[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.obtenerCategoriasBackend().subscribe(cats => {
      this.categoriasBackend = cats;
    });
  }

  abrirWhatsApp() {
    const msg = encodeURIComponent('Hola DIFERPA, quisiera información sobre sus productos.');
    window.open(`https://wa.me/${this.whatsapp}?text=${msg}`, '_blank');
  }
}
