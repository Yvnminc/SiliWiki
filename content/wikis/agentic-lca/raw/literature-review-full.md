# Agentic LCA 文献综述（初版）

检索日期：2026-05-06  
主题：Agentic AI / LLM agents / multi-agent systems / agent-based modeling 与 Life Cycle Assessment (LCA) 的交叉研究

## 0. 结论先行

“Agentic LCA”作为一个固定学术术语目前还没有完全成型，但相关研究已经明显存在，并且可以分成两条主线：

1. **LLM/AI-agent 辅助 LCA**：2024–2026 年迅速出现，聚焦于 LCI 数据抽取、背景数据库匹配、自然语言查询、报告生成、S-LCA 判断、产品碳足迹自动估算等。代表工作包括 Preuss et al. (2024), Tu et al. (2024), Zhang et al. (2025), Kumar et al. (2025), Kallitsis et al. (2025), Cole et al. (2025), Luo et al. (2024), Li et al. (2025)。这一方向最接近今天所说的“agentic AI for LCA”。
2. **ABM/MAS + LCA**：更早、更成熟，从 2009 年左右开始，使用 agent-based modeling / multi-agent systems 捕捉行为、政策、空间、时间、社会互动对环境影响的动态反馈。代表工作包括 Davis et al. (2009), Querini & Benetto (2015), Wu et al. (2017), Marvuglia et al. (2018), Lan & Yao (2019), Walzberg et al. (2019), Ding & Achten (2022), Su et al. (2025), Fuortes et al. (2025)。这条线不是 LLM-agent，但是真正的“agentic systems + LCA”。

核心判断：**现在还缺一个真正端到端、可审计、ISO-compliant、能调用 LCA 工具/数据库、能处理不确定性、能人类审核的 Agentic LCA 框架。** 这正是一个很好的 PhD/论文方向。

---

## 1. 概念界定：什么叫 Agentic LCA？

本文把 Agentic LCA 定义为：

> 使用具备任务分解、工具调用、记忆/上下文管理、数据检索、计算执行、结果解释、反思/审核能力的 AI agent 或 multi-agent system，辅助或自动执行 LCA 工作流中的一个或多个环节。

可覆盖 ISO 14040/14044 的四阶段：

1. Goal and scope definition：功能单位、系统边界、情景设定；
2. Life cycle inventory (LCI)：前景数据收集、文献抽取、数据库匹配；
3. Life cycle impact assessment (LCIA)：调用 Brightway/openLCA/EcoInvent/EF/ReCiPe 等计算；
4. Interpretation：热点分析、不确定性、敏感性、报告、critical review。

Agentic LCA 也可进一步分为：

- **LLM-agentic LCA**：LLM/RAG/工具调用/代码解释器/多代理系统；
- **ABM-LCA / MAS-LCA**：用 agent-based model 模拟人、企业、政策、农场、建筑使用者、车辆用户等行为，再把 agent 输出接到 LCA；
- **Ontology/KG-grounded LCA agents**：用知识图谱、ontology、semantic matching 约束 agent 的数据库映射和推理；
- **Human-in-the-loop agentic LCA**：agent 做搜索、抽取、匹配、计算和草拟，人类专家确认关键判断。

---

## 2. 检索方法

主要来源：Semantic Scholar, OpenAlex, Crossref, arXiv, publisher abstract pages, OA PDFs。检索式包括：

- “agentic LCA”, “agentic life cycle assessment”
- “LLM agent” + “life cycle assessment”
- “large language model” + “life cycle assessment” / “life cycle inventory”
- “automated life cycle assessment” + AI
- “agent-based modeling” + “life cycle assessment”
- “multi-agent system” + “dynamic life cycle assessment”
- “life cycle assessment” + “knowledge graph” / ontology
- “life cycle inventory” + NLP / machine learning

筛选原则：优先选直接涉及 LCA/LCI/LCIA/PCF/S-LCA 的研究；其次选 ABM/MAS-LCA 代表性研究；最后选对 Agentic LCA 系统建设有方法支撑的 ontology/KG/NLP/ML/tooling 文献。

---

## 3. 研究流派一：LLM / AI agents for LCA

### 3.1 概念性综述与机会/风险

**Preuss, Alshehri & You (2024), Journal of Cleaner Production**  
*Large language models for life cycle assessments: Opportunities, challenges, and risks.* DOI: 10.1016/j.jclepro.2024.142824

这篇是 LLM-LCA 方向的关键 perspective。作者认为 LLM 可降低 LCA 时间成本、提高可及性，尤其适用于 LCI 数据收集和 LCIA 结果解释。但他们也明确指出风险：hallucination、错误信息、偏见、训练数据限制、透明度不足、责任归属缺失、LLM 本身训练/推理的环境负担。文章的亮点是把 LLM 潜力映射到 LCA 各阶段，并呼吁 LCA 社区制定负责任使用标准。

**Tu et al. (2024), Environmental Science & Technology**  
*Mitigating Grand Challenges in Life Cycle Inventory Modeling through the Applications of Large Language Models.* DOI: 10.1021/acs.est.4c07634

这篇直接聚焦 LCI 的两个“大难题”：前景 flow data 缺失，以及背景数据库匹配不一致。作者认为 LLM 可以通过大规模预训练知识、多模态分析、RAG、knowledge graph、prompt engineering、fine-tuning 等方式支持 LCI 自动化。它不是一个完整系统实现，但为 LLM-LCI 研究提出了清晰路线图。

