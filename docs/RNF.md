# Requisitos Não Funcionais (RNF) — TechOS

* **RNF01 [Desempenho]:** Endpoints da API devem responder em até 250ms sob 50 requisições simultâneas.
* **RNF02 [Segurança OWASP]:** Senhas armazenadas com hash bcrypt/password_hash (custo >= 10).
* **RNF03 [Segurança JWT]:** Rotas privadas exigem token Bearer JWT com expiração de 8 horas.
* **RNF04 [Acessibilidade WCAG 2.1]:** Contraste mínimo de 4.5:1 e navegação completa via teclado.
* **RNF05 [Confiabilidade]:** O sistema deve manter disponibilidade de 99.9% durante o horário operacional.
* **RNF06 [Manutenibilidade]:** O código-fonte deve respeitar estritamente o padrão arquitetural MVC.
* **RNF07 [Compatibilidade]:** A interface web deve renderizar sem falhas nos principais navegadores modernos (Chrome, Firefox, Edge).
* **RNF08 [Segurança de Dados]:** Consultas ao banco de dados MySQL devem utilizar exclusivamente prepared statements contra SQL Injection.