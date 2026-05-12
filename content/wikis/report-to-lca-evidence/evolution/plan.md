# Self-Evolution Plan for Report-to-LCA Evidence Engine / 可审计报告到 LCA 证据引擎

Generated: 2026-05-12
Wiki: `report-to-lca-evidence`
Focus: condensed methods article after 2026-05-06 meeting: Evidence Objects, provenance-first extraction, lazy KG, pilot benchmark, NAICS-aware evaluation

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

- memoryCount: 63
- actionCount: 1
- glossaryTerms: 26
- sections: 37
- unresolvedSignals: 0
- sourceGapSignals: 0

## Reflections

- Report-to-LCA Evidence Engine / 可审计报告到 LCA 证据引擎 is not static content; it is a local memory object that should expose what changed, why it changed, and what still needs evidence.
- The next agent should retrieve the highest-scoring memories first: glossary:small-model, glossary:teacher-student, glossary:indicator-object, glossary:scope-3, section:1:report-to-lca-evidence-engine-/-可审计报告到-lca-证据引擎.
- Dominant evolution themes: orphan-term, glossary-weaving, outline.
- The next safe patch is: glossary-weaving; Human review required before treating generated edits as final.

## Planned actions

| Priority | Kind | Target | Rationale | Agent prompt |
| ---: | --- | --- | --- | --- |
| 3 | glossary-weaving | content.md + glossary.json | Canonical terms exist but are not woven into the explanatory body. | Introduce or link these glossary terms in the relevant sections: Small model, Teacher-student pipeline, Indicator object, Scope 3 emissions. |

## Top memory stream entries

| Score | Type | Summary | Tags |
| ---: | --- | --- | --- |
| 0.66 | glossary-term | Small model: A lower-cost model used for high-throughput extraction and classification. | orphan-term, glossary-weaving |
| 0.66 | glossary-term | Teacher-student pipeline: Using a large model to guide, label, critique or distill smaller models. | orphan-term, glossary-weaving |
| 0.64 | glossary-term | Indicator object: A normalized data record extracted from a report. | orphan-term, glossary-weaving |
| 0.64 | glossary-term | Scope 3 emissions: Indirect value-chain GHG emissions categories defined by the GHG Protocol. | orphan-term, glossary-weaving |
| 0.63 | section | Section: Report-to-LCA Evidence Engine / 可审计报告到 LCA 证据引擎 | outline |
| 0.59 | glossary-term | Benchmark: A labeled dataset and metric suite for evaluating extraction and applicability. | canonical-term |
| 0.59 | glossary-term | Lazy Knowledge Graph: A graph generated on demand from top-k evidence objects instead of pre-materializing all edges. | canonical-term |
| 0.59 | glossary-term | NAICS-aware evaluation: Evaluating report evidence within comparable industry groups. | canonical-term |
| 0.57 | section | Section: 3. Lazy KG visualization | outline |
| 0.55 | glossary-term | Extraction: Finding and structuring values, concepts and evidence spans from reports. | canonical-term |
| 0.55 | glossary-term | Knowledge graph: A semantic graph that constrains concept matching and recommendation. | canonical-term |
| 0.55 | glossary-term | Provenance: The traceable source trail behind an extracted data point. | canonical-term |

## References

- **Generative Agents: Interactive Simulacra of Human Behavior** — Joon Sung Park, Joseph C. O'Brien, Carrie J. Cai, Meredith Ringel Morris, Percy Liang, Michael S. Bernstein. UIST 2023 / Stanford HCI + Google Research. https://doi.org/10.1145/3586183.3606763. Memory stream + retrieval by recency, importance, and relevance; reflection turns low-level observations into higher-level memories; planning schedules future action.
- **MemGPT: Towards LLMs as Operating Systems** — Charles Packer, Sarah Wooders, Kevin Lin, Vivian Fang, Shishir G. Patil, Ion Stoica, Joseph E. Gonzalez. arXiv:2310.08560, 2023. https://arxiv.org/abs/2310.08560. Treat context as managed memory: keep hot working context small, page durable facts into archival memory, and explicitly edit memory over time.
- **Reflexion: Language Agents with Verbal Reinforcement Learning** — Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu Yao. NeurIPS 2023 workshop / arXiv:2303.11366. https://arxiv.org/abs/2303.11366. Store verbal feedback after failures so the next attempt improves without changing model weights.
- **Voyager: An Open-Ended Embodied Agent with Large Language Models** — Guanzhi Wang, Yuqi Xie, Yunfan Jiang, Ajay Mandlekar, Chaowei Xiao, Yuke Zhu, Linxi Fan, Anima Anandkumar. arXiv:2305.16291, 2023. https://arxiv.org/abs/2305.16291. Open-ended curriculum + executable skill library: the agent accumulates reusable skills and chooses the next learning objective.
- **Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection** — Akari Asai, Zeqiu Wu, Yizhong Wang, Avirup Sil, Hannaneh Hajishirzi. arXiv:2310.11511, 2023. https://arxiv.org/abs/2310.11511. Retrieve, generate, and critique with explicit reflection signals so unsupported claims can be revised or rejected.

> Human review required: SiliLoop proposes patches; it does not silently overwrite truth. Keep citations in `raw/sources.md` and run `npm run validate` after changes.