**Gkousis, Vasilaki & Katsou (2025), Renewable and Sustainable Energy Reviews**  
*Machine learning and large language models for life cycle inventory compilation: Current situation and future developments.* DOI: 10.1016/j.rser.2025.116577

这篇综述 ML/NLP/LLM 在 LCI compilation 中的应用，并通过 car-driving、power plants、geothermal energy systems 等案例讨论数据补全与文献抽取。关键结论：ML/LLM 对 LCI 数据缺口有潜力，但大规模、可解释、准确、可部署的 AI-assisted LCA 框架仍处于 infancy。

**Nwagwu et al. (2025), Journal of Sustainable Metallurgy**  
*Integrating Artificial Intelligence into Life Cycle Assessment: A Framework for Balancing Automation and Human Expertise.* DOI: 10.1007/s40831-025-01305-x

提出 AI integration architecture for LCA，强调自动化必须保留 human insight and control。这个立场与 Agentic LCA 很契合：agent 不应替代专家，而是加速、扩展和审计专家工作。

**Mensikova, Rizzo & Hinkelman (2026), arXiv**  
*Mapping the Landscape of Artificial Intelligence in Life Cycle Assessment Using Large Language Models.* arXiv:2602.22500

使用 LLM-assisted text mining 对 AI-LCA 文献做 landscape mapping，筛选了 538 篇 full-text 分析候选。它本身也是“用 LLM 做 LCA 领域文献综述”的方法展示。结论显示 AI-LCA 快速增长，ML 仍占主导，LLM-driven approaches 正在形成新主题。

### 3.2 面向 LCI 数据抽取、数据库匹配与自动报告的系统

**Zhang et al. (2025), Journal of Cleaner Production**  
*Intelligent application of large language model to life cycle assessment methodology.* DOI: 10.1016/j.jclepro.2025.146776

这是目前最接近“LLM agentic LCA workflow”的论文之一。它实现三个模块：

1. **Chat-LCA**：用 RAG 构建 LCA 专业问答，降低 hallucination；
2. **LCI database retrieval**：用 Text2SQL + few-shot Chain-of-Thought + Chain-of-Code，把自然语言转成数据库查询；
3. **Carbon footprint report generation**：用 code-interpreter agent 自动生成碳足迹报告。

评估结果：QA BERTScore 0.85；LCI 数据库查询 execution accuracy 最高 0.9692；报告生成在五个维度中四项表现最好。论文明确提出“LLM agent”生成报告，是 Agentic LCA 的直接证据。

**Kumar et al. (2025), Environmental Science & Technology**  
*A Large Language Model-based Framework to Retrieve Life Cycle Inventory and Environmental Impact Data from Scientific Literature.* DOI: 10.1021/acs.est.5c05955

提出 Sustain-LLaMA：

1. fine-tuned classifier 识别相关文献；
2. 对 LLaMA-2-7B 做领域继续训练/知识注入；
3. fine-tuned Q&A + RAG 从科学文献中抽取 LCI 和 environmental impact data。

案例：methanol production 与 plastic packaging EoL。分类 accuracy 分别达 0.850 和 0.952；Q&A/RAG F1 分别为 0.823 和 0.855；与原始 LLaMA-2-7B、ChatGPT-4o、USLCI 对比，表现相当或更好。这是 LCI 文献抽取方向的重要实证。

**Kallitsis, Offer & Edge (2025), EarthArXiv / JOSS submitted**  
*ARIA: Artificial Intelligence for Sustainability Assessment.* DOI: 10.31223/x5jf17

ARIA 是一个开源 Python package，基于 Brightway2。它用 LLM 辅助 foreground flow 到 ecoinvent/background dataset 的匹配：

- 用户输入前景系统 flow；
- ARIA 先搜索 ecoinvent；
- 无直接匹配时调用 OpenAI API 生成 alternative search terms；
- ChatGPT 根据通用规则和用户 goal/scope 约束从候选数据集中选最合适的 dataset；
- 然后调用 Brightway2 自动 LCIA，并生成 waterfall charts。

这类“LLM + Brightway2 + flow matching + LCIA”的工具非常接近可落地 Agentic LCA 原型。

**Peng et al. (2024), Advanced Engineering Informatics**  
*Knowledge graph-based mapping and recommendation to automate life cycle assessment.* DOI: 10.1016/j.aei.2024.102752

虽然不是 LLM-agent，但对 LCA agent 的 grounding 很关键。论文提出 KG-based method 推荐 background datasets，包括 flows/processes，并自动化 life cycle modeling 和 calculation。结果：flow recommendation Precision@10 = 79.52%，比当前搜索引擎高 4.26 倍，Top-10 响应时间降低 2.45 倍；并结合 OpenLCA 做自动建模与计算。它说明 LCA 数据库匹配不是简单 keyword search，KG/ontology 是 Agentic LCA 的底座。

**Gachkar et al. (2024/2025), Journal of Cleaner Production**  
*Text-based algorithms for automating life cycle inventory analysis in building sector life cycle assessment studies.* DOI: 10.1016/j.jclepro.2024.144448

使用 NLP/text-based algorithms 从建筑 Bill of Quantities (BoQ) 中抽取、匹配和结构化 LCI 数据，不依赖 BIM。它解决 building LCA 里 BoQ 非结构化、人工整理耗时的问题。作者也指出未来需要更强的 semantic matching 和 API。对 Agentic LCA 来说，这类模块可以成为“document/BoQ extraction agent”。

