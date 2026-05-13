import { marked } from '/vendor/marked.esm.js';

const app = document.getElementById('app');
const state = { pack: null };

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

function setMode(mode) {
  document.body.classList.remove('shelf-view', 'reader-view', 'sb-collapsed', 'drawer-open');
  document.body.classList.add(mode);
}

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
  setMode('shelf-view');
  app.className = 'app-shell shelf-mode';
  document.title = 'SiliWiki / 硅基笔记';
  app.innerHTML = `<main class="shelf-page">
    <section class="shelf-hero">
      <p class="eyebrow">Local-first · Agent-generated · Markdown Wiki</p>
      <h1><em>硅基笔记</em><br>SiliWiki</h1>
      <p class="lede">把本地 Agent 的写作能力接进一套统一 Wiki UI：Skill 负责约束生成，SiliWiki 负责校验、渲染、搜索、词条与导出。</p>
      <div class="shelf-actions">
        <a href="/wiki/siliwiki-v1" data-link class="shelf-btn primary">打开 V1 使用说明</a>
        <a href="/wiki/demo" data-link class="shelf-btn">打开 Demo Wiki</a>
        <a href="#quick-start" class="shelf-btn">本地三步上手</a>
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
  return `<a class="wiki-card" href="/wiki/${encodeURIComponent(wiki.slug)}" data-link style="--card-accent:${escapeHtml(wiki.accent || '#a63d00')}">
    <div class="cover"><span>${escapeHtml(wiki.logoText || wiki.slug.slice(0, 3).toUpperCase())}</span></div>
    <div class="meta">
      <span class="tag">${escapeHtml(wiki.version || 'local')}</span>
      <h3>${escapeHtml(wiki.title || wiki.slug)}</h3>
      <p>${escapeHtml(wiki.sub || wiki.description || 'Local SiliWiki content pack')}</p>
      <div class="kv"><span>${wiki.counts?.headings || 0} headings</span><span>${wiki.counts?.glossaryTerms || 0} terms</span><span>${escapeHtml(wiki.updated || 'draft')}</span></div>
    </div>
  </a>`;
}

async function renderWiki(slug) {
  setMode('reader-view');
  app.className = 'app-shell reader-mode';
  app.innerHTML = '<div class="wiki-loading">加载中…</div>';
  try {
    const pack = await api(`/api/wiki/${encodeURIComponent(slug)}`);
    state.pack = pack;
    const meta = pack.meta || {};
    document.title = meta.title || slug;
    const root = document.documentElement;
    root.style.setProperty('--accent', meta.accent || '#a63d00');
    root.style.setProperty('--accent-soft', meta.accentSoft || '#f4e9df');
    root.style.setProperty('--accent-dark', meta.accentDark || '#7a2b00');

    marked.setOptions({ gfm: true, breaks: false });
    const rawHtml = marked.parse(pack.content || '');
    const title = meta.title || 'Wiki';
    const sub = meta.sub || meta.version || '';
    const logoText = meta.logoText || title.slice(0, 3);
    const footerParts = [];
    if (meta.version || meta.updated) footerParts.push(`<div><strong>${escapeHtml(title)}</strong>${meta.version ? ' · ' + escapeHtml(meta.version) : ''}${meta.updated ? ' · 更新于 ' + escapeHtml(meta.updated) : ''}</div>`);
    if (meta.disclaimer) footerParts.push(`<div class="disc">${escapeHtml(meta.disclaimer)}</div>`);
    footerParts.push(`<div style="margin-top:10px;"><a href="/" data-link>← 返回书架</a></div>`);

    app.innerHTML = `
      <div class="search-wrap" id="wikiSearchWrap">
        <input type="search" class="search-input" id="wikiSearch" placeholder="搜索 · Search…" aria-label="搜索" autocomplete="off">
        <span class="search-kbd">⌘K</span>
        <div class="search-results" id="wikiSearchResults" role="listbox"></div>
      </div>
      <div class="mobile-topbar">
        <button class="hamburger" id="wikiDrawerToggle" aria-label="打开目录"><span></span><span></span><span></span></button>
        <div class="title">${escapeHtml(title)}</div>
      </div>
      <div class="drawer-backdrop" id="wikiDrawerBackdrop"></div>
      <div class="container">
        <aside>
          <button class="drawer-close" id="wikiDrawerClose" aria-label="关闭目录">✕</button>
          <div class="sb-header">
            <a class="sb-back" href="/" data-link title="返回书架">←</a>
            <div class="sb-logo">${escapeHtml(logoText)}</div>
            <div class="sb-title"><div class="name">${escapeHtml(title)}</div><div class="sub">${escapeHtml(sub)}</div></div>
            <button class="sb-tool" id="wikiSbToggle" type="button" title="折叠侧栏">‹</button>
          </div>
          <a class="sb-glossary no-autolink" id="wikiGlossaryBtn" style="display:none;"><span aria-hidden="true" style="font-size:14px;">📖</span><span style="flex:1;">词条 / Glossary</span><span aria-hidden="true" style="font-size:11px;opacity:.6;">↗</span></a>
          <div class="sb-export no-autolink" id="wikiExport">
            <button type="button" class="sb-export-btn" id="wikiExportBtn" aria-haspopup="true" aria-expanded="false">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v13"/><path d="M6 10l6 6 6-6"/><path d="M4 21h16"/></svg>
              <span class="label">导出 / Export</span><span class="chev" aria-hidden="true">▾</span>
            </button>
            <div class="sb-export-menu" role="menu">
              <button type="button" data-export="md" role="menuitem">Markdown 源文件<span class="ex-hint">.md (原始内容)</span></button>
              <button type="button" data-export="html" role="menuitem">HTML 离线版<span class="ex-hint">.html (自带样式 · 可离线打开)</span></button>
              <button type="button" data-export="print" role="menuitem">打印 / 另存为 PDF<span class="ex-hint">浏览器打印对话框</span></button>
            </div>
          </div>
          <nav class="nav-tree" id="wikiNav"></nav>
        </aside>
        <main>
          <div class="local-notice">Localhost content · files stay under <code>content/wikis/${escapeHtml(slug)}</code></div>
          <article id="wikiArticle">${rawHtml}</article>
          <footer class="wiki-footer">${footerParts.join('')}</footer>
        </main>
      </div>
      <div class="sb-export-toast" id="wikiExportToast" role="status" aria-live="polite"></div>
      <div class="gloss-overlay" id="wikiGlossOverlay" role="dialog" aria-modal="true">
        <div class="gloss-panel">
          <button class="gloss-close" id="wikiGlossClose" aria-label="关闭">✕</button>
          <h1>词条 / Glossary</h1>
          <div class="lead" id="wikiGlossLead"></div>
          <div class="gloss-cat-nav" id="wikiGlossCats"></div>
          <div id="wikiGlossList"></div>
        </div>
      </div>
      <div class="ai-assistant" id="wikiAiAssistant">
        <button class="ai-fab" id="wikiAiToggle" type="button" aria-expanded="false" aria-controls="wikiAiPanel">
          <span class="ai-fab-mark">AI</span><span class="ai-fab-label">问答助手</span>
        </button>
        <section class="ai-panel" id="wikiAiPanel" aria-label="SiliWiki AI 问答助手">
          <header class="ai-head">
            <div><strong>SiliWiki AI</strong><span>${escapeHtml(configAiModelLabel())}</span></div>
            <button type="button" class="ai-close" id="wikiAiClose" aria-label="收起 AI 问答助手">✕</button>
          </header>
          <div class="ai-messages" id="wikiAiMessages" aria-live="polite"></div>
          <form class="ai-form" id="wikiAiForm">
            <textarea id="wikiAiInput" rows="2" maxlength="4000" placeholder="基于这本 Wiki 提问…（Enter 发送，Shift+Enter 换行）"></textarea>
            <button type="submit" id="wikiAiSend">发送</button>
          </form>
        </section>
      </div>`;

    const article = document.getElementById('wikiArticle');
    prepareArticle(article, slug);
    buildNav(article, meta.nav || []);
    setupDrawer();
    setupSidebarCollapse();
    setupNavClick();
    setupScrollSpy(article);
    setupSearch(article);
    setupExport(article);
    setupGlossary(pack.glossary, article);
    setupAiAssistant(pack);
    await setupMermaid(article);
    if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ block: 'start' });
  } catch (error) {
    app.innerHTML = `<main class="shelf-page"><a href="/" data-link>← 书架</a><div class="wiki-error">${escapeHtml(error.message)}</div></main>`;
  }
}

function stripExplicitHeadingAnchor(heading) {
  const match = heading.textContent.match(/\s*\{#([A-Za-z0-9_-]+)\}\s*$/);
  if (!match) return '';

  const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
  let lastText = null;
  while (walker.nextNode()) lastText = walker.currentNode;
  if (lastText) {
    lastText.nodeValue = lastText.nodeValue.replace(/\s*\{#[A-Za-z0-9_-]+\}\s*$/, '');
  }
  return match[1];
}

function prepareArticle(article, slug) {
  const used = new Map();
  article.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(heading => {
    const explicitId = stripExplicitHeadingAnchor(heading);
    if (explicitId) heading.id = explicitId;
    if (!heading.id) heading.id = headingToAnchor(heading.textContent, used);
  });
  article.querySelectorAll('img[src], a[href]').forEach(el => {
    const attr = el.tagName === 'IMG' ? 'src' : 'href';
    const value = el.getAttribute(attr);
    if (!value || value.startsWith('#') || /^[a-z]+:/i.test(value) || value.startsWith('/')) return;
    el.setAttribute(attr, `/content/wikis/${slug}/${value.replace(/^\.\//, '')}`);
  });
}

