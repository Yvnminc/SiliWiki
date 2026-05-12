# Ontology Extraction Framework — Schema Draft

This schema draft turns the ontology extraction framework into implementable tables / JSONL files. It is intentionally lightweight: CSV + JSON fields are enough for MVP; SQL / graph database can come later.

## 1. Concept type definition / meta-ontology

A concept type defines the schema and validation rules for a family of extracted entities.

```json
{
  "concept_type_id": "ghg_emission_metric",
  "display_name": "GHG emission metric",
  "definition": "A quantified greenhouse gas emissions disclosure with scope, category, value, unit, year and source grounding when available.",
  "description": "Used for Scope 1, Scope 2 and Scope 3 emissions reported in sustainability reports.",
  "fields": [
    {
      "name": "canonical_concept_id",
      "type": "string",
      "required": true,
      "description": "Canonical concept matched from the domain ontology."
    },
    {
      "name": "scope",
      "type": "enum",
      "required": true,
      "values": ["scope1", "scope2", "scope3", "unspecified"]
    },
    {
      "name": "scope3_category",
      "type": "enum",
      "required_if": { "scope": "scope3" },
      "values_ref": "ontology.scope3.categories"
    },
    {
      "name": "value",
      "type": "number",
      "required": false
    },
    {
      "name": "unit",
      "type": "unit",
      "required_if": { "value": "present" },
      "values_ref": "ontology.units.ghg"
    },
    {
      "name": "year",
      "type": "integer",
      "required": false
    },
    {
      "name": "boundary",
      "type": "string",
      "required": false
    },
    {
      "name": "method",
      "type": "string",
      "required": false
    }
  ],
  "source_grounding_required": true,
  "validation_rules": [
    "value_must_be_numeric_if_present",
    "unit_required_when_value_present",
    "scope3_category_required_when_scope_is_scope3",
    "location_based_and_market_based_must_not_be_merged",
    "source_quote_required_for_acceptance"
  ],
  "applicability_rules": [
    "corporate_inventory_ready_if_value_unit_year_and_boundary_present",
    "scope3_evidence_ready_if_scope3_category_and_source_present",
    "not_product_lca_ready_without_functional_unit_and_product_boundary"
  ],
  "review_policy": "review_required_for_ready_labels",
  "extraction_classes": ["ghg_emission_metric"],
  "examples_ref": "examples/ghg_emission_metric.jsonl",
  "owner": "Report-to-LCA Evidence Engine",
  "status": "draft",
  "version": "v0.1"
}
```

### CSV shape

```csv
concept_type_id,display_name,definition,description,fields_json,validation_rules_json,applicability_rules_json,review_policy,status,version
```

## 2. Canonical concept / domain ontology

A canonical concept is a standard concept inside a domain ontology.

```json
{
  "concept_id": "ghg.scope3.category1",
  "concept_type_id": "ghg_emission_metric",
  "label": "Scope 3 Category 1 - Purchased goods and services",
  "definition": "Upstream emissions from the extraction, production and transportation of goods and services purchased or acquired by the reporting company, not otherwise included in categories 2-8.",
  "aliases": [
    "purchased goods and services",
    "procurement emissions",
    "supplier goods emissions",
    "emissions from purchased goods",
    "upstream purchased goods emissions"
  ],
  "parent_id": "ghg.scope3",
  "standard_refs": [
    "GHG Protocol Scope 3 Standard",
    "GRI 305-3"
  ],
  "expected_fields": [
    "value",
    "unit",
    "year",
    "boundary",
    "method"
  ],
  "allowed_units": [
    "kgCO2e",
    "tCO2e",
    "ktCO2e",
    "MtCO2e",
    "1,000 tCO2",
    "1,000 tCO2e"
  ],
  "extraction_hints": [
    "Look for Scope 3 tables near GRI 305-3.",
    "Do not confuse materiality statements with quantified inventory values.",
    "If the text says the category is material but gives no value, extract as qualitative scope3_evidence or missing_disclosure, not quantified ghg_emission_metric."
  ],
  "audit_notes": [
    "Method and emission factor are often missing in sustainability reports.",
    "Supplier-specific activity data is needed for stronger LCA applicability."
  ],
  "status": "active",
  "version": "v0.1"
}
```