### 3.3 产品碳足迹 / 建筑 / 社会 LCA 场景

**Luo et al. (2024), AAAI Symposium Series**  
*AutoPCF: A Novel Automatic Product Carbon Footprint Estimation Framework Based on Large Language Models.* DOI: 10.1609/aaaiss.v2i1.27656

AutoPCF 做 cradle-to-gate product carbon footprint，包含五阶段：Emission Inventory Determination, Activity Data Collection, Emission Factor Matching, Carbon Emission Estimation, Estimation Verification and Evaluation。案例包括 steel, textile, battery products。它强调 LLM/deep learning 减少主观判断、提高一致性和效率。

**Li et al. (2025), Sustainability**  
*PCF-RWKV: Large Language Model for Product Carbon Footprint Estimation.* DOI: 10.3390/su17031321

这篇明确提到 **multi-agent technology**：基于 RWKV + task-specialized LoRA，在消费级 GPU 部署，自动构建生产过程 LCI、对齐 emission factors 并计算 product carbon footprint。它是“multi-agent + LCA/PCF”的直接近期研究。

**Cole et al. (2025), The International Journal of Life Cycle Assessment**  
*Towards AI-augmented sustainability assessments: integrating large language models in the case of product social life cycle assessment.* DOI: 10.1007/s11367-025-02508-w

这篇把 LLM 用于 Social LCA 的 reference-scale assessment，处理 community engagement、labor practices、human rights 等社会议题。与人工 S-LCA 对比，AI 与人工结果 agreement rate 为 50%。差异主要来自：

1. 人类使用了 AI 无法获得的 tacit knowledge；
2. 人类更重视 negative evidence；
3. 高度依赖 stakeholder perspective 的议题中，人类和 AI 采取了不同视角。

这篇特别适合 Agentic S-LCA，因为它揭示了多 stakeholder、多视角、多 agent persona 的研究价值。

**Płoszaj-Mazurek & Ryńska (2024), Energies**  
*Artificial Intelligence and Digital Tools for Assisting Low-Carbon Architectural Design...* DOI: 10.3390/en17122997

将 ML、LLM、BIM 融合到建筑早期低碳设计和 LCA 工具中，包含 ChatGPT 作为 virtual assistant 提出设计优化建议、BIM/IFC 与碳足迹分析集成。这是 AEC/building LCA 场景的代表。

**Chen et al. (2024), Machine Learning and Knowledge Extraction**  
*Advancing Life Cycle Assessment of Sustainable Green Hydrogen Production Using Domain-Specific Fine-Tuning by Large Language Models Augmentation.* DOI: 10.3390/make6040122

使用 LlamaIndex/LangChain/GPT-3.5-turbo 对 green hydrogen / PEM electrolysis LCA 与 ML-in-LCA 文献做领域增强，让研究者快速查询适合填补数据缺口的 ML 方法。更像研究助理型 LCA agent。

---

## 4. 研究流派二：ABM / Multi-agent systems + LCA

这条线比 LLM-LCA 早很多，而且已经有扎实的理论和案例。它处理的是传统 LCA 的一个核心盲区：静态、平均化、缺少行为动态、缺少空间/时间反馈。

### 4.1 foundational work

**Davis, Nikolić & Dijkema (2009), Journal of Industrial Ecology**  
*Integration of Life Cycle Assessment Into Agent-Based Modeling.* DOI: 10.1111/j.1530-9290.2009.00122.x

这是 ABM-LCA 的早期关键论文。作者把 energy conversion facilities 表示为 agents，每个 agent 有 owner，可根据经济和环境信息决策。模型可模拟基础设施在几十年里的 assembly、disassembly、use dynamics，并考察 LCA 信息参与决策后的效果。它已经具备“LCA results feed back into agent decision-making”的雏形。

**Halog & Manik (2011), Sustainability**  
*Advancing Integrated Systems Modelling Framework for Life Cycle Sustainability Assessment.* DOI: 10.3390/su3020469

提出 integrated systems modeling for life cycle sustainability assessment，强调工业生态与生物物理经济学方法的互补，支持跨尺度、跨时间、多利益相关者的系统评价。它不是严格 ABM-LCA，但为后续动态/集成 LCSA 提供系统思想。

**Wu et al. (2017), Journal of Industrial Ecology**  
*Agent-Based Modeling of Temporal and Spatial Dynamics in Life Cycle Sustainability Assessment.* DOI: 10.1111/jiec.12666

强调传统 LCSA 在 inventory stage 同时处理 spatial、temporal、emergent behavioral dynamics 的不足，并提出将 ABM 集成进 building LCA/LCSA 标准。用 green building development 的假设案例比较 ABM 与 static policy model，证明 agent dynamics 对结果有影响。

**Marvuglia et al. (2018), AIMS Agriculture and Food**  
*Implementation of Agent-Based Models to support Life Cycle Assessment: A review focusing on agriculture and land use.* DOI: 10.3934/agrfood.2018.4.535

系统综述农业和土地利用中的 ABM，并专门讨论 ABM 与 LCA coupling。指出 ABM 可以处理人类行为、validity、uncertainty、parameter sensitivity、agent definition、data provision 等问题；但 practical user-friendly tools 仍明显缺乏。这一点到今天仍是 Agentic LCA 的机会。

### 4.2 交通、建筑、消费行为

