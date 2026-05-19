# From Sustainability Reports to LCA-Ready Evidence: Ontology-Managed, Source-Grounded Extraction for Auditable Life Cycle Assessment Data Preparation

**Draft version:** v0.1  
**Date:** 2026-05-20 AEST  
**Working title:** Report-to-LCA Evidence Engine  
**Status:** Research-paper draft with experimental design and preliminary rule-baseline evidence. Final C2/C3 results should be inserted after the gold-set evaluation.

---

## Abstract

Life cycle assessment (LCA) is increasingly required for product carbon footprinting, supply-chain decarbonisation, procurement, and sustainability governance. Yet LCA practice remains constrained by a persistent bottleneck: the conversion of fragmented, heterogeneous, and partially disclosed information into auditable life-cycle inventory evidence. Corporate sustainability, ESG, CSR, and integrated reports contain large volumes of greenhouse-gas, Scope 3, assurance, target, and life-cycle-related disclosures, but these disclosures are not equivalent to product-level LCA data. They often lack functional units, product system boundaries, allocation methods, emission-factor provenance, foreground activity data, and clear assurance scope. Naively applying large language models (LLMs) to such reports risks transforming plausible corporate narratives into unsupported LCA-ready claims.

We propose **ontology-managed Report-to-LCA extraction**, a source-grounded structured extraction framework that converts corporate sustainability reports into auditable **Evidence Objects**. The method compiles a natural-language meta-ontology into concept types, canonical LCA/GHG concepts, extraction schemas, validation rules, and false-readiness guards. Each accepted evidence object is linked to source text and carries structured attributes such as evidence class, canonical concept, value, unit, year, source quote, page reference, missing fields, audit flags, and LCA-readiness label. Crucially, missing methodological evidence is represented as a first-class output rather than treated as extraction failure.

The central claim is not that sustainability reports can automatically produce full product LCAs. Instead, we argue that ontology-managed extraction provides a safer and more scientifically defensible bridge between corporate disclosure and LCA data preparation: it preserves provenance, separates corporate GHG inventory evidence from product-LCA-ready evidence, and exposes the methodological gaps that determine whether a disclosure can support downstream LCA work. We design a three-condition evaluation comparing a deterministic rule baseline, an LLM-only extractor, and the proposed ontology-managed extractor over a manually labelled gold set sampled from a 20,449-report markdown corpus. Evaluation covers extraction quality, field accuracy, source grounding, missing-evidence recall, false-ready rate, runtime, cost, and failure modes. A preliminary 100-report deterministic baseline produced 1,211 grounded evidence objects, including 359 missing-disclosure objects, with zero false product-LCA-ready guard violations, demonstrating feasibility and motivating the full controlled experiment.

**Keywords:** life cycle assessment; life cycle inventory; sustainability reports; ESG disclosure; Scope 3; information extraction; large language models; ontology; knowledge graph; source grounding; auditability; missing evidence.

---

## 1. Introduction

Life cycle assessment is supposed to answer a hard but increasingly unavoidable question: what environmental burdens are associated with a product system across its life cycle? In principle, LCA is a mature methodology. In practice, the most difficult work often happens before impact assessment begins: finding, interpreting, and validating inventory-relevant evidence. Practitioners must determine whether a source discloses measured emissions, estimated emissions, targets, assurance statements, activity data, emission factors, process boundaries, product boundaries, functional units, or merely qualitative sustainability claims.

At the same time, corporate sustainability reporting has expanded rapidly. Large firms publish annual ESG, CSR, sustainability, climate, and integrated reports that contain emissions tables, Scope 3 categories, net-zero targets, assurance statements, energy and water metrics, life-cycle claims, and supply-chain narratives. These reports are attractive as potential evidence sources because they are public, recurring, cross-sectoral, and linked to corporate accountability. However, they are also problematic: they are written for disclosure and reputation management, not for direct LCA modelling. A report may contain a Scope 3 table but omit the method used to estimate upstream purchased goods and services. It may mention product life-cycle thinking without disclosing a functional unit. It may provide third-party assurance for selected GHG indicators while excluding key Scope 3 categories. It may state a net-zero target without a baseline or operational boundary. Such information is useful, but only if its limitations are preserved.

Recent work in automated LCA, semantic LCA modelling, knowledge graphs, and LLM-assisted LCI compilation shows that artificial intelligence can reduce the manual burden of data discovery and inventory compilation. In parallel, climate and ESG NLP research has developed models for sustainability report classification, climate-risk disclosure analysis, net-zero target detection, GHG extraction, table extraction, and greenwashing assessment. These literatures are converging on an important opportunity: corporate reports can be mined at scale. Yet a gap remains between **extracting ESG text** and **producing LCA-ready, auditable evidence**.

