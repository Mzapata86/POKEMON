import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  getPokemon(nameOrId: string | number): Observable<any>{
    return this.http.get(`${this.baseUrl}${nameOrId}`);
  }
}
