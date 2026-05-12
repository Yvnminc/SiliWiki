# Valmet 5-year LCA Ontology Case Study / Valmet 五年本体驱动 LCA 诊断

这是一份公司级 ontology extraction case study：选择 Valmet 2018–2022 连续五年的 GRI Supplement，把自然语言 case-study meta-ontology 编译成 domain ontology / extraction ontology，再通过 LangExtract-style source-grounded extraction 生成 Evidence Objects，最后从专业 LCA 角度做审计与诊断。

<div class="tldr">
<strong>TL;DR</strong><br>
Valmet 五年报告共抽取 44 条 source-grounded Evidence Objects，grounded rate = 1.00，false-ready guard violations = 0。结论很清楚：Valmet 的 corporate GHG inventory 与 Scope 3 hotspot screening 证据基础较强，尤其 Category 1 purchased goods and services 在已抓取 Scope 3 category 中持续占主导；但这些报告证据仍不足以直接支撑 product LCA，因为缺 functional unit、product system boundary、allocation method，以及 Scope 3 emission-factor / activity-data 细节。每条诊断都绑定 ontology Evidence IDs，并可在 raw JSON/JSONL 中追溯到报告页码与原文 quote。
</div>

## 研究问题 {#research-question}

本 case study 回答一个实际问题：如果用户只提供自然语言 meta-ontology，系统能不能自动把五年 sustainability reports 转换为可审计、可追溯、可用于 LCA 判断的 evidence base？

这里的关键不是“抓一堆字段”，而是把抓取出来的每条信息放进稳定的 ontology 管理框架中：

```mermaid
flowchart LR
  A[Natural-language case meta-ontology] --> B[Domain ontology]
  B --> C[Extraction ontology]
  C --> D[LangExtract-style execution]
  D --> E[Evidence Objects]
  E --> F[Validation metrics]
  E --> G[LCA diagnostic findings]
  G --> H[Ontology-backed wiki report]
```

## 公司与报告选择 {#company-selection}

选择 **Valmet** 的原因：

- corpus 中有 Valmet 连续多年 GRI Supplement，可做 longitudinal case；
- 2018–2022 五年报告中含 GHG Scope 1/2、Scope 3 category、assurance、LCA/use-phase language 等多类证据；
- 它适合检验 ontology extraction 是否能区分 corporate inventory、Scope 3 screening、product LCA readiness 和 auditability。

本次使用的报告：

| Year | Source report |
| ---: | --- |
| 2018 | `valmet_2018_GRI_Supplement.md` |
| 2019 | `valmet_2019_GRI_Supplement.md` |
| 2020 | `valmet_2020_GRI_Supplement.md` |
| 2021 | `valmet_2021_GRI_Supplement.md` |
| 2022 | `valmet_2022_GRI_Supplement.md` |

## Case-study ontology 设计 {#ontology-design}

本 case-study meta-ontology 把通用 Report-to-LCA ontology extraction 专门化为五年公司诊断。核心实体不是“字符串字段”，而是 typed Evidence Objects：

| Layer | Role in this case |
| --- | --- |
| Meta-ontology | 定义 concept type、required fields、validation rule、missing-evidence policy、diagnosis schema。 |
| Domain ontology | 定义 GHG Scope 1/2/3、Scope 3 categories、LCA/use-phase claims、assurance、target claims、missing disclosures 等专业概念。 |
| Extraction ontology | 定义本次从 Valmet 五年报告中实际抽哪些 class、字段、source quote、page、单位、audit flags。 |
| Evidence Objects | 存储每条具体抽取实例：concept type、canonical concept、value、unit、year、page、quote、applicability、missing fields、audit flags。 |

本 case 的主要 concept types：

| Concept type | Count |
| --- | ---: |
| `ghg_emission_metric` | 9 |
| `scope3_category_metric` | 19 |
| `assurance_statement` | 10 |
| `lca_claim` | 2 |
| `missing_disclosure` | 2 |
| `target_claim` | 2 |

## Extraction run 与验证结果 {#extraction-results}

本次运行使用 offline deterministic provider `ontology-rule-r2l-v1`，目标是验证 ontology-managed extraction pipeline 的闭环，而不是宣称 live LLM benchmark 质量。

| Metric | Result |
| --- | ---: |
| Reports | 5 |
| Evidence Objects | 44 |
| Grounded evidence | 44 |
| Grounded evidence rate | 1.00 |
| Missing-evidence objects | 2 |
| False-ready guard violations | 0 |

### Canonical concept coverage {#concept-coverage}

| Canonical concept | Evidence count |
| --- | ---: |
| `ghg.scope1` | 5 |
| `ghg.scope2.location_based` | 2 |
| `ghg.scope2.market_based` | 2 |
| `ghg.scope3.category1.purchased_goods_and_services` | 5 |
| `ghg.scope3.category4.upstream_transportation_distribution` | 5 |
| `ghg.scope3.category6.business_travel` | 5 |
| `ghg.scope3.category9.downstream_transportation_distribution` | 4 |
| `assurance.ghg_inventory_verification` | 10 |
| `lca.life_cycle_analysis_claim` | 2 |
| `missing.scope3_method` | 2 |
| `target.net_zero` | 2 |

### Audit flags {#audit-flags}

| Audit flag | Count |
| --- | ---: |
| `method_missing` | 21 |
| `functional_unit_missing` | 2 |
| `target_without_baseline` | 2 |

`method_missing` 是本 case 最重要的质量信号：Scope 3 category rows 有数值和单位，适合 disclosure benchmarking / hotspot screening，但报告片段没有给出足够 emission-factor、activity-data 或 calculation-method detail，所以不能直接升格为 product LCA foreground inventory。

## 专业 LCA scorecard {#lca-scorecard}

