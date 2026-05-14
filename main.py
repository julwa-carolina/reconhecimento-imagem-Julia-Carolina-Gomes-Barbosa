import pygame
import sys

# Inicialização do Pygame
pygame.init()

# Cores
BRANCO = (255, 255, 255)
PRETO = (0, 0, 0)

# Configurações da tela
LARGURA_TELA = 800
ALTURA_TELA = 600
tela = pygame.display.set_mode((LARGURA_TELA, ALTURA_TELA))
pygame.display.set_caption("Pong - Estilo Atari")

# Relógio para controle de FPS
relogio = pygame.time.Clock()

# Variáveis do jogo
RAQUETE_LARGURA = 15
RAQUETE_ALTURA = 100
VELOCIDADE_RAQUETE = 7

BOLA_TAMANHO = 15
VELOCIDADE_BOLA_X = 5
VELOCIDADE_BOLA_Y = 5

# Posições iniciais
jogador1_y = ALTURA_TELA // 2 - RAQUETE_ALTURA // 2
jogador2_y = ALTURA_TELA // 2 - RAQUETE_ALTURA // 2
bola_x = LARGURA_TELA // 2 - BOLA_TAMANHO // 2
bola_y = ALTURA_TELA // 2 - BOLA_TAMANHO // 2

# Velocidade atual da bola
bola_dir_x = VELOCIDADE_BOLA_X
bola_dir_y = VELOCIDADE_BOLA_Y

# Pontuação
pontos_jogador1 = 0
pontos_jogador2 = 0
fonte = pygame.font.SysFont(None, 74)

def desenhar():
    tela.fill(PRETO)
    # Linha central
    pygame.draw.aaline(tela, BRANCO, (LARGURA_TELA // 2, 0), (LARGURA_TELA // 2, ALTURA_TELA))
    # Jogadores
    pygame.draw.rect(tela, BRANCO, (30, jogador1_y, RAQUETE_LARGURA, RAQUETE_ALTURA))
    pygame.draw.rect(tela, BRANCO, (LARGURA_TELA - 30 - RAQUETE_LARGURA, jogador2_y, RAQUETE_LARGURA, RAQUETE_ALTURA))
    # Bola
    pygame.draw.ellipse(tela, BRANCO, (bola_x, bola_y, BOLA_TAMANHO, BOLA_TAMANHO))
    # Pontuação
    texto_p1 = fonte.render(str(pontos_jogador1), True, BRANCO)
    tela.blit(texto_p1, (LARGURA_TELA // 4, 20))
    texto_p2 = fonte.render(str(pontos_jogador2), True, BRANCO)
    tela.blit(texto_p2, (LARGURA_TELA * 3 // 4, 20))
    pygame.display.flip()

rodando = True
while rodando:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            rodando = False

    if not rodando:
        break

    # Controles
    teclas = pygame.key.get_pressed()
    # Jogador 1 (W e S)
    if teclas[pygame.K_w] and jogador1_y > 0:
        jogador1_y -= VELOCIDADE_RAQUETE
    if teclas[pygame.K_s] and jogador1_y < ALTURA_TELA - RAQUETE_ALTURA:
        jogador1_y += VELOCIDADE_RAQUETE
    
    # Jogador 2 (Setas Cima e Baixo)
    if teclas[pygame.K_UP] and jogador2_y > 0:
        jogador2_y -= VELOCIDADE_RAQUETE
    if teclas[pygame.K_DOWN] and jogador2_y < ALTURA_TELA - RAQUETE_ALTURA:
        jogador2_y += VELOCIDADE_RAQUETE

    # Movimento da bola
    bola_x += bola_dir_x
    bola_y += bola_dir_y

    # Colisão com o topo e a base
    if bola_y <= 0 or bola_y >= ALTURA_TELA - BOLA_TAMANHO:
        bola_dir_y *= -1

    # Colisão com as raquetes
    # Raquete 1
    if (30 <= bola_x <= 30 + RAQUETE_LARGURA) and (jogador1_y <= bola_y + BOLA_TAMANHO and bola_y <= jogador1_y + RAQUETE_ALTURA):
        bola_dir_x *= -1
        bola_x = 30 + RAQUETE_LARGURA
        
    # Raquete 2
    if (LARGURA_TELA - 30 - RAQUETE_LARGURA <= bola_x + BOLA_TAMANHO <= LARGURA_TELA - 30) and (jogador2_y <= bola_y + BOLA_TAMANHO and bola_y <= jogador2_y + RAQUETE_ALTURA):
        bola_dir_x *= -1
        bola_x = LARGURA_TELA - 30 - RAQUETE_LARGURA - BOLA_TAMANHO

    # Pontuação
    if bola_x <= 0:
        pontos_jogador2 += 1
        bola_x = LARGURA_TELA // 2 - BOLA_TAMANHO // 2
        bola_y = ALTURA_TELA // 2 - BOLA_TAMANHO // 2
        bola_dir_x *= -1
    elif bola_x >= LARGURA_TELA:
        pontos_jogador1 += 1
        bola_x = LARGURA_TELA // 2 - BOLA_TAMANHO // 2
        bola_y = ALTURA_TELA // 2 - BOLA_TAMANHO // 2
        bola_dir_x *= -1

    desenhar()
    relogio.tick(60)

pygame.quit()
sys.exit()