function renderNavPart(part) {
  const colorCls = part.color ? ` part-${part.color}` : '';
  const open = part.open ? ' open' : '';
  const chip = part.chip ? `<span class="chip">${escapeHtml(part.chip)}</span>` : '';
  const chev = `<span class="chev"><svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3,1 7,5 3,9"/></svg></span>`;
  const childrenHtml = (part.children || []).map(renderNavChild).join('');
  return `<details class="nav-part${colorCls}"${open}><summary>${chip}<span>${escapeHtml(part.title || '')}</span>${chev}</summary><div class="nav-children">${childrenHtml}</div></details>`;
}

function renderNavChild(item) {
  if (Array.isArray(item.children) && item.children.length) {
    const open = item.open ? ' open' : '';
    const inner = item.children.map(renderNavChild).join('');
    return `<details class="nav-sub"${open}><summary>${escapeHtml(item.title || '')}</summary><div class="nav-children">${inner}</div></details>`;
  }
  if (item.name || item.role) {
    return `<a class="nav-person" href="#${encodeURIComponent(item.anchor || '')}"><span class="name">${escapeHtml(item.name || item.title || '')}</span><span class="role">${escapeHtml(item.role || '')}</span></a>`;
  }
  return `<a href="#${encodeURIComponent(item.anchor || '')}">${escapeHtml(item.title || item.anchor || '')}</a>`;
}