| Assessment | Rating | Evidence basis |
| --- | --- | --- |
| Corporate inventory readiness | `medium-high` | D1: `ev_0b0bbb6d788b`, `ev_d817d2cbdb8e`, `ev_9860caae29cb`, `ev_9cc64e238689`, `ev_e73327c18a31` + Scope 2 source set below |
| Scope 3 hotspot screening readiness | `high` | D2/D3: `ev_db0c3e17538e`, `ev_e4b2f83e57a3`, `ev_db0474f7fb92`, `ev_679bb4eee8d9`, `ev_f4913df49967` + full Scope 3 category table below |
| Product LCA readiness | `low` | D1/D3/D4: corporate inventory, method-missing flags, and LCA/use-phase claims `ev_37831ba12f99`, `ev_a0bed69c021f` |
| Auditability | `medium-high` | D5: `ev_957e7d86dd4e`, `ev_faaf1a420250`, `ev_8fda0855fca8`, `ev_cf99b5422e53`, `ev_598fe6711ee3` |

Main blockers:

- `missing functional unit`
- `missing product system boundary`
- `missing allocation method`
- `missing Scope 3 emission-factor/activity-data detail`

## 五年指标表 {#metric-table}

以下表格不是手工录入，而是从 Evidence Objects / `diagnostic_findings.json` 生成；每个数值都保留 Evidence ID 和报告页码。

| Metric | Concept | Year | Value | Unit | Evidence | Page |
| --- | --- | ---: | ---: | --- | --- | ---: |
| `scope1` | `ghg.scope1` | 2018 | 17.7 | 1,000 tCO2 | `ev_0b0bbb6d788b` | 22 |
| `scope1` | `ghg.scope1` | 2019 | 17.6 | 1,000 tCO2 | `ev_d817d2cbdb8e` | 24 |
| `scope1` | `ghg.scope1` | 2020 | 19.1 | 1,000 tCO2 | `ev_9860caae29cb` | 27 |
| `scope1` | `ghg.scope1` | 2021 | 21.5 | 1,000 tCO2 | `ev_9cc64e238689` | 27 |
| `scope1` | `ghg.scope1` | 2022 | 21.1 | 1,000 tCO2 | `ev_e73327c18a31` | 29 |
| `scope2_location` | `ghg.scope2.location_based` | 2018 | 73.1 | 1,000 tCO2 | `ev_482759b0aa55` | 22 |
| `scope2_location` | `ghg.scope2.location_based` | 2019 | 69.0 | 1,000 tCO2 | `ev_5e51927f0a85` | 24 |
| `scope2_market` | `ghg.scope2.market_based` | 2018 | 95.2 | 1,000 tCO2 | `ev_7fd544ee8e9d` | 22 |
| `scope2_market` | `ghg.scope2.market_based` | 2019 | 83.0 | 1,000 tCO2 | `ev_1ded939a4eb8` | 24 |
| `cat1` | `ghg.scope3.category1.purchased_goods_and_services` | 2018 | 2025.0 | 1,000 tCO2 | `ev_db0c3e17538e` | 22 |
| `cat1` | `ghg.scope3.category1.purchased_goods_and_services` | 2019 | 2618.0 | 1,000 tCO2 | `ev_e4b2f83e57a3` | 24 |
| `cat1` | `ghg.scope3.category1.purchased_goods_and_services` | 2020 | 1815.0 | 1,000 tCO2 | `ev_db0474f7fb92` | 27 |
| `cat1` | `ghg.scope3.category1.purchased_goods_and_services` | 2021 | 2783.0 | 1,000 tCO2 | `ev_679bb4eee8d9` | 27 |
| `cat1` | `ghg.scope3.category1.purchased_goods_and_services` | 2022 | 2237.0 | 1,000 tCO2 | `ev_f4913df49967` | 29 |
| `cat4` | `ghg.scope3.category4.upstream_transportation_distribution` | 2018 | 63.0 | 1,000 tCO2 | `ev_bee546d1ee49` | 22 |
| `cat4` | `ghg.scope3.category4.upstream_transportation_distribution` | 2019 | 76.0 | 1,000 tCO2 | `ev_2a5ce95d97a8` | 24 |
| `cat4` | `ghg.scope3.category4.upstream_transportation_distribution` | 2020 | 72.0 | 1,000 tCO2 | `ev_aa2b0e71fd9d` | 27 |
| `cat4` | `ghg.scope3.category4.upstream_transportation_distribution` | 2021 | 102.0 | 1,000 tCO2 | `ev_fff7d2339669` | 27 |
| `cat4` | `ghg.scope3.category4.upstream_transportation_distribution` | 2022 | 45.0 | 1,000 tCO2 | `ev_3d4c84923cab` | 29 |
| `cat6` | `ghg.scope3.category6.business_travel` | 2018 | 34.0 | 1,000 tCO2 | `ev_d8d60fd98505` | 22 |
| `cat6` | `ghg.scope3.category6.business_travel` | 2019 | 38.0 | 1,000 tCO2 | `ev_b9d32cef6d6d` | 24 |
| `cat6` | `ghg.scope3.category6.business_travel` | 2020 | 17.0 | 1,000 tCO2 | `ev_56506f871975` | 27 |
| `cat6` | `ghg.scope3.category6.business_travel` | 2021 | 18.0 | 1,000 tCO2 | `ev_5051f6106084` | 27 |
| `cat6` | `ghg.scope3.category6.business_travel` | 2022 | 37.0 | 1,000 tCO2 | `ev_3455f43625db` | 29 |
| `cat9` | `ghg.scope3.category9.downstream_transportation_distribution` | 2018 | 11.0 | 1,000 tCO2 | `ev_931ff86c0988` | 22 |
| `cat9` | `ghg.scope3.category9.downstream_transportation_distribution` | 2019 | 13.0 | 1,000 tCO2 | `ev_be669096ca82` | 24 |
| `cat9` | `ghg.scope3.category9.downstream_transportation_distribution` | 2020 | 13.0 | 1,000 tCO2 | `ev_303fb4f76c86` | 27 |
| `cat9` | `ghg.scope3.category9.downstream_transportation_distribution` | 2021 | 15.0 | 1,000 tCO2 | `ev_77060a9e5aab` | 27 |

