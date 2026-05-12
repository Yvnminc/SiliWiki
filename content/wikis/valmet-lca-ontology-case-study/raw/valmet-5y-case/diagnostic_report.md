# Valmet 5-year ontology-backed LCA diagnostic findings

## Metric table

| Metric | Year | Value | Unit | Evidence | Page |
| --- | ---: | ---: | --- | --- | ---: |
| `cat1` | 2018 | 2025.0 | 1,000 tCO2 | `ev_db0c3e17538e` | 22 |
| `cat1` | 2019 | 2618.0 | 1,000 tCO2 | `ev_e4b2f83e57a3` | 24 |
| `cat1` | 2020 | 1815.0 | 1,000 tCO2 | `ev_db0474f7fb92` | 27 |
| `cat1` | 2021 | 2783.0 | 1,000 tCO2 | `ev_679bb4eee8d9` | 27 |
| `cat1` | 2022 | 2237.0 | 1,000 tCO2 | `ev_f4913df49967` | 29 |
| `cat4` | 2018 | 63.0 | 1,000 tCO2 | `ev_bee546d1ee49` | 22 |
| `cat4` | 2019 | 76.0 | 1,000 tCO2 | `ev_2a5ce95d97a8` | 24 |
| `cat4` | 2020 | 72.0 | 1,000 tCO2 | `ev_aa2b0e71fd9d` | 27 |
| `cat4` | 2021 | 102.0 | 1,000 tCO2 | `ev_fff7d2339669` | 27 |
| `cat4` | 2022 | 45.0 | 1,000 tCO2 | `ev_3d4c84923cab` | 29 |
| `cat6` | 2018 | 34.0 | 1,000 tCO2 | `ev_d8d60fd98505` | 22 |
| `cat6` | 2019 | 38.0 | 1,000 tCO2 | `ev_b9d32cef6d6d` | 24 |
| `cat6` | 2020 | 17.0 | 1,000 tCO2 | `ev_56506f871975` | 27 |
| `cat6` | 2021 | 18.0 | 1,000 tCO2 | `ev_5051f6106084` | 27 |
| `cat6` | 2022 | 37.0 | 1,000 tCO2 | `ev_3455f43625db` | 29 |
| `cat9` | 2018 | 11.0 | 1,000 tCO2 | `ev_931ff86c0988` | 22 |
| `cat9` | 2019 | 13.0 | 1,000 tCO2 | `ev_be669096ca82` | 24 |
| `cat9` | 2020 | 13.0 | 1,000 tCO2 | `ev_303fb4f76c86` | 27 |
| `cat9` | 2021 | 15.0 | 1,000 tCO2 | `ev_77060a9e5aab` | 27 |
| `scope1` | 2018 | 17.7 | 1,000 tCO2 | `ev_0b0bbb6d788b` | 22 |
| `scope1` | 2019 | 17.6 | 1,000 tCO2 | `ev_d817d2cbdb8e` | 24 |
| `scope1` | 2020 | 19.1 | 1,000 tCO2 | `ev_9860caae29cb` | 27 |
| `scope1` | 2021 | 21.5 | 1,000 tCO2 | `ev_9cc64e238689` | 27 |
| `scope1` | 2022 | 21.1 | 1,000 tCO2 | `ev_e73327c18a31` | 29 |
| `scope2_location` | 2018 | 73.1 | 1,000 tCO2 | `ev_482759b0aa55` | 22 |
| `scope2_location` | 2019 | 69.0 | 1,000 tCO2 | `ev_5e51927f0a85` | 24 |
| `scope2_market` | 2018 | 95.2 | 1,000 tCO2 | `ev_7fd544ee8e9d` | 22 |
| `scope2_market` | 2019 | 83.0 | 1,000 tCO2 | `ev_1ded939a4eb8` | 24 |

## Diagnosis

### D1 — Corporate GHG inventory evidence is auditable but not product-LCA-ready

- Severity: `medium`
- Diagnosis: The extracted ontology contains Scope 1 evidence for all five years (2018–2022), with Scope 1 increasing from 17.7 to 21.1 thousand tCO2 (19.2%). Scope 2 location/market-based evidence is source-grounded for 2018–2019, but later Scope 2 rows were not captured in this rule-provider pilot and need manual/LLM extraction validation.
- LCA implication: This is suitable for corporate inventory review and longitudinal disclosure analysis. It is not sufficient for product LCA because it is corporate-scope inventory, not product-specific foreground activity data with functional unit and system boundary.
- Evidence IDs: `ev_0b0bbb6d788b`, `ev_d817d2cbdb8e`, `ev_9860caae29cb`, `ev_9cc64e238689`, `ev_e73327c18a31`, `ev_482759b0aa55`, `ev_5e51927f0a85`, `ev_7fd544ee8e9d`, `ev_1ded939a4eb8`
- Recommended action: Use the corporate inventory evidence as audit context; for product LCA, request product-level foreground flows, functional unit, product boundary, allocation rules and emission factors.

### D2 — Purchased goods and services is the dominant captured Scope 3 category

