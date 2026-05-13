# Sources / 来源台账 — Valmet LCA ontology case study

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
- Used by: extraction metrics, concept coverage, audit flag distribution, Evidence Object ledger；用于本 wiki 的抽取指标、概念覆盖、审计标记和证据台账。

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


## valmet-company-profile
- Type: public company webpage
- Title: About Valmet / We are Valmet
- URL: https://www.valmet.com/company/
- Accessed: 2026-05-13
- Used by: company profile, business model, public scale indicators, lifecycle/customer relationship framing；用于 Valmet 公司画像、业务模式和生命周期/客户关系判断。

## valmet-2022-company-context
- Type: local report evidence
- Title: Valmet GRI Supplement 2022 — company context and environmental management approach
- File: `valmet_2022_GRI_Supplement.md`
- Key evidence: public company and headquarters disclosure; sustainability as core strategy; environmental data collection process; customer-use/supply-chain/own-location value-chain framing.
- Used by: company profile, company assessment, LCA leverage interpretation；用于公司画像、公司评价和 LCA 杠杆解释。

## valmet-2020-2021-use-phase-context
- Type: local report evidence
- Title: Valmet GRI Supplement 2020–2021 — sustainable solutions and customer use phase
- Files:
  - `valmet_2020_GRI_Supplement.md`
  - `valmet_2021_GRI_Supplement.md`
- Key evidence: LCA/use-phase language indicating that most value-chain environmental impacts occur when Valmet technologies are used at customer sites.
- Used by: D4 diagnosis, company environmental leverage assessment；用于 D4 诊断和公司环境杠杆评价。