**Querini & Benetto (2015), Environmental Science & Technology**  
*Combining Agent-Based Modeling and Life Cycle Assessment for the Evaluation of Mobility Policies.* DOI: 10.1021/es5060868

将 ABM 用于 Luxembourg 车辆市场（sales/use/dismantling, 2013–2020），再将车队组成和车辆使用输出接入 LCA，评估 mobility policies 的 consequential LCA。重要发现：简单把单车 LCA 放大到 national fleet 会误导；ABM 能捕捉政策引起的 emergent effects。

**Walzberg et al. (2019), Renewable and Sustainable Energy Reviews**  
*Assessing behavioural change with agent-based life cycle assessment: Application to smart homes.* DOI: 10.1016/j.rser.2019.05.038

把 ABM 与 LCA 结合评估 smart homes 中行为变化与 nudges。结果显示 conformity 等态度因素可造成约 30% 环境收益差异；peak shaving 等政策若不考虑行为，很容易低估/高估效果。对 Agentic LCA 的启示：行为不是外生参数，而应作为 agent dynamics。

**Su et al. (2025), Environmental Impact Assessment Review**  
*Interactive and dynamic insights into environmental impacts of a neighborhood: A tight coupling of multi-agent system and dynamic life cycle assessment.* DOI: 10.1016/j.eiar.2024.107708

将 multi-agent system 与 dynamic LCA tight-coupled，用于 neighborhood/campus 尺度。MAS 模拟 climate、people、built environment agents 的互动，生成动态 foreground elementary flows；DLCA 提供 impact assessment framework。考虑 10 个 temporal dynamic factors 和 4 类 case-specific dynamic parameters，并模拟优化策略。这是 MAS + DLCA 的近期代表作。

### 4.3 农业、土地利用、供应链、循环经济

**Lan & Yao (2019), Journal of Cleaner Production**  
*Integrating Life Cycle Assessment and Agent-Based Modeling: A Dynamic Modeling Framework for Sustainable Agricultural Systems.* DOI: 10.1016/j.jclepro.2019.117853

集成 LCA、ABM 和 TEA，模拟美国 1000 个农场 30 年的作物种植、收益、成本、价格、气候变化和 GHG 等影响。发现 farmer information exchange、environmental awareness、access to environmental information、farm size 是环境影响关键驱动。

**Ding & Achten (2022), Journal of Cleaner Production**  
*Coupling agent-based modeling with territorial LCA to support agricultural land-use planning.* DOI: 10.1016/j.jclepro.2022.134914

提出 dynamic territorial LCA：ABM 模拟农民采纳 bioenergy crops 的行为，territorial LCA 评估多功能 territory，GIS 做 site-specific impacts。案例显示 demonstration farms 的初始位置会导致不同动态结果。这对政策情景和土地规划很有价值。

**Bayram et al. (2022/2023), Journal of Cleaner Production**  
*Sustainable farming strategies for mixed crop-livestock farms in Luxembourg simulated with a hybrid agent-based and life-cycle assessment model.* DOI: 10.1016/j.jclepro.2022.135759

构建 mixed crop-livestock farming 的 ABM-LCA 模型，模拟 Luxembourg 农场业务决策，同时计算环境和经济影响。说明 ABM-LCA 可用于 farm-level strategy testing。

**Zupko (2021), Biomass and Bioenergy**  
*Application of agent-based modeling and life cycle sustainability assessment to evaluate biorefinery placement.* DOI: 10.1016/j.biombioe.2020.105916

ABM 模拟 forest owners/loggers 是否愿意供应 woody biomass，再把 ABM 输出作为 LCSA 的 inventory/projection 输入，评估 biorefinery placement 的环境、经济和社会影响。

**Nugroho, Zhu & Heavey (2022), Applied Energy**  
*Building an agent-based techno-economic assessment coupled with life cycle assessment of biomass to methanol supply chains.* DOI: 10.1016/j.apenergy.2021.118449

将 ABM simulation-optimization、TEA 和 LCA 用于 biomass-to-methanol 供应链，评价不同 synthesis pathways、订货策略、资本预算、碳排放和 GDP contribution。显示 ABM-LCA 可处理供应链投资和技术路径选择。

**Kerdlap et al. (2020), Procedia CIRP**  
*Environmental evaluation of distributed versus centralized plastic waste recycling: Integrating life cycle assessment and agent-based modeling.* DOI: 10.1016/j.procir.2020.01.083

在新加坡塑料回收案例中，ABM 模拟 waste generation, collection, sorting, recycling, transportation；输出 material/transportation data 作为 LCI。结果显示分布式系统可能增加或降低 GHG，关键取决于运输车辆类型和吨公里排放。说明 ABM 可把空间物流动态转成 LCI。

**Voss, Lee & Fröhling (2023), Journal of Industrial Ecology**  
*A consequential approach to life cycle sustainability assessment with an agent-based model to determine the potential contribution of chemical recycling to UN Sustainable Development Goals.* DOI: 10.1111/jiec.13303

用 consequential LCSA + ABM 评估 municipal solid waste chemical recycling 对 SDGs 的贡献，涉及 circular carbon economy、resource conservation、emissions reduction、supply security。适合放入循环经济 Agentic LCA 文献线。

### 4.4 新方法：hard coupling 与 metamodel

**Fuortes et al. (2025), Sustainable Production and Consumption**  
*Framework for metamodel-driven integration of life cycle assessment and agent-based modeling.* DOI: 10.1016/j.spc.2025.06.005

