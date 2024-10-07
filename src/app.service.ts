import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Pokemon } from './pokemon/pokemon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PokemonService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Pokemon) private pokemonRepository: Repository<Pokemon>,
  ) {}

  async findRandomPokemon() {
    const response = await this.httpService.get('https://pokeapi.co/api/v2/pokemon?limit=151').toPromise();
    const pokemons = response.data.results;
    const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
    return randomPokemon;
  }

  async capturePokemon(pokemonData: Pokemon) {
    const pokemon = this.pokemonRepository.create({ ...pokemonData, captured: true });
    return this.pokemonRepository.save(pokemon);
  }

  async releasePokemon(id: number) {
    return this.pokemonRepository.delete({ id });
  }

  async getCapturedPokemons() {
    return this.pokemonRepository.find({ where: { captured: true } });
  }
}
