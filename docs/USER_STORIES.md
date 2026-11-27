# Histórias de Utilizador (User Stories) e Critérios BDD — TechOS

## US01: Autenticação de Utilizador no Sistema
* **Como** técnico ou administrador da assistência técnica,
* **Quero** fazer login com o meu e-mail e senha,
* **Para** aceder de forma segura ao painel de gestão de Ordens de Serviço.

**Critérios de Aceitação (BDD):**
* **Cenário 1: Login com credenciais válidas**
  * **Dado que** o utilizador está na página de login do TechOS,
  * **Quando** preenche o e-mail e a senha corretos e clica em "Entrar",
  * **Então** o sistema gera um token JWT válido e redireciona para o Dashboard principal.
* **Cenário 2: Login com senha incorreta**
  * **Dado que** o utilizador está na página de login,
  * **Quando** insere uma senha inválida e clica em "Entrar",
  * **Então** o sistema exibe a mensagem "Credenciais inválidas" e bloqueia o acesso.

---

## US02: Cadastro de Clientes
* **Como** atendente ou técnico,
* **Quero** registar os dados de um novo cliente (nome, CPF/CNPJ, telefone e e-mail),
* **Para** associá-lo às futuras Ordens de Serviço de equipamentos.

**Critérios de Aceitação (BDD):**
* **Cenário 1: Cadastro realizado com sucesso**
  * **Dado que** o utilizador está autenticado e acedeu ao formulário de "Novo Cliente",
  * **Quando** preenche todos os campos obrigatórios com dados válidos e clica em "Guardar",
  * **Então** o sistema persiste o cliente no banco de dados MySQL e exibe confirmação de sucesso.
* **Cenário 2: Tentativa de registo com CPF/CNPJ duplicado**
  * **Dado que** já existe um cliente registado com o mesmo CPF/CNPJ,
  * **Quando** o utilizador tenta guardar um novo registo com esse documento,
  * **Então** o sistema impede a gravação e alerta que o cliente já existe.

---

## US03: Abertura de Ordem de Serviço (OS)
* **Como** técnico de suporte,
* **Quero** abrir uma nova Ordem de Serviço vinculada a um cliente, informando equipamento, defeito relatado e prioridade,
* **Para** iniciar o rastreio e a manutenção do aparelho.

**Critérios de Aceitação (BDD):**
* **Cenário 1: Criação de OS com status inicial "Aberta"**
  * **Dado que** existe um cliente previamente cadastrado no sistema,
  * **Quando** o técnico preenche os dados do equipamento, o problema relatado e submete o formulário,
  * **Então** o sistema cria a OS com um número de protocolo único, data de entrada automática e status inicial **Aberta**.

---

## US04: Atualização de Status e Diagnóstico da OS
* **Como** técnico responsável pelo reparo,
* **Quero** atualizar o status da Ordem de Serviço (Em Análise, Aguardando Peça, Concluída, Cancelada) e registar o laudo técnico e valor,
* **Para** manter o histórico atualizado e informar o cliente sobre o andamento.

**Critérios de Aceitação (BDD):**
* **Cenário 1: Conclusão de reparo com valor e laudo**
  * **Dado que** uma OS está com status "Em Análise",
  * **Quando** o técnico insere a solução aplicada, o valor do serviço e altera o status para **Concluída**,
  * **Então** o sistema guarda a data de conclusão e atualiza o painel de métricas.