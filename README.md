[![Build Status](https://travis-ci.com/Brendhon/SearchFacul_API.svg?branch=main)](https://travis-ci.com/Brendhon/SearchFacul_API)

# Search Facul

<img src="src\assets\logo.svg" width="200px;" alt="logo"/>

## 🎓 Sobre o projeto

API do projeto Search Facul desenvolvido com o objetivo colocar em prática os conhecimentos adquiridos na disciplina de **C214** (Engenharia de Software) durante a graduação em Engenharia de Computação pelo **[Inatel](https://inatel.br/home/)** e dos conhecimentos adquiridos sobre desenvolvimento Web.

---

## 🛠 Tecnologias

As seguintes ferramentas foram utilizadas na construção do projeto:

 - **[Express](https://expressjs.com/pt-br/)**
 - **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
 - **[Nodemon](https://nodemon.io/)**
 - **[PostgreSQL](https://www.postgresql.org/)**
 - **[Knex.js](http://knexjs.org/)**
 - **[Celebrate](https://github.com/arb/celebrate)**
 - **[Jest](https://jestjs.io/)**
 - **[Cross-env](https://github.com/kentcdodds/cross-env)**
 - **[Jwt-Simple](https://github.com/hokaccha/node-jwt-simple)**
 - **[Dotenv](https://github.com/motdotla/dotenv)**
 - **[SuperTest](https://github.com/visionmedia/supertest)**
 - **[Travis CI](https://travis-ci.com/)**
 - **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js/)**
> Veja o arquivo  **[package.json](https://github.com/Brendhon/SearchFacul_API/blob/main/package.json)**

### Utilitários
- Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**  → Extensions:  **[SQLite](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite)**
- Teste de API:  **[Insomnia](https://insomnia.rest/)**
---
## Como executar o projeto

#### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
**[Git](https://git-scm.com)**, **[Node.js](https://nodejs.org/en/)** e **[PostgreSQL](https://www.postgresql.org/)**.<br> 

Para rodar localmente é necessário que você crie o seu banco de dados (não é necessário criar as tabelas). Logo após isso, crie um arquivo (.env) na raiz do projeto e coloque nele as informações de acesso (username, password e name) no formato demostrado abaixo: 
```
DB_NAME=<NOME_DO_BANCO>
DB_USERNAME=<USERNAME_DO_BANCO>
DB_PASSWORD=<SENHA_DO_BANCO>
```

Recomendações:
* Um editor para trabalhar com o código como **[VSCode](https://code.visualstudio.com/)**
* (Opcional) No arquivo **.env** insira um segredo de sua escolha, a variável deve ser escrita da seguinte forma:
    ```
    AUTH_SECRET=<SECRET>
    ```
    
```bash

# Clone este repositório
$ git clone https://github.com/Brendhon/SearchFacul_API.git

# Acesse a pasta do projeto

# Instale as dependências
$ npm install

```
#### ⚽ Rodando o servidor

```bash

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor iniciará na porta:3333

```

#### 🤖 Rodando os testes automatizados

```bash

# Execute os testes
$ npm test

# Será gerada uma pasta (coverage) contendo uma página com os dados dos testes de forma mais detalhada

```


---

## 👥 Autor
<img style="border-radius: 20%;" src="https://avatars1.githubusercontent.com/u/52840078?s=400&u=67bc81db89b5abf12cf592e0c610426afd3a02f4&v=4" width="120px;" alt="autor"/><br>
**Brendhon Moreira**

[![Linkedin Badge](https://img.shields.io/badge/-Brendhon-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/brendhon-moreira)](https://www.linkedin.com/in/brendhon-moreira)
[![Gmail Badge](https://img.shields.io/badge/-brendhon.e.c.m@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:brendhon.e.c.m@gmail.com)](mailto:brendhon.e.c.m@gmail.com)

---
## License
**[MIT](https://choosealicense.com/licenses/mit/)**
