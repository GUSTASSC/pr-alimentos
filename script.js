(() => {
  'use strict';
  const whatsappUrl = message => `https://wa.me/5561993323924?text=${encodeURIComponent(message)}`;
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    const close = (restoreFocus = false) => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      if (restoreFocus) toggle.focus();
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => close()));
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) close(true); });
    document.addEventListener('click', event => { if (!event.target.closest('.site-header')) close(); });
    document.addEventListener('focusin', event => { if (!event.target.closest('.site-header')) close(); });
    matchMedia('(min-width: 981px)').addEventListener('change', () => close());
  }
  const grid = document.querySelector('#productGrid');
  if (grid) {
    const cards = [...grid.querySelectorAll('.product-card')];
    const filters = [...document.querySelectorAll('[data-filter]')];
    const brand = document.querySelector('#brandFilter');
    const search = document.querySelector('#productSearch');
    const params = new URLSearchParams(location.search);
    let category = filters.some(b => b.dataset.filter === params.get('categoria')) ? params.get('categoria') : 'Todos';
    if ([...brand.options].some(option => option.value === params.get('marca'))) brand.value = params.get('marca');
    search.value = params.get('busca') || '';
    function render(updateUrl = true) {
      let count = 0;
      const query = normalize(search.value.trim());
      cards.forEach(card => {
        const show = (category === 'Todos' || card.dataset.category === category) && (!brand.value || card.dataset.brand === brand.value) && normalize(card.dataset.search).includes(query);
        card.hidden = !show;
        if (show) count++;
      });
      filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
      document.querySelector('#resultCount').textContent = `${count} ${count === 1 ? 'produto encontrado' : 'produtos encontrados'}`;
      document.querySelector('#emptyState').hidden = count > 0;
      if (updateUrl) {
        const next = new URL(location.href);
        for (const [key,value] of [['categoria', category === 'Todos' ? '' : category], ['marca',brand.value], ['busca',search.value.trim()]]) {
          if (value) next.searchParams.set(key,value); else next.searchParams.delete(key);
        }
        history.replaceState(null, '', next);
      }
    }
    filters.forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; render(); }));
    brand.addEventListener('change', () => render());
    search.addEventListener('input', () => render());
    document.querySelector('#clearFilters').addEventListener('click', () => { category = 'Todos'; brand.value = ''; search.value = ''; render(); search.focus(); });
    render(false);
  }
  const form = document.querySelector('#quoteForm');
  if (form) {
    const phone = form.elements.whatsapp;
    phone.addEventListener('input', () => phone.setCustomValidity(''));
    form.addEventListener('submit', event => {
      event.preventDefault();
      const digits = phone.value.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 15) {
        phone.setCustomValidity('Informe um telefone com DDD válido.');
        phone.reportValidity();
        return;
      }
      const data = new FormData(form);
      const fields = [['Nome','nome'],['Empresa','empresa'],['WhatsApp','whatsapp'],['E-mail','email'],['Produto','produto'],['Quantidade','quantidade'],['Mensagem','mensagem']];
      const message = 'Olá! Quero solicitar um orçamento à P&R Alimentos do Brasil.\n\n' + fields.map(([label,name]) => `${label}: ${String(data.get(name) || '').trim() || 'Não informado'}`).join('\n');
      const status = document.querySelector('#quoteStatus');
      const link = document.createElement('a');
      link.href = whatsappUrl(message);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Mensagem pronta. Abrir WhatsApp para revisar e enviar ↗';
      status.replaceChildren(link);
      link.focus();
    });
  }
  document.querySelectorAll('[data-print]').forEach(button => button.addEventListener('click', () => window.print()));
})();
