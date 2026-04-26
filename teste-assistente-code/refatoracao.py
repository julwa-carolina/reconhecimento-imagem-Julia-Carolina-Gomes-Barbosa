def calcular_estatisticas(numeros):
    """
    Calcula estatísticas básicas de uma lista de números.

    Args:
        numeros (list): Lista de números (int ou float).

    Returns:
        tuple: (total, media, maior, menor)

    Raises:
        ValueError: Se a lista estiver vazia.
    """
    if not numeros:
        raise ValueError("A lista não pode estar vazia")

    total = sum(numeros)
    media = total / len(numeros)
    maior = max(numeros)
    menor = min(numeros)

    return total, media, maior, menor

# Exemplo de uso
lista_numeros = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
total, media, maior, menor = calcular_estatisticas(lista_numeros)

print("Total:", total)
print("Média:", media)
print("Maior:", maior)
print("Menor:", menor)