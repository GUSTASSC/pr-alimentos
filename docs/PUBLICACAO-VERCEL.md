# Publicação na Vercel

Endereço público: **https://pr-alimentos.vercel.app**

Projeto: `pr-alimentos`, na equipe `qr-code10` da conta autenticada. Painel: https://vercel.com/qr-code10/pr-alimentos

O site foi publicado como arquivos estáticos. Não depende do servidor local nem do túnel temporário Cloudflare. A publicação contém somente páginas, CSS, JavaScript, imagens finais, fontes, robots e sitemap. Não inclui fotos originais, documentos internos, dependências de desenvolvimento ou scripts locais.

## Atualizações

Após modificar os dados ou o visual, execute na raiz do projeto:

```powershell
npm.cmd run deploy:vercel
```

Esse comando reconstrói as páginas, prepara `vercel-site/` e publica no projeto já vinculado. O vínculo fica em `vercel-site/.vercel/project.json`; preserve esse arquivo para futuras atualizações. A Vercel pode solicitar autenticação se a sessão expirar.

O domínio confirmado está em `data/company.json` e é usado em canonical, Open Graph e sitemap. Se for conectado um domínio próprio, atualize `siteUrl` e publique novamente.

Verificação pública, sem sessão Vercel: `node scripts/check-public-site.js`. Resultado em `docs/vercel-check.json`.
