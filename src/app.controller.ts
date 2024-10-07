import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { PokemonService } from './app.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('random')
  getRandomPokemon() {
    return this.pokemonService.findRandomPokemon();
  }

  @Post('capture')
  capturePokemon(@Body() pokemon: any) {
    return this.pokemonService.capturePokemon(pokemon);
  }

  @Get('captured')
  getCapturedPokemons() {
    return this.pokemonService.getCapturedPokemons();
  }

  @Delete('release/:id')
  releasePokemon(@Param('id') id: number) {
    return this.pokemonService.releasePokemon(id);
  }
}
