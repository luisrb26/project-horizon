# project-horizon
Teste para desenvolvedor Back-end Pleno da Horizon

Para iniciar o projeto:

1. Coloque um arquivo .env na raiz do projeto

2. Instale as dependências:
`$ npm install`

3. Execute a aplicação:
`$ npm run start`

O projeto não está 100% concluido.

Recursos:
- A única rota autenticada é a de cadastrar voos
- É possível listar todos os aeroportos
- É possível cadastrar voos
- É possível listar voos
- É possível comprar passagens
- É possível pesquisar passagens
- É possível criar usuários
- É possível fazer login

A ser implementado:
- Emissão de vouchers após compradas as passagens
- Emissão de etiquetas de bagagem, caso haja despacho
- Alterar e cancelar voos
- Alterar preço das passagens
- Obter as passagens compradas pelo CPF do comprador
- Cancelar compra

To be fixed:
- Implementar um sistema de geração de nomes automático para bagagens e voos
- Melhorar muito a tratativa de erros e exceções
- A autenticação precisa ser melhor implementada com controle de acesso (usando CASL)
- Há um bug com o timezone ao pesquisar por passagens, ele considera o horário UTC e precisa considerar o GMT -03:00
- Não está sendo feita uma verificação para ver se há passagens ao comprar voos