这是近期 ABM-LCA 方法论重要论文。作者指出 ABM-LCA 有 soft coupling、tight coupling 和 hard coupling/LCA-ABM symbiosis。Hard coupling 允许 LCA 结果反馈到 agent 行为，但计算复杂、软件异构、需要 LCA 专家知识。

他们提出用 metamodel 近似 LCA，使 ABM 每个 timestep 可快速调用 environmental impacts。案例是 PV end-of-life，agent 决策与环境影响形成双向反馈。metamodel accuracy：R² = 0.95 for abiotic depletion，R² = 0.82 for climate change。论文也指出 temporal dynamics、validation、global sensitivity analysis、visualization 仍需进一步发展。

---

## 5. 研究流派三：Agentic LCA 的 enabling infrastructure

### 5.1 Ontology / Knowledge Graph

**Janowicz et al. (2015)**  
*A minimal ontology pattern for life cycle assessment data.*

提出 LCA data ontology pattern，解决 LCI 数据来源异构、粒度不同、语义不一致、复现困难等问题。Agentic LCA 若只靠 LLM/RAG，很容易 hallucinate 或错误匹配；ontology 是 grounding 层。

**Yan et al. (2015)**  
*An Ontology For Specifying Spatiotemporal Scopes in Life Cycle Assessment.*

关注 spatiotemporal scopes 的语义建模，适合 dynamic LCA / territorial LCA / ABM-LCA，因为 agent 决策通常具有空间和时间依赖。

**Peng et al. (2024)** 已在上文提到，是 KG-based mapping and recommendation 的近期实证。它可作为 LCA database mapping agent 的核心模块。

### 5.2 ML/NLP for LCA automation

**Algren, Fisher & Landis (2021)**  
*Machine learning in life cycle assessment.* DOI: 10.1016/B978-0-12-817976-5.00009-7

总结 ML 可用于 characterization factors、sensitivity analysis、surrogate LCA、LCI data cleaning、unit process flow estimation、scenario inventory generation 等。

**Romeiko et al. (2023), Science of the Total Environment**  
*A review of machine learning applications in life cycle assessment studies.* DOI: 10.1016/j.scitotenv.2023.168969

综述 40 篇 ML + LCA 研究，发现 ML 被用于 LCI 生成、characterization factors、impact estimation、interpretation；ANN 最常见；超过 70% 的监督学习研究训练数据少于 1500 个样本。作者强调未来需要持续数据收集、报告数据/代码/模型细节、处理数据偏差和不确定性。这些都是 Agentic LCA benchmark 的基础。

**Kiemel et al. (2022), Sustainability**  
*How to Simplify Life Cycle Assessment for Industrial Applications—A Comprehensive Review.* DOI: 10.3390/su142315704

总结工业 LCA 简化方法：parametric, modular, automation, aggregation/grouping, screening。指出 automated LCI generation 和 automated calculation 有巨大潜力，未来应结合传感器、生产基础设施互联和 AI 解释数据。

**Tan et al. (2025), Environmental Progress & Sustainable Energy**  
*Uncertainty in inventories for life cycle assessment: State-of-the-art, challenges, and new technologies.* DOI: 10.1002/ep.14644

强调 LCI uncertainty 是 LCA 质量瓶颈，讨论 data science 和新数据技术如何识别、量化和降低 LCI uncertainty。Agentic LCA 不能只生成一个点估计，必须生成 uncertainty/provenance。

### 5.3 LCA software substrate

**Mutel (2017), JOSS**  
*Brightway: An open source framework for Life Cycle Assessment.* DOI: 10.21105/joss.00236

Brightway 是 Pythonic open-source LCA backbone，是 Agentic LCA 最自然的计算执行层之一。

**Steubing et al. (2020), Software Impacts**  
*The Activity Browser — An open source LCA software building on top of the brightway framework.* DOI: 10.1016/j.simpa.2019.100012

为 Brightway 提供 GUI 和高级建模/分析能力，可被 agentic workflow 用作建模/审查界面。

**Sacchi & Menacho (2024), JOSS**  
*pathways: life cycle assessment of energy transition scenarios.* DOI: 10.21105/joss.07309

适合 prospective / scenario-based LCA，与 ABM-LCA 或 policy agents 有结合潜力。

---

## 6. 综合评述：现在做到哪了？

### 6.1 已经有的能力

1. **文献抽取和 LCI 数据检索**：Kumar et al. (2025), Gkousis et al. (2025), Chen et al. (2024) 已验证 LLM/RAG 可从文献中抽取 LCI/impact data。
2. **背景数据库匹配**：Tu et al. (2024) 提出理论路线；ARIA 和 Peng et al. (2024) 已有工具原型/算法实证。
3. **自然语言查询 LCI 数据库**：Zhang et al. (2025) 用 Text2SQL + CoT/CoC 实现高 execution accuracy。
4. **报告生成**：Zhang et al. (2025) 用 code-interpreter agent 自动生成碳足迹报告。
5. **产品碳足迹自动估算**：AutoPCF、PCF-RWKV 已经走向 multi-agent/LLM PCF。
6. **动态行为/政策模拟**：ABM-LCA 文献已覆盖交通、农业、建筑、智能家居、回收、供应链、PV EoL 等。
7. **KG/ontology grounding**：已有 ontology pattern、KG mapping 等研究，但尚未与 LLM agents 深度融合。

