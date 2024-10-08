import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './app.service';
import { PokemonController } from './pokemon/pokemon.controller';
import { Pokemon } from './pokemon/pokemon.entity';
import { DeleteResult } from 'typeorm';

describe('PokemonController', () => {
  let controller: PokemonController;
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        {
          provide: PokemonService,
          useValue: {
            getRandomPokemon: jest.fn(),
            capturePokemon: jest.fn(),
            getCapturedPokemons: jest.fn(),
            releasePokemon: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    service = module.get<PokemonService>(PokemonService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve retornar um Pokémon aleatório', async () => {
    const mockPokemon: Pokemon[] = [
        { id: 25, name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/', captured: false }
    ];

    // Mock da função getCapturedPokemons para retornar uma Promise que resolve para um array
    jest.spyOn(service, 'getCapturedPokemons').mockResolvedValue(mockPokemon); 

    const result = await controller.getCapturedPokemons(); 

    expect(result).toEqual(mockPokemon); 
    expect(service.getCapturedPokemons).toHaveBeenCalled();
});


  it('deve capturar um Pokémon', async () => {
    const mockPokemon: Pokemon = { id: 1, name: 'Bulbasaur', url: 'some-url', captured: false };
    jest.spyOn(service, 'capturePokemon').mockResolvedValue(mockPokemon);

    const result = await controller.capturePokemon(mockPokemon);
    expect(result).toEqual(mockPokemon);
    expect(service.capturePokemon).toHaveBeenCalledWith(mockPokemon);
  });

  it('deve retornar um Pokémon aleatório', async () => {
    const mockPokemon: Pokemon[] = [ 
        { id: 25, name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/', captured: false }
    ]; 

    // Mock da função getCapturedPokemons para retornar uma Promise que resolve para um array
    jest.spyOn(service, 'getCapturedPokemons').mockResolvedValue(mockPokemon); 

    const result = await controller.getCapturedPokemons(); 

    expect(result).toEqual(mockPokemon); 
    expect(service.getCapturedPokemons).toHaveBeenCalled();
});


it('deve soltar um Pokémon capturado', async () => {
  const pokemonId = 4;

  // Mockando o resultado de acordo com a interface DeleteResult do TypeORM
  const mockDeleteResult: DeleteResult = { affected: 1, raw: {} }; 

  // Fazendo o mock da função releasePokemon do serviço
  jest.spyOn(service, 'releasePokemon').mockResolvedValue(mockDeleteResult);

  // Chamando a função releasePokemon do controller
  const result = await controller.releasePokemon(pokemonId);

  expect(result).toEqual(mockDeleteResult); 
  expect(service.releasePokemon).toHaveBeenCalledWith(pokemonId);
});

});