- Severity: `high`
- Diagnosis: Across the captured Scope 3 category ontology, Category 1 purchased goods and services is consistently the largest category in every extracted year. Its share of the captured category sum ranges from 94.7% to 96.5%.
- LCA implication: For LCA/Scope 3 screening, upstream materials and purchased goods should be treated as the primary hotspot and first target for supplier data improvement.
- Evidence IDs: `ev_db0c3e17538e`, `ev_e4b2f83e57a3`, `ev_db0474f7fb92`, `ev_679bb4eee8d9`, `ev_f4913df49967`, `ev_bee546d1ee49`, `ev_2a5ce95d97a8`, `ev_aa2b0e71fd9d`, `ev_fff7d2339669`, `ev_3d4c84923cab`, `ev_d8d60fd98505`, `ev_b9d32cef6d6d`, `ev_56506f871975`, `ev_5051f6106084`, `ev_3455f43625db`, `ev_931ff86c0988`, `ev_be669096ca82`, `ev_303fb4f76c86`, `ev_77060a9e5aab`
- Recommended action: Prioritize supplier-specific activity data, material composition, procurement spend/activity split, and emission-factor provenance for Category 1.

### D3 — Scope 3 category coverage is longitudinally useful, but method detail remains weak

- Severity: `high`
- Diagnosis: The ontology extracted Category 1, 4 and 6 for all five years, and Category 9 for four years. However, all extracted Scope 3 category metrics carry `method_missing` because the evidence spans provide category totals but not enough emission-factor or calculation-method detail.
- LCA implication: These rows are `scope3_evidence_ready` for disclosure benchmarking and hotspot screening, but they should not be reused directly as LCI foreground data without method and activity-data reconstruction.
- Evidence IDs: `ev_db0c3e17538e`, `ev_e4b2f83e57a3`, `ev_db0474f7fb92`, `ev_679bb4eee8d9`, `ev_f4913df49967`, `ev_bee546d1ee49`, `ev_2a5ce95d97a8`, `ev_aa2b0e71fd9d`, `ev_fff7d2339669`, `ev_3d4c84923cab`, `ev_d8d60fd98505`, `ev_b9d32cef6d6d`, `ev_56506f871975`, `ev_5051f6106084`, `ev_3455f43625db`, `ev_931ff86c0988`, `ev_be669096ca82`, `ev_303fb4f76c86`, `ev_77060a9e5aab`
- Recommended action: Add method-level extraction for emission factors, activity data, supplier-specific data, spend/activity method, and category-boundary notes; maintain a category-year completeness matrix.

### D4 — Valmet explicitly frames value-chain impact as use-phase/customer-site dominated

- Severity: `high`
- Diagnosis: The 2020 and 2021 reports include source-grounded LCA/use-phase claims stating that around one percent of the environmental impact of Valmet’s entire value chain is emitted from own locations, based on life cycle analysis and market data on customer use phase.
- LCA implication: This is strong directional hotspot evidence: product use phase/customer operations likely dominate life-cycle impact. But the evidence is still `weak_signal_only` for product LCA because the extracted ontology flags missing functional unit, product system boundary and allocation method.
- Evidence IDs: `ev_37831ba12f99`, `ev_a0bed69c021f`
- Recommended action: Convert the use-phase claim into product-family LCA templates: define functional unit, product family, use scenario, energy/water/process assumptions, lifetime, allocation and sensitivity ranges.

### D5 — External limited assurance improves disclosure auditability but does not replace LCA critical review

- Severity: `medium`
- Diagnosis: The ontology captured limited-assurance / assurance statements across the five-year corpus. These statements support traceability of selected sustainability information, but the extracted spans do not prove that product-level LCA assumptions, use-phase models, or Scope 3 emission factors were critically reviewed.
- LCA implication: Assurance supports confidence in sustainability disclosure, but ISO 14040/14044-style product LCA still requires goal/scope definition, inventory modelling, impact assessment assumptions and critical review where applicable.
- Evidence IDs: `ev_957e7d86dd4e`, `ev_faaf1a420250`, `ev_8fda0855fca8`, `ev_cf99b5422e53`, `ev_598fe6711ee3`
- Recommended action: Store assurance scope as a separate ontology object and map exactly which metrics are assured; do not inherit assurance from corporate disclosure to product LCA claims automatically.

### D6 — Target/carbon-neutral language needs baseline and pathway evidence before LCA use

- Severity: `medium`
- Diagnosis: The extracted target/carbon-neutral claims in 2021–2022 are grounded, but the ontology flags `target_without_baseline`. They are useful sustainability strategy signals, not quantified LCA evidence.
- LCA implication: Targets should not be mixed with measured performance or inventory data. For LCA diagnostics, they only define future scenario context unless baseline, pathway, scope and reduction levers are quantified.
- Evidence IDs: `ev_0dd676e81054`, `ev_2f7f3f7c7dfb`
- Recommended action: Extract target baseline year, target scope, covered emissions, reduction pathway, offsets/neutralization approach and progress metrics as separate target ontology fields.
