# Sources

This source registry backs the Agentic LCA literature review in `content.md`. It records the public papers, preprints, packages, and tool references used in the synthesis. Full imported review draft: [`raw/literature-review-full.md`](literature-review-full.md).

## search-method
- Type: search protocol
- Date: 2026-05-06
- Queries: “agentic LCA”; “agentic life cycle assessment”; “LLM agent life cycle assessment”; “large language model life cycle assessment”; “life cycle inventory language model”; “agent-based modeling life cycle assessment”; “multi-agent system dynamic life cycle assessment”; “life cycle assessment knowledge graph”; “life cycle assessment ontology”; “life cycle inventory natural language processing”.
- Sources searched: Semantic Scholar, OpenAlex, Crossref, arXiv, publisher abstracts, open-access PDFs where available.
- Notes: Direct use of the exact term “agentic LCA” is sparse; the review therefore covers LLM-agentic LCA, ABM/MAS-LCA, KG/ontology grounding, and LCA automation infrastructure.

## preuss-2024
- Type: paper
- Title: Large language models for life cycle assessments: Opportunities, challenges, and risks
- Authors: Nathan Preuss, Abdulelah S. Alshehri, Fengqi You
- Venue: Journal of Cleaner Production, 2024
- DOI: https://doi.org/10.1016/j.jclepro.2024.142824
- Used by: LLM-LCA opportunities, risks, hallucination, responsible-use framing.

## tu-2024
- Type: paper
- Title: Mitigating Grand Challenges in Life Cycle Inventory Modeling through the Applications of Large Language Models
- Authors: Qingshi Tu, Jing Guo, Nan Li, Jianchuan Qi, Ming Xu
- Venue: Environmental Science & Technology, 2024
- DOI: https://doi.org/10.1021/acs.est.4c07634
- Used by: LCI missing foreground data, background data matching, RAG/KG/fine-tuning roadmap.

## zhang-2025
- Type: paper
- Title: Intelligent application of large language model to life cycle assessment methodology
- Authors: Xiaojun Zhang, Xiang Guo, Jinghao Zhao, Jie Xiong, Yajun Tian
- Venue: Journal of Cleaner Production, 2025
- DOI: https://doi.org/10.1016/j.jclepro.2025.146776
- Used by: RAG-based Chat-LCA, Text2SQL LCI retrieval, code-interpreter agent report generation.

## kumar-2025
- Type: paper
- Title: A Large Language Model-based Framework to Retrieve Life Cycle Inventory and Environmental Impact Data from Scientific Literature
- Authors: Avan Kumar, Farshid Nazemi, Hariprasad Kodamana, Manojkumar Ramteke, Bhavik R. Bakshi
- Venue: Environmental Science & Technology, 2025
- DOI: https://doi.org/10.1021/acs.est.5c05955
- Used by: Sustain-LLaMA, LCI and environmental impact data extraction from scientific literature.

## gkousis-2025
- Type: review paper
- Title: Machine learning and large language models for life cycle inventory compilation: Current situation and future developments
- Authors: Spiros Gkousis, Vasileia Vasilaki, Evina Katsou
- Venue: Renewable and Sustainable Energy Reviews, 2025
- DOI: https://doi.org/10.1016/j.rser.2025.116577
- Used by: ML/NLP/LLM for LCI compilation and future deployment gaps.

## nwagwu-2025
- Type: paper
- Title: Integrating Artificial Intelligence into Life Cycle Assessment: A Framework for Balancing Automation and Human Expertise
- Authors: Chibuikem Chrysogonus Nwagwu, Olga Ogorodnyk, Endre Sølvsberg, Ragnhild Eleftheriadis, Christina Meskers
- Venue: Journal of Sustainable Metallurgy, 2025
- DOI: https://doi.org/10.1007/s40831-025-01305-x
- Used by: human expertise and automation balance.

## mensikova-2026
- Type: preprint
- Title: Mapping the Landscape of Artificial Intelligence in Life Cycle Assessment Using Large Language Models
- Authors: Anastasija Mensikova, Donna M. Rizzo, K. Hinkelman
- Venue: arXiv, 2026
- arXiv: https://arxiv.org/abs/2602.22500
- DOI: https://doi.org/10.48550/arXiv.2602.22500
- Used by: AI-LCA landscape mapping with LLM-assisted text mining.

## aria-2025
- Type: preprint / software paper
- Title: ARIA: Artificial Intelligence for Sustainability Assessment
- Authors: Evangelos Kallitsis, Gregory J. Offer, Jacqueline Edge
- Venue: EarthArXiv / submitted to JOSS, 2025
- DOI: https://doi.org/10.31223/x5jf17
- Used by: Brightway2 + LLM foreground/background dataset matching workflow.