This paper addresses that gap. We formulate **Report-to-LCA** as an evidence-auditing problem rather than as direct LCA automation. The goal is not to claim that a corporate sustainability report contains enough information to calculate a product carbon footprint. The goal is to identify what the report can support, what it cannot support, and which missing methodological elements prevent stronger LCA claims.

We propose an ontology-managed extraction pipeline that produces source-grounded Evidence Objects from sustainability reports. The pipeline uses a meta-ontology to specify domain concepts, evidence classes, required attributes, source-grounding rules, validation constraints, and review policies. It then compiles these into an operational extraction ontology and post-validation layer. The output is not a free-form model summary, but a structured evidence ledger: each object records what was extracted, where it came from, how it maps to LCA/GHG concepts, what methodological fields are missing, and whether the object is suitable for corporate inventory support, Scope 3 screening, weak signal analysis, or product-level LCA.

The paper’s story is therefore:

> Corporate sustainability reports are too valuable to ignore, but too incomplete and narrative-driven to treat as LCA-ready data. LLM-only extraction can read them, but may over-interpret them. Ontology-managed, source-grounded extraction makes the conversion from report text to LCA evidence auditable, conservative, and scientifically usable by turning both disclosed facts and missing methodological evidence into structured objects.

### 1.1 Research questions

We ask:

- **RQ1 — Extraction quality:** Does ontology-managed extraction improve precision, recall, and F1 for LCA-relevant evidence objects compared with rule-only and LLM-only baselines?
- **RQ2 — Auditability:** Does ontology-managed extraction improve source quote preservation, page traceability, reproducible evidence IDs, and unsupported-output detection?
- **RQ3 — LCA-readiness safety:** Does ontology-managed extraction reduce false-ready cases where corporate GHG disclosures are incorrectly treated as product-LCA-ready evidence?
- **RQ4 — Missing evidence:** Does ontology-managed extraction improve detection of missing functional units, product boundaries, methods, emission-factor provenance, activity data, allocation rules, and assurance-scope limitations?
- **RQ5 — Scalability:** What are the runtime, cost, failure modes, and coverage patterns when the approach is scaled from pilot reports to large sustainability-report corpora?

### 1.2 Contributions

This paper makes four contributions.

1. **Problem formulation.** We define Report-to-LCA as a source-grounded evidence extraction and auditability problem, distinct from both generic ESG NLP and direct automated LCA calculation.
2. **Ontology-managed extraction method.** We introduce a meta-ontology-driven framework that compiles domain concepts, extraction classes, validation constraints, and false-ready guards into a reproducible extraction pipeline.
3. **Evidence Object schema.** We specify an auditable output representation that binds extracted facts to source quotes, page references, canonical concepts, missing fields, audit flags, and readiness labels.
4. **Evaluation design and preliminary demonstration.** We design a three-condition evaluation over a manually labelled gold set and report preliminary deterministic results from 100 high-signal reports in a 20,449-report corpus.

---

## 2. Related Work

### 2.1 Automated LCA and LCI compilation

The LCA community has long recognised that inventory compilation is expensive, knowledge-intensive, and difficult to scale. Köck et al. review automation in life-cycle inventory analysis and identify data collection, data mapping, and inventory modelling as major bottlenecks in LCA automation [1]. Cashman et al. demonstrate how public data can be mined to support rapid LCI modelling for chemical manufacturing [2]. Mittal et al. show that semantic data modelling can support automated inventory modelling by representing relationships between chemical production pathways and real-world process knowledge [3]. These works establish the importance of automation, but they largely focus on structured or semi-structured technical data sources rather than corporate sustainability report narratives.

Recent work explicitly connects AI and LLMs to LCI compilation. Tu et al. argue that LLMs can help address grand challenges in LCI modelling, including foreground data gaps and background-data matching [8]. Kumar et al. propose an LLM-based framework to retrieve LCI and environmental impact data from scientific literature [9]. Gkousis et al. review machine learning and LLMs for LCI compilation and future development [10]. Preuss and You discuss AI agents and integrated assessment models for automating LCA workflows [11]. These studies motivate the use of AI for LCA data work, but they do not fully solve the problem addressed here: turning corporate sustainability reports into conservative, auditable, LCA-relevant evidence objects while explicitly identifying missing methodological disclosures.

### 2.2 Semantic representations, ontologies, and knowledge graphs for LCA

LCA data are relational by nature: product systems contain processes, flows, units, boundaries, locations, temporal contexts, methods, and impact categories. Semantic modelling and knowledge graphs are therefore attractive. Zhang et al. propose an LCA-oriented semantic representation for the product life cycle [4]. Ghose et al. develop a core ontology for modelling life-cycle sustainability assessment on the Semantic Web [5]. Wang et al. propose a knowledge-enriched framework for LCA in manufacturing [6]. Saad et al. model life-cycle inventory using Neo4j graph databases [7]. More broadly, Zhu et al. review recent capabilities of LLMs for knowledge graph construction and reasoning [22].

