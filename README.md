# Projeto: Reconhecimento de Imagem e Exemplos Python

Este projeto contém um exemplo de reconhecimento de imagem usando HTML, JavaScript, TensorFlow.js e Teachable Machine, além de scripts Python para aprendizado de lógica, depuração e refatoração.

## Estrutura do projeto

- `index.html`
  - Interface web para ativar a câmera e executar predições de imagem em tempo real.
  - Utiliza TensorFlow.js e o modelo hospedado no Teachable Machine.
- `teste-assistente-code/debug.py`
  - Script Python que calcula o valor total de três itens, aplica imposto e desconto.
  - Ideal para aprender entrada de dados, cálculos e formatação de saída.
- `teste-assistente-code/num_primos.py`
  - Módulo Python para verificação de números primos e listagem de primos até um limite.
- `teste-assistente-code/refatoracao.py`
  - Exemplo de cálculo de estatísticas básicas de uma lista de números.
  - Demonstra refatoração de código e melhoria de legibilidade.
- `teste-assistente-code/explicacao-debug.md`
  - Documento explicando os erros e correções do arquivo `debug.py`.
- `teste-assistente-code/explicacao-num-primo.md`
  - Explicação linha a linha do código em `num_primos.py`.
- `teste-assistente-code/explicacao-e-refatoramento.md`
  - Explicação do código original e da versão refatorada em `refatoracao.py`.

## Funcionalidades

- Reconhecimento de imagem em tempo real via webcam.
- Cálculo de subtotal, imposto e desconto em Python.
- Verificação de números primos e lista de primos de exemplo.
- Cálculo de soma, média, máximo e mínimo de uma lista de valores.
- Documentação explicativa que serve como guia de estudo.

## Como usar

### 1. Executar o projeto web

1. Abra `index.html` em um navegador compatível.
2. Clique em `ATIVAR CÂMERA`.
3. Permita acesso à webcam quando o navegador solicitar.
4. Observe as predições exibidas em tempo real.

> O site depende de uma conexão com a internet para carregar o TensorFlow.js e o modelo Teachable Machine.

### 2. Executar os scripts Python

Certifique-se de ter Python 3 instalado.

- Executar `debug.py`:
  ```bash
  python teste-assistente-code/debug.py
  ```
- Executar `num_primos.py`:
  ```bash
  python teste-assistente-code/num_primos.py
  ```
- Executar `refatoracao.py`:
  ```bash
  python teste-assistente-code/refatoracao.py
  ```

### 3. Ler as explicações

- `teste-assistente-code/explicacao-debug.md`
- `teste-assistente-code/explicacao-num-primo.md`
- `teste-assistente-code/explicacao-e-refatoramento.md`

Estas explicações apresentam o raciocínio do código, erros corrigidos e sugestões de refatoração.

## Requisitos

- Navegador moderno com suporte a JavaScript e acesso à webcam.
- Python 3.x para os scripts `.py`.

## Possíveis melhorias

- Adicionar um `requirements.txt` para gerenciar dependências Python, caso seja preciso usar bibliotecas externas.
- Criar um front-end dedicado para os scripts Python.
- Adicionar tratamento de exceções e validações de entrada em `debug.py`.
- Refatorar `refatoracao.py` para usar funções built-in do Python e tornar o código mais robusto.

## Observações

O foco deste projeto é demonstrar conceitos básicos de programação, depuração, documentação e integração de um modelo de reconhecimento de imagem em uma página web.