## Ontology-backed diagnosis {#diagnosis}

每条诊断都必须引用 ontology Evidence Objects。下面每个 diagnosis 都列出 Evidence IDs，并提供 evidence table：year、ontology concept、value/unit、page、source quote。完整对象保存在 `raw/valmet-5y-case/evidence_objects.jsonl` 与 `raw/valmet-5y-case/diagnostic_findings.json`。

### D1 — Corporate GHG inventory evidence is auditable but not product-LCA-ready {{#d1}}

- Severity: `medium`
- Diagnosis: The extracted ontology contains Scope 1 evidence for all five years (2018–2022), with Scope 1 increasing from 17.7 to 21.1 thousand tCO2 (19.2%). Scope 2 location/market-based evidence is source-grounded for 2018–2019, but later Scope 2 rows were not captured in this rule-provider pilot and need manual/LLM extraction validation.
- LCA implication: This is suitable for corporate inventory review and longitudinal disclosure analysis. It is not sufficient for product LCA because it is corporate-scope inventory, not product-specific foreground activity data with functional unit and system boundary.
- Ontology source IDs: `ev_0b0bbb6d788b`, `ev_d817d2cbdb8e`, `ev_9860caae29cb`, `ev_9cc64e238689`, `ev_e73327c18a31`, `ev_482759b0aa55`, `ev_5e51927f0a85`, `ev_7fd544ee8e9d`, `ev_1ded939a4eb8`
- Recommended action: Use the corporate inventory evidence as audit context; for product LCA, request product-level foreground flows, functional unit, product boundary, allocation rules and emission factors.

| Evidence ID | Year | Ontology concept | Value | Unit | Page | Source quote |
| --- | ---: | --- | ---: | --- | ---: | --- |
| `ev_0b0bbb6d788b` | 2018 | `ghg.scope1` | 17.70 | 1,000 tCO2 | 22 | Scope 12 17.70 16.80 16.60 |
| `ev_d817d2cbdb8e` | 2019 | `ghg.scope1` | 17.6 | 1,000 tCO2 | 24 | Scope 12 17.6 17.7 16.8 |
| `ev_9860caae29cb` | 2020 | `ghg.scope1` | 19.1 | 1,000 tCO2 | 27 | Scope 12 19.1 17.6 17.7 |
| `ev_9cc64e238689` | 2021 | `ghg.scope1` | 21.5 | 1,000 tCO2 | 27 | Scope 12 21.5 19.1 17.6 19.7 |
| `ev_e73327c18a31` | 2022 | `ghg.scope1` | 21.1 | 1,000 tCO2 | 29 | Scope 12 21.1 21.5 19.1 21.5 |
| `ev_482759b0aa55` | 2018 | `ghg.scope2.location_based` | 73.10 | 1,000 tCO2 | 22 | Scope 2 (location based)3 73.10 70.00 66.70 |
| `ev_5e51927f0a85` | 2019 | `ghg.scope2.location_based` | 69.0 | 1,000 tCO2 | 24 | Scope 2 (location based)3 69.0 71.2 68.2 |
| `ev_7fd544ee8e9d` | 2018 | `ghg.scope2.market_based` | 95.20 | 1,000 tCO2 | 22 | Scope 2 (market based)4 95.20 92.70 95.60 |
| `ev_1ded939a4eb8` | 2019 | `ghg.scope2.market_based` | 83.0 | 1,000 tCO2 | 24 | Scope 2 (market based)4 83.0 87.5 91.5 |

### D2 — Purchased goods and services is the dominant captured Scope 3 category {{#d2}}

- Severity: `high`
- Diagnosis: Across the captured Scope 3 category ontology, Category 1 purchased goods and services is consistently the largest category in every extracted year. Its share of the captured category sum ranges from 94.7% to 96.5%.
- LCA implication: For LCA/Scope 3 screening, upstream materials and purchased goods should be treated as the primary hotspot and first target for supplier data improvement.
- Ontology source IDs: `ev_db0c3e17538e`, `ev_e4b2f83e57a3`, `ev_db0474f7fb92`, `ev_679bb4eee8d9`, `ev_f4913df49967`, `ev_bee546d1ee49`, `ev_2a5ce95d97a8`, `ev_aa2b0e71fd9d`, `ev_fff7d2339669`, `ev_3d4c84923cab`, `ev_d8d60fd98505`, `ev_b9d32cef6d6d`, `ev_56506f871975`, `ev_5051f6106084`, `ev_3455f43625db`, `ev_931ff86c0988`, `ev_be669096ca82`, `ev_303fb4f76c86`, `ev_77060a9e5aab`
- Recommended action: Prioritize supplier-specific activity data, material composition, procurement spend/activity split, and emission-factor provenance for Category 1.

