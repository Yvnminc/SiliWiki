# Extraction and Evaluation Schema Draft

This draft supports the Report-to-LCA Evidence Engine methods article.

## Evidence Object

Evidence Object is the atomic unit of the system. It turns a report sentence, paragraph or table cell into a structured, auditable and computable record.

```json
{
  "report_id": "company_a_2024",
  "company": "Company A",
  "report_year": 2024,
  "naics_code": "2211",
  "sector": "Utilities",
  "reporting_frameworks": ["GRI", "GHG Protocol"],
  "assurance_status": "limited_assurance",
  "concept": "purchased goods and services emissions",
  "concept_type": "scope3_evidence",
  "schema_match": "Scope 3 Category 1",
  "canonical_concept": "ghg.scope3.category1.purchased_goods_and_services",
  "evidence_text": "The company engaged suppliers to reduce upstream emissions...",
  "source": {
    "file": "CompanyA_Sustainability_Report_2024.pdf",
    "page": 42,
    "section": "Value chain emissions",
    "chunk_id": "p42_c03",
    "quote": "The company engaged suppliers to reduce upstream emissions..."
  },
  "evidence_type": "qualitative",
  "value": null,
  "unit": null,
  "year": 2024,
  "boundary": "upstream value chain",
  "method_note": null,
  "embedding_id": "emb_company_a_2024_p42_c03",
  "similarity_score": 0.78,
  "confidence": 0.82,
  "applicability": "weak_signal_only",
  "not_sufficient_for": ["product_lca_ready", "screening_lca_ready"],
  "missing_fields": ["quantified activity data", "emission factor", "supplier-specific boundary"],
  "audit_flags": ["method_missing", "weak_evidence"],
  "greenwashing_risk_indicator": "medium",
  "review_status": "pending"
}
```

## Applicability labels

| Label | Meaning |
| --- | --- |
| `product_lca_ready` | Directly usable for a product-level LCI / PCF component |
| `screening_lca_ready` | Usable for screening-level estimation with assumptions |
| `corporate_inventory_ready` | Usable for company-level environmental inventory |
| `scope3_evidence_ready` | Usable for Scope 3 or supply-chain evidence analysis |
| `social_lca_evidence_ready` | Usable for Social LCA evidence collection |
| `weak_signal_only` | Narrative or target-level signal; insufficient for quantification |
| `not_applicable` | Not relevant to LCA / Scope 3 / S-LCA tasks |

## Audit flags

| Flag | Meaning |
| --- | --- |
| `target_without_baseline` | Target is disclosed without baseline year or baseline value |
| `intensity_only` | Only intensity metric is disclosed, no absolute value |
| `scope3_missing` | Scope 3 disclosure is omitted or materially incomplete |
| `boundary_unclear` | Organizational, operational or value-chain boundary is unclear |
| `method_missing` | Emission factor, calculation method or accounting standard is missing |
| `selective_category` | Only selected easy categories are reported |
| `weak_evidence` | Strong claim is backed only by vague narrative |
| `contradiction_across_years` | Definition, baseline or value conflicts across years |
| `target_progress_gap` | Target ambition is not supported by performance trend |
| `assurance_gap` | Key metrics are outside assurance scope |

## Evaluation fields

| Field | Metric use |
| --- | --- |
| `source.page`, `source.quote` | citation correctness, evidence faithfulness |
| `concept`, `schema_match` | extraction F1, top-k matching accuracy |
| `value`, `unit`, `boundary` | exact match, numeric error, boundary classification |
| `applicability` | applicability accuracy, false-ready rate |
| `missing_fields` | missing-evidence detection |
| `audit_flags` | audit precision/recall, expert agreement |
| `confidence` | calibration against human correctness |