These works provide the conceptual foundation for ontology-managed LCA data. However, most LCA ontology/KG work assumes that relevant data are already available or can be curated into structured form. It does not address the upstream extraction problem: corporate reports are unstructured, page-based, noisy, footnote-heavy, cross-sectional, and often incomplete. Our contribution is to connect ontology modelling with source-grounded extraction and audit flags, so that the ontology does not merely store LCA data but actively governs whether a report claim is usable for LCA.

### 2.3 NLP and LLMs for sustainability and climate disclosure

A growing literature uses NLP to analyse sustainability, climate, and ESG reports. Luccioni et al. analyse sustainability reports using NLP, demonstrating the feasibility of computational analysis over such documents [12]. ClimateBERT provides a climate-specific pretrained language model for climate-related text [13]. ClimateBERT has been used to analyse corporate climate-risk disclosures and identify cheap talk and cherry-picking [14]. ClimateBERT-NetZero detects and assesses net-zero and reduction targets [15].

LLMs have also been applied to sustainability reports. Bronzini et al. use LLMs to derive structured insights from sustainability reports [16]. Beck et al. introduce a benchmark dataset for greenhouse-gas emission extraction from sustainability reports [17]. Weichel et al. address robust table information extraction from sustainability reports using a time-aware hybrid approach [18]. Ong et al. study robust ESG analysis against greenwashing risks [19], and Chuang et al. examine LLM-based scoring and greenwashing of corporate climate disclosures [20]. Coen et al. compare corporate climate talk with actual emissions performance [21].

This literature is directly relevant but leaves a specific gap. Existing work often focuses on topic classification, disclosure scoring, target detection, GHG metric extraction, table extraction, or greenwashing risk. These are valuable tasks, but they do not generally enforce the LCA-specific conditions required for product-level evidence: functional unit, product boundary, system boundary, allocation rule, activity data, emission-factor provenance, unit consistency, and assurance-scope limitations. Nor do they consistently represent missing methodological evidence as a first-class extraction target. Our method treats a missing functional unit or missing Scope 3 method not as absence of output but as an auditable finding.

### 2.4 Source grounding, hallucination, and structured LLM extraction

LLMs can produce fluent structured outputs, but hallucination and unsupported claims remain central risks. Ji et al. survey hallucination in natural language generation and show that factual inconsistency is a pervasive challenge [24]. Retrieval-augmented generation (RAG) has been proposed to ground LLM outputs in retrieved sources, and Gao et al. survey RAG for LLMs [23]. FActScore evaluates factual precision in long-form generation through fine-grained atomic facts [25]. These lines of work motivate source-grounding and factuality evaluation.

However, source retrieval alone is insufficient for Report-to-LCA. A response can be grounded in a paragraph but still misclassify a target as measured emissions, merge Scope 2 market-based and location-based values, ignore missing boundaries, or infer product-LCA readiness from corporate inventory data. Our method combines source grounding with domain ontology constraints and readiness validation. The central unit is not a generated answer but an evidence object that can be audited by humans and downstream tools.

---

## 3. Why this research is necessary

This research is necessary for four reasons.

### 3.1 LCA demand is growing faster than expert data preparation capacity

Product carbon footprints, supplier assessments, procurement decisions, climate-transition plans, and Scope 3 management all require life-cycle-relevant data. Manual LCA data collection does not scale to thousands of companies and reports. Automation is therefore not optional; the question is whether automation is safe, auditable, and useful.

### 3.2 Corporate reports are useful but not LCA-ready

Sustainability reports often contain relevant signals: Scope 1/2/3 emissions, energy use, water use, waste, product life-cycle claims, assurance statements, and decarbonisation targets. But these signals are usually corporate-level disclosures, not product-level LCA inventories. Treating them as product-LCA-ready without methodological checks would be scientifically wrong. A method is needed that can say: “this is useful for corporate inventory screening,” “this is a weak life-cycle signal,” or “this cannot support product LCA because the functional unit and boundary are missing.”

### 3.3 LLM-only extraction can amplify overclaiming

LLMs are good at reading messy documents, but their strength is also a risk: they can infer, summarise, and smooth over missing information. In LCA, missing information is not a cosmetic issue. If functional unit, boundary, allocation, method, or emission-factor provenance is absent, the correct output is not a plausible estimate; it is an explicit missing-evidence object.

### 3.4 Auditability is a scientific requirement, not just a UI feature

For LCA practitioners, regulators, auditors, and researchers, every extracted claim must be traceable to a source. Evidence without quote, page, unit, and context is difficult to verify. Ontology-managed extraction makes provenance and missingness part of the data model, enabling reproducible review and systematic error analysis.

---

## 4. Method: Ontology-Managed Report-to-LCA Extraction

### 4.1 Overview

The proposed system converts page-aware corporate report text into a ledger of LCA-relevant Evidence Objects. It has six layers:

1. **Input corpus:** corporate ESG, CSR, sustainability, climate, and integrated reports converted into markdown with page anchors.
2. **Meta-ontology:** a natural-language specification of evidence classes, domain concepts, required attributes, missing-evidence policy, and validation constraints.
3. **Compiled ontology:** concept types, canonical concepts, extraction ontology, prompt rules, examples, and validation rules.
4. **Source-grounded extraction:** chunk selection and model/rule-based extraction of candidate evidence spans.
5. **Evidence normalization:** conversion into Evidence Objects with canonical concept IDs, values, units, years, page references, audit flags, and readiness labels.
6. **Validation and reporting:** field validation, false-ready guards, missing-evidence detection, metrics, and evidence ledgers.

### 4.2 Meta-ontology

The meta-ontology defines how extraction tasks should be represented. For Report-to-LCA, it specifies evidence classes such as:

- `ghg_emission_metric`
- `scope3_category_metric`
- `lca_claim`
- `energy_metric`
- `water_metric`
- `waste_metric`
- `assurance_statement`
- `target_claim`
- `missing_disclosure`

It also defines canonical concepts such as:

- `ghg.scope1`
- `ghg.scope2.location_based`
- `ghg.scope2.market_based`
- `ghg.scope3.total`
- `ghg.scope3.category1.purchased_goods_and_services`
- `ghg.scope3.category4.upstream_transportation_distribution`
- `ghg.scope3.category6.business_travel`
- `ghg.scope3.category9.downstream_transportation_distribution`
- `ghg.scope3.category11.use_of_sold_products`
- `lca.life_cycle_analysis_claim`
- `assurance.ghg_inventory_verification`
- `missing.scope3_method`
- `missing.functional_unit`

The meta-ontology is intentionally human-readable. Domain experts can state that product-LCA-ready evidence requires a functional unit, product boundary, method, value, unit, and source quote. The system then compiles these requirements into extraction schemas and validators.

### 4.3 Evidence Object schema

Each Evidence Object contains:

- `evidence_id`: stable identifier
- `report_id`: source report identifier
- `company`: company name if available
- `year`: report or evidence year
- `source_page`: page number if recoverable
- `source_quote`: exact source text span or grounded quote
- `evidence_class`: extraction class
- `canonical_concept_id`: ontology concept mapping
- `value`: numeric or textual value if applicable
- `unit`: unit if applicable
- `boundary`: organizational, operational, product, or system boundary if disclosed
- `method`: disclosed accounting, estimation, or LCA method if available
- `assurance_scope`: whether and how the evidence is assured
- `missing_fields`: fields required for stronger LCA readiness but absent from the source
- `audit_flags`: flags such as `method_missing`, `functional_unit_missing`, `target_without_baseline`, `assurance_scope_unclear`
- `readiness_label`: one of `weak_signal_only`, `corporate_inventory_ready`, `scope3_evidence_ready`, `screening_ready`, `product_lca_ready`, or `missing_evidence`

This representation is deliberately conservative. Evidence can be useful without being product-LCA-ready. For example, a Scope 3 Category 1 value may be `scope3_evidence_ready` but not `product_lca_ready` if it lacks product boundary and functional unit.

### 4.4 False-ready guards

A central design feature is the false-ready guard. An object cannot be labelled `product_lca_ready` unless it contains, at minimum:

- functional unit or reference flow;
- product or process system boundary;
- value and unit;
- method or standard;
- source quote;
- sufficient temporal context;
- no contradictory missing-evidence flag.

This guard prevents corporate GHG inventory disclosures from being over-interpreted as product LCA evidence. For example, a corporate Scope 3 total is not automatically product-LCA-ready. A product life-cycle claim without functional unit is a weak signal or missing-evidence case.

### 4.5 Missing evidence as first-class output

In conventional information extraction, missing information often results in no extraction. In Report-to-LCA, absence is itself important. If a report claims life-cycle benefits but omits functional unit, system boundary, method, or emission-factor provenance, this should be extracted as a missing-disclosure object. This makes the system useful for audit, not merely data harvesting.

---

## 5. Data

### 5.1 Corpus

The local study corpus contains 20,449 markdown reports derived from corporate ESG, CSR, sustainability, climate, and integrated reports. The corpus covers multiple years, sectors, report types, and disclosure styles. Markdown files preserve report text and page anchors where possible, enabling page-level traceability.

### 5.2 Preliminary high-signal sample

A preliminary high-signal sample of 100 reports was selected from the corpus to evaluate pipeline mechanics and demonstrate cross-company feasibility. The selection prioritised recent public/listed companies with strong Scope 3, LCA, assurance, and net-zero signals. This sample is not a statistically representative corpus sample and is not used as the final benchmark. Its purpose is to calibrate evidence density, failure modes, runtime, and demo potential.