## peng-2024
- Type: paper
- Title: Knowledge graph-based mapping and recommendation to automate life cycle assessment
- Authors: Tao Peng, Lu Gao, Reuben S. K. Agbozo, Yuming Xu, Kateryna Svynarenko
- Venue: Advanced Engineering Informatics, 2024
- DOI: https://doi.org/10.1016/j.aei.2024.102752
- Used by: KG-based flow/process recommendation and OpenLCA automation.

## gachkar-2024
- Type: paper
- Title: Text-based algorithms for automating life cycle inventory analysis in building sector life cycle assessment studies
- Authors: Sadaf Gachkar, Darya Gachkar, Erfan Ghofrani, Antonio García Martínez, Cecilio Ángulo Bahón
- Venue: Journal of Cleaner Production, 2024/2025
- DOI: https://doi.org/10.1016/j.jclepro.2024.144448
- Used by: NLP/text-based extraction from building BoQ for LCI automation.

## autopcf-2024
- Type: paper
- Title: AutoPCF: A Novel Automatic Product Carbon Footprint Estimation Framework Based on Large Language Models
- Authors: Biao Luo, Jinjie Liu, Zhu Deng, Can Yuan, Qingrun Yang
- Venue: AAAI Symposium Series, 2024
- DOI: https://doi.org/10.1609/aaaiss.v2i1.27656
- Used by: automatic cradle-to-gate PCF estimation workflow.

## pcf-rwkv-2025
- Type: paper
- Title: PCF-RWKV: Large Language Model for Product Carbon Footprint Estimation
- Authors: Zhen Li, Peihao Tang, Xuanlin Wang, Xueping Liu, Peng Mou
- Venue: Sustainability, 2025
- DOI: https://doi.org/10.3390/su17031321
- Used by: multi-agent technology for LCI construction and emission factor alignment.

## cole-2025
- Type: paper
- Title: Towards AI-augmented sustainability assessments: integrating large language models in the case of product social life cycle assessment
- Authors: Carolyn Cole, Arash Hajikhani, Eveliina Hylkilä, Essi Paronen, Hanna Pihkola
- Venue: The International Journal of Life Cycle Assessment, 2025
- DOI: https://doi.org/10.1007/s11367-025-02508-w
- Used by: LLM-assisted Social LCA, 50% AI/manual agreement, tacit knowledge and stakeholder perspective gaps.

## ploszaj-mazurek-2024
- Type: paper
- Title: Artificial Intelligence and Digital Tools for Assisting Low-Carbon Architectural Design: Merging the Use of Machine Learning, Large Language Models, and Building Information Modeling for Life Cycle Assessment Tool Development
- Authors: Mateusz Płoszaj-Mazurek, Elżbieta Ryńska
- Venue: Energies, 2024
- DOI: https://doi.org/10.3390/en17122997
- Used by: BIM, ML, LLM, and building LCA tool development.

## chen-2024
- Type: paper
- Title: Advancing Life Cycle Assessment of Sustainable Green Hydrogen Production Using Domain-Specific Fine-Tuning by Large Language Models Augmentation
- Authors: Yajing Chen, Urs Liebau, S. M. Guruprasad, Iaroslav Trofimenko, C. Minke
- Venue: Machine Learning and Knowledge Extraction, 2024
- DOI: https://doi.org/10.3390/make6040122
- Used by: LlamaIndex/LangChain/GPT-3.5 for green hydrogen LCA research assistance.

## davis-2009
- Type: paper
- Title: Integration of Life Cycle Assessment Into Agent-Based Modeling
- Authors: Chris Davis, Igor Nikolić, Gerard P. J. Dijkema
- Venue: Journal of Industrial Ecology, 2009
- DOI: https://doi.org/10.1111/j.1530-9290.2009.00122.x
- Used by: foundational ABM-LCA coupling with environmental information feeding agent decisions.

## halog-manik-2011
- Type: paper
- Title: Advancing Integrated Systems Modelling Framework for Life Cycle Sustainability Assessment
- Authors: Anthony Halog, Yosef Manik
- Venue: Sustainability, 2011
- DOI: https://doi.org/10.3390/su3020469
- Used by: integrated systems modeling for LCSA.

## querini-2015
- Type: paper
- Title: Combining Agent-Based Modeling and Life Cycle Assessment for the Evaluation of Mobility Policies
- Authors: Florent Querini, Enrico Benetto
- Venue: Environmental Science & Technology, 2015
- DOI: https://doi.org/10.1021/es5060868
- Used by: mobility policy, consequential LCA, fleet dynamics.

