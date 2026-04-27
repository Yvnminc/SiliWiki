import { marked } from '/vendor/marked.esm.js';

const app = document.getElementById('app');
const state = { pack: null, glossaryMap: new Map() };

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

async function api(path) {
  const response = await fetch(path, { cache: 'no-cache' });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || response.statusText);
  return payload;
}

function goto(path) {
  history.pushState({}, '', path);
  render();
}

window.addEventListener('popstate', render);
document.addEventListener('click', event => {
  const link = event.target.closest('a[data-link]');
  if (!link) return;
  event.preventDefault();
  goto(link.getAttribute('href'));
});

function headingToAnchor(text, used = new Map()) {
  let base = String(text || '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .toLowerCase()
    .replace(/[\u2000-\u206f\u2e00-\u2e7f\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';
  const n = (used.get(base) || 0) + 1;
  used.set(base, n);
  return n === 1 ? base : `${base}-${n}`;
}

async function render() {
  const match = location.pathname.match(/^\/wiki\/([a-z0-9-]+)/);
  if (match) await renderWiki(match[1]);
  else await renderShelf();
}

async function renderShelf() {
  app.className = 'app-shell shelf-mode';
  app.innerHTML = `<main class="shelf-page">
    <section class="hero">
      <p class="eyebrow">Local-first · Agent-generated · Markdown Wiki</p>
      <h1><span>硅基笔记</span> SiliWiki</h1>
      <p class="lede">把本地 Agent 的写作能力接进一个统一的 Wiki UI：Skill 负责约束生成，SiliWiki 负责校验、渲染、搜索、词条与导出。</p>
      <div class="hero-actions">
        <a href="/wiki/demo" data-link class="button primary">打开 Demo Wiki</a>
        <a href="#quick-start" class="button">本地三步上手</a>
      </div>
    </section>
    <section class="quick-grid" id="quick-start">
      <div class="quick-card"><strong>1 · Clone</strong><code>git clone &lt;repo&gt;<br>cd siliwiki && npm install</code></div>
      <div class="quick-card"><strong>2 · Skill</strong><code>npm run skill &gt; siliwiki-skill.md</code><span>把 skill 交给你的本地 Agent 对话。</span></div>
      <div class="quick-card"><strong>3 · Localhost</strong><code>npm run dev</code><span>Agent 写入 content/wikis 后，UI 自动读取。</span></div>
    </section>
    <section class="library-head"><h2>本地 Wiki 书架</h2><span id="libraryCount">加载中…</span></section>
    <section class="library" id="library"></section>
  </main>`;
  try {
    const { wikis } = await api('/api/library');
    document.getElementById('libraryCount').textContent = `${wikis.length} wiki pack(s)`;
    document.getElementById('library').innerHTML = wikis.map(renderWikiCard).join('') || `<div class="empty">还没有内容。运行 <code>npm run new -- my-topic</code> 创建第一本。</div>`;
  } catch (error) {
    document.getElementById('library').innerHTML = `<div class="error">${escapeHtml(error.message)}</div>`;
  }
}

function renderWikiCard(wiki) {
  return `<a class="wiki-card" href="/wiki/${encodeURIComponent(wiki.slug)}" data-link style="--card-accent:${escapeHtml(wiki.accent || '#5b3df5')}">
    <div class="cover"><span>${escapeHtml(wiki.logoText || wiki.slug.slice(0, 3).toUpperCase())}</span></div>
    <div class="card-body">
      <div class="tag">${escapeHtml(wiki.version || 'local')}</div>
      <h3>${escapeHtml(wiki.title || wiki.slug)}</h3>
      <p>${escapeHtml(wiki.sub || wiki.description || 'Local SiliWiki content pack')}</p>
      <div class="kv"><span>${wiki.counts?.headings || 0} headings</span><span>${wiki.counts?.glossaryTerms || 0} terms</span><span>${escapeHtml(wiki.updated || 'draft')}</span></div>
    </div>
  </a>`;
}

async function renderWiki(slug) {
  app.className = 'app-shell reader-mode';
  app.innerHTML = '<div class="loading">加载 Wiki…</div>';
  try {
    const pack = await api(`/api/wiki/${encodeURIComponent(slug)}`);
    state.pack = pack;
    document.title = `${pack.meta.title || slug} · SiliWiki`;
    document.documentElement.style.setProperty('--accent', pack.meta.accent || '#5b3df5');
    document.documentElement.style.setProperty('--accent-soft', pack.meta.accentSoft || '#ece8ff');
    document.documentElement.style.setProperty('--accent-dark', pack.meta.accentDark || '#3720c9');
    const html = marked.parse(pack.content || '');
    app.innerHTML = `<div class="reader-layout">
      <aside class="sidebar">
        <a class="back" href="/" data-link>← 书架</a>
        <div class="brand-box"><div class="logo">${escapeHtml(pack.meta.logoText || slug.slice(0, 3).toUpperCase())}</div><div><strong>${escapeHtml(pack.meta.title || slug)}</strong><span>${escapeHtml(pack.meta.sub || pack.meta.version || 'local wiki')}</span></div></div>
        <button class="tool full" id="glossaryBtn" hidden>📖 Glossary</button>
        <div class="export-row">
          <button class="tool" data-export="md">MD</button>
          <button class="tool" data-export="html">HTML</button>
          <button class="tool" data-export="print">Print</button>
        </div>
        <input class="search" id="search" type="search" placeholder="搜索当前 Wiki…">
        <div class="search-results" id="searchResults"></div>
        <nav class="nav-tree" id="navTree"></nav>
      </aside>
      <main class="reader-main">
        <div class="local-notice">Localhost content · files stay under <code>content/wikis/${escapeHtml(slug)}</code></div>
        <article class="article" id="article">${html}</article>
        <footer class="article-footer"><strong>SiliWiki</strong> · Generated locally · <a href="/" data-link>返回书架</a></footer>
      </main>
    </div>
    <div class="gloss-overlay" id="glossOverlay" role="dialog" aria-modal="true"><div class="gloss-panel"><button class="close" id="glossClose">✕</button><div id="glossContent"></div></div></div>`;
    prepareArticle();
    buildNav(pack.meta.nav);
    setupSearch();
    setupExport();
    setupGlossary(pack.glossary);
    if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
  } catch (error) {
    app.innerHTML = `<main class="shelf-page"><a href="/" data-link>← 书架</a><div class="error">${escapeHtml(error.message)}</div></main>`;
  }
}

function prepareArticle() {
  const article = document.getElementById('article');
  const used = new Map();
  article.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(heading => {
    if (!heading.id) heading.id = headingToAnchor(heading.textContent, used);
  });
  article.querySelectorAll('a[href],img[src]').forEach(el => {
    const attr = el.tagName === 'IMG' ? 'src' : 'href';
    const value = el.getAttribute(attr);
    if (!value || value.startsWith('#') || /^[a-z]+:/i.test(value) || value.startsWith('/')) return;
    el.setAttribute(attr, `/content/wikis/${state.pack.slug}/${value.replace(/^\.\//, '')}`);
  });
}

function buildNav(metaNav) {
  const nav = document.getElementById('navTree');
  if (Array.isArray(metaNav) && metaNav.length) {
    nav.innerHTML = metaNav.map(renderNavPart).join('');
    return;
  }
  const headings = Array.from(document.querySelectorAll('#article h2, #article h3'));
  let html = '';
  let open = false;
  for (const h of headings) {
    if (h.tagName === 'H2') {
      if (open) html += '</div></details>';
      html += `<details open><summary>${escapeHtml(h.textContent)}</summary><div>`;
      open = true;
    } else if (open) {
      html += `<a href="#${encodeURIComponent(h.id)}">${escapeHtml(h.textContent)}</a>`;
    }
  }
  if (open) html += '</div></details>';
  nav.innerHTML = html;
}

function renderNavPart(part) {
  const children = (part.children || []).map(child => child.children ? renderNavPart(child) : `<a href="#${encodeURIComponent(child.anchor || '')}">${escapeHtml(child.title || child.anchor || '')}</a>`).join('');
  return `<details ${part.open ? 'open' : ''}><summary><span class="chip">${escapeHtml(part.chip || '')}</span>${escapeHtml(part.title || '')}</summary><div>${children}</div></details>`;
}

function setupSearch() {
  const input = document.getElementById('search');
  const results = document.getElementById('searchResults');
  const blocks = Array.from(document.querySelectorAll('#article h1,#article h2,#article h3,#article p,#article li')).map(el => ({ id: nearestAnchor(el), text: el.textContent.trim() })).filter(x => x.id && x.text);
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }
    const hits = blocks.filter(b => b.text.toLowerCase().includes(q)).slice(0, 8);
    results.innerHTML = hits.map(hit => `<a href="#${encodeURIComponent(hit.id)}">${escapeHtml(hit.text.slice(0, 110))}</a>`).join('') || '<span>无结果</span>';
  });
}

