# Ontology Extraction Pilot Run — r2l_ontology_5_report_pilot_2026_05_13

## Metrics

- Reports: 5
- Evidence objects: 48
- Grounded evidence rate: 1.0
- Missing-evidence objects: 6
- False-ready guard violations: 0

## Reports

| Report | Year | Evidence | Top concepts | Audit flags |
| --- | ---: | ---: | --- | --- |
| Valmet | 2019 | 10 | ghg.scope1: 1, ghg.scope2.location_based: 1, ghg.scope2.market_based: 1, ghg.scope3.category1.purchased_goods_and_services: 1 | method_missing: 4 |
| Brixmor Property Group Inc | 2022 | 17 | assurance.ghg_inventory_verification: 9, ghg.scope1: 2, ghg.scope2.unspecified: 2, ghg.scope3.total: 2 | method_missing: 2 |
| Boston Consulting Group | 2023 | 10 | assurance.ghg_inventory_verification: 2, target.net_zero: 5, missing.scope3_method: 3 | target_without_baseline: 5, method_missing: 3 |
| Embraer Sa | 2023 | 7 | ghg.scope3.category1.purchased_goods_and_services: 1, ghg.scope3.category4.upstream_transportation_distribution: 1, ghg.scope3.category6.business_travel: 1, ghg.scope2.unspecified: 1 | method_missing: 3 |
| National Instruments Corp | 2021 | 4 | ghg.scope123.intensity: 1, missing.scope3_method: 1, target.net_zero: 2 | intensity_only: 1, method_missing: 1, target_without_baseline: 2 |

## Output files

- `/Users/yann/github/thesis/report_to_lca_evidence/ontology_extraction/outputs/r2l_ontology_5_report_pilot_2026_05_13/evidence_objects.jsonl`
- `/Users/yann/github/thesis/report_to_lca_evidence/ontology_extraction/outputs/r2l_ontology_5_report_pilot_2026_05_13/report_summaries.json`
- `/Users/yann/github/thesis/report_to_lca_evidence/ontology_extraction/outputs/r2l_ontology_5_report_pilot_2026_05_13/metrics.json`
- `/Users/yann/github/thesis/report_to_lca_evidence/ontology_extraction/outputs/r2l_ontology_5_report_pilot_2026_05_13/compiled/domain_ontology.json`

Note: This MVP run uses an offline deterministic LangExtract provider (`ontology-rule-r2l-v1`) to validate pipeline mechanics and ontology schema behavior. It is not a live LLM quality benchmark.
