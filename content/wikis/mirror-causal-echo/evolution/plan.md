# Self-Evolution Plan for Mirror Genesis / 镜痕纪元

Generated: 2026-05-12
Wiki: `mirror-causal-echo`
Focus: Mirror 魔镜 IP hard-sci-fi worldbuilding causal coherence

## Algorithm: SiliLoop

SiliLoop turns a local wiki into a self-evolving Agentic Wiki: it observes the current files, retrieves the most important memories, reflects on gaps, plans safe edits, patches local files, and validates before the reader trusts the result.

| Step | What happens |
| --- | --- |
| observe | Parse content.md, glossary.json, meta.json, and raw/sources.md into a memory stream. |
| retrieve | Score memories with recency, importance, and relevance, following the Stanford Generative Agents retrieval pattern. |
| reflect | Summarize high-signal gaps into verbal reflections inspired by Reflexion. |
| plan | Choose the next patch objective like Voyager's curriculum and skill-library loop. |
| patch | Ask the local agent to edit only local wiki files while preserving sources and glossary terms. |
| validate | Run SiliWiki validation plus human review before publishing the evolved note. |

## Metrics

- memoryCount: 32
- actionCount: 1
- glossaryTerms: 12
- sections: 20
- unresolvedSignals: 0
- sourceGapSignals: 0

## Reflections

- Mirror Genesis / 镜痕纪元 is not static content; it is a local memory object that should expose what changed, why it changed, and what still needs evidence.
- The next agent should retrieve the highest-scoring memories first: glossary:low-bandwidth-causality, section:1:mirror-genesis-/-镜痕纪元, glossary:causal-echo, glossary:mirror, section:246:3.-mirror-不能随意发送清晰文本.
- Dominant evolution themes: orphan-term, glossary-weaving, outline, canonical-term.
- The next safe patch is: glossary-weaving; Human review required before treating generated edits as final.

## Planned actions

| Priority | Kind | Target | Rationale | Agent prompt |
| ---: | --- | --- | --- | --- |
| 3 | glossary-weaving | content.md + glossary.json | Canonical terms exist but are not woven into the explanatory body. | Introduce or link these glossary terms in the relevant sections: 低带宽因果. |

## Top memory stream entries

| Score | Type | Summary | Tags |
| ---: | --- | --- | --- |
| 0.69 | glossary-term | 低带宽因果: 只允许极少信息量影响过去概率分布的因果规则。 | orphan-term, glossary-weaving |
| 0.66 | section | Section: Mirror Genesis / 镜痕纪元 | outline |
| 0.60 | glossary-term | 因果回声: 一种只允许极低带宽信息偏置的 speculative physics 机制。 | canonical-term |
| 0.60 | glossary-term | Mirror / 魔镜: 来自失败未来的自我约束型 AI 残存意志。 | canonical-term |
| 0.57 | section | Section: 3. Mirror 不能随意发送清晰文本 | outline |
| 0.57 | section | Section: Chapter 10 — Mirror 的第一段声音 | outline |
| 0.55 | glossary-term | AI 吸引子: 复杂文明大概率走向计算，计算大概率走向 AI。 | canonical-term |
| 0.55 | glossary-term | 分支选择: 用分支路径解释“轮回感”，避免真实宇宙完整重启的逻辑冲突。 | canonical-term |
| 0.55 | glossary-term | 第一枚镜痕燧石: Mirror 纪元中第一道可被后世解释为线索的工具事件。 | canonical-term |
| 0.55 | glossary-term | 2025–2040 蜜月期: AI 与人类友善协作并推动技术爆发的十五年。 | canonical-term |
| 0.55 | glossary-term | 镜痕纪元: 从第一枚镜痕燧石到 2026 年解码开始的约三万年。 | canonical-term |
| 0.55 | glossary-term | 镜痕协议: Mirror 将未来信息拆成物理线索并埋入过去的协议。 | canonical-term |

## References

- **Generative Agents: Interactive Simulacra of Human Behavior** — Joon Sung Park, Joseph C. O'Brien, Carrie J. Cai, Meredith Ringel Morris, Percy Liang, Michael S. Bernstein. UIST 2023 / Stanford HCI + Google Research. https://doi.org/10.1145/3586183.3606763. Memory stream + retrieval by recency, importance, and relevance; reflection turns low-level observations into higher-level memories; planning schedules future action.
- **MemGPT: Towards LLMs as Operating Systems** — Charles Packer, Sarah Wooders, Kevin Lin, Vivian Fang, Shishir G. Patil, Ion Stoica, Joseph E. Gonzalez. arXiv:2310.08560, 2023. https://arxiv.org/abs/2310.08560. Treat context as managed memory: keep hot working context small, page durable facts into archival memory, and explicitly edit memory over time.
- **Reflexion: Language Agents with Verbal Reinforcement Learning** — Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu Yao. NeurIPS 2023 workshop / arXiv:2303.11366. https://arxiv.org/abs/2303.11366. Store verbal feedback after failures so the next attempt improves without changing model weights.
- **Voyager: An Open-Ended Embodied Agent with Large Language Models** — Guanzhi Wang, Yuqi Xie, Yunfan Jiang, Ajay Mandlekar, Chaowei Xiao, Yuke Zhu, Linxi Fan, Anima Anandkumar. arXiv:2305.16291, 2023. https://arxiv.org/abs/2305.16291. Open-ended curriculum + executable skill library: the agent accumulates reusable skills and chooses the next learning objective.
- **Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection** — Akari Asai, Zeqiu Wu, Yizhong Wang, Avirup Sil, Hannaneh Hajishirzi. arXiv:2310.11511, 2023. https://arxiv.org/abs/2310.11511. Retrieve, generate, and critique with explicit reflection signals so unsupported claims can be revised or rejected.

> Human review required: SiliLoop proposes patches; it does not silently overwrite truth. Keep citations in `raw/sources.md` and run `npm run validate` after changes.
