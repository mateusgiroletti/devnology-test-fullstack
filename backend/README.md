## Back-end

Aqui foi onde eu iniciei a codificação, utilizei a ferramenta sail para iniciar um projeto com o docker, assim não sendo necessario instalar o PHP e/ou outro servidor web na maquina para rodar a aplicação.

## Migrations

Primeiramente foi criados as migrations necessarias para criação das tabelas e suas respectivas colunas.

## Models

A seguir foi criado as models e seus relacionamentos. Abaixo é possivel visualizar o modelo do banco de dados.

<p align="center">
  <img src="../.github/prints/modelo_banco_dados.PNG">
</p>

## Rotas e Controllers

Por fim foi realizado a criação das rotas e dos controllers, onde fica armazenado as regras de negocio da aplicação. Com exeção da rota de login e criação de usuario é necessario o envio do token do usuario nos headers da requisição.

### Criação de usuário [POST /user]

Rota responsavel por criar um usuario e retornar seu e-mail e token, já autentica ele na sessão.

+ Request (application/json)
   + Body

            {
               "name": "Teste",
                "email": "teste@email.com",
                "password": "12345678"
            }

+ Response 200 (application/json)
    + Body

            {
                "email": "teste@email.com",
                "token": "1|1SCjXjRHhGxWk7VLHXxlyJQkp8jkQB12JIDETn1Q"
            }

### Login de usuário [POST /session]

Rota responsavel realizar a autenticação do usuário e retornar o e-mail e token de autenticação.

+ Request (application/json)
   + Body

            {
                "email": "teste@email.com",
                "password": "12345678"
            }

+ Response 200 (application/json)
    + Body

            {
                "email": "teste@email.com",
                "token": "1|1SCjXjRHhGxWk7VLHXxlyJQkp8jkQB12JIDETn1Q"
            }

### Criação de pedido [POST /order]

Rota responsavel por criar um pedido e armazenar as informações no banco de dados.

+ Request (application/json)

    + Headers

                Authorization: Bearer [access_token]
   + Body

           {
                "products": [
                    {
                        "name": "teste",
                        "value": "120.00",
                        "quantity": 2,
                        "discount_value": "0.25"
                    },
                    {
                        "name": "teste2",
                        "value": "130.00",
                        "quantity": 1
                    }
                ],
                "order":{
                    "value_total": "250.00"
                }
                
            }

+ Response 200 (application/json)
    + Body

            {
                "products": [
                    {
                        "name": "teste",
                        "value": "120.00",
                        "quantity": 2,
                        "discount_value": "0.25"
                    },
                    {
                        "name": "teste2",
                        "value": "130.00",
                        "quantity": 1
                    }
                ],
                "order":{
                    "value_total": "250.00"
                }
                
            }
