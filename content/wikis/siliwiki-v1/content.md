# SiliWiki V1 使用说明与样例

这是一份给普通用户和本地 Agent 使用的第一版说明：你 clone 这个仓库，把内置 skill 给本地 Agent，然后让 Agent 生成 `content/wikis/<slug>` 内容包，最后用 localhost UI 阅读、搜索、打开 glossary、导出。

<div class="tldr">
<h4>一句话</h4>
<strong>SiliWiki / 硅基笔记 = 本地 Wiki UI + Agent 写作 Skill + 可校验内容包。</strong><br>
Skill 负责规定 Agent 怎么写，SiliWiki 负责把生成结果变成可读、可搜、可追溯的本地知识库。
</div>

<div class="stat-grid">
  <div class="stat"><div class="stat-value">3</div><div class="stat-label">核心步骤：安装 / 交给 Agent / 本地预览</div></div>
  <div class="stat"><div class="stat-value">4</div><div class="stat-label">核心文件：meta / content / glossary / sources</div></div>
  <div class="stat"><div class="stat-value">0</div><div class="stat-label">默认云依赖：不需要上传</div></div>
  <div class="stat"><div class="stat-value">1</div><div class="stat-label">统一 UI：书架 + 阅读器</div></div>
</div>

<h2 id="what-you-get">0.1 你会得到什么</h2>

用户安装后得到的是一个可以立刻跑起来的本地知识工作台：

- 一个命令行工具：`siliwiki`
- 一个本地服务：`http://localhost:3000`
- 一个书架首页：展示所有本地 wiki
- 一个阅读器：目录、搜索、glossary、导出
- 一个 Agent 写作 skill：约束本地 Agent 如何生成内容
- 一个内容格式：`content/wikis/<slug>`

<div class="two-col">
<div class="card">
<h4>它不是</h4>
<ul>
<li>不是云端 CMS</li>
<li>不是 Notion 替代品</li>
<li>不是只给人手写的 Markdown 模板</li>
<li>不是一次性网页</li>
</ul>
</div>
<div class="card">
<h4>它是</h4>
<ul>
<li>给 Agent 生成知识内容的 harness</li>
<li>本地优先的 Wiki UI</li>
<li>一套可校验的内容包规范</li>
<li>可以被 git 管理的知识资产</li>
</ul>
</div>
</div>

<h2 id="v1-product-shape">0.2 V1 长什么样</h2>

第一版产品形态非常克制：**不做复杂后台，不做云同步，不做账号系统**。先把「Agent 生成内容 → 本地 UI 阅读」这个闭环做稳。

<div class="diagram flow-diagram">
  <div class="flow-row">
    <div class="flow-node user"><strong>User</strong><span>clone repo<br>提出主题</span></div>
    <div class="flow-arrow">→</div>
    <div class="flow-node skill"><strong>Skill</strong><span>写作说明书<br>规范 Agent</span></div>
    <div class="flow-arrow">→</div>
    <div class="flow-node agent"><strong>Local Agent</strong><span>生成内容<br>补 glossary</span></div>
  </div>
  <div class="flow-row second">
    <div class="flow-node files"><strong>Content Pack</strong><span>meta.json<br>content.md<br>glossary.json</span></div>
    <div class="flow-arrow">→</div>
    <div class="flow-node runtime"><strong>SiliWiki UI</strong><span>localhost<br>目录 / 搜索 / 导出</span></div>
    <div class="flow-arrow">→</div>
    <div class="flow-node reader"><strong>Reader</strong><span>阅读<br>复用<br>继续维护</span></div>
  </div>
</div>

这就是 V1 的样子：**文件是数据库，Skill 是写作协议，UI 是阅读壳。**

<h2 id="install-and-run">1.1 安装并启动</h2>

```bash
git clone <your-siliwiki-repo-url>
cd siliwiki
npm install
npm run dev
```

打开：

```text
http://localhost:3000
```

如果你只想换端口：

```bash
npm run dev -- --port 3123
```

<h2 id="give-skill-to-agent">1.2 把 Skill 给 Agent</h2>

SiliWiki 的重点不是让用户手写所有内容，而是让用户把写作规范交给自己的本地 Agent。

导出 skill：

```bash
npm run skill > siliwiki-skill.md
```

然后把 `siliwiki-skill.md` 的内容贴给本地 Agent，并告诉它：

> 请根据这个 skill，在当前 SiliWiki 仓库里生成一本新的 wiki。主题是：……

