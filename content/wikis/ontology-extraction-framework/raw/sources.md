# Sources for Ontology Extraction Framework / 本体驱动信息抽取框架

This source registry supports the ontology extraction framework wiki. It records project discussions, local SiliWiki pages, software documentation and standards used to define the architecture.

## user-question-2026-05-13

- Type: research direction from project owner
- Date: 2026-05-13
- Title: Understanding LangExtract and ontology-managed extraction
- Used by: whole wiki
- Notes: The user proposed a two-layer design: meta-ontology defining entity concepts and ontology storing concrete extracted entities with values and sources. The wiki extends this into meta-ontology, domain ontology, extraction ontology and evidence/entity store.

## meeting-2026-05-06

- Type: supervisor meeting transcript and analysis
- Date: 2026-05-06
- Title: LCA Evidence Engine research discussion with Ma
- Local related wiki: ../report-to-lca-evidence/
- Used by: `content.md#meeting-connection`, `content.md#problem`
- Notes: Established the revised framing: report-to-evidence rather than direct product-level LCA; Evidence Objects as atomic unit; ontology/glossary-guided extraction; provenance-first grounding; lazy KG; NAICS-aware evaluation; small pilot benchmark before large-scale processing.

## report-to-lca-evidence-wiki

- Type: local SiliWiki content pack
- Title: Report-to-LCA Evidence Engine / 可审计报告到 LCA 证据引擎
- Path: ../report-to-lca-evidence/
- URL: https://siliwiki.vercel.app/wiki/report-to-lca-evidence
- Used by: problem framing, Evidence Object, provenance-first design, lazy KG, evaluation metrics
- Notes: Prior wiki that defines the Report-to-LCA Evidence Engine, Evidence Objects, extraction experiments and auditability framing.

## langextract-skill

- Type: local skill / software workflow note
- Title: LangExtract Workflow
- Local path: /Users/yann/.hermes/profiles/wm-cso/skills/software-development/langextract/SKILL.md
- Used by: `content.md#langextract-positioning`
- Notes: Describes LangExtract as a source-grounded extraction harness with extraction classes, attributes, few-shot examples, JSONL export and HTML visualization. Important warning: LangExtract provides grounding and structure, not correctness by itself.

## google-langextract

- Type: software repository
- Title: google/langextract
- URL: https://github.com/google/langextract
- Used by: LangExtract positioning and extraction execution layer
- Notes: Source-grounded information extraction library used as the extraction harness in this framework.

## valmet-2019-lca-evidence-wiki

- Type: local SiliWiki case study
- Title: Valmet 2019 LCA Evidence Case Study
- Path: ../valmet-2019-lca-evidence/
- URL: https://siliwiki.vercel.app/wiki/valmet-2019-lca-evidence
- Used by: MVP pilot example
- Notes: Real-report demo showing Scope 1, Scope 2 location-based, Scope 2 market-based and Scope 3 category extraction from Valmet 2019 GRI Supplement.

## ghg-protocol-corporate-standard

- Type: reporting framework
- Title: The Greenhouse Gas Protocol: A Corporate Accounting and Reporting Standard
- Organization: World Resources Institute and World Business Council for Sustainable Development
- URL: https://ghgprotocol.org/corporate-standard
- Used by: GHG Scope 1/2 concept definitions, corporate inventory framing
- Notes: Canonical framework for corporate Scope 1 and Scope 2 GHG accounting.

## ghg-protocol-scope3-standard

- Type: reporting framework
- Title: Corporate Value Chain (Scope 3) Accounting and Reporting Standard
- Organization: World Resources Institute and World Business Council for Sustainable Development
- URL: https://ghgprotocol.org/corporate-value-chain-scope-3-standard
- Used by: Scope 3 category ontology and missing-evidence rules
- Notes: Defines Scope 3 categories and value-chain emissions reporting concepts.

## gri-standards

- Type: reporting framework
- Title: GRI Standards
- Organization: Global Reporting Initiative
- URL: https://www.globalreporting.org/standards/
- Used by: GRI 305 references and sustainability disclosure mapping
- Notes: Widely used sustainability reporting standards across environmental, social and governance topics.

## iso-14040-14044

- Type: standard
- Title: ISO 14040 / ISO 14044 Life cycle assessment standards
- Organization: International Organization for Standardization
- URL: https://www.iso.org/standard/37456.html
- Used by: applicability boundaries and false-ready prevention
- Notes: LCA principles, framework, requirements and guidelines. Used to avoid overclaiming product-level LCA readiness.

## unep-slca

- Type: guideline
- Title: Guidelines for Social Life Cycle Assessment of Products and Organizations
- Organization: UNEP Life Cycle Initiative
- URL: https://www.lifecycleinitiative.org/library/guidelines-for-social-life-cycle-assessment-of-products-and-organisations-2020/
- Used by: S-LCA concept expansion direction
- Notes: Background for mapping social disclosures to S-LCA stakeholder and topic evidence.

## peng-2024

- Type: paper
- Title: Knowledge graph-based mapping and recommendation to automate life cycle assessment
- Authors: Tao Peng, Lu Gao, Reuben S. K. Agbozo, Yuming Xu, Kateryna Svynarenko
- Venue: Advanced Engineering Informatics, 2024
- DOI: https://doi.org/10.1016/j.aei.2024.102752
- Used by: ontology / KG matching motivation
- Notes: Motivates KG-based mapping and recommendation for LCA dataset selection.

## tu-2024

- Type: paper
- Title: Mitigating Grand Challenges in Life Cycle Inventory Modeling through the Applications of Large Language Models
- Authors: Qingshi Tu, Jing Guo, Nan Li, Jianchuan Qi, Ming Xu
- Venue: Environmental Science & Technology, 2024
- DOI: https://doi.org/10.1021/acs.est.4c07634
- Used by: LLM-assisted LCI motivation and missing data framing
- Notes: Motivates LLM use for missing foreground flow data and background data matching challenges in LCI.

## cole-2025

- Type: paper
- Title: Towards AI-augmented sustainability assessments: integrating large language models in the case of product social life cycle assessment
- Authors: Carolyn Cole, Arash Hajikhani, Eveliina Hylkilä, Essi Paronen, Hanna Pihkola
- Venue: The International Journal of Life Cycle Assessment, 2025
- DOI: https://doi.org/10.1007/s11367-025-02508-w
- Used by: expert review and S-LCA evidence framing
- Notes: Shows the importance of tacit knowledge, stakeholder perspective and human review in AI-augmented sustainability assessment.