| Evidence ID | Year | Ontology concept | Value | Unit | Page | Source quote |
| --- | ---: | --- | ---: | --- | ---: | --- |
| `ev_db0c3e17538e` | 2018 | `ghg.scope3.category1.purchased_goods_and_services` | 2,025 | 1,000 tCO2 | 22 | Category 1: CO2 emissions from purchased goods and services6 2,025 1,665 1,288 |
| `ev_e4b2f83e57a3` | 2019 | `ghg.scope3.category1.purchased_goods_and_services` | 2,618 | 1,000 tCO2 | 24 | Category 1: CO2 emissions from purchased goods and services6 2,618 2,025 1,665 |
| `ev_db0474f7fb92` | 2020 | `ghg.scope3.category1.purchased_goods_and_services` | 1,815 | 1,000 tCO2 | 27 | Category 1: CO2 emissions from purchased goods and services6 1,815 1,581 1,441 |
| `ev_679bb4eee8d9` | 2021 | `ghg.scope3.category1.purchased_goods_and_services` | 2,783 | 1,000 tCO2 | 27 | Category 1: CO2 emissions from purchased goods and services6 2,783 2,020 1,938 |
| `ev_f4913df49967` | 2022 | `ghg.scope3.category1.purchased_goods_and_services` | 2,237 | 1,000 tCO2 | 29 | Category 1: CO2 emissions from purchased goods and services7 2,237 1,656 1,694 |
| `ev_bee546d1ee49` | 2018 | `ghg.scope3.category4.upstream_transportation_distribution` | 63 | 1,000 tCO2 | 22 | Category 4: CO2 emissions from upstream transportation and distribution7 63 60 49 |
| `ev_2a5ce95d97a8` | 2019 | `ghg.scope3.category4.upstream_transportation_distribution` | 76 | 1,000 tCO2 | 24 | Category 4: CO2 emissions from upstream transportation and distribution7 76 63 60 |
| `ev_aa2b0e71fd9d` | 2020 | `ghg.scope3.category4.upstream_transportation_distribution` | 72 | 1,000 tCO2 | 27 | Category 4: CO2 emissions from upstream transportation and distribution7 72 76 63 |
| `ev_fff7d2339669` | 2021 | `ghg.scope3.category4.upstream_transportation_distribution` | 102 | 1,000 tCO2 | 27 | Category 4: CO2 emissions from upstream transportation and distribution7 102 100 105 |
| `ev_3d4c84923cab` | 2022 | `ghg.scope3.category4.upstream_transportation_distribution` | 45 | 1,000 tCO2 | 29 | Category 4: CO2 emissions from upstream transportation and distribution8 45 41 40 |
| `ev_d8d60fd98505` | 2018 | `ghg.scope3.category6.business_travel` | 34 | 1,000 tCO2 | 22 | Category 6: CO2 emissions from business travel8 34 32 31 |
| `ev_b9d32cef6d6d` | 2019 | `ghg.scope3.category6.business_travel` | 38 | 1,000 tCO2 | 24 | Category 6: CO2 emissions from business travel8 38 34 32 |
| `ev_56506f871975` | 2020 | `ghg.scope3.category6.business_travel` | 17 | 1,000 tCO2 | 27 | Category 6: CO2 emissions from business travel8 17 38 34 |
| `ev_5051f6106084` | 2021 | `ghg.scope3.category6.business_travel` | 18 | 1,000 tCO2 | 27 | Category 6: CO2 emissions from business travel8 18 18 44 |
| `ev_3455f43625db` | 2022 | `ghg.scope3.category6.business_travel` | 37 | 1,000 tCO2 | 29 | Category 6: CO2 emissions from business travel9 37 18 15 |
| `ev_931ff86c0988` | 2018 | `ghg.scope3.category9.downstream_transportation_distribution` | 11 | 1,000 tCO2 | 22 | Category 9: CO2 emissions from downstream transportation and distribution9 11 11 9 |
| `ev_be669096ca82` | 2019 | `ghg.scope3.category9.downstream_transportation_distribution` | 13 | 1,000 tCO2 | 24 | Category 9: CO2 emissions from downstream transportation and distribution9 13 11 11 |
| `ev_303fb4f76c86` | 2020 | `ghg.scope3.category9.downstream_transportation_distribution` | 13 | 1,000 tCO2 | 27 | Category 9: CO2 emissions from downstream transportation and distribution9 13 13 11 |
| `ev_77060a9e5aab` | 2021 | `ghg.scope3.category9.downstream_transportation_distribution` | 15 | 1,000 tCO2 | 27 | Category 9: CO2 emissions from downstream transportation and distribution9 15 15 16 |

### D3 — Scope 3 category coverage is longitudinally useful, but method detail remains weak {{#d3}}

- Severity: `high`
- Diagnosis: The ontology extracted Category 1, 4 and 6 for all five years, and Category 9 for four years. However, all extracted Scope 3 category metrics carry `method_missing` because the evidence spans provide category totals but not enough emission-factor or calculation-method detail.
- LCA implication: These rows are `scope3_evidence_ready` for disclosure benchmarking and hotspot screening, but they should not be reused directly as LCI foreground data without method and activity-data reconstruction.
- Ontology source IDs: `ev_db0c3e17538e`, `ev_e4b2f83e57a3`, `ev_db0474f7fb92`, `ev_679bb4eee8d9`, `ev_f4913df49967`, `ev_bee546d1ee49`, `ev_2a5ce95d97a8`, `ev_aa2b0e71fd9d`, `ev_fff7d2339669`, `ev_3d4c84923cab`, `ev_d8d60fd98505`, `ev_b9d32cef6d6d`, `ev_56506f871975`, `ev_5051f6106084`, `ev_3455f43625db`, `ev_931ff86c0988`, `ev_be669096ca82`, `ev_303fb4f76c86`, `ev_77060a9e5aab`
- Recommended action: Add method-level extraction for emission factors, activity data, supplier-specific data, spend/activity method, and category-boundary notes; maintain a category-year completeness matrix.