<div class="flag-blue">
<strong>关键点：</strong>Skill 相当于“内容说明书”。它不只是 prompt，而是规定 Agent 必须生成哪些文件、如何定义 glossary、如何记录 sources、如何校验结果。
</div>

<h2 id="generate-content-pack">1.3 生成内容包</h2>

先创建一个空内容包：

```bash
npm run new -- battery-recycling --title "Battery Recycling Wiki"
```

生成后目录大概是：

```text
content/wikis/battery-recycling/
├── meta.json
├── content.md
├── glossary.json
└── raw/
    └── sources.md
```

接下来 Agent 应该编辑这些文件：

| 文件 | Agent 要做什么 | 用户为什么需要它 |
|---|---|---|
| `meta.json` | 写标题、版本、主题色、导航 | UI 根据它生成书架卡片和左侧目录 |
| `content.md` | 写正文、章节、表格、图示 | 这是 wiki 的主体内容 |
| `glossary.json` | 写术语、别名、定义、关联 | 统一概念，避免同义词混乱 |
| `raw/sources.md` | 记录来源、证据、待核实点 | 让内容可追溯，方便二次维护 |

<h2 id="preview-and-validate">1.4 预览与校验</h2>

每次 Agent 写完后，先跑：

```bash
npm run validate
npm run smoke
```

通过后再启动 UI：

```bash
npm run dev
```

打开：

```text
http://localhost:3000/wiki/battery-recycling
```

校验会检查：

- wiki slug 是否安全
- 是否缺 `meta.json` / `content.md`
- `meta.nav` 里的 anchor 是否真的存在
- `glossary.json` 是否能解析
- glossary term slug 是否重复
- glossary category 是否引用了不存在的分类
- 内容包里是否出现 `.env`、private key、明显 token 等敏感文件

<h2 id="wiki-spec">2.1 什么是 Wiki</h2>

在 SiliWiki 里，Wiki 不是一个网页，也不是数据库里的一条记录，而是一个本地文件夹：

```text
content/wikis/<slug>/
```

它至少包含：

- `meta.json`
- `content.md`

推荐包含：

- `glossary.json`
- `raw/sources.md`
- `images/`

<div class="card">
<h4>判断一本 wiki 是否合格</h4>
<p>如果一个陌生人只看这一个文件夹，就能知道它讲什么、术语怎么定义、内容依据来自哪里、如何继续维护，那么它就是合格的 SiliWiki 内容包。</p>
</div>

<h2 id="glossary-spec">2.2 什么是 Glossary</h2>

Glossary 是概念压缩层。它解决的是长期内容最容易坏掉的问题：**同一个东西有很多叫法，不同 Agent 写着写着就散了。**

一个 term 的结构：

```json
{
  "slug": "content-pack",
  "display": "Content Pack",
  "aliases": ["内容包", "wiki folder"],
  "category": "core",
  "short": "一份可被 SiliWiki 渲染的本地 wiki 文件夹。",
  "definition": "Content Pack 是 SiliWiki 的基本内容单位，通常包含 meta.json、content.md、glossary.json、raw/sources.md 和 images/。",
  "related": ["wiki", "glossary"],
  "sources": ["raw/sources.md#siliwiki-v1-design"]
}
```

Glossary 同时服务三类对象：

1. **读者**：不懂术语时可以点开看解释。
2. **Agent**：下次维护时沿用同一套词汇。
3. **系统**：自动链接正文中的术语，形成概念网络。

<h2 id="source-registry">2.3 什么是来源登记</h2>

`raw/sources.md` 是证据登记簿。它不需要很漂亮，但必须诚实。

推荐写法：

```markdown
## siliwiki-v1-design

- Type: local product design note
- Date: 2026-04-27
- Used by: content.md, glossary.json
- Notes: Defines SiliWiki V1 flow: clone repo → hand skill to agent → render locally.
```

<div class="flag-yellow">
<strong>原则：</strong>Agent 可以总结，但不能伪造来源。没有来源就写“待核实”，不要装作已经引用。
</div>

<h2 id="system-architecture">3.1 系统架构图</h2>

<div class="diagram architecture-diagram">
  <div class="arch-layer">
    <div class="arch-box frontend"><strong>Browser UI</strong><span>书架 / Reader / Search / Glossary / Export</span></div>
  </div>
  <div class="arch-arrow">↓ GET /api/library · GET /api/wiki/:slug</div>
  <div class="arch-layer">
    <div class="arch-box backend"><strong>Local Express Server</strong><span>localhost only · static assets · JSON API</span></div>
    <div class="arch-box cli"><strong>SiliWiki CLI</strong><span>dev / new / validate / skill / doctor</span></div>
  </div>
  <div class="arch-arrow">↓ read / write local files</div>
  <div class="arch-layer">
    <div class="arch-box data"><strong>Content Packs</strong><span>content/wikis/&lt;slug&gt;</span></div>
    <div class="arch-box harness"><strong>Agent Harness</strong><span>skills + schemas + templates</span></div>
  </div>
  <div class="arch-arrow">↔ user-controlled local agent</div>
