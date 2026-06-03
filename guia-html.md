# Guia Rápida de HTML (Iniciante)

Use esta página como cola sempre que for criar um arquivo novo.

## Mantra para lembrar sempre

`head configura | body mostra | css enfeita | js faz agir`

## Estrutura base (copie e cole)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Título da página</title>
  <link rel="stylesheet" href="style.css" />
  <script src="script.js" defer></script>
</head>
<body>
  <header>
    <h1>Título principal</h1>
  </header>

  <main>
    <section>
      <h2>Subtítulo</h2>
      <p>Seu conteúdo aqui.</p>
    </section>
  </main>

  <footer>
    <p>Rodapé</p>
  </footer>
</body>
</html>
```

## Quando usar cada tag

- `header`: topo da página.
- `nav`: menu de links.
- `main`: conteúdo principal.
- `section`: bloco de assunto.
- `footer`: rodapé.
- `div`: bloco genérico (quando não houver tag semântica melhor).

## Como linkar arquivos (sem se perder)

- Mesmo nível: `href="sobre.html"`
- Arquivo dentro de pasta: `src="img/foto.jpg"`
- Voltar uma pasta: `href="../index.html"`

## Tags que você precisa dominar primeiro

- Títulos: `h1` até `h6`
- Texto: `p`, `strong`, `em`
- Link: `a`
- Imagem: `img`
- Lista: `ul`, `ol`, `li`
- Formulário: `form`, `label`, `input`, `button`

## Checklist antes de terminar a página

- Coloquei `<!DOCTYPE html>`?
- O idioma está em `lang="pt-BR"`?
- O CSS está linkado no `head`?
- O JavaScript está com `defer`?
- Toda imagem tem `alt`?
- A página tem `header`, `main` e `footer`?

## Treino diário (10 minutos)

1. Reescreva a estrutura base sem olhar.
2. Monte um `header`, `main` e `footer`.
3. Adicione 2 links e 1 imagem com caminho correto.
4. Revise o checklist.
