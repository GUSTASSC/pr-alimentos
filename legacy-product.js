const productIds = ["feijao-da-mamae-carioca","feijao-da-mamae-preto","feijao-da-mamae-fradinho","feijao-da-mamae-jalo","feijao-da-mamae-vermelho","feijao-da-mamae-rajado-claro","feijao-da-mamae-rajado","arroz-da-mamae","arroz-da-mamae-5kg","acucar-cristal-da-mamae-2kg","acucar-cristal-da-mamae","farinha-amarela","farinha-branca","sal-refinado","sal-grill","polvilho","pipoca","feijao-du-chef","feijao-du-chef-preto","feijao-perola","feijao-perola-preto","feijao-xodo","feijao-maravilha"];
const id = new URLSearchParams(location.search).get('id');
if (productIds.includes(id)) location.replace('produtos/' + id + '.html');
else if (id) document.querySelector('#legacyProduct p').textContent = 'Não encontramos este produto. Consulte o catálogo para escolher outra opção.';