| Evidence ID | Year | Ontology concept | Value | Unit | Page | Source quote |
| --- | ---: | --- | ---: | --- | ---: | --- |
| `ev_db0c3e17538e` | 2018 | `ghg.scope3.category1.purchased_goods_and_services` | 2,025 | 1,000 tCO2 | 22 | Category 1: CO2 emissions from purchased goods and services6 2,025 1,665 1,288 |
| `ev_e4b2f83e57a3` | 2019 | `ghg.scope3.category1.purchased_goods_and_services` | 2,618 | 1,000 tCO2 | 24 | Category 1: CO2 emissions from purchased goods and services6 2,618 2,025 1,665 |
| `ev_db0474f7fb92` | 2020 | `ghg.scope3.category1.purchased_goods_and_services` | 1,815 | 1,000 tCO2 | 27 | Category 1: CO2 emissions from purchased goods and services6 1,815 1,581 1,441 |
| `ev_679bb4eee8d9` | 2021 | `ghg.scope3.category1.purchased_goods_and_services` | 2,783 | 1,000 tCO2 | 27 | Category 1: CO2 emissions from purchased goods and services6 2,783 2,020 1,938 |
| `ev_f4913df49967` | 2022 | `ghg.scope3.category1.purchased_goods_and_services` | 2,237 | 1,000 tCO2 | 29 | Category 1: CO2 emissions from purchased goods and services7 2,237 1,656 1,694 |
| `ev_bee546d1ee49` | 2018 | `ghg.scope3.category4.upstream_transportation_distribution` | 63 | 1,000 tCO2 | 22 | Category 4: CO2 emissions from upstream transportation and distribution7 63 60 49 |
| `ev_2a5ce95d97a8` | 2019 | `ghg.scope3.category4.upstream_transportation_distribution` | 76 | 1,000 tCO2 | 24 | Category 4: CO2 emissions from upstream transportation and distribution7 76 63 60 |
| `ev_aa2b0e71fd9d` | 2020 | `ghg.scope3.category4.upstream_transportation_distribution` | 72 | 1,000 tCO2 | 27 | Category 4: CO2 emissions from upstream transportation and distribution7 72 76 63 |
| `ev_fff7d2339669` | 2021 | `ghg.scope3.category4.upstream_transportation_distribution` | 102 | 1,000 tCO2 | 27 | Category 4: CO2 emissions from upstream transportation and distribution7 102 100 105 |
| `ev_3d4c84923cab` | 2022 | `ghg.scope3.category4.upstream_transportation_distribution` | 45 | 1,000 tCO2 | 29 | Category 4: CO2 emissions from upstream transportation and distribution8 45 41 40 |
| `ev_d8d60fd98505` | 2018 | `ghg.scope3.category6.business_travel` | 34 | 1,000 tCO2 | 22 | Category 6: CO2 emissions from business travel8 34 32 31 |
| `ev_b9d32cef6d6d` | 2019 | `ghg.scope3.category6.business_travel` | 38 | 1,000 tCO2 | 24 | Category 6: CO2 emissions from business travel8 38 34 32 |
| `ev_56506f871975` | 2020 | `ghg.scope3.category6.business_travel` | 17 | 1,000 tCO2 | 27 | Category 6: CO2 emissions from business travel8 17 38 34 |
| `ev_5051f6106084` | 2021 | `ghg.scope3.category6.business_travel` | 18 | 1,000 tCO2 | 27 | Category 6: CO2 emissions from business travel8 18 18 44 |
| `ev_3455f43625db` | 2022 | `ghg.scope3.category6.business_travel` | 37 | 1,000 tCO2 | 29 | Category 6: CO2 emissions from business travel9 37 18 15 |
| `ev_931ff86c0988` | 2018 | `ghg.scope3.category9.downstream_transportation_distribution` | 11 | 1,000 tCO2 | 22 | Category 9: CO2 emissions from downstream transportation and distribution9 11 11 9 |
| `ev_be669096ca82` | 2019 | `ghg.scope3.category9.downstream_transportation_distribution` | 13 | 1,000 tCO2 | 24 | Category 9: CO2 emissions from downstream transportation and distribution9 13 11 11 |
| `ev_303fb4f76c86` | 2020 | `ghg.scope3.category9.downstream_transportation_distribution` | 13 | 1,000 tCO2 | 27 | Category 9: CO2 emissions from downstream transportation and distribution9 13 13 11 |
| `ev_77060a9e5aab` | 2021 | `ghg.scope3.category9.downstream_transportation_distribution` | 15 | 1,000 tCO2 | 27 | Category 9: CO2 emissions from downstream transportation and distribution9 15 15 16 |

### D4 — Valmet explicitly frames value-chain impact as use-phase/customer-site dominated {{#d4}}

- Severity: `high`
- Diagnosis: The 2020 and 2021 reports include source-grounded LCA/use-phase claims stating that around one percent of the environmental impact of Valmet’s entire value chain is emitted from own locations, based on life cycle analysis and market data on customer use phase.
- LCA implication: This is strong directional hotspot evidence: product use phase/customer operations likely dominate life-cycle impact. But the evidence is still `weak_signal_only` for product LCA because the extracted ontology flags missing functional unit, product system boundary and allocation method.
- Ontology source IDs: `ev_37831ba12f99`, `ev_a0bed69c021f`
- Recommended action: Convert the use-phase claim into product-family LCA templates: define functional unit, product family, use scenario, energy/water/process assumptions, lifetime, allocation and sensitivity ranges.

| Evidence ID | Year | Ontology concept | Value | Unit | Page | Source quote |
| --- | ---: | --- | ---: | --- | ---: | --- |
| `ev_37831ba12f99` | 2020 | `lca.life_cycle_analysis_claim` |  |  | 20 | Based on life cycle analysis (LCA) and market data on the customer use phase of Valmet’s technology, we estimate that around one percent of the … |
| `ev_a0bed69c021f` | 2021 | `lca.life_cycle_analysis_claim` |  |  | 20 | Based on life cycle analysis (LCA) and market data on the customer use phase of Valmet’s technology, we estimate that around one percent of the … |

### D5 — External limited assurance improves disclosure auditability but does not replace LCA critical review {{#d5}}

- Severity: `medium`
- Diagnosis: The ontology captured limited-assurance / assurance statements across the five-year corpus. These statements support traceability of selected sustainability information, but the extracted spans do not prove that product-level LCA assumptions, use-phase models, or Scope 3 emission factors were critically reviewed.
- LCA implication: Assurance supports confidence in sustainability disclosure, but ISO 14040/14044-style product LCA still requires goal/scope definition, inventory modelling, impact assessment assumptions and critical review where applicable.
- Ontology source IDs: `ev_957e7d86dd4e`, `ev_faaf1a420250`, `ev_8fda0855fca8`, `ev_cf99b5422e53`, `ev_598fe6711ee3`
- Recommended action: Store assurance scope as a separate ontology object and map exactly which metrics are assured; do not inherit assurance from corporate disclosure to product LCA claims automatically.

