Anotações importantes (não esquece bichinha) 
 senha do root:
 senha dentro do root: 

 Comando para apagar 
 ```sql
 DROP DATABASE lojamax
 ```


Passos para fazer na prxíma aula.
  apt update
  apt install nginix
  cd/var/www/html
  ls
  clicar no sol
    apaga/www/html
    renomear(clicar com o botão direito)
    barc.ngnix
    windex.html-atualizar a pagína qualquer poseeeoa pode acessar 

 sudo -u postgress psql
  \l
  DROP DATABASE lojamax;
  \l
  CREATE DETABASE loja;
  \l verrificar se foi criado


### Ensinamentos
O objetivo é criar uma loja para aprender os principais comandos do SQL.

---



```mermaid
erDiagram
   PRODUTOS{
      int id PK
      "Gerado automaticamente"
      varchar nome
      "Nome do produto"
      numeric 
      preço
      "Preço em reai"
      int estoque
      "Unidades disponíveis"
   }

obs: Colocar a loja aqui no vs code
CREATE TABLE produtos(
   id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY







)
