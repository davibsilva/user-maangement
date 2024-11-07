<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="API - User Management" />
  &#xa0;
</div>

<h1 align="center">API - User Management</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/davibsilva/glowing-airline-ticket?color=56BEB8">
  <img alt="Github language count" src="https://img.shields.io/github/languages/count/davibsilva/glowing-airline-ticket?color=56BEB8">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/davibsilva/glowing-airline-ticket?color=56BEB8">
  <img alt="License" src="https://img.shields.io/github/license/davibsilva/glowing-airline-ticket?color=56BEB8">
</p>

<p align="center">
  <a href="#dart-about">Sobre</a> &#xa0; | &#xa0; 
  <a href="#rocket-technologies">Tecnologias</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requisitos</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Iniciando</a> &#xa0; | &#xa0;
  <a href="#memo-license">Licença</a> &#xa0; | &#xa0;
  <a href="https://github.com/davibsilva" target="_blank">Autor</a>
</p>

<br>

## :dart: Sobre ##

RESTful API de gerenciamento de usuários.

## :rocket: Tecnologias ##

As seguintes ferramentas foram utilizadas nesse projeto:

- [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://docker.com)
- [Prisma](https://www.prisma.io/)
- [Jest](https://www.jestjs.io/)
- [Swagger](https://swagger.io/)

## :white_check_mark: Requisitos ##

Antes de iniciar :checkered_flag:, você deve ter os seguintes programas instalados em sua máquina:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/)

## :checkered_flag: Instruções para testar a API ##

```bash
# Clone o repositório
$ git clone https://github.com/davibsilva/user-management.git

# Entre na pasta contendo o repositório
$ cd user-management

# Instale as dependências
$ npm install

# Crie um arquivo .env na raiz do projeto

# Copie o conteúdo do arquivo .env.template e cole no arquivo .env
# (Será necessário para testar a API localmente)
Exemplo de .env:
PORT=3000
MYSQL_DATABASE=user-management
MYSQL_ROOT_PASSWORD=root
MYSQL_USER=user
MYSQL_PASSWORD=password
DATABASE_URL="mysql://root:root@localhost:3306/user-management"
ADMIN_IDENTIFICATION=51354106946
ADMIN_PASSWORD=25115496
JWT_SECRET=secret

# Na raiz do projeto, execute o comando para subir o container do MySQL
$ docker-compose up -d

# Execute as migrations
$ npm run migrate

# Gere os schemas do Prisma
$ npm run generate

# Crie o primeiro usuário Admin para testar a API
$ npm run create:admin:user

# Faça o build do projeto
$ npm run build

# Rode a API
$ npm run dev

# Espere alguns segundos e a API estará disponível em: <http://localhost:3000>

!!!IMPORTANTE!!!
# Para realizar os testes, confira a documentação em: <http://localhost:3000/api-docs>
```

## :memo: Licença ##

Projeto sobre licença do MIT.

Feito com :heart: por <a href="https://github.com/davibsilva" target="_blank">Davi V. Barbosa Silva</a>
&#xa0;

<a href="#top">Voltar ao topo</a>