| Evidence ID | Year | Ontology concept | Value | Unit | Page | Source quote |
| --- | ---: | --- | ---: | --- | ---: | --- |
| `ev_957e7d86dd4e` | 2018 | `assurance.ghg_inventory_verification` |  |  | 32 | that we comply with ethical requirements and plan and perform the assurance engage- ment to obtain limited assurance. |
| `ev_faaf1a420250` | 2019 | `assurance.ghg_inventory_verification` |  |  | 39 | that we comply with ethical re- quirements and plan and perform the assurance engagement to obtain limited assurance. |
| `ev_8fda0855fca8` | 2020 | `assurance.ghg_inventory_verification` |  |  | 42 | that we comply with ethical requirements and plan and perform the assurance en- gagement to obtain limited assurance. |
| `ev_cf99b5422e53` | 2021 | `assurance.ghg_inventory_verification` |  |  | 45 | that we comply with ethical requirements and plan and perform the assurance engagement to obtain limited assurance. |
| `ev_598fe6711ee3` | 2022 | `assurance.ghg_inventory_verification` |  |  | 44 | Practitioner’s responsibility Our responsibility is to express a limited assurance conclusion on the Selected sustainability information based o… |

### D6 — Target/carbon-neutral language needs baseline and pathway evidence before LCA use {{#d6}}

- Severity: `medium`
- Diagnosis: The extracted target/carbon-neutral claims in 2021–2022 are grounded, but the ontology flags `target_without_baseline`. They are useful sustainability strategy signals, not quantified LCA evidence.
- LCA implication: Targets should not be mixed with measured performance or inventory data. For LCA diagnostics, they only define future scenario context unless baseline, pathway, scope and reduction levers are quantified.
- Ontology source IDs: `ev_0dd676e81054`, `ev_2f7f3f7c7dfb`
- Recommended action: Extract target baseline year, target scope, covered emissions, reduction pathway, offsets/neutralization approach and progress metrics as separate target ontology fields.

| Evidence ID | Year | Ontology concept | Value | Unit | Page | Source quote |
| --- | ---: | --- | ---: | --- | ---: | --- |
| `ev_0dd676e81054` | 2021 | `target.net_zero` |  |  | 23 | until 2021 ‒ Selected fossil-based product parts to be replaced with renewable or recyclable materials ‒ Enable carbon neutral production for al… |
| `ev_2f7f3f7c7dfb` | 2022 | `target.net_zero` |  |  | 20 | We strive in our locations and supply chain for efficient use of resources, renewable fuels and carbon neutral energy, and to minimize waste and… |


## Evidence Object ledger {#evidence-ledger}

这张表是 44 条 Evidence Objects 的压缩索引，用来证明诊断不是游离文字，而是可追溯到 ontology-managed extraction output。完整 JSONL 请看 `raw/valmet-5y-case/evidence_objects.jsonl`。