### 6.2 明显缺口

1. **缺少端到端 Agentic LCA benchmark**：现有论文评估指标分散，如 BERTScore、F1、Precision@10、Text2SQL execution accuracy，但缺少“从需求到 LCIA 结果”的整体准确性、可复现性、ISO 合规性评估。
2. **缺少 provenance-first workflow**：LLM 提取的每个 flow、数量、单位、数据库映射、假设都应可追溯到原文、数据库条目或专家确认。
3. **缺少 uncertainty propagation**：抽取不确定性、映射不确定性、数据库不确定性、情景不确定性如何传递到 LCIA 结果，尚未系统解决。
4. **RAG/KG/fine-tuning 的比较不足**：Tu et al. 提到 RAG、KG、prompt、fine-tuning，但还需要横向实验说明哪种组合最适合 LCI extraction/background matching。
5. **ABM-LCA 与 LLM-agentic LCA 尚未真正合流**：ABM-LCA 擅长行为动态，LLM-agent 擅长文献/数据/工具调用。目前两条线基本分离。
6. **人类专家审核机制不成熟**：Cole et al. (2025) 表明 tacit knowledge、negative evidence weighting、stakeholder perspective 会显著影响结果。Agentic LCA 必须设计 human-in-the-loop 和 multi-perspective review。
7. **开放数据与工具链不足**：很多 LCA 数据库受许可限制，阻碍可复现实验。开源 Brightway/openLCA 能解决计算层，但高质量 background data 仍是瓶颈。

---

## 7. 可发展的 Agentic LCA 系统架构

一个值得研究/实现的 Agentic LCA 架构可以是：

1. **Scope Agent**：根据用户需求生成 goal/scope、functional unit、system boundary、allocation rule、geography/timeframe；输出待专家确认的 protocol。
2. **Document & Literature Agent**：检索论文、EPD、技术报告、BoQ、BOM、企业 ESG 报告，抽取 activity data、flows、units、uncertainty、context。
3. **LCI Extraction Agent**：结构化 foreground process tree，做单位换算、质量/能量守恒检查、缺失项识别。
4. **Background Matching Agent**：基于 KG/ontology/RAG + ecoinvent/openLCA/Brightway 数据库，把 foreground flows 映射到 background processes；输出候选、置信度、理由。
5. **Calculation Agent**：调用 Brightway/openLCA 执行 LCIA，支持 ReCiPe/EF/TRACI 等方法。
6. **Uncertainty Agent**：对 extraction/mapping/data quality 使用 pedigree matrix、Monte Carlo、scenario analysis 或 Bayesian updating。
7. **Critic / ISO Reviewer Agent**：按 ISO 14040/14044、PEF、critical review checklist 检查系统边界、数据质量、假设、敏感性、解释一致性。
8. **ABM / Prospective Agent**：对政策、消费者采纳、农场决策、技术扩散、供应链行为进行动态模拟，把 agent decisions 接入 prospective/consequential LCA。
9. **Report Agent**：生成可审计报告，所有数字带来源、版本、假设和不确定性。
10. **Human-in-the-loop Interface**：关键节点必须让专家确认：功能单位、系统边界、主要数据、数据库映射、异常值、解释结论。

核心设计原则：**Agent 不是直接给最终答案，而是生成可审计的 LCA workflow artifact。**

---

## 8. 适合做论文的研究问题

### RQ1: LLM agents 能否显著降低 LCI compilation 的人工时间，同时保持专家级准确性？

实验设计：选 20–50 个公开 LCA case studies，构建 gold-standard foreground LCI；比较 expert baseline、RAG-only、KG+RAG、fine-tuned model、multi-agent pipeline。指标：flow recall/precision、unit accuracy、quantity error、database matching accuracy、time saved、expert correction effort。

### RQ2: KG-grounded LCA agent 是否优于普通 RAG/embedding search？

基于 Peng et al. (2024) 的 KG mapping 思路，测试 ecoinvent/openLCA mapping。指标：Precision@k、MRR、top-1 accuracy、semantic consistency、geographic/technological/temporal scope consistency。

### RQ3: 如何把 LLM-agentic LCA 与 ABM-LCA 合流？

例如在建筑、交通、农业、产品回收中：LLM agent 负责从文献/报告中抽取行为参数、技术参数、LCI；ABM 模拟采纳/使用/回收行为；LCA 计算动态环境影响。这个方向可称为 **Agentic Prospective LCA** 或 **LLM-assisted ABM-LCA**。

### RQ4: Agentic LCA 的不确定性如何建模和传递？

把每个 agent 输出都变成 probabilistic artifact：抽取置信度、数据库匹配置信度、数据质量评分、scenario uncertainty，最后传入 Monte Carlo LCIA。研究重点是 uncertainty provenance。

### RQ5: Social LCA 中多 stakeholder perspective 是否适合 multi-agent evaluation？

基于 Cole et al. (2025)，可设计多个 stakeholder persona agents：worker, local community, NGO, company, regulator, expert reviewer。比较 multi-agent deliberation 与人工 S-LCA 的一致性、偏差、可解释性。

---

## 9. 推荐切入点

如果目标是做一篇有影响力的 Agentic LCA 论文，我建议优先选以下方向之一：

### 方向 A：Agentic Life Cycle Inventory Benchmark

题目示例：*Agentic Life Cycle Inventory: Benchmarking LLM Agents for Foreground Data Extraction and Background Process Matching.*

