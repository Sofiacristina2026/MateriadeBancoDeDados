import requests

cep = input("Digite seu Cep: ")

url = f"https://viacep.com.br/ws/{cep}/json/"

dados_brutos = requests.get(url)

dados_refinados = dados_brutos.json()

# print(dados_brutos)
# //Vai mostrar uma resposta 200 porque deu certo
# // o site https://http.cat/ é muito bom para estudo

# print(f"Você mora na rua:{dados_refinados["logradouro"]}")
# print(f"Na cidade de:{dados_refinados["localidade"]}")

