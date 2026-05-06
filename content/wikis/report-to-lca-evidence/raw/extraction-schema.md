# Extraction and Evaluation Schema Draft

This draft supports the Report-to-LCA Evidence Engine proposal.

## Evidence object

```json
{
  "company": "string",
  "sector": "string",
  "report_year": 2024,
  "indicator": "scope_2_emissions_market_based",
  "value": 1234,
  "unit": "tCO2e",
  "boundary": "market-based Scope 2",
  "framework": ["GHG Protocol"],
  "source": {
    "file": "report.pdf",
    "page": 42,
    "section": "Climate metrics",
    "quote": "Scope 2 market-based emissions were 1,234 tCO2e."
  },
  "ontology_mapping": {
    "canonical_concept": "ghg.scope2.market_based",
    "aliases_detected": ["market-based emissions"]
  },
  "applicability": "corporate_inventory_ready",
  "audit_flags": [],
  "confidence": 0.91,
  "review_status": "pending"
}
```

## Applicability labels

- `product_lca_ready`
- `screening_lca_ready`
- `corporate_inventory_ready`
- `scope3_evidence_ready`
- `social_lca_evidence_ready`
- `weak_signal_only`
- `not_applicable`

## Audit flags

- `target_without_baseline`
- `intensity_only`
- `scope3_missing`
- `boundary_unclear`
- `method_missing`
- `selective_category`
- `unverifiable_claim`
- `contradiction_across_years`
- `target_progress_gap`
- `assurance_gap`