</div>

架构重点：

- UI 不直接操作云服务，只读 localhost API。
- Server 不需要数据库，只读本地文件。
- CLI 负责创建、校验、导出 skill。
- Agent 不需要懂 UI，只要按内容包规范写文件。

<h2 id="generation-sequence">3.2 生成链路</h2>

<div class="diagram sequence-diagram">
  <div><strong>User</strong><span>npm run skill</span></div>
  <div><strong>Agent</strong><span>读取 skill + 用户主题</span></div>
  <div><strong>CLI</strong><span>npm run new -- slug</span></div>
  <div><strong>Files</strong><span>写 meta/content/glossary/sources</span></div>
  <div><strong>Validator</strong><span>npm run validate</span></div>
  <div><strong>UI</strong><span>localhost 渲染</span></div>
</div>

对应的实际命令：

```bash
npm run skill > siliwiki-skill.md
npm run new -- my-topic --title "My Topic"
# agent writes content/wikis/my-topic/*
npm run validate
npm run dev
```

<h2 id="folder-map">3.3 文件结构</h2>

<div class="file-tree">
<pre><code>siliwiki/
├── bin/siliwiki.mjs                 # CLI 入口
├── src/server.mjs                   # localhost server + API
├── src/core/                        # slug / wiki pack / validation
├── public/                          # 无构建前端 UI
├── content/wikis/                   # 用户和 Agent 生成的 wiki
│   ├── demo/                        # 英文/双语 demo
│   └── siliwiki-v1/                 # 本说明：第一版样例
├── templates/wiki/                  # npm run new 使用的模板
├── skills/siliwiki-writer/SKILL.md  # 给本地 Agent 的写作 skill
├── harness/schemas/                 # meta/glossary JSON schema
└── docs/                            # 架构、内容规范、测试结果</code></pre>
</div>

<h2 id="example-prompt">4.1 给 Agent 的样例 prompt</h2>

你可以这样对本地 Agent 说：

```text
请阅读 siliwiki-skill.md，并在当前仓库里创建一本 SiliWiki。
主题：AI Agent Memory Frameworks
slug：agent-memory
目标读者：想快速理解长期记忆架构的产品经理和工程师
要求：
1. 生成 content/wikis/agent-memory/meta.json
2. 生成 content/wikis/agent-memory/content.md
3. 生成 content/wikis/agent-memory/glossary.json
4. 生成 content/wikis/agent-memory/raw/sources.md
5. 至少包含：概念地图、框架比较表、术语表、待核实问题
6. 跑 npm run validate，并修复所有错误
```

Agent 完成后，用户只需要打开：

```text
http://localhost:3000/wiki/agent-memory
```

<h2 id="v1-scope">4.2 V1 范围</h2>

V1 做：

- 本地书架
- 本地 reader UI
- Markdown 渲染
- Glossary overlay / auto-link
- 导出 Markdown / HTML / Print
- CLI 创建新 wiki
- CLI 导出 skill
- 内容包校验
- demo / V1 样例

V1 暂不做：

- 账号系统
- 云同步
- 多人权限
- 内置 AI API 调用
- 在线发布平台
- 所见即所得编辑器

<div class="flag-green">
<strong>为什么这么切：</strong>先把“用户自己的 Agent 能稳定生成本地 Wiki”跑通，再考虑云端协作和发布。这样开源项目边界清楚，用户也更容易信任。
</div>

<h2 id="next-steps">4.3 下一步</h2>

建议下一版优先做：

1. **Mermaid runtime 渲染**：正文里的 `mermaid` code block 直接显示成图。
2. **内容包 diff view**：让用户看到 Agent 改了哪些内容。
3. **Agent adapter 示例**：给 Codex / Claude Code / OpenCode 各写一份操作教程。
4. **导入器**：从一组 Markdown / transcript / PDF 摘要生成 wiki 初稿。
5. **Theme presets**：让每本 wiki 快速选择不同视觉风格。

最终目标不是做一个重 CMS，而是让用户觉得：

> “我只需要把说明书给 Agent，它就能把一个主题整理成一本可以长期维护的本地 Wiki。”
