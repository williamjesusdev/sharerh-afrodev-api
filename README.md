# AfroDev_API - Agendamentos
REST API NodeJS desenvolvida durante a Aceleração AfroDev da Venturus by ShareRH. 
API de Agendamentos, com endpoints para inclusão, alteração, exclusão e listagem.

## Versões do Projeto
+ [Primeira versão da API](./first_api) - Desenvolvida com a bibliteca mysql executando **SQL QUERY** diretamente na aplicação.

## Clonando o Projeto
Para executar qualquer uma das versões da API é só clonar o projeto e dentro do diretório e executar os seguintes comandos.

## Instalação

    yarn install ou npm install

## Inicialização

    yarn dev ou npm run dev

# REST API

Exemplos de requisições e respostas dos endpoints utilizando [Insomnia](https://insomnia.rest/)

## Buscar todos os agendamentos

### Requisição

`GET /agendamentos`

    #EXEMPLO
    http://localhost:3333/agendamentos

### Resposta

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 196
    ETag: W/"3fc-Poqa1t4XKL3YZYpSvNim71CzFZI"
    Date: Sat, 03 Apr 2021 03:07:25 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {
      "success": true,
      "schedules": [
        {
          "id": 1,
          "customer_name": "William",
          "service": "Arrumar PC",
          "status": "agendado",
          "service_date": "2021-04-04T03:00:00.000Z",
          "scheduling_date": "2021-04-01T03:00:00.000Z"
        },
      ]
    }

## Buscar um agendamento

### Requisição

`GET /agendamentos/:id`

    #EXEMPLO
    http://localhost:3333/agendamentos/1

### Resposta

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 196
    ETag: W/"3fc-Poqa1t4XKL3YZYpSvNim71CzFZI"
    Date: Sat, 03 Apr 2021 03:07:25 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {
      "success":true,
      "scheduling":{
        "id":1,
        "customer_name":"William",
        "service":"Arrumar PC",
        "status":"agendado",
        "service_date":"2021-04-04T03:00:00.000Z",
        "scheduling_date":"2021-04-01T03:00:00.000Z"
      }      
    }

## Criar um novo agendamento

### Requisição

`POST /agendamentos`
    
    #EXEMPLO
    POST http://localhost:3333/agendamentos
    BODY: Content-Type = application/json
    { 
      "customer_name": "William", 
      "service": "Arrumar PC", 
      "status": "agendado", 
      "service_date": "2021-04-04"
    }

### Resposta

    HTTP/1.1 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 167
    ETag: W/"3fc-Poqa1t4XKL3YZYpSvNim71CzFZI"
    Date: Sat, 03 Apr 2021 03:07:25 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {
      "success":true,
      "scheduling":{
        "id":2,
        "customer_name":"William",
        "service":"Arrumar PC",
        "status":"agendado",
        "service_date": "2021-04-04",
        "scheduling_date": "2021-04-03"
      }      
    }

## Buscar um agendamento não existente

### Requisição

`GET /agendamentos/id`

    #EXEMPLO
    GET http://localhost:3333/agendamentos/10

### Resposta

    HTTP/1.1 400 BAD REQUEST
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 73
    ETag: W/"49-PPtgiUNZ1CEFQudqHyNsO4/leN4"
    Date: Sat, 03 Apr 2021 03:15:25 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {
      "success": false,
      "message": "Não foi localizado agendamento com o id 10"
    }

## Alterar data do agendamento

### Requisição

`PUT /agendamentos/:id`

    #EXEMPLO
    PUT http://localhost:3333/agendamentos/2
    BODY: Content-Type = application/json
    { 
      "service_date": "2021-04-10"
    }

### Resposta

    HTTP/1.1 202 ACCEPTED
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 98
    ETag: W/"62-Mou7hjup9/D1NU3uJQ3gCyJCnyQ"
    Date: Sat, 03 Apr 2021 03:23:38 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {
      "success": true,
      "message": "Agendamento com id 2 alterado com sucesso",
      "service_date": "2021-04-10"
    }

## Delete a agendamentos

### Requisição

`DELETE /agendamentos/id`

    #EXEMPLO
    DELETE http://localhost:3333/agendamentos/2

### Resposta

    HTTP/1.1 202 ACCEPTED
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 70
    ETag: W/"46-6x4uwbETc5JWeKc7fCxrv7gHyzc"
    Date: Sat, 03 Apr 2021 03:29:33 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {
      "success": true,
      "message": "Agendamento com id 2 excluido com sucesso"
    }


## Deletando um agendamento não existente

### Requisição

`DELETE /agendamentos/id`

    #EXEMPLO
    DELETE http://localhost:3333/agendamentos/2

### Resposta

    HTTP/1.1 400 BAD REQUEST
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 72
    ETag: W/"48-3QkJMec06zmV+eCrfHcP3SFZ7xI"
    Date: Sat, 03 Apr 2021 03:30:53 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {
      "success": false,
      "message": "Não foi localizado agendamento com o id 7"
    }

# Futuras Implementações

* Segurança dos endpoints com JWT
* Documentação com Swagger UI
* Deploy do servidor Heroku