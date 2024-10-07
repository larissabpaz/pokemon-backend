import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('random')
  findRandomPokemon() {
    return this.pokemonService.findRandomPokemon();
  }

  @Post('capture')
  capturePokemon(@Body() pokemonData) {
    return this.pokemonService.capturePokemon(pokemonData);
  }

  @Delete('release/:id')
  releasePokemon(@Param('id') id: number) {
    return this.pokemonService.releasePokemon(id);
  }

  @Get('captured')
  getCapturedPokemons() {
    return this.pokemonService.getCapturedPokemons();
  }
}
