# GHG and Scope 3 evidence summary

This file summarizes the LangExtract focused run on the Valmet 2019 GHG table. It is intentionally human-readable; the raw machine output remains in the local LangExtract demo folder.

| Class | Evidence text | 2019 value | Unit | Applicability |
| --- | --- | ---: | --- | --- |
| `ghg_emission_metric` | `Scope 12 17.6 17.7 16.8` | 17.6 | 1,000 tCO2 | `corporate_inventory_ready` |
| `ghg_emission_metric` | `Scope 2 (location based)3 69.0 71.2 68.2` | 69.0 | 1,000 tCO2 | `corporate_inventory_ready` |
| `ghg_emission_metric` | `Scope 2 (market based)4 83.0 87.5 91.5` | 83.0 | 1,000 tCO2 | `corporate_inventory_ready` |
| `scope3_metric` | `Category 1: CO2 emissions from purchased goods and services6 2,618 2,025 1,665` | 2,618 | 1,000 tCO2 | `scope3_evidence_ready` |
| `scope3_metric` | `Category 4: CO2 emissions from upstream transportation and distribution7 76 63 60` | 76 | 1,000 tCO2 | `scope3_evidence_ready` |
| `scope3_metric` | `Category 6: CO2 emissions from business travel8 38 34 32` | 38 | 1,000 tCO2 | `scope3_evidence_ready` |
| `scope3_metric` | `Category 9: CO2 emissions from downstream transportation and distribution9 13 11 11` | 13 | 1,000 tCO2 | `scope3_evidence_ready` |

Evaluation against a hand-written focused gold standard:

```text
gold_items = 7
pred_items = 7
span_class_precision = 1.0
span_class_recall = 1.0
span_class_f1 = 1.0
required_attribute_accuracy = 1.0
all_grounded = true
```

Caveat: this is a focused table-level demonstration, not a full benchmark result.