function buildNav(article, metaNav) {
  const nav = document.getElementById('wikiNav');
  if (Array.isArray(metaNav) && metaNav.length) {
    nav.innerHTML = metaNav.map(renderNavPart).join('');
    return;
  }
  const h2s = Array.from(article.querySelectorAll('h2[id]'));
  const chev = `<span class="chev"><svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3,1 7,5 3,9"/></svg></span>`;
  nav.innerHTML = h2s.map((h2, idx) => {
    const raw = h2.textContent.trim();
    const m = raw.match(/^(\d+)\s*[.、．]\s*(.+)$/);
    const chip = m ? m[1] : String(idx + 1);
    const title = m ? m[2].trim() : raw;
    const h3s = [];
    let next = h2.nextElementSibling;
    while (next && next.tagName !== 'H2') {
      if (next.tagName === 'H3' && next.id) h3s.push(next);
      next = next.nextElementSibling;
    }
    const chipHtml = `<span class="chip">${escapeHtml(chip)}</span>`;
    if (!h3s.length) return `<a class="nav-part-solo" href="#${encodeURIComponent(h2.id)}">${chipHtml}<span>${escapeHtml(title)}</span></a>`;
    const children = h3s.map(h3 => `<a href="#${encodeURIComponent(h3.id)}">${escapeHtml(h3.textContent.trim())}</a>`).join('');
    return `<details class="nav-part"${idx === 0 ? ' open' : ''} data-anchor="${encodeURIComponent(h2.id)}"><summary>${chipHtml}<span>${escapeHtml(title)}</span>${chev}</summary><div class="nav-children">${children}</div></details>`;
  }).join('');
}

function setupDrawer() {
  const toggle = document.getElementById('wikiDrawerToggle');
  const close = document.getElementById('wikiDrawerClose');
  const backdrop = document.getElementById('wikiDrawerBackdrop');
  const open = () => document.body.classList.add('drawer-open');
  const shut = () => document.body.classList.remove('drawer-open');
  toggle?.addEventListener('click', open);
  close?.addEventListener('click', shut);
  backdrop?.addEventListener('click', shut);
  document.querySelector('aside')?.addEventListener('click', e => { if (e.target.closest('a[href^="#"]')) setTimeout(shut, 50); });
}

function setupSidebarCollapse() {
  const btn = document.getElementById('wikiSbToggle');
  const aside = document.querySelector('aside');
  if (!btn || !aside) return;
  const sync = () => { const col = document.body.classList.contains('sb-collapsed'); btn.textContent = col ? '›' : '‹'; btn.title = col ? '展开侧栏' : '折叠侧栏'; };
  btn.addEventListener('click', () => { document.body.classList.toggle('sb-collapsed'); sync(); });
  aside.addEventListener('click', e => { if (document.body.classList.contains('sb-collapsed') && e.target !== btn) { document.body.classList.remove('sb-collapsed'); sync(); } });
  sync();
}

function setupNavClick() {
  const nav = document.getElementById('wikiNav');
  nav?.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = decodeURIComponent(a.getAttribute('href').slice(1));
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    let p = a.parentElement;
    while (p && p !== nav) { if (p.tagName === 'DETAILS') p.open = true; p = p.parentElement; }
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', '#' + id);
  });
}

