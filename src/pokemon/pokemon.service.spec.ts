import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

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
    const mockPokemon = [
        { name: 'Pikachu', id: 25, captured: false, url: 'https://pokeapi.co/api/v2/pokemon/25/' }
    ];

    jest.spyOn(service, 'getCapturedPokemons').mockResolvedValue(mockPokemon);

    const result = await controller.getCapturedPokemons(); 
    expect(result).toEqual(mockPokemon);
    expect(service.getCapturedPokemons).toHaveBeenCalled();
});


  it('deve capturar um Pokémon', async () => {
    const mockPokemon = { name: 'Bulbasaur', id: 1 };
    jest.spyOn(service, 'capturePokemon').mockReturnValue(mockPokemon);

    const result = controller.capturePokemon(mockPokemon);
    expect(result).toEqual(mockPokemon);
    expect(service.capturePokemon).toHaveBeenCalledWith(mockPokemon);
  });

  it('deve retornar a lista de Pokémons capturados', async () => {
    const mockCapturedPokemons = [
        { name: 'Charmander', id: 4, captured: true, url: 'https://pokeapi.co/api/v2/pokemon/4/' }
    ];

    // Mock da função getCapturedPokemons para retornar uma Promise
    jest.spyOn(service, 'getCapturedPokemons').mockResolvedValue(mockCapturedPokemons);

    const result = await controller.getCapturedPokemons(); 
    expect(result).toEqual(mockCapturedPokemons); 
    expect(service.getCapturedPokemons).toHaveBeenCalled(); 
});

  it('deve soltar um Pokémon capturado', async () => {
    const pokemonId = 4;
    jest.spyOn(service, 'releasePokemon').mockReturnValue({ success: true });

    const result = controller.releasePokemon(pokemonId);
    expect(result).toEqual({ success: true });
    expect(service.releasePokemon).toHaveBeenCalledWith(pokemonId);
  });
});

