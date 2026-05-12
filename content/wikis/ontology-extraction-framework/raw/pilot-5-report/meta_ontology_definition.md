# Natural-language Meta-ontology Definition — Report-to-LCA Evidence Extraction

The user-facing input should be natural language. The backend should compile this definition into domain ontology, extraction ontology, LangExtract execution configuration, evidence-object storage and validation reports.

## Purpose

Create an ontology-managed extraction system that turns corporate sustainability reports into source-grounded, auditable LCA-relevant evidence objects.

## Required concept types

The system should extract and manage the following concept types:

1. **GHG emission metric** — quantified Scope 1, Scope 2 and Scope 3 emissions. Required grounding: source quote and page. Important fields: canonical concept, scope, Scope 3 category if applicable, value, unit, year, method, boundary, applicability and audit flags.
2. **Scope 3 category metric** — category-level Scope 3 evidence, especially purchased goods and services, upstream transportation and distribution, business travel, downstream transportation and distribution, and use of sold products.
3. **LCA claim** — statements about life cycle analysis, product life-cycle impacts, use-phase impacts, value-chain environmental impacts or lifecycle emissions. These are usually weak evidence unless functional unit, product boundary, value, unit and method are disclosed.
4. **Energy metric** — energy consumption, electricity, renewable electricity and fuel metrics.
5. **Water metric** — water withdrawal, water discharge and water consumption metrics.
6. **Waste metric** — waste generated, recycled, diverted, hazardous and non-hazardous waste metrics.
7. **Assurance statement** — third-party verification or assurance statements, especially GHG inventory verification and ISO 14064-3 references.
8. **Target claim** — net-zero, carbon-neutral or emissions-reduction targets.
9. **Missing disclosure** — a first-class object when an expected field, method, functional unit, product boundary, emission factor, supplier-specific activity data or baseline is missing.

## Required domain ontology

The domain ontology must include at least:

- GHG Protocol Scope 1.
- GHG Protocol Scope 2, including location-based and market-based variants.
- GHG Protocol Scope 3 total emissions.
- Scope 3 Category 1: purchased goods and services.
- Scope 3 Category 4: upstream transportation and distribution.
- Scope 3 Category 6: business travel.
- Scope 3 Category 9: downstream transportation and distribution.
- Scope 3 Category 11: use of sold products.
- LCA concepts: life cycle analysis claim, use-phase impact claim, functional unit, product system boundary, method and allocation.
- Unit concepts: kgCO2e, tCO2e, metric tons CO2e, MTCO2e, KtCO2e, 1,000 tCO2, 1,000 tCO2e, MWh, m3.
- Assurance concepts: GHG inventory verification, limited assurance, reasonable assurance, ISO 14064-3.

## Validation rules

- Every accepted evidence object must preserve exact source quote and source page when available.
- Value and unit should appear together; if one is missing, flag the evidence for review.
- Scope 2 location-based and market-based emissions must not be merged.
- Scope 3 category evidence should include category mapping when the report gives a category.
- Materiality-only statements should be treated as weak signals, not quantified inventory.
- Product-level LCA readiness must not be assigned unless the evidence includes functional unit, product boundary, value, unit and method.
- Missing evidence should be emitted explicitly instead of silently ignored.
- Net-zero or reduction targets without baseline should receive an audit flag.
- Intensity-only disclosures should receive an audit flag if absolute emissions are missing.

## Applicability labels

The system may assign:

- `product_lca_ready`
- `screening_lca_ready`
- `corporate_inventory_ready`
- `scope3_evidence_ready`
- `social_lca_evidence_ready`
- `weak_signal_only`
- `missing_evidence`
- `audit_support`
- `review_required`

## Output

The backend should produce:

- compiled concept types;
- compiled domain ontology;
- compiled extraction ontology;
- LangExtract annotated JSONL;
- normalized evidence objects JSONL;
- report-level summaries;
- validation metrics;
- a reader-facing wiki report.
