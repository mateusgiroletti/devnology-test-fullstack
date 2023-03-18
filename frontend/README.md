## Front-end

Apos terminar o back-end e testalo, parti para o desenvolvimento do front, a aplicação foi construida com o react, usei a ferramente vite para criar o projeto. A estilização foi realizada puramente com css, usando flex-grid e grid-template para a listagem dos produtos.

## Tela Home

<p align="justify">
    A primeira tela que foi criada é a home, aqui é realizado a listagem dos produtos que vem da API. Como os dados advêm diferentes, primeiramente busco os produtos nacionais, armazeno em um array e refaço o mesmo procedimento com os produtos europeus, após isso listo em tela, mostrando a imagem do produto, o nome, valor e quando existente o valor com desconto, o valor antigo dele e quanto de desconto que foi aplicado. E por fim existe o botão de adicionar ao carrinho, que quando clicado pela primeira vez no produto retorna uma mensagem de sucesso informando que o produto foi adicionado ao carrinho e no topo da página a contagem de itens do carrinho é atualizada, o funcionamento do carrinho será explicado mais à frente. Foi criada uma barra de busca, onde é possível filtrar pelo nome dos produtos. Abaixo é possível visualizar a tela Home.
</p>

<p align="center">
  <img src="../.github/prints/home.png" width="1200">
</p>

## Tela do carrinho

<p align="justify">
    Para o gerenciamento dos produtos selecionados, foi criado a tela de carrinho, onde é listado todos os produtos, suas quantidades, subtotal e total do pedido. É possível aumentar ou diminuir a quantidade de produtos, caso seja diminuído para zero, ele remove o produto do carrinho. Existe também a possibilidade de remover o produto no ícone de lixeira.
</p>

<p align="justify">
    Sempre que ocorre uma alteração na quantidade, o subtotal e total do pedido são atualizados em tempo real. Ainda na página existem outros dois botões, o de limpar o carrinho, que basicamente exclui todos os produtos do carrinho.
</p>

<p align="justify">
    O botão de finalizar pedido quando acionado faz o envio dos dados para o back-end que por sua vez cria o pedido e armazena as informações no banco de dados. Caso essa operação ocorra com sucesso, é retornada uma mensagem de sucesso, o usuário é direcionado para a tela Home e o carrinho é limpo.
</p>

<p align="center">
  <img src="../.github/prints/cart.png" width="1200">
</p>

## Tela de Login

<p align="center">
  <img src="../.github/prints/signIn.png" width="1200">
</p>

## Tela de Cadastro

<p align="center">
  <img src="../.github/prints/signUp.png" width="1200">
</p>

## Como Rodar o projeto
Como ja sitado anterirmente é necessario o docker instalado na maquina.

Clone este projeto em um diretório e mude para o diretório de back-end:

```console
cd backend
```

Rode o seguinte comando para instar as dependencias da pasta vendor:

```console
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php81-composer:latest \
    composer install --ignore-platform-reqs
```

Copie o arquivo .env.example para .env e insira as configs de banco de dados (fica a sua escolha):

```console
cp .env.example .env
```

Suba o servidor:

```console
./vendor/bin/sail up -d
```

E por fim rode as migrations:

```console
./vendor/bin/sail artisan migrate
```

E pronto, a aplicação esta disponivel no seguinte endereço:

```console
http://localhost/api
```
