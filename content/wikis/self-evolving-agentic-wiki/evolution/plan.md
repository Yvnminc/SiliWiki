# Self-Evolution Plan for Self-evolving Agentic Wiki / 自进化代理笔记

Generated: 2026-04-27
Wiki: `self-evolving-agentic-wiki`
Focus: 解释 SiliWiki 如何把本地 wiki、glossary、sources、writer skill 和 evolution plan 组合成可验证的自进化代理笔记。

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

- memoryCount: 16
- actionCount: 1
- glossaryTerms: 7
- sections: 9
- unresolvedSignals: 0
- sourceGapSignals: 0

## Reflections

- Self-evolving Agentic Wiki / 自进化代理笔记 is not static content; it is a local memory object that should expose what changed, why it changed, and what still needs evidence.
- The next agent should retrieve the highest-scoring memories first: section:1:self-evolving-agentic-wiki-/-自进化代理笔记, glossary:evolution-plan, glossary:memory-stream, glossary:sili-loop, section:54:glossary-and-sources-are-part-of-the-interface.
- Dominant evolution themes: outline, canonical-term.
- The next safe patch is: maintenance-pass; Human review required before treating generated edits as final.

## Planned actions

| Priority | Kind | Target | Rationale | Agent prompt |
| ---: | --- | --- | --- | --- |
| 9 | maintenance-pass | content.md | No urgent gaps were found; perform a light clarity and link check. | Improve wording, cross-links, and examples while preserving source anchors. |

## Top memory stream entries

| Score | Type | Summary | Tags |
| ---: | --- | --- | --- |
| 0.64 | section | Section: Self-evolving Agentic Wiki / 自进化代理笔记 | outline |
| 0.63 | glossary-term | Evolution plan: A human-reviewable next-step plan for improving a wiki pack. | canonical-term |
| 0.63 | glossary-term | Memory stream: A ranked list of wiki facts, terms, sources, and gaps. | canonical-term |
| 0.60 | glossary-term | SiliLoop: The observe → retrieve → reflect → plan → patch → validate loop. | canonical-term |
| 0.59 | section | Section: Glossary and sources are part of the interface | outline |
| 0.57 | glossary-term | Glossary: The canonical term layer for a wiki pack. | canonical-term |
| 0.57 | glossary-term | Source anchor: A stable link target inside raw/sources.md. | canonical-term |
| 0.55 | section | Section: SiliLoop: observe → retrieve → reflect → plan → patch → validate | outline |
| 0.55 | section | Section: It is a local wiki that can ask for its own next improvement | outline |
| 0.54 | glossary-term | Reflection: A written summary of what the next agent should notice. | canonical-term |
| 0.52 | section | Section: Why this matters | outline |
| 0.52 | section | Section: Memory model | outline |

## References

- **Generative Agents: Interactive Simulacra of Human Behavior** — Joon Sung Park, Joseph C. O'Brien, Carrie J. Cai, Meredith Ringel Morris, Percy Liang, Michael S. Bernstein. UIST 2023 / Stanford HCI + Google Research. https://doi.org/10.1145/3586183.3606763. Memory stream + retrieval by recency, importance, and relevance; reflection turns low-level observations into higher-level memories; planning schedules future action.
- **MemGPT: Towards LLMs as Operating Systems** — Charles Packer, Sarah Wooders, Kevin Lin, Vivian Fang, Shishir G. Patil, Ion Stoica, Joseph E. Gonzalez. arXiv:2310.08560, 2023. https://arxiv.org/abs/2310.08560. Treat context as managed memory: keep hot working context small, page durable facts into archival memory, and explicitly edit memory over time.
- **Reflexion: Language Agents with Verbal Reinforcement Learning** — Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu Yao. NeurIPS 2023 workshop / arXiv:2303.11366. https://arxiv.org/abs/2303.11366. Store verbal feedback after failures so the next attempt improves without changing model weights.
- **Voyager: An Open-Ended Embodied Agent with Large Language Models** — Guanzhi Wang, Yuqi Xie, Yunfan Jiang, Ajay Mandlekar, Chaowei Xiao, Yuke Zhu, Linxi Fan, Anima Anandkumar. arXiv:2305.16291, 2023. https://arxiv.org/abs/2305.16291. Open-ended curriculum + executable skill library: the agent accumulates reusable skills and chooses the next learning objective.
- **Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection** — Akari Asai, Zeqiu Wu, Yizhong Wang, Avirup Sil, Hannaneh Hajishirzi. arXiv:2310.11511, 2023. https://arxiv.org/abs/2310.11511. Retrieve, generate, and critique with explicit reflection signals so unsupported claims can be revised or rejected.

> Human review required: SiliLoop proposes patches; it does not silently overwrite truth. Keep citations in `raw/sources.md` and run `npm run validate` after changes.