function nearestAnchor(el) {
  if (el.id) return el.id;
  let current = el.previousElementSibling;
  while (current) {
    if (/^H[1-6]$/.test(current.tagName) && current.id) return current.id;
    current = current.previousElementSibling;
  }
  return document.querySelector('#article h1,#article h2')?.id;
}

function setupExport() {
  document.querySelectorAll('[data-export]').forEach(button => button.addEventListener('click', () => {
    const type = button.dataset.export;
    if (type === 'print') return window.print();
    const blob = type === 'md'
      ? new Blob([state.pack.content], { type: 'text/markdown;charset=utf-8' })
      : new Blob([`<!doctype html><meta charset="utf-8"><title>${escapeHtml(state.pack.meta.title)}</title>${document.getElementById('article').outerHTML}`], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.pack.slug}.${type === 'md' ? 'md' : 'html'}`;
    a.click();
    URL.revokeObjectURL(url);
  }));
}

function setupGlossary(glossary) {
  if (!glossary || !Array.isArray(glossary.keywords) || !glossary.keywords.length) return;
  state.glossaryMap = new Map(glossary.keywords.map(term => [term.slug, term]));
  const button = document.getElementById('glossaryBtn');
  button.hidden = false;
  const overlay = document.getElementById('glossOverlay');
  const content = document.getElementById('glossContent');
  const cats = new Map((glossary.categories || []).map(c => [c.key, c]));
  content.innerHTML = `<h2>Glossary / 词条</h2><p>${escapeHtml(glossary.description || 'Canonical terms for this wiki.')}</p>` + glossary.keywords.map(term => `<section class="term-card" id="term-${escapeHtml(term.slug)}"><small>${escapeHtml(cats.get(term.category)?.title || term.category || 'term')}</small><h3>${escapeHtml(term.display || term.slug)}</h3><p><strong>${escapeHtml(term.short || '')}</strong></p><p>${escapeHtml(term.definition || '')}</p>${term.aliases?.length ? `<p class="aliases">Aliases: ${term.aliases.map(escapeHtml).join(', ')}</p>` : ''}</section>`).join('');
  button.addEventListener('click', () => overlay.classList.add('open'));
  document.getElementById('glossClose').addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', event => { if (event.target === overlay) overlay.classList.remove('open'); });
  autoLinkGlossary(glossary.keywords);
  document.addEventListener('click', event => {
    const term = event.target.closest('.gloss-term');
    if (!term) return;
    overlay.classList.add('open');
    document.getElementById(`term-${term.dataset.term}`)?.scrollIntoView({ block: 'start' });
  });
}

function autoLinkGlossary(terms) {
  const article = document.getElementById('article');
  const words = [];
  for (const term of terms) {
    for (const label of [term.display, ...(term.aliases || [])].filter(Boolean)) {
      if (String(label).length >= 2) words.push({ label: String(label), slug: term.slug });
    }
  }
  words.sort((a, b) => b.label.length - a.label.length);
  const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest('a,button,code,pre,.no-glossary')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  const linked = new Set();
  for (const node of nodes) {
    let text = node.nodeValue;
    for (const word of words) {
      if (linked.has(word.slug)) continue;
      const idx = text.toLowerCase().indexOf(word.label.toLowerCase());
      if (idx === -1) continue;
      const before = text.slice(0, idx);
      const hit = text.slice(idx, idx + word.label.length);
      const after = text.slice(idx + word.label.length);
      const span = document.createElement('span');
      span.append(document.createTextNode(before));
      const btn = document.createElement('button');
      btn.className = 'gloss-term';
      btn.dataset.term = word.slug;
      btn.textContent = hit;
      span.append(btn, document.createTextNode(after));
      node.parentNode.replaceChild(span, node);
      linked.add(word.slug);
      break;
    }
  }
}

render();