| Evidence ID | Year | Type | Concept | Applicability | Flags | Page | Quote |
| --- | ---: | --- | --- | --- | --- | ---: | --- |
| `ev_0b0bbb6d788b` | 2018 | `ghg_emission_metric` | `ghg.scope1` | `corporate_inventory_ready` |  | 22 | Scope 12 17.70 16.80 16.60 |
| `ev_482759b0aa55` | 2018 | `ghg_emission_metric` | `ghg.scope2.location_based` | `corporate_inventory_ready` |  | 22 | Scope 2 (location based)3 73.10 70.00 66.70 |
| `ev_7fd544ee8e9d` | 2018 | `ghg_emission_metric` | `ghg.scope2.market_based` | `corporate_inventory_ready` |  | 22 | Scope 2 (market based)4 95.20 92.70 95.60 |
| `ev_db0c3e17538e` | 2018 | `scope3_category_metric` | `ghg.scope3.category1.purchased_goods_and_services` | `scope3_evidence_ready` | method_missing | 22 | Category 1: CO2 emissions from purchased goods and services6 2,025 1,665 1,288 |
| `ev_bee546d1ee49` | 2018 | `scope3_category_metric` | `ghg.scope3.category4.upstream_transportation_distribution` | `scope3_evidence_ready` | method_missing | 22 | Category 4: CO2 emissions from upstream transportation and distribution7 63 60 49 |
| `ev_d8d60fd98505` | 2018 | `scope3_category_metric` | `ghg.scope3.category6.business_travel` | `scope3_evidence_ready` | method_missing | 22 | Category 6: CO2 emissions from business travel8 34 32 31 |
| `ev_931ff86c0988` | 2018 | `scope3_category_metric` | `ghg.scope3.category9.downstream_transportation_distribution` | `scope3_evidence_ready` | method_missing | 22 | Category 9: CO2 emissions from downstream transportation and distribution9 11 11 9 |
| `ev_957e7d86dd4e` | 2018 | `assurance_statement` | `assurance.ghg_inventory_verification` | `audit_support` |  | 32 | that we comply with ethical requirements and plan and perform the assurance engage- ment to obtain limited as… |
| `ev_a3e5b5cfbd60` | 2018 | `assurance_statement` | `assurance.ghg_inventory_verification` | `audit_support` |  | 33 | been prepared in accordance with the Criteria and to report to Valmet in the form of an independent limited a… |
| `ev_3af9b8bf8f42` | 2018 | `assurance_statement` | `assurance.ghg_inventory_verification` | `audit_support` |  | 33 | Assurance Finland OY/AB is part of DNV GL – Business Assurance, a global provider of certification, verificat… |
| `ev_d817d2cbdb8e` | 2019 | `ghg_emission_metric` | `ghg.scope1` | `corporate_inventory_ready` |  | 24 | Scope 12 17.6 17.7 16.8 |
| `ev_5e51927f0a85` | 2019 | `ghg_emission_metric` | `ghg.scope2.location_based` | `corporate_inventory_ready` |  | 24 | Scope 2 (location based)3 69.0 71.2 68.2 |
| `ev_1ded939a4eb8` | 2019 | `ghg_emission_metric` | `ghg.scope2.market_based` | `corporate_inventory_ready` |  | 24 | Scope 2 (market based)4 83.0 87.5 91.5 |
| `ev_e4b2f83e57a3` | 2019 | `scope3_category_metric` | `ghg.scope3.category1.purchased_goods_and_services` | `scope3_evidence_ready` | method_missing | 24 | Category 1: CO2 emissions from purchased goods and services6 2,618 2,025 1,665 |
| `ev_2a5ce95d97a8` | 2019 | `scope3_category_metric` | `ghg.scope3.category4.upstream_transportation_distribution` | `scope3_evidence_ready` | method_missing | 24 | Category 4: CO2 emissions from upstream transportation and distribution7 76 63 60 |
| `ev_b9d32cef6d6d` | 2019 | `scope3_category_metric` | `ghg.scope3.category6.business_travel` | `scope3_evidence_ready` | method_missing | 24 | Category 6: CO2 emissions from business travel8 38 34 32 |
| `ev_be669096ca82` | 2019 | `scope3_category_metric` | `ghg.scope3.category9.downstream_transportation_distribution` | `scope3_evidence_ready` | method_missing | 24 | Category 9: CO2 emissions from downstream transportation and distribution9 13 11 11 |
| `ev_faaf1a420250` | 2019 | `assurance_statement` | `assurance.ghg_inventory_verification` | `audit_support` |  | 39 | that we comply with ethical re- quirements and plan and perform the assurance engagement to obtain limited as… |
| `ev_667d3c380296` | 2019 | `assurance_statement` | `assurance.ghg_inventory_verification` | `audit_support` |  | 40 | been prepared in accordance with the Criteria and to report to Valmet in the form of an independent limited a… |
| `ev_7ed6e5c837f5` | 2019 | `assurance_statement` | `assurance.ghg_inventory_verification` | `audit_support` |  | 40 | Assurance Finland OY/AB is part of DNV GL – Business Assurance, a global provider of certification, verificat… |
| `ev_9860caae29cb` | 2020 | `ghg_emission_metric` | `ghg.scope1` | `corporate_inventory_ready` |  | 27 | Scope 12 19.1 17.6 17.7 |
| `ev_db0474f7fb92` | 2020 | `scope3_category_metric` | `ghg.scope3.category1.purchased_goods_and_services` | `scope3_evidence_ready` | method_missing | 27 | Category 1: CO2 emissions from purchased goods and services6 1,815 1,581 1,441 |
| `ev_aa2b0e71fd9d` | 2020 | `scope3_category_metric` | `ghg.scope3.category4.upstream_transportation_distribution` | `scope3_evidence_ready` | method_missing | 27 | Category 4: CO2 emissions from upstream transportation and distribution7 72 76 63 |
| `ev_56506f871975` | 2020 | `scope3_category_metric` | `ghg.scope3.category6.business_travel` | `scope3_evidence_ready` | method_missing | 27 | Category 6: CO2 emissions from business travel8 17 38 34 |
| `ev_303fb4f76c86` | 2020 | `scope3_category_metric` | `ghg.scope3.category9.downstream_transportation_distribution` | `scope3_evidence_ready` | method_missing | 27 | Category 9: CO2 emissions from downstream transportation and distribution9 13 13 11 |
| `ev_8fda0855fca8` | 2020 | `assurance_statement` | `assurance.ghg_inventory_verification` | `audit_support` |  | 42 | that we comply with ethical requirements and plan and perform the assurance en- gagement to obtain limited as… |
| `ev_1111dd369507` | 2020 | `assurance_statement` | `assurance.ghg_inventory_verification` | `audit_support` |  | 43 | been prepared in accordance with the Criteria and to report to Valmet in the form of an independent limited a… |
| `ev_37831ba12f99` | 2020 | `lca_claim` | `lca.life_cycle_analysis_claim` | `weak_signal_only` | functional_unit_missing | 20 | Based on life cycle analysis (LCA) and market data on the customer use phase of Valmet’s technology, we estim… |
| `ev_e5f5535e5920` | 2020 | `missing_disclosure` | `missing.scope3_method` | `missing_evidence` | method_missing | 3 | Independent assurance report CONTENTS Reported cases of potential Code of Conduct violations 14 Scope 1, Scop… |
| `ev_9cc64e238689` | 2021 | `ghg_emission_metric` | `ghg.scope1` | `corporate_inventory_ready` |  | 27 | Scope 12 21.5 19.1 17.6 19.7 |
| `ev_679bb4eee8d9` | 2021 | `scope3_category_metric` | `ghg.scope3.category1.purchased_goods_and_services` | `scope3_evidence_ready` | method_missing | 27 | Category 1: CO2 emissions from purchased goods and services6 2,783 2,020 1,938 |
| `ev_fff7d2339669` | 2021 | `scope3_category_metric` | `ghg.scope3.category4.upstream_transportation_distribution` | `scope3_evidence_ready` | method_missing | 27 | Category 4: CO2 emissions from upstream transportation and distribution7 102 100 105 |
| `ev_5051f6106084` | 2021 | `scope3_category_metric` | `ghg.scope3.category6.business_travel` | `scope3_evidence_ready` | method_missing | 27 | Category 6: CO2 emissions from business travel8 18 18 44 |
| `ev_77060a9e5aab` | 2021 | `scope3_category_metric` | `ghg.scope3.category9.downstream_transportation_distribution` | `scope3_evidence_ready` | method_missing | 27 | Category 9: CO2 emissions from downstream transportation and distribution9 15 15 16 |
| `ev_cf99b5422e53` | 2021 | `assurance_statement` | `assurance.ghg_inventory_verification` | `audit_support` |  | 45 | that we comply with ethical requirements and plan and perform the assurance engagement to obtain limited assu… |
| `ev_a0bed69c021f` | 2021 | `lca_claim` | `lca.life_cycle_analysis_claim` | `weak_signal_only` | functional_unit_missing | 20 | Based on life cycle analysis (LCA) and market data on the customer use phase of Valmet’s technology, we estim… |
| `ev_0dd676e81054` | 2021 | `target_claim` | `target.net_zero` | `weak_signal_only` | target_without_baseline | 23 | until 2021 ‒ Selected fossil-based product parts to be replaced with renewable or recyclable materials ‒ Enab… |
| `ev_e73327c18a31` | 2022 | `ghg_emission_metric` | `ghg.scope1` | `corporate_inventory_ready` |  | 29 | Scope 12 21.1 21.5 19.1 21.5 |
| `ev_f4913df49967` | 2022 | `scope3_category_metric` | `ghg.scope3.category1.purchased_goods_and_services` | `scope3_evidence_ready` | method_missing | 29 | Category 1: CO2 emissions from purchased goods and services7 2,237 1,656 1,694 |
| `ev_3d4c84923cab` | 2022 | `scope3_category_metric` | `ghg.scope3.category4.upstream_transportation_distribution` | `scope3_evidence_ready` | method_missing | 29 | Category 4: CO2 emissions from upstream transportation and distribution8 45 41 40 |
| `ev_3455f43625db` | 2022 | `scope3_category_metric` | `ghg.scope3.category6.business_travel` | `scope3_evidence_ready` | method_missing | 29 | Category 6: CO2 emissions from business travel9 37 18 15 |
| `ev_598fe6711ee3` | 2022 | `assurance_statement` | `assurance.ghg_inventory_verification` | `audit_support` |  | 44 | Practitioner’s responsibility Our responsibility is to express a limited assurance conclusion on the Selected… |
| `ev_2f7f3f7c7dfb` | 2022 | `target_claim` | `target.net_zero` | `weak_signal_only` | target_without_baseline | 20 | We strive in our locations and supply chain for efficient use of resources, renewable fuels and carbon neutra… |
| `ev_213cb4fe796c` | 2022 | `missing_disclosure` | `missing.scope3_method` | `missing_evidence` | method_missing | 5 | (location- and market-based) emissions based on the GHG Protocol’s “A Corporate Accounting and Reporting Stan… |