### 5.3 Gold-set sample for final evaluation

The final experimental evaluation will use a manually labelled gold set. Two sizes are proposed:

- **Minimum viable version:** 50 reports or report chunks.
- **Paper-strength version:** 100 reports or 300–500 LCA-relevant chunks.

Sampling strata should include:

- sectors: manufacturing, chemicals/materials, energy/utilities, transport/logistics, technology/services, finance/property, consumer goods;
- report years: recent reports, especially 2019–2024;
- disclosure richness: reports with Scope 3 tables, LCA/life-cycle claims, assurance statements, and net-zero targets;
- document quality: clean tables, messy converted tables, short CSR reports, long integrated reports.

The gold set should avoid becoming a high-signal-only benchmark. It should include difficult negative examples where reports use sustainability language but provide little LCA-usable evidence.

---

## 6. Experimental Design

### 6.1 Conditions

The same chunks and reports will be processed under three conditions.

#### C1. Rule baseline

A deterministic rule-based provider extracts known patterns for GHG metrics, Scope 3 categories, assurance, targets, LCA claims, and missing-disclosure signals. This baseline is cheap, reproducible, and useful for regression testing. It is not expected to maximise recall.

#### C2. LLM-only baseline

An LLM is prompted to extract LCA-relevant evidence from the same chunks without compiled ontology constraints or post-hoc false-ready guards. The prompt asks for structured JSON output but does not provide the full domain ontology or validation rules. This condition tests whether general LLM extraction over-interprets corporate disclosures, misses missing evidence, or confuses targets with measured data.

#### C3. Ontology-managed extraction

The proposed method uses the compiled meta-ontology, canonical concepts, evidence classes, validation rules, source-grounding requirements, and false-ready guards. Missing evidence is an explicit target. Outputs are post-validated before being accepted as Evidence Objects.

### 6.2 Annotation protocol

Each gold-set item should be labelled by at least one LCA-trained annotator, with a second annotator on a subset to estimate agreement. The annotation schema includes:

- evidence object class;
- canonical concept ID;
- source quote;
- page number;
- value, unit, and year;
- Scope and Scope 3 category;
- method and boundary fields;
- assurance scope if applicable;
- missing fields;
- audit flags;
- readiness label.

Disagreements should be adjudicated and recorded. For categorical labels, Cohen’s kappa or Krippendorff’s alpha can be reported. For span extraction, relaxed overlap and exact-match measures can both be used.

### 6.3 Metrics

#### Extraction quality

- evidence-object precision, recall, and F1;
- evidence-class macro-F1;
- canonical concept accuracy;
- numeric value accuracy;
- unit accuracy;
- year accuracy;
- Scope and Scope 3 category accuracy.

#### Grounding and auditability

- grounded evidence rate;
- exact quote match rate;
- page traceability rate;
- unsupported evidence rate;
- duplicate or merged evidence error rate;
- reproducible evidence ID rate.

#### LCA-readiness safety

- false-ready rate: fraction of outputs incorrectly labelled product-LCA-ready;
- missing functional-unit recall;
- missing product-boundary recall;
- missing method recall;
- missing emission-factor-provenance recall;
- target-vs-measured-data confusion rate;
- assurance-scope overgeneralization rate.

#### Operational metrics

- runtime per report;
- cost per report;
- chunks per report;
- token use;
- retry count;
- cache hit rate;
- failed report rate;
- empty extraction rate.

### 6.4 Statistical analysis

Because all conditions operate over the same reports and chunks, comparisons are paired. We will report bootstrap 95% confidence intervals for precision, recall, F1, false-ready rate, and missing-evidence recall. For paired binary errors, McNemar-style tests or permutation tests can be used. Error analysis will be reported by sector, report type, evidence class, and document layout quality.

### 6.5 Ablations

The ontology-managed condition can be ablated to measure the contribution of specific components:

- **No missing-evidence objects:** remove first-class missing disclosure extraction.
- **No false-ready guard:** allow readiness labels without required field validation.
- **No canonical concept mapping:** extract free-form labels only.
- **No source-grounding enforcement:** allow ungrounded JSON outputs.

These ablations directly test the paper’s claim that the method is not merely “LLM plus prompt,” but a safety and auditability architecture.

---

## 7. Preliminary 100-Report Baseline

A preliminary deterministic rule-provider run was performed on 100 high-signal reports. This run validates pipeline mechanics and evidence-ledger generation; it is not a final LLM-quality benchmark.

Key results:

- reports: 100;
- selected chunks: 800, average 8 chunks per report;
- evidence objects: 1,211;
- average evidence objects per report: 12.11;
- median evidence objects per report: 11;
- grounded evidence rate: 100%;
- missing-disclosure objects: 359, or 29.64% of all evidence objects;
- false-ready guard violations: 0;
- reports with assurance evidence: 76;
- reports with target claims: 68;
- reports with any Scope 3 total or specific category evidence: 43;
- reports with LCA/life-cycle claims: 24;
- reports with missing Scope 3 method evidence: 97;
- reports with missing functional unit evidence: 21.

