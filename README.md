# P&R Alimentos do Brasil

**Site publicado:** https://pr-alimentos.vercel.app — veja `docs/PUBLICACAO-VERCEL.md` para atualizações.

Site institucional estático, responsivo, com catálogo de 23 produtos e 5 receitas. HTML, CSS e JavaScript puro no navegador; nenhuma dependência de execução externa.

## Abrir o site

```powershell
npm.cmd start
```

Acesse **http://localhost:8080**. A raiz de publicação é esta pasta, onde está `index.html`. Não use a pasta superior como raiz.

## Editar conteúdo

- `data/company.json`: dados comerciais e domínio oficial.
- `data/products.js`: produtos, apresentações e referências do material original.
- `data/recipes.js`: receitas, relações com produtos e URLs de referência.
- `scripts/build.js`: componentes compartilhados e montagem das páginas.
- `styles.css`: sistema visual e responsividade.
- `script.js`: menu, filtros, pesquisa e mensagem de orçamento.
- `assets/`: imagens finais, fontes e identidade visual.

Após alterar conteúdo ou componentes, execute `npm.cmd run build`. As páginas geradas ficam na raiz, em `produtos/` e em `receitas/`. As fotos originais em `fotos/`, os JPGs de `produtos/` e os materiais institucionais foram preservados.

## Auditoria

Com o servidor local aberto, execute `npm.cmd test`. Usa Chrome instalado, Playwright e axe-core. O relatório fica em `docs/audit-results.json`; as capturas ficam em `tmp/review/`. Os testes não enviam mensagens ao WhatsApp.

## Publicação e SEO

O domínio da Vercel está configurado em `data/company.json` (`siteUrl`). Canonical, Open Graph absoluto e sitemap são gerados no build. Para mudar para um domínio próprio, atualize `siteUrl` ou informe a variável `SITE_URL` e publique novamente.

Publique os HTMLs da raiz, `produtos/*.html`, `receitas/*.html`, `styles.css`, `script.js`, `legacy-product.js`, `robots.txt`, `sitemap.xml` quando gerado e `assets/`. Configure a hospedagem para servir `404.html` com status 404. `node_modules`, `tmp`, `scripts`, `data`, `docs`, imagens originais e materiais de catálogo não precisam ser publicados.

O servidor incluído destina-se à pré-visualização local. O formulário prepara a mensagem e oferece um link para revisão e envio pelo visitante. Não há API de formulário, banco de dados, analytics ou rastreadores.

## Referências

Veja `docs/ANALISE.md` para fatos da empresa e `docs/IMAGENS.md` para procedência e limitações das imagens. Licenças das fontes estão em `assets/brand/`.