function setupScrollSpy(article) {
  const nav = document.getElementById('wikiNav');
  const heads = Array.from(article.querySelectorAll('h2[id],h3[id]'));
  if (!nav || !heads.length) return;
  const linkById = new Map();
  nav.querySelectorAll('a[href^="#"]').forEach(a => linkById.set(decodeURIComponent(a.getAttribute('href').slice(1)), a));
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY + 120;
      let current = null;
      for (const h of heads) { if (h.offsetTop <= y) current = h; else break; }
      nav.querySelectorAll('a.active,.nav-part.active').forEach(el => el.classList.remove('active'));
      if (current) {
        const link = linkById.get(current.id);
        if (link) { link.classList.add('active'); link.closest('details.nav-part')?.classList.add('active'); }
      }
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

async function setupMermaid(article) {
  const codeBlocks = Array.from(article.querySelectorAll('pre > code.language-mermaid'));
  if (!codeBlocks.length) return;

  for (const code of codeBlocks) {
    const pre = code.parentElement;
    pre.className = 'mermaid-lite';
    pre.innerHTML = renderMermaidLite(code.textContent);
  }
}

function renderMermaidLite(source) {
  const text = String(source || '').trim();
  if (/^sequenceDiagram/m.test(text)) return renderSequenceLite(text);
  return renderFlowLite(text);
}

function parseMermaidLabel(raw) {
  const value = String(raw || '').trim().replace(/;$/, '');
  const quoted = value.match(/[\[\(\{]"([^"]+)"[\]\)\}]/);
  if (quoted) return quoted[1];
  const bracket = value.match(/[\[\(\{]([^\]\)\}]+)[\]\)\}]/);
  if (bracket) return bracket[1].replace(/^"|"$/g, '');
  return value.replace(/^[A-Za-z0-9_\u4e00-\u9fff-]+/, '').replace(/[\[\]\(\)\{\}"]/g, '').trim() || value.trim();
}

function parseMermaidEndpoint(raw) {
  const value = String(raw || '').trim().replace(/;$/, '');
  const idMatch = value.match(/^([A-Za-z0-9_\u4e00-\u9fff-]+)/);
  const id = idMatch ? idMatch[1] : value.replace(/[^A-Za-z0-9_\u4e00-\u9fff-]+/g, '_') || `node_${Math.random().toString(36).slice(2)}`;
  const shape = new RegExp(`^${id}\\s*\\{`).test(value) ? 'diamond' : 'rect';
  return { id, label: parseMermaidLabel(value) || id, shape };
}

function renderFlowLite(text) {
  const graph = buildFlowGraph(text);
  if (!graph.edges.length && graph.nodes.size <= 1) return `<code>${escapeHtml(text)}</code>`;
  return renderFlowSvg(graph);
}

function buildFlowGraph(text) {
  const nodes = new Map();
  const edges = [];
  const captions = [];
  let direction = 'TB';

  const rememberNode = node => {
    const existing = nodes.get(node.id);
    if (existing) {
      if (node.label && node.label !== node.id) existing.label = node.label;
      if (node.shape === 'diamond') existing.shape = 'diamond';
      return existing;
    }
    const stored = { ...node, order: nodes.size, type: 'normal' };
    nodes.set(node.id, stored);
    return stored;
  };

  for (const rawLine of String(text || '').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    const caption = line.match(/^%%\s*caption:\s*(.+)$/i);
    if (caption) { captions.push(caption[1].trim()); continue; }
    if (/^%%/.test(line)) continue;
    const dir = line.match(/^(?:flowchart|graph)\s+([A-Z]{2})/i);
    if (dir) { direction = dir[1].toUpperCase(); continue; }
    if (/^subgraph\s+/i.test(line) || /^end$/i.test(line)) continue;

    const cleaned = line.replace(/;$/, '');
    const edgeMatch = cleaned.match(/^(.+?)\s*(-->|---|==>|-.->)\s*(?:\|"?([^"|]+)"?\|\s*)?(.+)$/);
    if (edgeMatch) {
      const from = rememberNode(parseMermaidEndpoint(edgeMatch[1]));
      const to = rememberNode(parseMermaidEndpoint(edgeMatch[4]));
      edges.push({ from: from.id, to: to.id, label: (edgeMatch[3] || '').trim(), style: edgeMatch[2] });
      continue;
    }

    const nodeLine = cleaned.match(/^([A-Za-z0-9_\u4e00-\u9fff-]+)\s*[\[\{\(]/);
    if (nodeLine) rememberNode(parseMermaidEndpoint(cleaned));
  }

  assignFlowTypes(nodes, edges);
  return { nodes, edges, captions, direction };
}

function assignFlowTypes(nodes, edges) {
  const outgoing = new Map();
  for (const edge of edges) {
    if (!outgoing.has(edge.from)) outgoing.set(edge.from, []);
    outgoing.get(edge.from).push(edge.to);
  }
  for (const [from, targets] of outgoing) {
    if (targets.length >= 3) {
      for (const target of targets) {
        const node = nodes.get(target);
        if (node) node.type = 'app';
      }
    }
  }
  for (const node of nodes.values()) {
    if (/正文|词条|来源|图片|附件|资料|封面|目录/.test(node.label)) node.type = 'app';
    if (node.shape === 'diamond') node.type = 'decision';
  }
}

function getFlowGroups(graph) {
  const nodes = Array.from(graph.nodes.values()).sort((a, b) => a.order - b.order);
  const levels = new Map(nodes.map(node => [node.id, 0]));
  for (let i = 0; i < nodes.length; i += 1) {
    for (const edge of graph.edges) {
      levels.set(edge.to, Math.max(levels.get(edge.to) || 0, (levels.get(edge.from) || 0) + 1));
    }
  }

  const groups = new Map();
  for (const node of nodes) {
    const level = levels.get(node.id) || 0;
    if (!groups.has(level)) groups.set(level, []);
    groups.get(level).push(node);
  }
  const orderedLevels = Array.from(groups.keys()).sort((a, b) => a - b);
  return { groups, orderedLevels };
}

function layoutFlowNodes(graph) {
  const { groups, orderedLevels } = getFlowGroups(graph);
  const isLR = /^LR|RL$/i.test(graph.direction);
  const maxGroup = Math.max(1, ...orderedLevels.map(level => groups.get(level).length));
  const levelCount = Math.max(1, orderedLevels.length);
  const nodeW = 154;
  const appW = 154;
  const nodeH = 58;
  const diamondW = 150;
  const diamondH = 82;
  const xGap = 176;
  const yGap = 106;
  const marginX = 80;
  const marginY = 52;
  const width = isLR ? Math.max(680, marginX * 2 + (levelCount - 1) * xGap + nodeW) : Math.max(740, marginX * 2 + (maxGroup - 1) * xGap + nodeW);
  const height = isLR ? Math.max(300, marginY * 2 + (maxGroup - 1) * yGap + nodeH) : Math.max(280, marginY * 2 + (levelCount - 1) * yGap + nodeH);
  const positioned = new Map();

  for (const level of orderedLevels) {
    const group = groups.get(level);
    group.forEach((node, index) => {
      const w = node.shape === 'diamond' ? diamondW : (node.type === 'app' ? appW : nodeW);
      const h = node.shape === 'diamond' ? diamondH : nodeH;
      let x;
      let y;
      if (isLR) {
        x = marginX + level * xGap + nodeW / 2;
        const groupHeight = (group.length - 1) * yGap;
        y = height / 2 - groupHeight / 2 + index * yGap;
      } else {
        const groupWidth = (group.length - 1) * xGap;
        x = width / 2 - groupWidth / 2 + index * xGap;
        y = marginY + level * yGap + h / 2;
      }
      positioned.set(node.id, { ...node, x, y, w, h, level, index });
    });
  }

  return { width, height, nodes: positioned, isLR, compact: false };
}

function shouldUseCompactFlowLayout(graph) {
  if (!graph || graph.nodes.size <= 2) return false;
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(max-width: 560px)').matches;
}

function layoutCompactFlowNodes(graph) {
  const { groups, orderedLevels } = getFlowGroups(graph);
  const nodeW = 144;
  const appW = 144;
  const nodeH = 58;
  const diamondW = 142;
  const diamondH = 76;
  const width = 342;
  const marginY = 26;
  const levelGap = 44;
  const rowGap = 18;
  const columnGap = 14;
  const positioned = new Map();
  let cursorY = marginY;

  for (const level of orderedLevels) {
    const group = groups.get(level);
    const columns = group.length === 1 ? 1 : 2;
    const rowHeight = Math.max(...group.map(node => node.shape === 'diamond' ? diamondH : nodeH));
    const cellW = Math.max(nodeW, appW, diamondW);
    const gridW = columns * cellW + (columns - 1) * columnGap;
    const startX = width / 2 - gridW / 2 + cellW / 2;

    group.forEach((node, index) => {
      const w = node.shape === 'diamond' ? diamondW : (node.type === 'app' ? appW : nodeW);
      const h = node.shape === 'diamond' ? diamondH : nodeH;
      const col = index % columns;
      const row = Math.floor(index / columns);
      const x = columns === 1 ? width / 2 : startX + col * (cellW + columnGap);
      const y = cursorY + row * (rowHeight + rowGap) + rowHeight / 2;
      positioned.set(node.id, { ...node, x, y, w, h, level, index });
    });

    const rows = Math.ceil(group.length / columns);
    cursorY += rows * rowHeight + Math.max(0, rows - 1) * rowGap + levelGap;
  }

  const height = Math.max(220, cursorY - levelGap + marginY);
  return { width, height, nodes: positioned, isLR: false, compact: true };
}

function renderFlowSvg(graph) {
  const layout = shouldUseCompactFlowLayout(graph) ? layoutCompactFlowNodes(graph) : layoutFlowNodes(graph);
  const hash = Math.abs(hashString(Array.from(graph.nodes.keys()).join('|') + graph.edges.length + (layout.compact ? '-m' : '-d'))).toString(36);
  const markerId = `m-arrow-${hash}`;
  const edges = graph.edges.map(edge => renderFlowEdge(edge, layout, markerId)).join('');
  const nodes = Array.from(layout.nodes.values()).map(renderNodeShape).join('');
  const caption = graph.captions.length ? `<figcaption class="m-caption">${escapeHtml(graph.captions.join(' '))}</figcaption>` : '';
  return `<figure class="m-lite m-figure m-flowchart" data-layout="${layout.compact ? 'mobile' : 'desktop'}"><svg class="m-graph" viewBox="0 0 ${layout.width} ${layout.height}" role="img" aria-label="SiliWiki flowchart diagram"><defs><marker id="${markerId}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" class="m-arrow-head" /></marker></defs><g class="m-links">${edges}</g><g class="m-nodes">${nodes}</g></svg>${caption}</figure>`;
}

function renderFlowEdge(edge, layout, markerId) {
  const from = layout.nodes.get(edge.from);
  const to = layout.nodes.get(edge.to);
  if (!from || !to) return '';
  const a = anchorPoint(from, to, layout.isLR, true);
  const b = anchorPoint(to, from, layout.isLR, false);
  const path = layout.isLR
    ? `M ${a.x} ${a.y} C ${(a.x + b.x) / 2} ${a.y}, ${(a.x + b.x) / 2} ${b.y}, ${b.x} ${b.y}`
    : `M ${a.x} ${a.y} C ${a.x} ${(a.y + b.y) / 2}, ${b.x} ${(a.y + b.y) / 2}, ${b.x} ${b.y}`;
  const label = edge.label ? `<text class="m-edge-label" x="${(a.x + b.x) / 2}" y="${(a.y + b.y) / 2 - 5}" text-anchor="middle">${escapeHtml(edge.label)}</text>` : '';
  return `<path class="m-link" d="${path}" marker-end="url(#${markerId})" />${label}`;
}

function anchorPoint(node, other, isLR, isSource) {
  if (isLR) {
    const sign = isSource ? (other.x >= node.x ? 1 : -1) : (other.x < node.x ? -1 : 1);
    return { x: node.x + sign * node.w / 2, y: node.y };
  }
  const sign = isSource ? (other.y >= node.y ? 1 : -1) : (other.y < node.y ? -1 : 1);
  return { x: node.x, y: node.y + sign * node.h / 2 };
}

function renderNodeShape(node) {
  const classes = `m-node ${node.type || 'normal'} ${node.shape === 'diamond' ? 'diamond' : 'rect'}`;
  const labelLines = renderTextLines(node.label, node.x, node.y, node.shape === 'diamond' ? 12 : 11);
  if (node.shape === 'diamond') {
    const points = `${node.x},${node.y - node.h / 2} ${node.x + node.w / 2},${node.y} ${node.x},${node.y + node.h / 2} ${node.x - node.w / 2},${node.y}`;
    return `<g class="${classes}"><polygon points="${points}" />${labelLines}</g>`;
  }
  return `<g class="${classes}"><rect x="${node.x - node.w / 2}" y="${node.y - node.h / 2}" width="${node.w}" height="${node.h}" rx="3" ry="3" />${labelLines}</g>`;
}

function renderTextLines(label, x, y, maxChars = 12) {
  const lines = splitMermaidLabel(label, maxChars).slice(0, 3);
  const start = y - ((lines.length - 1) * 14) / 2 + 4;
  return `<text class="m-label" text-anchor="middle">${lines.map((line, index) => `<tspan x="${x}" y="${start + index * 15}">${escapeHtml(line)}</tspan>`).join('')}</text>`;
}

function splitMermaidLabel(label, maxChars = 12) {
  const text = String(label || '')
    .replace(/<br\s*\/?>(?![^<]*>)/gi, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\s*·\s*/g, ' · ')
    .trim();
  const explicit = text.split(/\n+/).map(part => part.trim()).filter(Boolean);
  const lines = [];
  for (const part of explicit.length ? explicit : [text]) {
    if (part.length <= maxChars) { lines.push(part); continue; }
    const pieces = part.split(/\s+|(?=·)|(?<=·)/).filter(Boolean);
    let current = '';
    for (const piece of pieces) {
      const next = current ? `${current}${piece.startsWith('·') ? ' ' : ' '}${piece}` : piece;
      if (next.length > maxChars && current) { lines.push(current.trim()); current = piece; }
      else current = next;
    }
    if (current) lines.push(current.trim());
  }
  return lines.length ? lines : [''];
}

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < String(value).length; i += 1) hash = ((hash << 5) - hash + String(value).charCodeAt(i)) | 0;
  return hash;
}

function renderSequenceLite(text) {
  const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  const steps = lines.filter(line => line.includes('->>')).map(line => {
    const m = line.match(/^(.+?)-{1,2}>>(.+?):\s*(.+)$/);
    if (!m) return null;
    return { from: m[1].trim(), to: m[2].trim(), label: m[3].trim() };
  }).filter(Boolean);
  if (!steps.length) return `<code>${escapeHtml(text)}</code>`;
  return `<div class="m-lite m-sequence">${steps.map(step => `<div class="m-step"><span>${escapeHtml(step.from)}</span><b>→</b><span>${escapeHtml(step.to)}</span><em>${escapeHtml(step.label)}</em></div>`).join('')}</div>`;
}

function setupSearch(article) {
  const wrap = document.getElementById('wikiSearchWrap');
  const input = document.getElementById('wikiSearch');
  const results = document.getElementById('wikiSearchResults');
  if (!wrap || !input || !results) return;
  const index = Array.from(article.querySelectorAll('h2[id], h3[id]')).map(h => {
    let body = '';
    let n = h.nextElementSibling;
    const stop = h.tagName === 'H2' ? ['H1', 'H2'] : ['H1', 'H2', 'H3'];
    while (n && !(stop.includes(n.tagName) && n.id)) { body += ' ' + (n.textContent || ''); n = n.nextElementSibling; }
    const title = h.textContent.trim();
    return { id: h.id, title, text: `${title} ${body}`.replace(/\s+/g, ' ').trim() };
  });
  function renderResults(q) {
    const query = q.trim().toLowerCase();
    if (!query) { results.innerHTML = '<div class="search-hint">输入关键词开始搜索 · 支持中英文</div>'; results.classList.add('open'); return; }
    const hits = index.filter(x => x.text.toLowerCase().includes(query)).slice(0, 12);
    results.innerHTML = hits.length ? hits.map(h => `<a class="search-result" href="#${encodeURIComponent(h.id)}"><div class="sr-title">${escapeHtml(h.title)}</div><div class="sr-snippet">${escapeHtml(h.text.slice(0, 120))}${h.text.length > 120 ? '…' : ''}</div></a>`).join('') : `<div class="search-empty">无匹配 · No matches for "${escapeHtml(q)}"</div>`;
    results.classList.add('open');
  }
  input.addEventListener('input', e => renderResults(e.target.value));
  input.addEventListener('focus', () => { wrap.classList.add('focused'); renderResults(input.value); });
  results.addEventListener('click', () => { results.classList.remove('open'); input.blur(); });
  document.addEventListener('click', e => { if (!wrap.contains(e.target)) { results.classList.remove('open'); wrap.classList.remove('focused'); } });
  document.addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); input.focus(); input.select(); } });
}

