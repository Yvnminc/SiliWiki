# Valmet 5-year LCA Case-study Meta-ontology

This case-study meta-ontology specializes the generic Report-to-LCA extraction framework for a five-year longitudinal audit of one company: Valmet.

## Case objective

Extract a five-year source-grounded ontology from Valmet GRI Supplements, then produce a professional LCA diagnostic report. Every diagnosis must cite extracted Evidence Object IDs.

## Concept types

1. `ghg_emission_metric`
   - Scope 1, Scope 2 location-based, Scope 2 market-based, Scope 3 total.
   - Fields: canonical concept ID, scope, value, unit, year, source quote, source page, method note, applicability.

2. `scope3_category_metric`
   - Category 1 purchased goods and services.
   - Category 4 upstream transportation and distribution.
   - Category 6 business travel.
   - Category 9 downstream transportation and distribution.
   - Fields: category, value, unit, year, source quote, source page, missing method fields.

3. `lca_claim`
   - Life cycle analysis statement.
   - Use-phase / customer-site environmental impact statement.
   - Product/service environmental impact claim.
   - Fields: claim type, life-cycle stage, product context, quoted claim, source page, missing functional unit / product boundary / allocation method.

4. `assurance_statement`
   - External assurance or verification statements.
   - Fields: assurance provider, assurance level, assured scope, standard reference, source quote, source page.

5. `missing_disclosure`
   - Missing functional unit.
   - Missing product system boundary.
   - Missing allocation method.
   - Missing supplier-specific activity data or emission factors.
   - Missing product-level foreground flows.

6. `diagnostic_finding`
   - Professional LCA audit finding generated after extraction.
   - Fields: diagnosis ID, severity, claim, LCA implication, evidence object IDs, recommended action.

## LCA audit rules

- Corporate GHG values can support `corporate_inventory_ready` but not product-level LCA unless product-specific functional unit and foreground flows are disclosed.
- Scope 3 category data can support `scope3_evidence_ready`, but method/e-factor gaps should be flagged if the report only provides category totals.
- LCA/use-phase claims are useful for hotspot screening but should remain `weak_signal_only` without functional unit, system boundary, product-specific flows and allocation method.
- Repeated Scope 3 category coverage across years improves longitudinal evidence quality, but category coverage should be checked for omissions and methodological comparability.
- Assurance statements improve auditability of reported metrics but must not be assumed to cover every LCA-relevant claim unless the assured scope explicitly includes it.
- Trend diagnostics must cite the yearly evidence objects used to compute the trend.