贡献：
- 构建公开 benchmark；
- 对比 RAG, KG+RAG, fine-tuning, multi-agent；
- 引入 provenance 和 uncertainty；
- 输出可复现实验。

这是最稳的方向，因为 LCI 是 LCA 最大痛点，也最适合 LLM。

### 方向 B：Ontology-grounded LCA Agents

题目示例：*Ontology-grounded LCA Agents for Reproducible and Auditable Life Cycle Inventory Modeling.*

贡献：
- LCA ontology/KG + LLM agent；
- 严格控制 system boundary、flow semantics、unit、location、technology；
- 减少 hallucination 和错误 matching。

适合结合你的 Ontology Engine 背景。

### 方向 C：Agentic Prospective / Consequential LCA

题目示例：*LLM-assisted Multi-agent Prospective LCA for Dynamic Policy and Technology Adoption Assessment.*

贡献：
- LLM 负责数据/参数抽取；
- ABM 负责行为/采纳/政策动态；
- Brightway/openLCA 负责 LCIA；
- 输出动态、空间、行为敏感的 prospective LCA。

这是最“agentic”的方向，但实现难度也更高。

### 方向 D：Agentic Social LCA

题目示例：*Multi-perspective LLM Agents for Social Life Cycle Assessment: A Human-in-the-loop Evaluation Framework.*

贡献：
- 多 stakeholder agents；
- RAG + evidence citation；
- 和人工 S-LCA 对比；
- 研究 tacit knowledge、negative evidence、perspective bias。

适合写方法论+案例论文。

---

## 10. 代表性参考文献

### LLM / AI agents / automation for LCA

- Preuss, N., Alshehri, A. S., & You, F. (2024). *Large language models for life cycle assessments: Opportunities, challenges, and risks.* Journal of Cleaner Production. DOI: 10.1016/j.jclepro.2024.142824
- Tu, Q., Guo, J., Li, N., Qi, J., & Xu, M. (2024). *Mitigating Grand Challenges in Life Cycle Inventory Modeling through the Applications of Large Language Models.* Environmental Science & Technology. DOI: 10.1021/acs.est.4c07634
- Zhang, X., Guo, X., Zhao, J., Xiong, J., & Tian, Y. (2025). *Intelligent application of large language model to life cycle assessment methodology.* Journal of Cleaner Production. DOI: 10.1016/j.jclepro.2025.146776
- Kumar, A., Nazemi, F., Kodamana, H., Ramteke, M., & Bakshi, B. R. (2025). *A Large Language Model-based Framework to Retrieve Life Cycle Inventory and Environmental Impact Data from Scientific Literature.* Environmental Science & Technology. DOI: 10.1021/acs.est.5c05955
- Kallitsis, E., Offer, G., & Edge, J. (2025). *ARIA: Artificial Intelligence for Sustainability Assessment.* EarthArXiv. DOI: 10.31223/x5jf17
- Luo, B., Liu, J., Deng, Z., Yuan, C., & Yang, Q. (2024). *AutoPCF: A Novel Automatic Product Carbon Footprint Estimation Framework Based on Large Language Models.* AAAI Symposium Series. DOI: 10.1609/aaaiss.v2i1.27656
- Li, Z., Tang, P., Wang, X., Liu, X., & Mou, P. (2025). *PCF-RWKV: Large Language Model for Product Carbon Footprint Estimation.* Sustainability. DOI: 10.3390/su17031321
- Cole, C., Hajikhani, A., Hylkilä, E., Paronen, E., & Pihkola, H. (2025). *Towards AI-augmented sustainability assessments: integrating large language models in the case of product social life cycle assessment.* The International Journal of Life Cycle Assessment. DOI: 10.1007/s11367-025-02508-w
- Gkousis, S., Vasilaki, V., & Katsou, E. (2025). *Machine learning and large language models for life cycle inventory compilation: Current situation and future developments.* Renewable and Sustainable Energy Reviews. DOI: 10.1016/j.rser.2025.116577
- Chen, Y., Liebau, U., Guruprasad, S. M., Trofimenko, I., & Minke, C. (2024). *Advancing Life Cycle Assessment of Sustainable Green Hydrogen Production Using Domain-Specific Fine-Tuning by Large Language Models Augmentation.* Machine Learning and Knowledge Extraction. DOI: 10.3390/make6040122
- Mensikova, A., Rizzo, D. M., & Hinkelman, K. (2026). *Mapping the Landscape of Artificial Intelligence in Life Cycle Assessment Using Large Language Models.* arXiv:2602.22500

### ABM / MAS + LCA

