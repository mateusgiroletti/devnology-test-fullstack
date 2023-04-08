# devnology-test-fullstack

Este é um projeto/teste para a vaga de fullstack da devnology.

## Objetivo

O objetivo era criar um eCommerce para uma determinada loja conseguir vender seus produtos, está por usa vez possui dois fornecedores que construíram uma API para a aplicação consumir a lista de produtos. O usuário deveria ser capaz de realizar filtros de pesquisa pelo nome dos produtos, que todos os produtos selecionados fossem para um carrinho de compras e o pedido deveria ser cadastrado em um banco de dados com as informações do cliente e dos produtos.

## Resolução do teste

O primeiro passo que tomei foi pensar em como lidar com as informações recebidas da API. Decidi que o frontend iria buscar esses dados da API mostrar em tela e ao finalizar a compra o back-end seria responsavel por armazenar apenas informações referente ao pedido (nome, preço e desconto quando existente). Além do login do usuário.

## Tecnologias utilizadas

Como o teste solicitava, o projeto foi dividido em dois, backend e frontend. Abaixo é possível visualizar as principais tecnologias usadas, e em cada diretório ([frontend](https://github.com/mateusgiroletti/devnology-test-fullstack/tree/main/frontend) e [backend](https://github.com/mateusgiroletti/devnology-test-fullstack/tree/main/backend)) está mais detalhado como foi o desenvolvimento e o passo a passo para rodar o projeto. A unica ferramenta necessaria para rodar este projeto é o [Docker](https://www.docker.com/).

### Back-end

<ul>
   <li>PHP 8.1</li>
   <li>Laravel 10.0</li>
   <li>MySQL</li>
   <li>Docker</li>
</ul>

### Front-end

<ul>
   <li>Typescript</li>
   <li>React</li>
   <li>Vite</li>
   <li>CSS</li>
   <li>Docker</li>
</ul>
