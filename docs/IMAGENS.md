# Imagens e fontes

## Materiais próprios fornecidos

Todos os originais foram preservados. As fotografias de mesa, variantes e páginas do catálogo foram inspecionadas na prancha `tmp/contact-sheet.jpg`. Escolheu-se o melhor material disponível para cada produto, evitando servir as versões de mesa ou páginas completas aos visitantes.

Os 23 arquivos finais em `assets/products/` são recortes de embalagens dos arquivos fornecidos. `scripts/prepare-assets.js` registra a fonte e a máscara de cada recorte. O processamento remove apenas pixels externos à embalagem, mantém a impressão original, centraliza em uma área de 600 × 700 px com transparência e exporta WebP. O fundo creme e a apresentação são compartilhados pelo CSS. Não foram redesenhados logos, textos, pesos ou mascotes.

A ferramenta nativa imagegen foi experimentada em quatro pranchas, mas os resultados foram descartados da publicação por alterarem detalhes impressos — especialmente a embalagem Pérola preta e os textos de arroz/açúcar. A estratégia técnica de recorte preserva os pixels dos originais. A nitidez de alguns produtos permanece limitada pela resolução do catálogo; ampliação não recupera detalhes ausentes. Para zoom fotográfico de alta definição, o ideal é substituir futuramente por packshots originais de estúdio ou artes oficiais, nos mesmos caminhos.

`assets/brand/pr-logo.webp`: extraído de `pdf-page-2.jpg`. `assets/institutional/empacotadora.webp`: recorte somente do equipamento em `empacotamos-sua-marca.png`; não representa uma nova fotografia da instalação.

## Fotografias ilustrativas geradas

Geradas com a ferramenta nativa imagegen, sem download de fotografias protegidas de bancos ou de sites de receitas. Copiadas para o projeto e otimizadas em WebP nas larguras de 640, 960 e 1440 px:

- `assets/backgrounds/mesa-brasileira-*.webp`: composição de arroz, feijão e farofa, luz natural e mesa em tons creme.
- `assets/institutional/campo-*.webp`: campo agrícola genérico ao entardecer. Não identificado como fazenda da P&R.
- `assets/recipes/feijao-tropeiro-*.webp`: feijão, farinha, ovos, bacon e linguiça.
- `assets/recipes/arroz-com-legumes-*.webp`: arroz com cenoura, milho e ervilhas.
- `assets/recipes/farofa-de-banana-*.webp`: farofa de mandioca e banana.
- `assets/recipes/arroz-doce-*.webp`: arroz-doce com canela.
- `assets/recipes/pipoca-caramelada-*.webp`: pipoca com caramelo.

Os caminhos dos resultados nativos estão em `data/generated-images.json`. Eles são usados somente para reconstrução dos assets, não pelo navegador. O site funciona apenas com as imagens já salvas em `assets/`.

### Prompts finais

Direção compartilhada: “Photorealistic premium editorial photography, landscape 1536x1024. Warm natural side lighting, authentic textures, sophisticated restrained cream and olive palette. No text, no watermark, no collage.”

Para alimentos: “linen and natural stone table, three quarter overhead close composition, entire dish visible, attractive appetizing real food”, seguida da descrição dos ingredientes acima.

Para campo: “Sweeping agricultural green crop rows on gently rolling Brazilian countryside at golden hour, distant trees, warm sunlit haze. No buildings, no people, no brand. Not a specific company farm.”

Para Home: “Overhead slightly angled close view of beautiful Brazilian family lunch on warm natural beige linen table: large ivory ceramic bowl of freshly cooked white long grain rice, rustic deep brown ceramic bowl of glossy cooked carioca beans with delicate steam, small bowl of golden cassava farofa, fresh parsley, wooden serving spoon. Main dishes filling frame on the right and center, tactile natural surfaces, gentle afternoon sunlight, authentic appetizing food, sophisticated restrained olive cream warm earth color palette, realistic food photography, no text, no branding, no packaging, no montage.”

## Tipografia

DM Sans variável e DM Serif Display, hospedadas localmente, distribuídas por Fontsource sob SIL Open Font License. Licenças integrais em `assets/brand/LICENSE-dm-sans.txt` e `LICENSE-dm-serif.txt`.

## Receitas

Textos próprios e adaptações culinárias, com fontes registradas no campo `source` de `data/recipes.js` e vinculadas em cada página. As fotografias não foram copiadas das fontes. Tempos e rendimentos são estimativas; as receitas não foram testadas em cozinha neste trabalho.