function setupExport(article) {
  const wrap = document.getElementById('wikiExport');
  const btn = document.getElementById('wikiExportBtn');
  const toast = document.getElementById('wikiExportToast');
  const menu = wrap?.querySelector('.sb-export-menu');
  if (!wrap || !btn || !menu) return;
  const showToast = msg => { if (!toast) return; toast.textContent = msg; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1600); };
  const setOpen = open => { wrap.classList.toggle('open', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); };
  const download = (name, content, mime) => { const blob = new Blob([content], { type: `${mime};charset=utf-8` }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000); };
  btn.addEventListener('click', e => { e.stopPropagation(); setOpen(!wrap.classList.contains('open')); });
  document.addEventListener('click', e => { if (!wrap.contains(e.target)) setOpen(false); });
  menu.addEventListener('click', async e => {
    const item = e.target.closest('button[data-export]');
    if (!item) return;
    setOpen(false);
    const kind = item.dataset.export;
    if (kind === 'print') return setTimeout(() => window.print(), 80);
    const slug = state.pack.slug;
    const stamp = new Date().toISOString().slice(0, 10);
    if (kind === 'md') {
      download(`${slug}-${stamp}.md`, state.pack.content || '', 'text/markdown');
      showToast('已导出 Markdown');
    } else if (kind === 'html') {
      const css = await fetch('/assets/siliwiki.css').then(r => r.ok ? r.text() : '').catch(() => '');
      download(`${slug}-${stamp}.html`, `<!doctype html><meta charset="utf-8"><title>${escapeHtml(state.pack.meta.title || slug)}</title><style>${css}</style><main><article>${article.innerHTML}</article></main>`, 'text/html');
      showToast('已导出 HTML');
    }
  });
}