## wu-2017
- Type: paper
- Title: Agent-Based Modeling of Temporal and Spatial Dynamics in Life Cycle Sustainability Assessment
- Authors: Susie Ruqun Wu, Xiaomeng Li, Defne Apul, Victoria Breeze
- Venue: Journal of Industrial Ecology, 2017
- DOI: https://doi.org/10.1111/jiec.12666
- Used by: spatial, temporal, emergent behavioral dynamics in LCSA.

## marvuglia-2018
- Type: review paper
- Title: Implementation of Agent-Based Models to support Life Cycle Assessment: A review focusing on agriculture and land use
- Authors: Antonino Marvuglia, Tomás Navarrete Gutiérrez, Paul Baustert, Enrico Benetto
- Venue: AIMS Agriculture and Food, 2018
- DOI: https://doi.org/10.3934/agrfood.2018.4.535
- Used by: ABM-LCA review, agriculture and land-use modeling blocks.

## lan-yao-2019
- Type: paper
- Title: Integrating Life Cycle Assessment and Agent-Based Modeling: A Dynamic Modeling Framework for Sustainable Agricultural Systems
- Authors: Kai Lan, Yuan Yao
- Venue: Journal of Cleaner Production, 2019
- DOI: https://doi.org/10.1016/j.jclepro.2019.117853
- Used by: LCA + ABM + TEA for agricultural systems.

## walzberg-2019
- Type: paper
- Title: Assessing behavioural change with agent-based life cycle assessment: Application to smart homes
- Authors: Julien Walzberg, Thomas Dandres, Nicolás Merveille, Mohamed Cheriet, Réjean Samson
- Venue: Renewable and Sustainable Energy Reviews, 2019
- DOI: https://doi.org/10.1016/j.rser.2019.05.038
- Used by: behavioral change, nudges, smart homes, peak shaving.

## kerdlap-2020
- Type: paper
- Title: Environmental evaluation of distributed versus centralized plastic waste recycling: Integrating life cycle assessment and agent-based modeling
- Authors: Piya Kerdlap, Aloisius Rabata Purnama, Jonathan Sze Choong Low, Daren Zong Loong Tan
- Venue: Procedia CIRP, 2020
- DOI: https://doi.org/10.1016/j.procir.2020.01.083
- Used by: plastic waste recycling, ABM outputs as LCI.

## zupko-2021
- Type: paper
- Title: Application of agent-based modeling and life cycle sustainability assessment to evaluate biorefinery placement
- Authors: Robert Zupko
- Venue: Biomass and Bioenergy, 2021
- DOI: https://doi.org/10.1016/j.biombioe.2020.105916
- Used by: biorefinery placement, forest owners/loggers ABM, LCSA.

## nugroho-2022
- Type: paper
- Title: Building an agent-based techno-economic assessment coupled with life cycle assessment of biomass to methanol supply chains
- Authors: Yohanes Kristianto Nugroho, Liandong Zhu, Cathal Heavey
- Venue: Applied Energy, 2022
- DOI: https://doi.org/10.1016/j.apenergy.2021.118449
- Used by: ABM simulation-optimization + TEA + LCA for biomass-to-methanol supply chains.

## ding-achten-2022
- Type: paper
- Title: Coupling agent-based modeling with territorial LCA to support agricultural land-use planning
- Authors: Tianran Ding, Wouter Achten
- Venue: Journal of Cleaner Production, 2022
- DOI: https://doi.org/10.1016/j.jclepro.2022.134914
- Used by: dynamic territorial LCA, ABM, GIS, bioenergy crop adoption.

## bayram-2022
- Type: paper
- Title: Sustainable farming strategies for mixed crop-livestock farms in Luxembourg simulated with a hybrid agent-based and life-cycle assessment model
- Authors: Alper Bayram, Antonino Marvuglia, Tomás Navarrete Gutiérrez, Jean-Paul Weis, Gérard Conter
- Venue: Journal of Cleaner Production, 2022/2023
- DOI: https://doi.org/10.1016/j.jclepro.2022.135759
- Used by: mixed crop-livestock ABM-LCA.

## voss-2023
- Type: paper
- Title: A consequential approach to life cycle sustainability assessment with an agent-based model to determine the potential contribution of chemical recycling to UN Sustainable Development Goals
- Authors: Raoul Voss, Roh Pin Lee, Magnus Fröhling
- Venue: Journal of Industrial Ecology, 2023
- DOI: https://doi.org/10.1111/jiec.13303
- Used by: chemical recycling, consequential LCSA, SDGs.