The evidence-class distribution was:

- target claims: 331;
- missing disclosures: 359;
- assurance statements: 246;
- Scope 3 category metrics: 97;
- GHG emission metrics: 92;
- LCA claims: 86.

These preliminary results support three observations.

First, the corpus contains enough LCA-relevant signals to support cross-company evidence extraction and comparison. Second, the strongest immediate use case is not fully automated product LCA, but audit-oriented readiness assessment: many reports disclose targets, assurance, and GHG metrics, while still missing methods, functional units, or boundaries. Third, false-ready guards are necessary because the abundance of climate disclosure can create an illusion of LCA readiness.

---

## 8. Expected Results and Interpretation

The expected pattern is not simply that C3 extracts the most evidence. In fact, a method that extracts fewer but better-grounded and safer objects may be preferable. The main expected outcomes are:

1. **C1 rule baseline:** high determinism and low cost; conservative but lower recall; useful for regression testing.
2. **C2 LLM-only:** higher recall for narrative evidence but higher risk of unsupported outputs, target-data confusion, and over-readiness.
3. **C3 ontology-managed:** improved balance of recall, precision, grounding, missing-evidence recall, and false-ready safety.

The key success criterion is that C3 reduces the false-ready rate and improves missing-evidence recall while maintaining competitive extraction quality. If C2 extracts more claims but also mislabels corporate disclosures as product-LCA-ready, then C3 is scientifically preferable.

---

## 9. Case Study Design

A deep longitudinal case study should complement the gold-set benchmark. The proposed case is Valmet over multiple years because it contains continuous GHG, Scope 3, life-cycle, and product-use-phase signals. The case study should show how the method supports expert reasoning:

1. identify corporate inventory evidence;
2. identify Scope 3 hotspots;
3. separate use-phase/product claims from quantitative product LCA evidence;
4. detect missing functional unit or system boundary;
5. generate an evidence-backed diagnostic narrative.

The case study should not be presented as proof that the system can calculate product LCA from reports. It should be presented as a demonstration of auditable reasoning: finding what is usable, what is weak, and what is missing.

---

## 10. Discussion

### 10.1 Research value

The research value lies in reframing corporate sustainability reports as **auditable evidence sources** rather than as raw LCA databases. This distinction matters. If reports are treated as databases, extraction systems will try to fill tables. If reports are treated as evidence sources, extraction systems must preserve provenance, uncertainty, missingness, and readiness constraints. The latter is more aligned with scientific LCA practice.

### 10.2 Practical value

For LCA practitioners, the system can reduce the time spent scanning reports and identifying relevant evidence. For companies, it can reveal disclosure gaps that prevent stronger LCA claims. For auditors and researchers, it can produce reproducible evidence ledgers. For supply-chain platforms, it can support conservative screening before requesting primary data.

### 10.3 Why ontology management is an advantage

Ontology management adds value because LCA is not a flat extraction task. The meaning of a number depends on scope, category, boundary, unit, year, method, and assurance. A generic extractor may find “1,000 tCO2e,” but the ontology determines whether it is Scope 1, Scope 2 location-based, Scope 2 market-based, Scope 3 Category 1, a target, a baseline, an offset, or an assured metric. The ontology also determines what is missing.

### 10.4 Why missing evidence is a contribution

In many AI extraction systems, missing fields are treated as incomplete outputs. In LCA audit, missing fields are findings. A missing functional unit tells the practitioner that a life-cycle claim cannot support product comparison. A missing Scope 3 method tells the user that a category value may be useful for screening but not robust benchmarking. Making absence explicit is therefore central to the method.

### 10.5 Why source grounding is necessary but insufficient

Source grounding ensures that evidence is traceable, but a grounded span can still be misinterpreted. For example, a source quote about net-zero targets may be grounded but not measured emissions. A grounded Scope 3 total may not have category breakdown or method disclosure. Therefore, grounding must be paired with ontology constraints and validation.

---

## 11. Limitations

This work has several limitations.

First, sustainability reports are heterogeneous and often converted from PDFs with layout loss. Tables, footnotes, multi-year columns, and page breaks can introduce extraction errors. Second, source-grounded extraction does not guarantee correctness; field-level validation and human gold labels remain necessary. Third, corporate reports may omit critical information, and no extraction method can recover undisclosed data. Fourth, the high-signal 100-report preliminary sample is not representative; final claims require a stratified gold-set evaluation. Fifth, LLM results may vary across models, prompts, and provider settings; caching, versioning, and prompt logging are required for reproducibility.

---

## 12. Ethical and Governance Considerations