function setupGlossary(glossary, article) {
  if (!glossary || !Array.isArray(glossary.keywords) || !glossary.keywords.length) return;
  const btn = document.getElementById('wikiGlossaryBtn');
  const overlay = document.getElementById('wikiGlossOverlay');
  const close = document.getElementById('wikiGlossClose');
  const lead = document.getElementById('wikiGlossLead');
  const catsEl = document.getElementById('wikiGlossCats');
  const listEl = document.getElementById('wikiGlossList');
  if (!btn || !overlay || !listEl) return;
  const kw = glossary.keywords || [];
  const cats = glossary.categories || [];
  btn.style.display = 'flex';
  lead.textContent = `共 ${kw.length} 条词条 · 点击分类筛选 · 按 ESC 关闭`;
  function renderList(filterKey = '') {
    const items = filterKey ? kw.filter(k => k.category === filterKey) : kw;
    listEl.innerHTML = items.slice().sort((a, b) => (a.display || '').localeCompare(b.display || '')).map(k => {
      const aliases = (k.aliases || []).filter(a => a !== k.display).join(' · ');
      return `<div class="gloss-entry" id="gloss-${escapeHtml(k.slug)}"><h3>${escapeHtml(k.display || k.slug)}</h3>${aliases ? `<div class="aliases">${escapeHtml(aliases)}</div>` : ''}${k.short ? `<div class="short">${escapeHtml(k.short)}</div>` : ''}${k.definition ? `<div class="definition">${escapeHtml(k.definition)}</div>` : ''}</div>`;
    }).join('');
  }
  catsEl.innerHTML = [`<a class="gloss-cat-btn active" data-cat="">全部 · All (${kw.length})</a>`].concat(cats.map(c => `<a class="gloss-cat-btn" data-cat="${escapeHtml(c.key)}" style="--cat:${escapeHtml(c.color || 'var(--accent)')};">${escapeHtml(c.title || c.key)} (${kw.filter(k => k.category === c.key).length})</a>`)).join('');
  renderList('');
  catsEl.addEventListener('click', e => { const a = e.target.closest('.gloss-cat-btn'); if (!a) return; catsEl.querySelectorAll('.gloss-cat-btn').forEach(b => b.classList.remove('active')); a.classList.add('active'); renderList(a.dataset.cat || ''); });
  const openOverlay = slug => { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; if (slug) setTimeout(() => document.getElementById(`gloss-${slug}`)?.scrollIntoView({ block: 'center' }), 50); };
  const closeOverlay = () => { overlay.classList.remove('open'); document.body.style.overflow = ''; };
  btn.addEventListener('click', () => openOverlay());
  close?.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeOverlay(); });
  document.addEventListener('click', e => { const a = e.target.closest('a.kw-link'); if (!a) return; e.preventDefault(); openOverlay(a.dataset.slug || ''); });
  autoLinkGlossary(article, kw);
}