### CSV shape

```csv
concept_id,concept_type_id,label,definition,aliases_json,parent_id,standard_refs_json,expected_fields_json,allowed_units_json,extraction_hints_json,audit_notes_json,status,version
```

## 3. Extraction ontology / task schema

An extraction ontology selects a subset of concept types and canonical concepts for a concrete run.

```json
{
  "extraction_schema_id": "r2l_scope_lca_v0_1",
  "name": "Report-to-LCA Scope/GHG/LCA pilot extraction",
  "ontology_version": "r2l_ontology_v0.1",
  "concept_types": [
    "ghg_emission_metric",
    "lca_claim",
    "missing_disclosure"
  ],
  "canonical_concept_filters": [
    "ghg.scope1",
    "ghg.scope2.location_based",
    "ghg.scope2.market_based",
    "ghg.scope3.category1",
    "ghg.scope3.category4",
    "ghg.scope3.category6",
    "ghg.scope3.category9",
    "lca.life_cycle_analysis_claim",
    "lca.use_phase_impact_claim"
  ],
  "source_grounding_required": true,
  "missing_evidence_enabled": true,
  "langextract": {
    "prompt_version": "r2l_langextract_prompt_v0.1",
    "model_id": "gemini-2.5-flash",
    "max_char_buffer": 1200,
    "extraction_passes": 1,
    "strict_prompt_validation": true
  },
  "post_validation": [
    "validate_required_fields",
    "normalize_units",
    "recover_source_page",
    "flag_missing_method",
    "compute_applicability"
  ],
  "status": "draft",
  "version": "v0.1"
}
```

## 4. Extraction run

Every extraction run should be reproducible.

```json
{
  "run_id": "run_2026_05_13_valmet_demo",
  "extraction_schema_id": "r2l_scope_lca_v0_1",
  "ontology_version": "r2l_ontology_v0.1",
  "prompt_version": "r2l_langextract_prompt_v0.1",
  "model_id": "gemini-2.5-flash",
  "corpus_slice": {
    "reports": ["valmet_2019_GRI_Supplement.md"],
    "pages": [23, 24]
  },
  "started_at": "2026-05-13T00:00:00Z",
  "completed_at": null,
  "status": "running",
  "notes": "Pilot extraction for ontology schema validation."
}
```

## 5. Evidence object / extracted entity

Evidence Object is the atomic output of the framework.

```json
{
  "evidence_id": "ev_valmet_2019_p24_0007",
  "run_id": "run_2026_05_13_valmet_demo",
  "report_id": "valmet_2019_gri_supplement",
  "company": "Valmet",
  "report_year": 2019,
  "concept_type_id": "ghg_emission_metric",
  "canonical_concept_id": "ghg.scope3.category1",
  "extraction_class": "ghg_emission_metric",
  "raw_text": "Category 1: CO2 emissions from purchased goods and services 2,618",
  "value": 2618,
  "unit": "1,000 tCO2",
  "normalized_value": 2618000,
  "normalized_unit": "tCO2",
  "year": 2019,
  "attributes": {
    "scope": "scope3",
    "scope3_category": "category1_purchased_goods_and_services",
    "method": null,
    "boundary": "upstream value chain"
  },
  "source": {
    "file": "valmet_2019_GRI_Supplement.md",
    "page": 24,
    "section": "Greenhouse gas emissions (GRI 305-1, GRI 305-2, GRI 305-3, GRI 305-4)",
    "quote": "Category 1: CO2 emissions from purchased goods and services 2,618",
    "char_start": null,
    "char_end": null
  },
  "applicability": "scope3_evidence_ready",
  "not_sufficient_for": [
    "product_lca_ready"
  ],
  "missing_fields": [
    "emission_factor",
    "calculation_method_detail",
    "supplier_specific_activity_data"
  ],
  "audit_flags": [
    "method_missing"
  ],
  "confidence": 0.91,
  "review_status": "pending",
  "ontology_version": "r2l_ontology_v0.1",
  "created_at": "2026-05-13T00:00:00Z"
}
```

