import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PokemonGridComponent } from './components/pokemon-grid/pokemon-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PokemonGridComponent],
  template: '<app-pokemon-grid></app-pokemon-grid>',
})
export class AppComponent {}