function autoLinkGlossary(article, terms) {
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
      if (!parent || parent.closest('a,button,code,pre,.no-autolink,.gloss-panel')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  const linked = new Set();
  for (const node of nodes) {
    const text = node.nodeValue;
    for (const word of words) {
      if (linked.has(word.slug)) continue;
      const idx = text.toLowerCase().indexOf(word.label.toLowerCase());
      if (idx < 0) continue;
      const span = document.createElement('span');
      span.append(document.createTextNode(text.slice(0, idx)));
      const a = document.createElement('a');
      a.href = '#gloss-' + word.slug;
      a.className = 'kw-link';
      a.dataset.slug = word.slug;
      a.textContent = text.slice(idx, idx + word.label.length);
      span.append(a, document.createTextNode(text.slice(idx + word.label.length)));
      node.parentNode.replaceChild(span, node);
      linked.add(word.slug);
      break;
    }
  }
}

function configAiModelLabel() {
  return 'DeepSeek v4 flash · 基于当前 Wiki';
}

function sanitizeAiHtml(html) {
  const template = document.createElement('template');
  template.innerHTML = String(html || '');
  const blockedTags = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'LINK', 'META', 'FORM', 'INPUT', 'BUTTON']);
  const elements = Array.from(template.content.querySelectorAll('*'));
  for (const el of elements) {
    if (blockedTags.has(el.tagName)) {
      el.remove();
      continue;
    }
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      const value = String(attr.value || '').trim();
      if (name.startsWith('on')) el.removeAttribute(attr.name);
      if (['href', 'src', 'xlink:href'].includes(name) && /^(javascript:|data:text\/html)/i.test(value)) el.removeAttribute(attr.name);
      if (name === 'style') el.removeAttribute(attr.name);
    }
    if (el.tagName === 'A') {
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    }
  }
  return template.innerHTML;
}