## 6. Missing evidence object

Missing evidence should be first-class, not a null result.

```json
{
  "evidence_id": "missing_company_x_2024_scope3_cat1_method",
  "run_id": "run_2026_05_13_company_x",
  "report_id": "company_x_2024_sustainability_report",
  "concept_type_id": "missing_disclosure",
  "expected_concept_id": "ghg.scope3.category1",
  "missing_field": "calculation_method_detail",
  "reason_expected": "Company reports Scope 3 Category 1 emissions but does not disclose method or emission factor source.",
  "source_context": {
    "file": "company_x_2024_sustainability_report.md",
    "page": 58,
    "section": "Scope 3 emissions",
    "quote": "Purchased goods and services emissions were 120,000 tCO2e."
  },
  "audit_implication": "Quantified value is useful as Scope 3 evidence but insufficient for high-confidence LCA inventory reuse.",
  "applicability_impact": "downgrade_to_scope3_evidence_ready",
  "audit_flags": ["method_missing"],
  "review_status": "pending"
}
```

## 7. Review ledger

Review records should be append-only.

```json
{
  "review_id": "rev_0001",
  "evidence_id": "ev_valmet_2019_p24_0007",
  "reviewer": "human_expert",
  "decision": "accept_with_minor_correction",
  "corrections": {
    "normalized_unit": "tCO2e"
  },
  "notes": "Original table uses 1,000 tCO2; downstream GHG comparison should normalize carefully and preserve original unit.",
  "reviewed_at": "2026-05-13T00:00:00Z"
}
```

## 8. Ontology change log

Ontology changes should be versioned and justified.

```json
{
  "change_id": "chg_2026_05_13_001",
  "ontology_version_before": "r2l_ontology_v0.1",
  "ontology_version_after": "r2l_ontology_v0.2",
  "change_type": "add_validation_rule",
  "affected_objects": [
    "concept_type:ghg_emission_metric"
  ],
  "summary": "Added validation rule that Scope 2 location-based and market-based emissions must not be merged.",
  "rationale": "Pilot extraction confused the two rows in dense GHG tables.",
  "source": "expert_review",
  "created_at": "2026-05-13T00:00:00Z"
}
```

## 9. Minimal file layout

```text
ontology_extraction/
├── meta_ontology/
│   └── concept_types.jsonl
├── domain_ontology/
│   ├── canonical_concepts.jsonl
│   ├── units.jsonl
│   └── standards.jsonl
├── extraction_ontology/
│   ├── schemas.jsonl
│   └── examples/
│       ├── ghg_emission_metric.jsonl
│       ├── lca_claim.jsonl
│       └── missing_disclosure.jsonl
├── runs/
│   └── extraction_runs.jsonl
├── evidence/
│   └── evidence_objects.jsonl
├── review/
│   └── review_ledger.jsonl
└── changelog/
    └── ontology_change_log.jsonl
```

## 10. Validation checklist

- `concept_type_id` exists for every evidence object.
- `canonical_concept_id` exists or is explicitly `unmapped`.
- source quote is present for accepted evidence.
- `value` and `unit` are both present or both absent.
- unit is recognized or flagged.
- Scope 3 entries include category when available.
- `product_lca_ready` requires functional unit, product boundary, value, unit and method.
- missing evidence objects include `expected_concept_id` and `reason_expected`.
- every reviewed correction is append-only in the review ledger.
- ontology version is recorded in each run and evidence object.
