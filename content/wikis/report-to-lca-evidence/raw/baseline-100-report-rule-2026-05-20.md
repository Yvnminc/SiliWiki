# 100-report Report-to-LCA rule baseline analysis

Run: `r2l_100_high_signal_rule_2026_05_19`

## Key numbers
- reports: 100
- evidence_objects: 1211
- avg_evidence_per_report: 12.11
- median_evidence_per_report: 11.0
- min_evidence_per_report: 1
- max_evidence_per_report: 31
- zero_evidence_reports: 0
- grounded_evidence_rate: 1.0
- missing_evidence_count: 359
- missing_share: 0.2964
- false_ready_guard_violations: 0
- selected_chunks_total: 800
- selected_chunks_avg: 8.0

## Report-level coverage
- reports_with_scope3_specific_categories: 34
- reports_with_scope3_total: 12
- reports_with_any_scope3_or_specific: 43
- reports_with_lca_claim: 24
- reports_with_assurance: 76
- reports_with_target_claims: 68
- reports_with_missing_scope3_method: 97
- reports_with_missing_functional_unit: 21
- reports_with_method_missing_flag: 98
- reports_with_target_without_baseline_flag: 68
- reports_with_functional_unit_missing_flag: 25

## Concept type distribution
- lca_claim: 86
- target_claim: 331
- missing_disclosure: 359
- scope3_category_metric: 97
- assurance_statement: 246
- ghg_emission_metric: 92

## Canonical concept coverage
- lca.life_cycle_analysis_claim: 86
- target.net_zero: 331
- missing.functional_unit: 30
- missing.scope3_method: 329
- ghg.scope3.category1.purchased_goods_and_services: 27
- ghg.scope3.category4.upstream_transportation_distribution: 18
- ghg.scope3.category6.business_travel: 28
- ghg.scope3.category9.downstream_transportation_distribution: 8
- ghg.scope3.category11.use_of_sold_products: 16
- assurance.ghg_inventory_verification: 246
- ghg.scope1: 44
- ghg.scope2.unspecified: 31
- ghg.scope3.total: 17

## Audit flags
- functional_unit_missing: 116
- target_without_baseline: 317
- method_missing: 426

## Best demo candidates
- Mettler Toledo International Inc (2022): evidence=22, specific_scope3=13, assurance=3, targets=1, missing_scope3_method=5
- Occidental Petroleum Corporation (2023): evidence=26, specific_scope3=0, assurance=19, targets=3, missing_scope3_method=4
- Apple Inc (2023): evidence=31, specific_scope3=1, assurance=11, targets=1, missing_scope3_method=4
- Jones Lang Lasalle Inc (2022): evidence=25, specific_scope3=4, assurance=7, targets=9, missing_scope3_method=4
- Ermenegildo Zegna (2023): evidence=19, specific_scope3=8, assurance=0, targets=4, missing_scope3_method=6
- Kyndryl Holdings Inc (2023): evidence=23, specific_scope3=3, assurance=6, targets=5, missing_scope3_method=5
- Cb Richard Ellis Group Inc (2022): evidence=19, specific_scope3=3, assurance=8, targets=5, missing_scope3_method=3
- Acuity Brands Inc (2023): evidence=20, specific_scope3=0, assurance=12, targets=5, missing_scope3_method=3
- Ryanair Holdings Plc (2023): evidence=23, specific_scope3=1, assurance=3, targets=12, missing_scope3_method=6
- Keysight Technologies (2022): evidence=21, specific_scope3=0, assurance=8, targets=10, missing_scope3_method=3

## Short conclusion
- The 100-report run is usable as a multi-company demonstration layer: it produces enough evidence-backed objects to compare companies by targets, assurance, Scope 3 category disclosure and missing-method gaps.
- The strongest signal is audit/readiness, not product LCA calculation: many target and assurance statements exist, but missing method / functional-unit evidence remains large.
- False product-LCA readiness is controlled in this rule baseline: zero false-ready guard violations.
- This remains a deterministic rule-provider baseline, not an LLM-quality result. It is suitable for pipeline scaling, dashboard planning and initial paper motivation; it still needs gold labels and LLM/ontology-managed comparison for publishable evaluation.