The system should not be used to certify product carbon footprints without expert review. It is an evidence preparation and audit support tool, not a substitute for LCA expertise or assurance. Outputs should distinguish disclosed facts, inferred labels, missing evidence, and model uncertainty. Public company reports can be processed, but private reports may contain confidential information and require appropriate data governance. The system should avoid amplifying corporate greenwashing by requiring every positive claim to be tied to source evidence and by explicitly identifying missing methodological support.

---

## 13. Conclusion

This paper proposes ontology-managed, source-grounded extraction as a conservative bridge between corporate sustainability reporting and LCA data preparation. The method addresses a practical and scientific gap: sustainability reports contain valuable climate and life-cycle signals, but they are not automatically LCA-ready. By producing Evidence Objects that preserve source quotes, canonical concepts, missing fields, audit flags, and readiness labels, the proposed approach makes report-derived evidence usable without overclaiming its validity.

The planned evaluation compares rule-based, LLM-only, and ontology-managed extraction over a human-labelled gold set. The key hypothesis is that ontology management will reduce false product-LCA-ready claims and improve missing-evidence recall while maintaining competitive extraction accuracy. Preliminary results from 100 high-signal reports show that the pipeline can scale mechanically and that missing evidence is widespread, supporting the need for an audit-oriented Report-to-LCA approach.

The broader contribution is methodological: AI should not merely extract more sustainability claims; it should help determine which claims are usable, which are weak, and which methodological evidence is missing. That is the difference between automated ESG reading and scientifically defensible LCA evidence preparation.

---

## References

[1] Köck, B., et al. (2023). *Automation of Life Cycle Assessment—A Critical Review of Developments in the Field of Life Cycle Inventory Analysis*. Sustainability. https://doi.org/10.3390/su15065531

[2] Cashman, S. A., et al. (2016). *Mining Available Data from the United States Environmental Protection Agency to Support Rapid Life Cycle Inventory Modeling of Chemical Manufacturing*. Environmental Science & Technology. https://doi.org/10.1021/acs.est.6b02160

[3] Mittal, V. K., et al. (2018). *Toward Automated Inventory Modeling in Life Cycle Assessment: The Utility of Semantic Data Modeling to Predict Real-World Chemical Production*. ACS Sustainable Chemistry & Engineering. https://doi.org/10.1021/acssuschemeng.7b03379

[4] Zhang, Y., et al. (2015). *LCA-oriented semantic representation for the product life cycle*. Journal of Cleaner Production. https://doi.org/10.1016/j.jclepro.2014.08.053

[5] Ghose, A., et al. (2022). *A core ontology for modeling life cycle sustainability assessment on the Semantic Web*. Journal of Industrial Ecology. https://doi.org/10.1111/jiec.13220

[6] Wang, Y., et al. (2022). *A Knowledge-enriched Framework for Life Cycle Assessment in Manufacturing*. Procedia CIRP. https://doi.org/10.1016/j.procir.2022.02.010

[7] Saad, M. H., et al. (2023). *A graph database for life cycle inventory using Neo4j*. Journal of Cleaner Production. https://doi.org/10.1016/j.jclepro.2023.136344

[8] Tu, R., et al. (2024). *Mitigating Grand Challenges in Life Cycle Inventory Modeling through the Applications of Large Language Models*. Environmental Science & Technology. https://doi.org/10.1021/acs.est.4c07634

[9] Kumar, A., et al. (2025). *A Large Language Model-based Framework to Retrieve Life Cycle Inventory and Environmental Impact Data from Scientific Literature*. Environmental Science & Technology. https://doi.org/10.1021/acs.est.5c05955

[10] Gkousis, S., Vasilaki, V., & Katsou, E. (2026). *Machine learning and large language models for life cycle inventory compilation: Current situation and future developments*. Renewable and Sustainable Energy Reviews. https://doi.org/10.1016/j.rser.2025.116577

[11] Preuss, M., & You, F. (2026). *Automating Life Cycle Assessments through Artificial Intelligence Agents and Integrated Assessment Models*. Environmental Science & Technology. https://doi.org/10.1021/acs.est.5c14493

[12] Luccioni, A. S., Baylor, E., & Duchêne, N. (2020). *Analyzing Sustainability Reports Using Natural Language Processing*. arXiv:2011.08073. https://arxiv.org/abs/2011.08073

[13] Webersinke, N., Kraus, M., Bingler, J., & Leippold, M. (2022). *ClimateBERT: A Pretrained Language Model for Climate-Related Text*. SSRN. https://doi.org/10.2139/ssrn.4229146

[14] Bingler, J., Kraus, M., Leippold, M., & Webersinke, N. (2022). *Cheap talk and cherry-picking: What ClimateBERT has to say on corporate climate risk disclosures*. Finance Research Letters. https://doi.org/10.1016/j.frl.2022.102776

[15] Schimanski, T., et al. (2023). *ClimateBERT-NetZero: Detecting and Assessing Net Zero and Reduction Targets*. EMNLP. https://doi.org/10.18653/v1/2023.emnlp-main.975

