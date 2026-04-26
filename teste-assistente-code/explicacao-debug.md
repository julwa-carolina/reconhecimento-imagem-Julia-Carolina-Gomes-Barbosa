# Explicação dos erros em `debug.py`

1. **Erro de sintaxe no `input` do item 1**
   - A linha `item1 = float(input(Preço do item 1? ))` não coloca a mensagem entre aspas.
   - Deve ser `item1 = float(input("Preço do item 1? "))`.

2. **`desconto_cupom` permanece como string**
   - `desconto_cupom = (input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))`
   - O valor do `input` é sempre texto. Depois, o código faz `desconto_cupom / 100`, o que causa erro de tipo.
   - É preciso converter para `int` ou `float` antes de usar em cálculos.

3. **Comparação inválida entre string e número**
   - A condição `if desconto_cupom > 0:` compara texto com número.
   - Depois de converter, a condição deve ser algo como `if desconto_cupom > 0:` onde `desconto_cupom` é numérico.

4. **Indentação incorreta no bloco `if`**
   - O `print` dentro do `if desconto_cupom > 0:` não está indentado.
   - Isso gera um erro de indentação em Python.

5. **Uso incorreto de f-string na impressão do Item 2**
   - A linha `print(" Item 2:        R$ {total_item2:.2f}")` não é uma f-string.
   - O correto é `print(f" Item 2:        R$ {total_item2:.2f}")`.

6. **Possível erro lógico do desconto**
   - Mesmo com a correção do tipo, `desconto_cupom` precisa representar o percentual corretamente.
   - Se o usuário digitar `10`, o desconto deve ser calculado como `subtotal * (desconto_cupom / 100)` após converter para número.

7. **Observação de exibição**
   - A linha final `print(f" TOTAL:         R$ {round(total, 2):.2f}")` funciona, mas o `round` é redundante com `:.2f`.
   - Não é um erro, apenas uma melhoria possível.

8. **Correções aplicadas**
   - O código foi corrigido em `debug.py` para usar uma mensagem de `input` entre aspas, conversão numérica do cupom de desconto, f-string correta para o item 2 e indentação adequada no bloco `if`.
