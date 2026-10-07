# Desenho Assinado

Página que recebe um número inteiro entre 1 e 100 e devolve uma figura em SVG, assinada com o e-mail da conta Google autenticada.

A figura é a tabuada modular no círculo: 240 pontos igualmente espaçados numa circunferência, com cada ponto `i` ligado ao ponto `(k * i) mod 240`, em que `k = número + 1`. O número 1 produz uma cardioide, o 2 uma nefroide, e cada valor gera uma figura diferente.

## Funcionamento

O usuário realiza login com sua conta Google e escolhe um número inteiro entre 1 e 100.

O navegador envia o número e o token de autenticação para `/api/desenho`.

A Pages Function verifica o token com o Google, obtém o e-mail da conta autenticada e gera o SVG no servidor.

O e-mail utilizado na assinatura não é informado manualmente pelo usuário.

## Estrutura

- `public/index.html` — formulário e botão de login do Google.
- `public/style.css` — aparência da página.
- `public/script.js` — envia o número e o token para a API e exibe o SVG.
- `lib/desenho.js` — função responsável pela geração do SVG.
- `functions/api/desenho.js` — Pages Function responsável pela validação e geração.
- `evidencias/exemplo.svg` — desenho gerado pelo site publicado.

## Publicação no Cloudflare Pages

Framework preset: `None`.

Build command: vazio.

Build output directory: `public`.

## Identificação

Nome: João Pedro Marques Terra
RA: 2026108868
URL: https://2bim-avalia1-njd.pages.dev
