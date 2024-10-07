import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';

@Injectable()
export class PokemonService {
  private capturedPokemons = [];

  constructor(private readonly httpService: HttpService) {}

  async findRandomPokemon() {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
    const pokemons = response.data.results;
    const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
    return randomPokemon;
  }

  capturePokemon(pokemon: any) {
    this.capturedPokemons.push(pokemon);
    return pokemon;
  }

  getCapturedPokemons() {
    return this.capturedPokemons;
  }

  releasePokemon(id: number) {
    this.capturedPokemons = this.capturedPokemons.filter(pokemon => pokemon.id !== id);
    return { success: true };
  }
}

