import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {
  mostrarAcessibilidade = false;
  modoEscuroAtivo = false;
  textoMaior = false;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    const modoEscuro = localStorage.getItem('modoEscuro');
    const textoMaior = localStorage.getItem('textoMaior');
    const mostrarAcessibilidade = localStorage.getItem('mostrarAcessibilidade');

    this.modoEscuroAtivo = modoEscuro === 'true';
    this.textoMaior = textoMaior === 'true';
    this.mostrarAcessibilidade = mostrarAcessibilidade === 'true';

    if (this.modoEscuroAtivo) {
      document.body.classList.add('modo-escuro');
    }
    if (this.textoMaior) {
      document.body.classList.add('texto-maior');
    }
  }

  toggleAcessibilidade() {
    this.mostrarAcessibilidade = !this.mostrarAcessibilidade;
    if (this.isBrowser) {
      localStorage.setItem('mostrarAcessibilidade', String(this.mostrarAcessibilidade));
    }
  }

  aumentarTexto() {
    this.textoMaior = true;
    if (this.isBrowser) {
      document.body.classList.add('texto-maior');
      localStorage.setItem('textoMaior', 'true');
    }
  }

  diminuirTexto() {
    this.textoMaior = false;
    if (this.isBrowser) {
      document.body.classList.remove('texto-maior');
      localStorage.setItem('textoMaior', 'false');
    }
  }

  toggleModoEscuro() {
    this.modoEscuroAtivo = !this.modoEscuroAtivo;
    if (this.isBrowser) {
      document.body.classList.toggle('modo-escuro', this.modoEscuroAtivo);
      localStorage.setItem('modoEscuro', String(this.modoEscuroAtivo));
    }
  }
}