[16] Bronzini, M., Nicolini, C., Lepri, B., Passerini, A., & Staiano, J. (2024). *Glitter or Gold? Deriving Structured Insights from Sustainability Reports via Large Language Models*. EPJ Data Science. https://doi.org/10.1140/epjds/s13688-024-00481-2

[17] Beck, J., et al. (2025). *Addressing data gaps in sustainability reporting: A benchmark dataset for greenhouse gas emission extraction*. Scientific Data. https://doi.org/10.1038/s41597-025-05664-8

[18] Weichel, H., Simón, M., & Schäfer, J. (2025). *Robust Table Information Extraction from Sustainability Reports: A Time-Aware Hybrid Two-Step Approach*. ClimateNLP. https://doi.org/10.18653/v1/2025.climatenlp-1.16

[19] Ong, K., Mao, R., Varshney, D., Cambria, E., & Mengaldo, G. (2025). *Towards Robust ESG Analysis Against Greenwashing Risks: Aspect-Action Analysis with Cross-Category Generalization*. ACL. https://doi.org/10.18653/v1/2025.acl-long.723

[20] Chuang, M., Chuang, G., Chuang, C., & Chuang, J. (2025). *Judging It, Washing It: Scoring and Greenwashing Corporate Climate Disclosures using Large Language Models*. ClimateNLP. https://doi.org/10.18653/v1/2025.climatenlp-1.2

[21] Coen, D., Herman, K., & Pegram, T. (2022). *Are corporate climate efforts genuine? An empirical analysis of the climate ‘talk–walk’ hypothesis*. Business Strategy and the Environment. https://doi.org/10.1002/bse.3063

[22] Zhu, Y., Wang, X., Chen, J., Qiao, S., Ou, Y., Yao, Y., Deng, S., Chen, H., & Zhang, N. (2024). *LLMs for knowledge graph construction and reasoning: recent capabilities and future opportunities*. World Wide Web. https://doi.org/10.1007/s11280-024-01297-w

[23] Gao, Y., et al. (2023). *Retrieval-Augmented Generation for Large Language Models: A Survey*. arXiv:2312.10997. https://arxiv.org/abs/2312.10997

[24] Ji, Z., et al. (2023). *Survey of Hallucination in Natural Language Generation*. ACM Computing Surveys. https://doi.org/10.1145/3571730

[25] Min, S., et al. (2023). *FActScore: Fine-grained Atomic Evaluation of Factual Precision in Long Form Text Generation*. arXiv:2305.14251. https://arxiv.org/abs/2305.14251

---

## Appendix A. Paper story in one paragraph

Corporate sustainability reports are a massive but unsafe intermediate layer between public disclosure and LCA practice. They contain many climate and life-cycle signals, but these signals are usually not product-LCA-ready. Existing automated LCA work focuses on structured data and inventory modelling; ESG NLP focuses on disclosure classification, target detection, and scoring. The missing research layer is an auditable converter that reads reports conservatively, extracts only source-grounded evidence, maps it to LCA/GHG ontology concepts, and explicitly flags what is missing. Ontology-managed Report-to-LCA extraction fills this gap by making both evidence and absence structured, reviewable, and measurable.

## Appendix B. Proposed result tables for final paper

### Table B1. Dataset composition

Columns: corpus split, number of reports, number of chunks, years, sectors, report types, average file size, high-signal criteria.

### Table B2. Gold-set annotation statistics

Columns: evidence class, number of gold objects, average span length, inter-annotator agreement, positive/negative/missing cases.

### Table B3. Main extraction results

Rows: C1 rule baseline, C2 LLM-only, C3 ontology-managed.  
Columns: precision, recall, F1, concept accuracy, value accuracy, unit accuracy, year accuracy, cost/report, runtime/report.

### Table B4. Auditability and safety results

Rows: C1, C2, C3.  
Columns: grounded rate, exact quote match, page traceability, unsupported rate, false-ready rate, missing-method recall, missing-functional-unit recall, target-data confusion, assurance overgeneralization.

### Table B5. Error taxonomy

Rows: layout/table error, Scope 2 market/location merge, target vs measured data confusion, assurance overgeneralization, missing functional unit missed, missing method missed, hallucinated boundary, duplicate evidence.

### Figure B1. Architecture

Input reports → chunk retrieval → meta-ontology compiler → extraction ontology → extractor → evidence normalization → validation guards → evidence ledger/dashboard.

### Figure B2. Readiness ladder

Weak signal only → corporate inventory ready → Scope 3 evidence ready → screening ready → product LCA ready, with required evidence fields at each step.

### Figure B3. Valmet longitudinal case

Evidence timeline showing Scope 1/2/3, dominant Scope 3 categories, life-cycle claims, and missing-method gaps over multiple years.