## 方法限制与审计边界 {#limitations}

1. **Corporate inventory ≠ product LCA.** Valmet 报告中的 Scope 1/2/3 信息主要是公司层面的 GHG inventory / sustainability disclosure evidence。它能支持 disclosure audit、trend analysis、hotspot screening，但不能直接替代 ISO 14040/14044 product LCA。
2. **Scope 2 2020–2022 需要后续 live provider / manual validation。** 当前 rule-provider pilot 抓到了 2018–2019 的 Scope 2 location/market-based rows；2020–2022 后续行没有进入 accepted Evidence Objects，因此本文不把 Scope 2 五年趋势作为强结论。
3. **Scope 3 categories 缺 method granularity。** Category 1/4/6/9 的五年数据有 source grounding，但仍缺 emission factor、activity data、supplier-specific method 和 category-boundary detail。
4. **LCA/use-phase claim 是强方向性证据，不是 product LCA result。** 2020–2021 抓到的 LCA/use-phase language 指向 customer use phase / value-chain hotspot，但缺 functional unit、product family、system boundary、allocation 和 scenario assumptions。
5. **Provider 类型必须透明。** 本 case 使用 deterministic baseline provider `ontology-rule-r2l-v1`；下一步应该用 Gemini/OpenAI live provider 与人工 gold labels 做 field-level precision/recall/F1。

## 可复现文件 {#raw-artifacts}

本 wiki pack 附带原始输出，均在相对路径下，不依赖本机绝对路径：

| Artifact | Path |
| --- | --- |
| Case config | `raw/valmet-5y-case/valmet_5y_case_config.json` |
| Case meta-ontology | `raw/valmet-5y-case/valmet_5y_case_meta_ontology.md` |
| Metrics | `raw/valmet-5y-case/metrics.json` |
| Report summaries | `raw/valmet-5y-case/report_summaries.json` |
| Evidence Objects | `raw/valmet-5y-case/evidence_objects.jsonl` |
| LangExtract annotated output | `raw/valmet-5y-case/langextract_annotated.jsonl` |
| Compiled concept types | `raw/valmet-5y-case/compiled/concept_types.json` |
| Compiled domain ontology | `raw/valmet-5y-case/compiled/domain_ontology.json` |
| Compiled extraction ontology | `raw/valmet-5y-case/compiled/extraction_ontology.json` |
| Diagnostic report | `raw/valmet-5y-case/diagnostic_report.md` |
| Diagnostic findings JSON | `raw/valmet-5y-case/diagnostic_findings.json` |

## 下一步 {#next-steps}

1. 用 live LLM provider 重跑 Valmet case，和 deterministic baseline 做 field-level comparison。
2. 建一个 5-year gold-label set：Scope 1/2/3、assurance、LCA/use-phase、target claims、missing disclosures。
3. 计算 field-level precision/recall/F1：concept type、canonical concept、year、value、unit、page、quote、audit flag。
4. 增加 method-level extraction：emission factors、activity data、supplier-specific data、spend/activity method、category boundary notes。
5. 把 diagnosis schema 产品化：每条诊断必须引用 Evidence IDs，否则不能进入报告。

## Changelog {#changelog}

- 2026-05-13: Created Valmet 2018–2022 ontology-backed LCA case study with 44 source-grounded Evidence Objects, 6 diagnosis findings, raw extraction artifacts, and professional LCA audit scorecard.