- Davis, C., Nikolić, I., & Dijkema, G. P. J. (2009). *Integration of Life Cycle Assessment Into Agent-Based Modeling.* Journal of Industrial Ecology. DOI: 10.1111/j.1530-9290.2009.00122.x
- Halog, A., & Manik, Y. (2011). *Advancing Integrated Systems Modelling Framework for Life Cycle Sustainability Assessment.* Sustainability. DOI: 10.3390/su3020469
- Querini, F., & Benetto, E. (2015). *Combining Agent-Based Modeling and Life Cycle Assessment for the Evaluation of Mobility Policies.* Environmental Science & Technology. DOI: 10.1021/es5060868
- Wu, S. R., Li, X., Apul, D., & Breeze, V. (2017). *Agent-Based Modeling of Temporal and Spatial Dynamics in Life Cycle Sustainability Assessment.* Journal of Industrial Ecology. DOI: 10.1111/jiec.12666
- Marvuglia, A., Navarrete Gutiérrez, T., Baustert, P., & Benetto, E. (2018). *Implementation of Agent-Based Models to support Life Cycle Assessment: A review focusing on agriculture and land use.* AIMS Agriculture and Food. DOI: 10.3934/agrfood.2018.4.535
- Lan, K., & Yao, Y. (2019). *Integrating Life Cycle Assessment and Agent-Based Modeling: A Dynamic Modeling Framework for Sustainable Agricultural Systems.* Journal of Cleaner Production. DOI: 10.1016/j.jclepro.2019.117853
- Walzberg, J., Dandres, T., Merveille, N., Cheriet, M., & Samson, R. (2019). *Assessing behavioural change with agent-based life cycle assessment: Application to smart homes.* Renewable and Sustainable Energy Reviews. DOI: 10.1016/j.rser.2019.05.038
- Kerdlap, P., Purnama, A. R., Low, J. S. C., & Tan, D. Z. L. (2020). *Environmental evaluation of distributed versus centralized plastic waste recycling: Integrating life cycle assessment and agent-based modeling.* Procedia CIRP. DOI: 10.1016/j.procir.2020.01.083
- Zupko, R. (2021). *Application of agent-based modeling and life cycle sustainability assessment to evaluate biorefinery placement.* Biomass and Bioenergy. DOI: 10.1016/j.biombioe.2020.105916
- Nugroho, Y. K., Zhu, L., & Heavey, C. (2022). *Building an agent-based techno-economic assessment coupled with life cycle assessment of biomass to methanol supply chains.* Applied Energy. DOI: 10.1016/j.apenergy.2021.118449
- Ding, T., & Achten, W. (2022). *Coupling agent-based modeling with territorial LCA to support agricultural land-use planning.* Journal of Cleaner Production. DOI: 10.1016/j.jclepro.2022.134914
- Bayram, A., Marvuglia, A., Navarrete Gutiérrez, T., Weis, J.-P., & Conter, G. (2022/2023). *Sustainable farming strategies for mixed crop-livestock farms in Luxembourg simulated with a hybrid agent-based and life-cycle assessment model.* Journal of Cleaner Production. DOI: 10.1016/j.jclepro.2022.135759
- Voss, R., Lee, R. P., & Fröhling, M. (2023). *A consequential approach to life cycle sustainability assessment with an agent-based model to determine the potential contribution of chemical recycling to UN Sustainable Development Goals.* Journal of Industrial Ecology. DOI: 10.1111/jiec.13303
- Su, S., Ju, J., Yuan, J., Chang, Y., & Li, Q. (2025). *Interactive and dynamic insights into environmental impacts of a neighborhood: A tight coupling of multi-agent system and dynamic life cycle assessment.* Environmental Impact Assessment Review. DOI: 10.1016/j.eiar.2024.107708
- Fuortes, A., Blanco, C. F., Quik, J. T. K., de Jager, L., & Peijnenburg, W. (2025). *Framework for metamodel-driven integration of life cycle assessment and agent-based modeling.* Sustainable Production and Consumption. DOI: 10.1016/j.spc.2025.06.005

### Enabling methods and tools

- Janowicz, K., Krisnadhi, A. A., Hu, Y., Suh, S., & Weidema, B. P. (2015). *A minimal ontology pattern for life cycle assessment data.*
- Yan, B., Hu, Y., Kuczenski, B., Janowicz, K., & Ballatore, A. (2015). *An Ontology For Specifying Spatiotemporal Scopes in Life Cycle Assessment.*
- Peng, T., Gao, L., Agbozo, R. S. K., Xu, Y., & Svynarenko, K. (2024). *Knowledge graph-based mapping and recommendation to automate life cycle assessment.* Advanced Engineering Informatics. DOI: 10.1016/j.aei.2024.102752
- Algren, M., Fisher, W., & Landis, A. E. (2021). *Machine learning in life cycle assessment.* DOI: 10.1016/B978-0-12-817976-5.00009-7
- Romeiko, X. X., Zhang, X., Pang, Y., Gao, F., & Xu, M. (2023). *A review of machine learning applications in life cycle assessment studies.* Science of the Total Environment. DOI: 10.1016/j.scitotenv.2023.168969
- Kiemel, S., Rietdorf, C., Schutzbach, M., & Miehe, R. (2022). *How to Simplify Life Cycle Assessment for Industrial Applications—A Comprehensive Review.* Sustainability. DOI: 10.3390/su142315704
- Tan, E. C. D., Tu, Q., Martins, A. A., Yao, Y., & Sunol, A. K. (2025). *Uncertainty in inventories for life cycle assessment: State-of-the-art, challenges, and new technologies.* Environmental Progress & Sustainable Energy. DOI: 10.1002/ep.14644
- Mutel, C. (2017). *Brightway: An open source framework for Life Cycle Assessment.* Journal of Open Source Software. DOI: 10.21105/joss.00236
- Steubing, B., de Koning, D., Haas, A., & Mutel, C. L. (2020). *The Activity Browser — An open source LCA software building on top of the brightway framework.* Software Impacts. DOI: 10.1016/j.simpa.2019.100012
- Sacchi, R., & Menacho, Á. J. H. (2024). *pathways: life cycle assessment of energy transition scenarios.* Journal of Open Source Software. DOI: 10.21105/joss.07309
