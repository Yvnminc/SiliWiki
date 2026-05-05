# Self-Evolution Plan for Agentic LCA Literature Review / 代理式生命周期评价文献综述

Generated: 2026-05-06
Wiki: `agentic-lca`
Focus: Agentic LCA literature review for LLM agents, ABM-LCA, ontology grounding, and PhD research agenda

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

- memoryCount: 50
- actionCount: 1
- glossaryTerms: 21
- sections: 29
- unresolvedSignals: 0
- sourceGapSignals: 0

## Reflections

- Agentic LCA Literature Review / 代理式生命周期评价文献综述 is not static content; it is a local memory object that should expose what changed, why it changed, and what still needs evidence.
- The next agent should retrieve the highest-scoring memories first: section:1:agentic-lca-literature-review-/-代理式生命周期评价文献综述, glossary:source-anchor, glossary:llm-agent, glossary:knowledge-graph, glossary:ontology.
- Dominant evolution themes: outline, orphan-term, glossary-weaving, canonical-term.
- The next safe patch is: glossary-weaving; Human review required before treating generated edits as final.

## Planned actions

| Priority | Kind | Target | Rationale | Agent prompt |
| ---: | --- | --- | --- | --- |
| 3 | glossary-weaving | content.md + glossary.json | Canonical terms exist but are not woven into the explanatory body. | Introduce or link these glossary terms in the relevant sections: Source anchor. |

## Top memory stream entries

| Score | Type | Summary | Tags |
| ---: | --- | --- | --- |
| 0.71 | section | Section: Agentic LCA Literature Review / 代理式生命周期评价文献综述 | outline |
| 0.69 | glossary-term | Source anchor: A stable anchor in raw/sources.md for evidence-backed wiki claims. | orphan-term, glossary-weaving |
| 0.68 | glossary-term | LLM agent: An LLM-based system that can plan, retrieve, call tools, and generate structured outputs. | canonical-term |
| 0.63 | glossary-term | Knowledge graph: A semantic graph for grounding LCA data and recommendations. | canonical-term |
| 0.63 | glossary-term | Ontology: A formal vocabulary and relationship model for LCA concepts. | canonical-term |
| 0.62 | section | Section: LLM / AI agents for LCA | outline |
| 0.60 | glossary-term | Brightway: An open-source Python framework for LCA computation. | canonical-term |
| 0.60 | glossary-term | Human-in-the-loop: A trust boundary where experts review agent outputs before acceptance. | canonical-term |
| 0.60 | glossary-term | Prospective LCA: LCA for future technologies, scenarios, or transitions. | canonical-term |
| 0.60 | glossary-term | Provenance: The traceable source trail for each claim, flow, mapping, and result. | canonical-term |
| 0.60 | glossary-term | Social LCA: Assessment of social impacts across product life cycles. | canonical-term |
| 0.58 | glossary-term | Agent-Based Modeling: A simulation approach that models heterogeneous actors and their interactions. | canonical-term |

## References

- **Generative Agents: Interactive Simulacra of Human Behavior** — Joon Sung Park, Joseph C. O'Brien, Carrie J. Cai, Meredith Ringel Morris, Percy Liang, Michael S. Bernstein. UIST 2023 / Stanford HCI + Google Research. https://doi.org/10.1145/3586183.3606763. Memory stream + retrieval by recency, importance, and relevance; reflection turns low-level observations into higher-level memories; planning schedules future action.
- **MemGPT: Towards LLMs as Operating Systems** — Charles Packer, Sarah Wooders, Kevin Lin, Vivian Fang, Shishir G. Patil, Ion Stoica, Joseph E. Gonzalez. arXiv:2310.08560, 2023. https://arxiv.org/abs/2310.08560. Treat context as managed memory: keep hot working context small, page durable facts into archival memory, and explicitly edit memory over time.
- **Reflexion: Language Agents with Verbal Reinforcement Learning** — Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu Yao. NeurIPS 2023 workshop / arXiv:2303.11366. https://arxiv.org/abs/2303.11366. Store verbal feedback after failures so the next attempt improves without changing model weights.
- **Voyager: An Open-Ended Embodied Agent with Large Language Models** — Guanzhi Wang, Yuqi Xie, Yunfan Jiang, Ajay Mandlekar, Chaowei Xiao, Yuke Zhu, Linxi Fan, Anima Anandkumar. arXiv:2305.16291, 2023. https://arxiv.org/abs/2305.16291. Open-ended curriculum + executable skill library: the agent accumulates reusable skills and chooses the next learning objective.
- **Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection** — Akari Asai, Zeqiu Wu, Yizhong Wang, Avirup Sil, Hannaneh Hajishirzi. arXiv:2310.11511, 2023. https://arxiv.org/abs/2310.11511. Retrieve, generate, and critique with explicit reflection signals so unsupported claims can be revised or rejected.

> Human review required: SiliLoop proposes patches; it does not silently overwrite truth. Keep citations in `raw/sources.md` and run `npm run validate` after changes.
