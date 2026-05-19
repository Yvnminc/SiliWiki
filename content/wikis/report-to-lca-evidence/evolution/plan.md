# Self-Evolution Plan for Report-to-LCA Evidence Engine / 从企业报告到可审计 LCA 证据

Generated: 2026-05-20
Wiki: `report-to-lca-evidence`
Focus: turn the Report-to-LCA Evidence Engine wiki into a paper-facing research hub with experiment tracking, gold-set schema, and results tables

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

- memoryCount: 51
- actionCount: 1
- glossaryTerms: 35
- sections: 16
- unresolvedSignals: 0
- sourceGapSignals: 0

## Reflections

- Report-to-LCA Evidence Engine / 从企业报告到可审计 LCA 证据 is not static content; it is a local memory object that should expose what changed, why it changed, and what still needs evidence.
- The next agent should retrieve the highest-scoring memories first: glossary:evidence-span, glossary:llm-only-baseline, glossary:ontology-alignment, glossary:scope-3, glossary:small-model.
- Dominant evolution themes: orphan-term, glossary-weaving.
- The next safe patch is: glossary-weaving; Human review required before treating generated edits as final.

## Planned actions

| Priority | Kind | Target | Rationale | Agent prompt |
| ---: | --- | --- | --- | --- |
| 3 | glossary-weaving | content.md + glossary.json | Canonical terms exist but are not woven into the explanatory body. | Introduce or link these glossary terms in the relevant sections: Evidence span, LLM-only baseline, Ontology alignment, Scope 3 emissions, Small model, Social LCA evidence. |

## Top memory stream entries

| Score | Type | Summary | Tags |
| ---: | --- | --- | --- |
| 0.70 | glossary-term | Evidence span: The exact text, table cell or page region supporting an extracted data point. | orphan-term, glossary-weaving |
| 0.70 | glossary-term | LLM-only baseline: A baseline where an LLM extracts structured evidence without compiled ontology constraints. | orphan-term, glossary-weaving |
| 0.68 | glossary-term | Ontology alignment: Mapping report language to canonical concepts and relationships. | orphan-term, glossary-weaving |
| 0.68 | glossary-term | Scope 3 emissions: Indirect value-chain GHG emissions categories defined by the GHG Protocol. | orphan-term, glossary-weaving |
| 0.68 | glossary-term | Small model: A lower-cost model used for high-throughput extraction and classification. | orphan-term, glossary-weaving |
| 0.68 | glossary-term | Social LCA evidence: Report evidence relevant to social impacts across stakeholder categories. | orphan-term, glossary-weaving |
| 0.68 | glossary-term | Teacher-student pipeline: Using a large model to guide, label, critique or distill smaller models. | orphan-term, glossary-weaving |
| 0.67 | section | Section: Report-to-LCA Evidence Engine / 从企业报告到可审计 LCA 证据 | outline |
| 0.66 | glossary-term | Applicability: Whether an extracted data point is useful for a specific LCA-related task. | orphan-term, glossary-weaving |
| 0.66 | glossary-term | Audit flag: A reviewable signal that a disclosure may be incomplete, inconsistent or weakly evidenced. | orphan-term, glossary-weaving |
| 0.66 | glossary-term | Indicator object: A normalized data record extracted from a report. | orphan-term, glossary-weaving |
| 0.66 | glossary-term | Missing-disclosure object: An evidence object representing a missing or insufficient methodological disclosure. | orphan-term, glossary-weaving |

## References

- **Generative Agents: Interactive Simulacra of Human Behavior** — Joon Sung Park, Joseph C. O'Brien, Carrie J. Cai, Meredith Ringel Morris, Percy Liang, Michael S. Bernstein. UIST 2023 / Stanford HCI + Google Research. https://doi.org/10.1145/3586183.3606763. Memory stream + retrieval by recency, importance, and relevance; reflection turns low-level observations into higher-level memories; planning schedules future action.
- **MemGPT: Towards LLMs as Operating Systems** — Charles Packer, Sarah Wooders, Kevin Lin, Vivian Fang, Shishir G. Patil, Ion Stoica, Joseph E. Gonzalez. arXiv:2310.08560, 2023. https://arxiv.org/abs/2310.08560. Treat context as managed memory: keep hot working context small, page durable facts into archival memory, and explicitly edit memory over time.
- **Reflexion: Language Agents with Verbal Reinforcement Learning** — Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu Yao. NeurIPS 2023 workshop / arXiv:2303.11366. https://arxiv.org/abs/2303.11366. Store verbal feedback after failures so the next attempt improves without changing model weights.
- **Voyager: An Open-Ended Embodied Agent with Large Language Models** — Guanzhi Wang, Yuqi Xie, Yunfan Jiang, Ajay Mandlekar, Chaowei Xiao, Yuke Zhu, Linxi Fan, Anima Anandkumar. arXiv:2305.16291, 2023. https://arxiv.org/abs/2305.16291. Open-ended curriculum + executable skill library: the agent accumulates reusable skills and chooses the next learning objective.
- **Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection** — Akari Asai, Zeqiu Wu, Yizhong Wang, Avirup Sil, Hannaneh Hajishirzi. arXiv:2310.11511, 2023. https://arxiv.org/abs/2310.11511. Retrieve, generate, and critique with explicit reflection signals so unsupported claims can be revised or rejected.

> Human review required: SiliLoop proposes patches; it does not silently overwrite truth. Keep citations in `raw/sources.md` and run `npm run validate` after changes.
