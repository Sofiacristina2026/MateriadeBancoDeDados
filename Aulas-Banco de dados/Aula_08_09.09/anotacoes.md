Aula do dia 09.09 
Aprendendo comandos basícos

Para ver tudo da atbela 
```sql
SELECT * FROM produtos;
```

Para mostrar quantidades de linhas: 

```sql
SELECT COUNT(*)
FROM produtos;
```
 Ver o total de registros porém não é o total de produtos resssalte !

```sql
SELECT COUNT (*) AS
total_registros
FROM produtos,
```
Se eu quero saber quantos produtos estão abaixo da quantidade miníma 

```sql
SELECT COUNT(*) AS
produtos_baixo_estoque
FROM produtos 
WHERE estoque < 10;
```

 Quantos estãoa acima da quantidade miníma 

```sql
SELECT COUNT(*) AS
produtos_baixo_estoque
FROM produtos 
WHERE estoque > 10;
```

> OBS: mas como tem um produto específico que tem 10 quantidades acrescentamos o igual (=)

```sql 
SELECT COUNT(*) AS
produtos_baixo_estoque
FROM produtos 
WHERE estoque >= 10;
```
Para ver a quantidade de um total produto:

```sql
SELECT COUNT(*) AS total_Perifericos
FROM produtos
WHERE categoria = 'Perifericos';
```

>Pra ver o roduto mais caro 

```sql
SELECT MAX(preco)
AS maior_preco
FROM produtos;
```
 Caso você queria saber qual o produto mais caro fazer assim :

```sql
SELECT nome,preco
FROM produtos
ORDER BY preco DESC;
```

 Qual o produto mais barato:

```sql
SELECT Min(preco)
AS menor_preco
FROM produtos;
```
 Para obter a média de uma coluna :

```sql
SELECT AVG(preco)
AS media_preços
FROM PRODUTOS;
```
Se eu quiser uma média de preços arredondada mais exta eu utilizo:

```sql
SELECT ROUND (avg
(preco),2)AS 
media_correta
FROM produtos;
```
Para ver uma tabela com o preço minímo e maxímo eu uso:
```sql
SELECT
MAX(preco) AS maior_preco,
MIN(preco) AS menor_preco,
ROUND(AVG(preco),2)AS media 
FROM produtos;
```

O tanto que vou faturar se vender tudo:
```sql
SELECT sum(preco * estoque) AS
total_faturamento
FROM produtos;`
```
