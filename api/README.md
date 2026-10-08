# Catalogo de Jogos - API

API REST didatica em Node.js + Express para uso em aula de React Native.

## Como rodar

```bash
npm install
npm start
```

A API sobe em http://localhost:3000

## Acessando do emulador Android

No emulador Android, `localhost` aponta para o proprio emulador.
Para acessar a maquina host use `http://10.0.2.2:3000`.

O app ja vem configurado com esse endereco em `services/api.js`.

## Endpoints

| Metodo | Rota            | Descricao                                           |
|--------|-----------------|-----------------------------------------------------|
| GET    | /jogos          | Lista todos os jogos                                |
| GET    | /jogos/:id      | Retorna um jogo (404 se nao existir)                |
| GET    | /favoritos      | Lista favoritos com dados do jogo embutidos         |
| POST   | /favoritos      | Cria favorito `{ jogoId, observacao }`              |
| PUT    | /favoritos/:id  | Atualiza observacao `{ observacao }`                |
| DELETE | /favoritos/:id  | Remove o favorito (204 sem corpo)                   |

## Comportamentos didaticos

- Delay aleatorio de 300-600ms em todas as respostas GET (simula latencia real).
- Por padrao, as requisicoes de escrita (POST/PUT/DELETE) nao simulam erros.
  Para testar o tratamento de falhas no app, ative a flag abaixo; isso retorna
  erro 500 em ~10% dessas requisicoes.

Para desligar os erros simulados, altere a flag `SIMULAR_ERROS` em `config.js`:

```js
const SIMULAR_ERROS = false;
```
