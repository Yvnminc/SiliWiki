# Self-Evolution Plan for Ontology Extraction Framework / 本体驱动信息抽取框架

Generated: 2026-05-13
Wiki: `ontology-extraction-framework`
Focus: turn the ontology extraction framework into an implementable Report-to-LCA schema and pilot pipeline

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

- memoryCount: 57
- actionCount: 1
- glossaryTerms: 20
- sections: 37
- unresolvedSignals: 0
- sourceGapSignals: 0

## Reflections

- Ontology Extraction Framework / 本体驱动信息抽取框架 is not static content; it is a local memory object that should expose what changed, why it changed, and what still needs evidence.
- The next agent should retrieve the highest-scoring memories first: glossary:ontology-change-log, glossary:field-definition, glossary:ontology-versioning, section:1:ontology-extraction-framework-/-本体驱动信息抽取框架, glossary:extraction-ontology.
- Dominant evolution themes: orphan-term, glossary-weaving, outline, canonical-term.
- The next safe patch is: glossary-weaving; Human review required before treating generated edits as final.

## Planned actions

| Priority | Kind | Target | Rationale | Agent prompt |
| ---: | --- | --- | --- | --- |
| 3 | glossary-weaving | content.md + glossary.json | Canonical terms exist but are not woven into the explanatory body. | Introduce or link these glossary terms in the relevant sections: Ontology change log, Field definition, Ontology versioning. |

## Top memory stream entries

| Score | Type | Summary | Tags |
| ---: | --- | --- | --- |
| 0.77 | glossary-term | Ontology change log: A record of ontology edits and their rationale. | orphan-term, glossary-weaving |
| 0.75 | glossary-term | Field definition: The declared type, requirement and constraint for a field in a concept type. | orphan-term, glossary-weaving |
| 0.75 | glossary-term | Ontology versioning: Recording which ontology version produced or validated each extraction. | orphan-term, glossary-weaving |
| 0.69 | section | Section: Ontology Extraction Framework / 本体驱动信息抽取框架 | outline |
| 0.67 | glossary-term | Extraction ontology: The task-specific subset of ontology used to generate extraction prompts and validation schemas. | canonical-term |
| 0.67 | glossary-term | Ontology Extraction Framework: A framework that uses ontology definitions to govern source-grounded information extraction from unstructured data. | canonical-term |
| 0.64 | glossary-term | Evidence Object: The atomic output of ontology-guided extraction. | canonical-term |
| 0.64 | glossary-term | Review ledger: An append-only record of expert decisions and corrections on extracted evidence. | canonical-term |
| 0.61 | glossary-term | Domain ontology: The domain-specific concept system for LCA, GHG, Scope 3, units, standards and boundaries. | canonical-term |
| 0.61 | glossary-term | Meta-ontology: The layer that defines how ontology concepts themselves are defined and governed. | canonical-term |
| 0.61 | glossary-term | Source grounding: Binding an extraction to the exact source text or page that supports it. | canonical-term |
| 0.58 | glossary-term | Canonical concept: A stable standard concept in the domain ontology. | canonical-term |

## References

- **Generative Agents: Interactive Simulacra of Human Behavior** — Joon Sung Park, Joseph C. O'Brien, Carrie J. Cai, Meredith Ringel Morris, Percy Liang, Michael S. Bernstein. UIST 2023 / Stanford HCI + Google Research. https://doi.org/10.1145/3586183.3606763. Memory stream + retrieval by recency, importance, and relevance; reflection turns low-level observations into higher-level memories; planning schedules future action.
- **MemGPT: Towards LLMs as Operating Systems** — Charles Packer, Sarah Wooders, Kevin Lin, Vivian Fang, Shishir G. Patil, Ion Stoica, Joseph E. Gonzalez. arXiv:2310.08560, 2023. https://arxiv.org/abs/2310.08560. Treat context as managed memory: keep hot working context small, page durable facts into archival memory, and explicitly edit memory over time.
- **Reflexion: Language Agents with Verbal Reinforcement Learning** — Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu Yao. NeurIPS 2023 workshop / arXiv:2303.11366. https://arxiv.org/abs/2303.11366. Store verbal feedback after failures so the next attempt improves without changing model weights.
- **Voyager: An Open-Ended Embodied Agent with Large Language Models** — Guanzhi Wang, Yuqi Xie, Yunfan Jiang, Ajay Mandlekar, Chaowei Xiao, Yuke Zhu, Linxi Fan, Anima Anandkumar. arXiv:2305.16291, 2023. https://arxiv.org/abs/2305.16291. Open-ended curriculum + executable skill library: the agent accumulates reusable skills and chooses the next learning objective.
- **Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection** — Akari Asai, Zeqiu Wu, Yizhong Wang, Avirup Sil, Hannaneh Hajishirzi. arXiv:2310.11511, 2023. https://arxiv.org/abs/2310.11511. Retrieve, generate, and critique with explicit reflection signals so unsupported claims can be revised or rejected.

> Human review required: SiliLoop proposes patches; it does not silently overwrite truth. Keep citations in `raw/sources.md` and run `npm run validate` after changes.
