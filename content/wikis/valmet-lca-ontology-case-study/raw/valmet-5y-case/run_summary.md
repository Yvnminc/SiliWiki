# Ontology Extraction Pilot Run — valmet_5y_lca_ontology_case_2026_05_13

## Metrics

- Reports: 5
- Evidence objects: 44
- Grounded evidence rate: 1.0
- Missing-evidence objects: 2
- False-ready guard violations: 0

## Reports

| Report | Year | Evidence | Top concepts | Audit flags |
| --- | ---: | ---: | --- | --- |
| Valmet | 2018 | 10 | ghg.scope1: 1, ghg.scope2.location_based: 1, ghg.scope2.market_based: 1, ghg.scope3.category1.purchased_goods_and_services: 1 | method_missing: 4 |
| Valmet | 2019 | 10 | ghg.scope1: 1, ghg.scope2.location_based: 1, ghg.scope2.market_based: 1, ghg.scope3.category1.purchased_goods_and_services: 1 | method_missing: 4 |
| Valmet | 2020 | 9 | ghg.scope1: 1, ghg.scope3.category1.purchased_goods_and_services: 1, ghg.scope3.category4.upstream_transportation_distribution: 1, ghg.scope3.category6.business_travel: 1 | method_missing: 5, functional_unit_missing: 1 |
| Valmet | 2021 | 8 | ghg.scope1: 1, ghg.scope3.category1.purchased_goods_and_services: 1, ghg.scope3.category4.upstream_transportation_distribution: 1, ghg.scope3.category6.business_travel: 1 | method_missing: 4, functional_unit_missing: 1, target_without_baseline: 1 |
| Valmet | 2022 | 7 | ghg.scope1: 1, ghg.scope3.category1.purchased_goods_and_services: 1, ghg.scope3.category4.upstream_transportation_distribution: 1, ghg.scope3.category6.business_travel: 1 | method_missing: 4, target_without_baseline: 1 |

## Output files

Public SiliWiki raw copies are stored under this content pack:

- `raw/valmet-5y-case/evidence_objects.jsonl`
- `raw/valmet-5y-case/report_summaries.json`
- `raw/valmet-5y-case/metrics.json`
- `raw/valmet-5y-case/compiled/domain_ontology.json`

Note: This MVP run uses an offline deterministic LangExtract provider (`ontology-rule-r2l-v1`) to validate pipeline mechanics and ontology schema behavior. It is not a live LLM quality benchmark.
