# Pokémon Backend

Este projeto é o backend para a aplicação de interação com Pokémons. Utiliza Nest.js como framework, TypeORM para comunicação com o banco de dados PostgreSQL, e integra com a PokeAPI para obter informações sobre Pokémons.

## Funcionalidades

- Retorna Pokémons da primeira geração de forma aleatória.
- Permite capturar e liberar Pokémons.
- Lista os Pokémons capturados.
- Integração com a PokeAPI para buscar dados dos Pokémons.

## Requisitos

- Node.js >= 18.17.0
- npm ou yarn
- PostgreSQL

## Instalação

1. **Clone o repositório:**

git clone https://github.com/larissabpaz/pokemon-backend.git

2. **Instale as dependências:**
npm install ou yarn install

3. **Configure o banco de dados:**

Crie um banco de dados PostgreSQL e adicione as credenciais no arquivo .env:

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=seu-usuario
DATABASE_PASSWORD=sua-senha
DATABASE_NAME=pokemon_db
Execute as migrações para criar as tabelas:

npm run typeorm migration:run

4. **Executando o Projeto**
Inicie o servidor de desenvolvimento:

Com npm: npm run start:dev ou yarn start:dev

Acesse a API:

O backend estará rodando em http://localhost:{porta}.

## Tecnologias Utilizadas
Nest.js: Framework Node.js para construção de APIs eficientes.
TypeORM: ORM (Object-Relational Mapping) usado para interagir com o PostgreSQL.
PostgreSQL: Banco de dados relacional.
PokeAPI: API pública para obter informações sobre os Pokémons.
Jest: Framework de testes para Node.js.

## Testes
Execute os testes: npm run test ou yarn test
Execute os testes com cobertura: npm run test:cov ou yarn test:cov

## Contribuição
Faça um fork do projeto.
Crie uma branch para sua feature: git checkout -b minha-feature.
Faça commit das suas alterações: git commit -m 'Adiciona minha feature'.
Envie sua branch: git push origin minha-feature.
Abra um Pull Request.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
