import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDialogComponent } from '../pokemon-dialog/pokemon-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-pokemon-grid',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="grid">
      @for (pokemon of pokemons(); track pokemon.id) {
        <div class="pokemon-card" 
             (click)="openDialog(pokemon)"
             (mouseenter)="playSound(pokemon.name)"
             [@bounce]="pokemon.state">
          <img [src]="pokemon.sprites.front_default" [alt]="pokemon.name">
          <p>{{ pokemon.name }}</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 20px;
      padding: 20px;
      background-color: #f0f0f0;
    }
    .pokemon-card {
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      padding: 15px;
      text-align: center;
      transition: transform 0.3s ease;
      cursor: pointer;
    }
    .pokemon-card:hover {
      transform: translateY(-5px);
    }
    .pokemon-card img {
      width: 100px;
      height: 100px;
    }
    .pokemon-card p {
      margin-top: 10px;
      font-weight: bold;
      text-transform: capitalize;
    }
  `],
  animations: [
    trigger('bounce', [
      state('normal', style({
        transform: 'scale(1)',
      })),
      state('bouncing', style({
        transform: 'scale(1.1)',
      })),
      transition('normal <=> bouncing', animate('300ms ease-in-out')),
    ]),
  ],
})
export class PokemonGridComponent implements OnInit {
  pokemons = signal<any[]>([]);

  constructor(private pokemonService: PokemonService, private dialog: MatDialog) {}

  ngOnInit() {
    const pokemonNames = [
      'pikachu', 'bulbasaur', 'charmander', 'squirtle', 'jigglypuff', 'meowth', 'psyduck', 
      'machop', 'gastly', 'gengar', 'magikarp', 'eevee', 'snorlax', 'dratini', 'mewtwo',
      'togepi', 'scyther', 'electabuzz', 'magmar', 'lapras'
    ];
    pokemonNames.forEach(name => {
      this.pokemonService.getPokemon(name).subscribe(
        pokemon => {
          pokemon.state = 'normal';
          this.pokemons.update(pokemons => [...pokemons, pokemon]);
        }
      );
    });
  }

  openDialog(pokemon: any) {
    this.dialog.open(PokemonDialogComponent, {
      data: pokemon
    });
  }

  playSound(pokemonName: string) {
    const audio = new Audio(`assets/sounds/${pokemonName}.mp3`);
    audio.play();
    const pokemonIndex = this.pokemons().findIndex(p => p.name === pokemonName);
    if (pokemonIndex !== -1) {
      const updatedPokemons = [...this.pokemons()];
      updatedPokemons[pokemonIndex].state = 'bouncing';
      this.pokemons.set(updatedPokemons);
      setTimeout(() => {
        updatedPokemons[pokemonIndex].state = 'normal';
        this.pokemons.set(updatedPokemons);
      }, 300);
    }
  }
}