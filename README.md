# Case para posição de Frontend Developer na Moray

## Tarefas
- [X] Renderizar as geometrias dos bairros no mapa;
- [X] Exibir a evolução populacional dos bairros;


## Melhorias

#### Tecnologias de ecosistema:
- Uso do [PNPM](https://pnpm.io/), mais rápido e eficiente gerenciador de módulos node.
- Atualização das bibliotecas para sua mais recente versão.
- Adição de Typescript ao projeto.
- Update para nova versão do eslint 9.

#### Tecnologias de infraesturutra:
- Hospedagem Free na Vercel
- Uso Zeabur para hospedar servidor simples colaborativo de sinalização
- Uso de um servidor websockets simples para colaboração por WebRTC.

#### Bibliotecas:
- YJS (Tecnologia colaborativa com CRDT - Conflict-free replicated data type) com provider WebRTC.
- Typescript
- MUI 6
- Zustand - Sistema de Store
- React Router - Roteamento
- UseQuery Zanstack - Cache de queries
- Zod - Validação de formulários


#### Features:
- Paginação com React Router
- Visualização de Bairros
- Colaboração em tempo real (cursor com usuários online)
- Minimap com atualização de zoom seguindo o mapa principal.
- Gráfico mostrando evolução da população
- Pesquisar na Web.
- Uso de layers nas features.
- Fallback em caso de não haver User Name (simulação de autenticação apesar de ser no client.)
- Validação de formulários com Zod.
- Uso de Typescript em diferentes layers (app e node).


## Acesso

Url:
https://collaborative-map-ex4o.vercel.app/



## Setup

### Pré-requisitos

Certifique-se de que você tenha o Node (v18) instalado:

```
node -v
```

Caso não, você pode fazer isso utilizando o [nvm](https://github.com/nvm-sh/nvm#installing-and-updating). Na raiz do projeto, execute:

```
nvm install
nvm use
```

### Rodando a aplicação
Na raiz do projeto, execute:

```
pnpm install
pnpm run dev
```
