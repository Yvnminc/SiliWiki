# Sources — Valmet LCA ontology case study

## valmet-case-input
- Type: local corpus selection
- Title: Valmet 2018–2022 GRI Supplement markdown reports
- Files:
  - `valmet_2018_GRI_Supplement.md`
  - `valmet_2019_GRI_Supplement.md`
  - `valmet_2020_GRI_Supplement.md`
  - `valmet_2021_GRI_Supplement.md`
  - `valmet_2022_GRI_Supplement.md`
- Used by: company selection, longitudinal evidence extraction, source-page references.

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
- Used by: extraction metrics, concept coverage, audit flag distribution, Evidence Object ledger.

## diagnostic-findings
- Type: ontology-backed diagnostic report
- Date: 2026-05-13
- Files:
  - `raw/valmet-5y-case/diagnostic_report.md`
  - `raw/valmet-5y-case/diagnostic_findings.json`
- Used by: LCA scorecard, D1–D6 diagnosis, recommended actions.

## framework-wiki
- Type: SiliWiki framework page
- Title: Ontology Extraction Framework / 本体驱动信息抽取框架
- Path: `/wiki/ontology-extraction-framework`
- Used by: architecture framing, ontology layer definitions, Evidence Object conventions.
