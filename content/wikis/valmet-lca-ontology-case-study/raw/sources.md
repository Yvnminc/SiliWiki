# Sources / 来源台账 — Valmet LCA expert assessment report

## expert-report-method
- Type: assessment framing
- Title: Valmet 2018–2022 LCA expert assessment method
- Date: 2026-05-13
- Description: This wiki is framed as an LCA expert assessment report, not an algorithm demonstration. Ontology extraction is used as the evidence layer for an iterative review process: expert question → evidence requirement → source-grounded Evidence Objects → applicability judgement → missing-field flags → revised ontology/question → final finding.
- Used by: assessment boundary, expert question chain, iterative ontology evidence audit, scorecard interpretation.

## valmet-case-input
- Type: local corpus selection
- Title: Valmet 2018–2022 GRI Supplement markdown reports
- Files:
  - `valmet_2018_GRI_Supplement.md`
  - `valmet_2019_GRI_Supplement.md`
  - `valmet_2020_GRI_Supplement.md`
  - `valmet_2021_GRI_Supplement.md`
  - `valmet_2022_GRI_Supplement.md`
- Used by: company selection, longitudinal LCA evidence review, source-page references.

## valmet-case-output
- Type: local experiment output
- Date: 2026-05-13
- Run ID: `valmet_5y_lca_ontology_case_2026_05_13`
- Provider: `ontology-rule-r2l-v1` offline deterministic baseline
- Artifacts:
  - `raw/valmet-5y-case/metrics.json`
  - `raw/valmet-5y-case/report_summaries.json`
  - `raw/valmet-5y-case/evidence_objects.jsonl`
  - `raw/valmet-5y-case/langextract_annotated.jsonl`
  - `raw/valmet-5y-case/compiled/concept_types.json`
  - `raw/valmet-5y-case/compiled/domain_ontology.json`
  - `raw/valmet-5y-case/compiled/extraction_ontology.json`
- Used by: evidence object counts, grounding metrics, concept coverage, audit flag distribution, Evidence Object ledger.

## diagnostic-findings
- Type: ontology-backed diagnostic report
- Date: 2026-05-13
- Files:
  - `raw/valmet-5y-case/diagnostic_report.md`
  - `raw/valmet-5y-case/diagnostic_findings.json`
- Used by: LCA scorecard, D1–D6 expert findings, trends, Category 1 share, recommendations.

## framework-wiki
- Type: SiliWiki framework page
- Title: Ontology Extraction Framework / 本体驱动信息抽取框架
- Path: `/wiki/ontology-extraction-framework`
- Used by: ontology layer definitions, Evidence Object conventions and source-grounding vocabulary. In this page it is background method, not the report subject.

## valmet-company-profile
- Type: public company webpage
- Title: About Valmet / We are Valmet
- URL: https://www.valmet.com/company/
- Accessed: 2026-05-13
- Used by: company profile, business model, lifecycle/customer relationship framing.

## valmet-2022-company-context
- Type: local report evidence
- Title: Valmet GRI Supplement 2022 — company context and environmental management approach
- File: `valmet_2022_GRI_Supplement.md`
- Key evidence: public company and headquarters disclosure; sustainability as core strategy; environmental data collection process; customer-use/supply-chain/own-location value-chain framing.
- Used by: company context, business-model assessment and LCA leverage interpretation.

## valmet-2020-2021-use-phase-context
- Type: local report evidence
- Title: Valmet GRI Supplement 2020–2021 — sustainable solutions and customer use phase
- Files:
  - `valmet_2020_GRI_Supplement.md`
  - `valmet_2021_GRI_Supplement.md`
- Key evidence: LCA/use-phase language indicating that major value-chain environmental impacts occur when Valmet technologies are used at customer sites.
- Used by: D4 diagnosis and customer-use-phase leverage assessment.