function renderAiMarkdown(value) {
  marked.setOptions({ gfm: true, breaks: true });
  return sanitizeAiHtml(marked.parse(String(value || '')));
}

function renderAiMessage(message) {
  const role = message.role === 'user' ? '你' : 'AI';
  const body = message.role === 'user' ? `<p>${escapeHtml(message.content)}</p>` : renderAiMarkdown(message.content);
  return `<div class="ai-msg ${message.role}${message.error ? ' error' : ''}"><div class="ai-msg-role">${role}</div><div class="ai-msg-body">${body}</div></div>`;
}

function setupAiAssistant(pack) {
  const widget = document.getElementById('wikiAiAssistant');
  const toggle = document.getElementById('wikiAiToggle');
  const close = document.getElementById('wikiAiClose');
  const panel = document.getElementById('wikiAiPanel');
  const form = document.getElementById('wikiAiForm');
  const input = document.getElementById('wikiAiInput');
  const send = document.getElementById('wikiAiSend');
  const list = document.getElementById('wikiAiMessages');
  if (!widget || !toggle || !panel || !form || !input || !send || !list) return;

  const messages = [{ role: 'assistant', content: `你好，我是 SiliWiki AI 问答助手。可以基于《${pack.meta?.title || pack.slug}》回答问题。` }];
  let loading = false;

  const setOpen = open => {
    widget.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) setTimeout(() => input.focus(), 80);
  };
  const renderMessages = () => {
    const pending = loading ? '<div class="ai-msg assistant pending"><div class="ai-msg-role">AI</div><div class="ai-msg-body"><p>正在读取这本 Wiki 并生成回答…</p></div></div>' : '';
    list.innerHTML = messages.map(renderAiMessage).join('') + pending;
    list.scrollTop = list.scrollHeight;
  };
  const setLoading = value => {
    loading = value;
    send.disabled = value;
    input.disabled = value;
    renderMessages();
  };

  toggle.addEventListener('click', () => setOpen(!widget.classList.contains('open')));
  close?.addEventListener('click', () => setOpen(false));
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question || loading) return;
    messages.push({ role: 'user', content: question });
    input.value = '';
    setLoading(true);
    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          slug: pack.slug,
          question,
          history: messages.slice(-8).map(item => ({ role: item.role, content: item.content }))
        })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || response.statusText);
      messages.push({ role: 'assistant', content: payload.answer || 'DeepSeek 返回了空回答。' });
    } catch (error) {
      messages.push({ role: 'assistant', content: `请求失败：${error.message}\n\n如果是线上部署，请确认 Vercel/服务器已配置 \`DEEPSEEK_API_KEY\`。`, error: true });
    } finally {
      setLoading(false);
    }
  });

  renderMessages();
}

render();