## su-2025
- Type: paper
- Title: Interactive and dynamic insights into environmental impacts of a neighborhood: A tight coupling of multi-agent system and dynamic life cycle assessment
- Authors: Shu Su, Jingyi Ju, Jingfeng Yuan, Yuan Chang, Qian Li
- Venue: Environmental Impact Assessment Review, 2025
- DOI: https://doi.org/10.1016/j.eiar.2024.107708
- Used by: MAS + DLCA for neighborhood/campus environmental impact assessment.

## fuortes-2025
- Type: paper
- Title: Framework for metamodel-driven integration of life cycle assessment and agent-based modeling
- Authors: Agnese Fuortes, Carlos Felipe Blanco, Joris T. K. Quik, Lynn de Jager, Willie Peijnenburg
- Venue: Sustainable Production and Consumption, 2025
- DOI: https://doi.org/10.1016/j.spc.2025.06.005
- Used by: hard coupling, LCA/ABM symbiosis, metamodels, PV end-of-life.

## janowicz-2015
- Type: paper / ontology pattern
- Title: A minimal ontology pattern for life cycle assessment data
- Authors: Krzysztof Janowicz, Adila Alfa Krisnadhi, Yingjie Hu, Sangwon Suh, Bo P. Weidema
- Year: 2015
- Used by: semantic interoperability and LCA data ontology.

## yan-2015
- Type: paper / ontology
- Title: An Ontology For Specifying Spatiotemporal Scopes in Life Cycle Assessment
- Authors: Bo Yan, Yingjie Hu, Brandon Kuczenski, Krzysztof Janowicz, Andrea Ballatore
- Year: 2015
- URL: http://ceur-ws.org/Vol-1501/Diversity2015-paper_4.pdf
- Used by: spatiotemporal scope representation for dynamic and territorial LCA.

## algren-2021
- Type: book chapter
- Title: Machine learning in life cycle assessment
- Authors: Mikaela Algren, Wendy Fisher, Amy E. Landis
- Year: 2021
- DOI: https://doi.org/10.1016/B978-0-12-817976-5.00009-7
- Used by: ML opportunities in LCA, surrogate LCA, LCI data cleaning.

## romeiko-2023
- Type: review paper
- Title: A review of machine learning applications in life cycle assessment studies
- Authors: Xiaobo Xue Romeiko, Xuesong Zhang, Yulei Pang, Feng Gao, Ming Xu
- Venue: Science of the Total Environment, 2023
- DOI: https://doi.org/10.1016/j.scitotenv.2023.168969
- Used by: ML application categories and data-size limitations in LCA studies.

## kiemel-2022
- Type: review paper
- Title: How to Simplify Life Cycle Assessment for Industrial Applications—A Comprehensive Review
- Authors: Steffen Kiemel, Chantal Rietdorf, Maximilian Schutzbach, Robert Miehe
- Venue: Sustainability, 2022
- DOI: https://doi.org/10.3390/su142315704
- Used by: LCA simplification, automation, parametric/modular/screening approaches.

## tan-2025
- Type: review / perspective
- Title: Uncertainty in inventories for life cycle assessment: State-of-the-art, challenges, and new technologies
- Authors: Eric C. D. Tan, Qingshi Tu, António A. Martins, Yuan Yao, Aydın K. Sunol
- Venue: Environmental Progress & Sustainable Energy, 2025
- DOI: https://doi.org/10.1002/ep.14644
- Used by: LCI uncertainty and data-science opportunities.

## brightway-2017
- Type: software paper
- Title: Brightway: An open source framework for Life Cycle Assessment
- Author: Chris Mutel
- Venue: Journal of Open Source Software, 2017
- DOI: https://doi.org/10.21105/joss.00236
- Used by: Python LCA computation backend.

## activity-browser-2020
- Type: software paper
- Title: The Activity Browser — An open source LCA software building on top of the brightway framework
- Authors: Bernhard Steubing, D. de Koning, A. Haas, Chris L. Mutel
- Venue: Software Impacts, 2020
- DOI: https://doi.org/10.1016/j.simpa.2019.100012
- Used by: GUI and advanced modeling layer for Brightway.

## pathways-2024
- Type: software paper
- Title: pathways: life cycle assessment of energy transition scenarios
- Authors: Romain Sacchi, Álvaro José Hahn Menacho
- Venue: Journal of Open Source Software, 2024
- DOI: https://doi.org/10.21105/joss.07309
- Used by: energy transition scenario LCA tooling.
