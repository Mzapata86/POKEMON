import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>{{ data.name }}</h2>
    <img [src]="data.sprites.front_default" [alt]="data.name">
    <p>Height: {{ data.height }}</p>
    <p>Weight: {{ data.weight }}</p>
    <h3>Abilities:</h3>
    <ul>
      @for (ability of data.abilities; track ability.ability.name) {
        <li>{{ ability.ability.name }}</li>
      }
    </ul>
  `
})
export class PokemonDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

}
