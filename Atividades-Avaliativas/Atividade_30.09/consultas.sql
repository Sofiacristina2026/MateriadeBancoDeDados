-- Total de unidades
SELECT SUM(quantidade) AS total_unidades
FROM pecas;

-- Valor total do estoque
SELECT SUM(quantidade * preco_unitario) AS valor_total_estoque
FROM pecas;

-- Maior preço
SELECT MAX(preco_unitario) AS maior_preco
FROM pecas;

-- Menor preço
SELECT MIN(preco_unitario) AS menor_preco
FROM pecas;

-- Preço médio
SELECT ROUND(AVG(preco_unitario), 2) AS preco_medio
FROM pecas;

-- Valor do estoque elétrico
SELECT SUM(quantidade * preco_unitario) AS total_eletrica
FROM pecas
WHERE categoria = 'eletrica';