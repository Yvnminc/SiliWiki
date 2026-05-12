# Product and use-phase evidence summary

This file summarizes the LangExtract run on Valmet 2019 pages 24–26, focused on LCA and product/use-phase evidence.

| Class | Evidence text | Value | Applicability | Missing fields / limitations |
| --- | --- | ---: | --- | --- |
| `lca_applicability_evidence` | `Based on life cycle analysis (LCA) of selected product families` | — | `weak_signal_only` | product boundary not disclosed |
| `use_phase_impact_claim` | `around 95% of the environmental impacts of Valmet’s entire value chain occur when Valmet’s solutions are being used for production at customer sites.` | 95% | `screening_lca_ready` | functional unit, product-specific inventory, method details |
| `use_phase_impact_claim` | `Depending on cover type, the content of bio-based and/or recycled raw material is 75–96%.` | 75–96% | `screening_lca_ready` | functional unit, quantified impact reduction |
| `use_phase_impact_claim` | `By using sleeve roll technology, vacuum energy consumption can be decreased by 30–60 % depending on the former type` | 30–60% | `screening_lca_ready` | functional unit, baseline, total energy consumption |
| `use_phase_impact_claim` | `the forming section drive power will be more than 50% lower.` | >50% | `screening_lca_ready` | functional unit, baseline, total drive power |

Method note: a broad mixed chunk over pages 24–26 produced one JSON parse error and skipped the first chunk. The focused GHG/Scope 3 pass fixed this. This supports using task-specific extraction passes in Exp1.
