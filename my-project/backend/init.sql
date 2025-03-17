-- 清除旧表（如果存在）
DROP TABLE IF EXISTS law_application_relation;
DROP TABLE IF EXISTS application_categories;
DROP TABLE IF EXISTS law_categories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS laws;
DROP TABLE IF EXISTS law_applications;
DROP TABLE IF EXISTS search_history;
DROP TABLE IF EXISTS law_tags;
DROP TABLE IF EXISTS application_tags;
DROP TABLE IF EXISTS tags;

-- 创建分类表
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

-- 插入分类数据
INSERT INTO categories (name) VALUES
('商务'), ('刑法'), ('民法'), ('知识产权'), ('环境'), ('资本市场'), ('重整与破产');

-- 创建标签表
CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

-- 插入标签数据（50个与拉丁美洲法律相关的标签）
INSERT INTO tags (name) VALUES
('环境保护'), ('反腐败'), ('人权'), ('劳动法'), ('税法'), ('知识产权'),
('宪法'), ('国际贸易'), ('刑事诉讼'), ('民事诉讼'), ('污染'), ('透明度'),
('工人权利'), ('森林砍伐'), ('土著权利'), ('合规'), ('专利'), ('版权'),
('竞争法'), ('垄断'), ('犯罪'), ('家庭法'), ('婚姻'), ('可持续发展'),
('法律改革'), ('合同'), ('国际比较'), ('离婚'), ('公司法'), ('破产'),
('证券法'), ('金融监管'), ('消费者保护'), ('土地法'), ('移民法'),
('教育法'), ('健康法'), ('能源法'), ('矿业法'), ('农业法'),
('交通法'), ('旅游法'), ('体育法'), ('媒体法'), ('网络安全'),
('数据保护'), ('反洗钱'), ('反恐'), ('军事法'), ('国际法');

-- 创建法律条目表
CREATE TABLE laws (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    country TEXT NOT NULL
);

-- 插入法律条目（60条，覆盖拉丁美洲多个国家）
INSERT INTO laws (title, content, country) VALUES
('巴西环境保护法', '该法旨在保护巴西的自然资源，防止森林砍伐和污染。', '巴西'),
('阿根廷反腐败法', '该法打击公共和私营部门腐败，建立透明度和举报人保护机制。', '阿根廷'),
('墨西哥劳动法改革法案', '该法案修订劳动法，关注工人权利和工会代表。', '墨西哥'),
('智利宪法修正案', '该修正案增加人权和环境保护条款。', '智利'),
('哥伦比亚税法', '该法规定税收制度，包括税率和申报要求。', '哥伦比亚'),
('乌拉圭知识产权法', '该法保护专利、商标和版权。', '乌拉圭'),
('秘鲁反垄断法', '该法促进市场竞争，防止垄断行为。', '秘鲁'),
('委内瑞拉刑法', '该法规定刑事犯罪和处罚措施。', '委内瑞拉'),
('巴拉圭家庭法', '该法规范婚姻、离婚和子女抚养。', '巴拉圭'),
('厄瓜多尔环境法', '该法保护自然环境，规定可持续发展原则。', '厄瓜多尔'),
('玻利维亚水资源管理法', '该法规范水资源使用和保护。', '玻利维亚'),
('洪都拉斯公司法', '该法规定公司注册和运营要求。', '洪都拉斯'),
('危地马拉土地法', '该法规范土地所有权和使用权。', '危地马拉'),
('萨尔瓦多教育法', '该法规定教育体系和教师资格。', '萨尔瓦多'),
('尼加拉瓜健康法', '该法规范公共卫生政策和医疗服务。', '尼加拉瓜'),
('哥斯达黎加能源法', '该法规定能源生产和分配政策。', '哥斯达黎加'),
('巴拿马矿业法', '该法规范矿产资源开采和环境保护。', '巴拿马'),
('多米尼加农业法', '该法规定农业政策和农民权利。', '多米尼加'),
('海地交通法', '该法规范交通规则和道路安全。', '海地'),
('古巴旅游法', '该法规定旅游业管理和游客权利。', '古巴'),
('波多黎各体育法', '该法规范体育活动和运动员权利。', '波多黎各'),
('牙买加媒体法', '该法规定媒体自由和新闻报道规范。', '牙买加'),
('特立尼达和多巴哥网络安全法', '该法保护网络安全，防止网络犯罪。', '特立尼达和多巴哥'),
('巴巴多斯数据保护法', '该法保护个人数据隐私。', '巴巴多斯'),
('圣卢西亚反洗钱法', '该法打击洗钱活动，规定金融机构义务。', '圣卢西亚'),
('格林纳达反恐法', '该法规定反恐措施和国际合作。', '格林纳达'),
('安提瓜和巴布达军事法', '该法规范军事组织和纪律。', '安提瓜和巴布达'),
('圣文森特和格林纳丁斯国际法', '该法规定国际法下的权利和义务。', '圣文森特和格林纳丁斯'),
('巴西公司法', '该法规定公司注册和解散要求。', '巴西'),
('阿根廷破产法', '该法规范破产程序和债权人权利。', '阿根廷'),
('墨西哥证券法', '该法规定证券发行和交易监管。', '墨西哥'),
('智利金融监管法', '该法规范金融市场和机构。', '智利'),
('哥伦比亚消费者保护法', '该法保护消费者权利，规定商家责任。', '哥伦比亚'),
('乌拉圭土地法', '该法规范土地所有权和转让。', '乌拉圭'),
('秘鲁移民法', '该法规定移民政策和外国人权利。', '秘鲁'),
('委内瑞拉教育法', '该法规定教育体系和课程要求。', '委内瑞拉'),
('巴拉圭健康法', '该法规范公共卫生和医疗服务。', '巴拉圭'),
('厄瓜多尔能源法', '该法规定能源生产和消费政策。', '厄瓜多尔'),
('玻利维亚矿业法', '该法规范矿产开采和环境保护。', '玻利维亚'),
('洪都拉斯农业法', '该法规定农业政策和土地使用。', '洪都拉斯'),
('危地马拉交通法', '该法规范交通规则和车辆注册。', '危地马拉'),
('萨尔瓦多旅游法', '该法规定旅游业管理和酒店运营。', '萨尔瓦多'),
('尼加拉瓜体育法', '该法规范体育活动和赛事组织。', '尼加拉瓜'),
('哥斯达黎加媒体法', '该法规定媒体自由和广告规范。', '哥斯达黎加'),
('巴拿马网络安全法', '该法保护网络安全，防止网络犯罪。', '巴拿马'),
('多米尼加数据保护法', '该法保护个人数据，规定数据处理要求。', '多米尼加'),
('海地反洗钱法', '该法打击洗钱，规定金融机构报告义务。', '海地'),
('古巴反恐法', '该法规定反恐措施和国际合作。', '古巴'),
('波多黎各军事法', '该法规范军事纪律和作战。', '波多黎各'),
('牙买加国际法', '该法规定国际法下的权利和义务。', '牙买加'),
('巴西税法改革', '该法修订巴西税收制度，简化税率结构。', '巴西'),
('阿根廷劳动法', '该法保护工人权利，规范劳动合同。', '阿根廷'),
('墨西哥环境法', '该法保护墨西哥自然资源，防止污染。', '墨西哥'),
('智利土地法', '该法规范土地所有权和使用权。', '智利'),
('哥伦比亚公司法', '该法规定公司设立和运营规则。', '哥伦比亚'),
('乌拉圭反洗钱法', '该法打击洗钱活动，强化金融监管。', '乌拉圭'),
('秘鲁教育法', '该法规定教育体系和学生权利。', '秘鲁'),
('委内瑞拉能源法', '该法规范能源生产和分配。', '委内瑞拉'),
('巴拉圭农业法', '该法支持农业发展，保护农民利益。', '巴拉圭'),
('厄瓜多尔移民法', '该法规定移民政策和居留条件。', '厄瓜多尔');

-- 创建应用案例表
CREATE TABLE law_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    full_content TEXT,
    sub_type TEXT,
    country TEXT NOT NULL
);

-- 插入应用案例（60条，与法律条目对应）
INSERT INTO law_applications (title, description, full_content, sub_type, country) VALUES
('案例：巴西森林砍伐诉讼', '一家伐木公司因非法砍伐被起诉。', '法院根据巴西环境保护法判决公司支付罚款并恢复森林。', 'case', '巴西'),
('期刊：阿根廷反腐败法成效分析', '评估反腐败法的实施效果。', '讨论法律的优点和不足，提出改进建议。', 'journal', '阿根廷'),
('文书：墨西哥劳动合同模板', '符合劳动法改革要求的合同模板。', '包括工资、工作时间和解雇条款。', 'document', '墨西哥'),
('案例：智利土著土地权纠纷', '土著社区与政府的土地争端。', '法院根据宪法修正案判决社区胜诉。', 'case', '智利'),
('期刊：哥伦比亚税法比较研究', '比较哥伦比亚与其他国家的税法。', '分析税率和经济影响。', 'journal', '哥伦比亚'),
('文书：乌拉圭专利申请指南', '指导企业申请专利。', '说明申请流程和费用。', 'document', '乌拉圭'),
('案例：秘鲁市场垄断诉讼', '针对大型企业的反垄断诉讼。', '法院判决企业违反反垄断法。', 'case', '秘鲁'),
('期刊：委内瑞拉刑法改革探讨', '分析刑法改革的必要性。', '讨论当前缺陷和改革方向。', 'journal', '委内瑞拉'),
('文书：巴拉圭离婚协议模板', '符合家庭法的离婚协议。', '包括财产分割和子女抚养条款。', 'document', '巴拉圭'),
('案例：厄瓜多尔环境污染诉讼', '针对石油公司的污染诉讼。', '法院判决公司赔偿社区。', 'case', '厄瓜多尔'),
('期刊：玻利维亚水资源管理法报告', '评估水资源管理法的实施。', '分析执行效果和挑战。', 'journal', '玻利维亚'),
('文书：洪都拉斯公司注册指南', '指导公司注册流程。', '说明注册要求和费用。', 'document', '洪都拉斯'),
('案例：危地马拉土地所有权纠纷', '关于土地所有权的争端。', '法院判决土地归属。', 'case', '危地马拉'),
('期刊：萨尔瓦多教育法改革建议', '提出教育法改革建议。', '讨论不足和改进措施。', 'journal', '萨尔瓦多'),
('文书：尼加拉瓜医疗服务协议', '符合健康法的医疗协议。', '包括服务内容和费用条款。', 'document', '尼加拉瓜'),
('案例：哥斯达黎加能源政策诉讼', '关于能源政策的争端。', '法院判决政策有效。', 'case', '哥斯达黎加'),
('期刊：巴拿马矿业法环境评估', '评估矿业法对环境影响。', '分析矿业活动对生态的影响。', 'journal', '巴拿马'),
('文书：多米尼加农业用地租赁合同', '符合农业法的租赁合同。', '包括租赁期限和租金条款。', 'document', '多米尼加'),
('案例：海地交通事故责任认定', '交通事故责任认定案例。', '法院判决事故责任。', 'case', '海地'),
('期刊：古巴旅游业发展分析', '分析旅游业法律框架。', '讨论实施效果和未来发展。', 'journal', '古巴'),
('文书：波多黎各体育赛事指南', '指导体育赛事组织。', '说明审批和安全要求。', 'document', '波多黎各'),
('案例：牙买加媒体自由诉讼', '关于媒体自由的争端。', '法院判决自由受保护。', 'case', '牙买加'),
('期刊：特立尼达网络安全法报告', '评估网络安全法实施。', '分析执行效果和挑战。', 'journal', '特立尼达和多巴哥'),
('文书：巴巴多斯数据保护手册', '指导企业遵守数据保护法。', '说明数据保护要求。', 'document', '巴巴多斯'),
('案例：圣卢西亚反洗钱调查', '反洗钱调查案例。', '法院判决洗钱行为成立。', 'case', '圣卢西亚'),
('期刊：格林纳达反恐法合作分析', '分析反恐法国际合作。', '讨论合作机制和效果。', 'journal', '格林纳达'),
('文书：安提瓜军事纪律手册', '指导军事人员遵守纪律。', '说明纪律要求和处罚。', 'document', '安提瓜和巴布达'),
('案例：圣文森特国际法适用', '关于国际法适用的争端。', '法院判决国际法适用。', 'case', '圣文森特和格林纳丁斯'),
('期刊：巴西公司法改革建议', '提出公司法改革建议。', '讨论不足和改进措施。', 'journal', '巴西'),
('文书：阿根廷破产申请指南', '指导企业申请破产。', '说明申请流程和费用。', 'document', '阿根廷'),
('案例：墨西哥证券交易纠纷', '证券交易纠纷案例。', '法院判决交易纠纷。', 'case', '墨西哥'),
('期刊：智利金融监管法报告', '评估金融监管法实施。', '分析执行效果和挑战。', 'journal', '智利'),
('文书：哥伦比亚消费者保护手册', '指导消费者维护权益。', '说明保护要求和途径。', 'document', '哥伦比亚'),
('案例：乌拉圭土地转让纠纷', '土地转让纠纷案例。', '法院判决转让有效。', 'case', '乌拉圭'),
('期刊：秘鲁移民法改革建议', '提出移民法改革建议。', '讨论不足和改进措施。', 'journal', '秘鲁'),
('文书：委内瑞拉教育机构注册指南', '指导教育机构注册。', '说明注册流程和费用。', 'document', '委内瑞拉'),
('案例：巴拉圭医疗事故认定', '医疗事故责任认定案例。', '法院判决事故责任。', 'case', '巴拉圭'),
('期刊：厄瓜多尔能源法评估', '评估能源法环境影响。', '分析政策对生态的影响。', 'journal', '厄瓜多尔'),
('文书：玻利维亚矿业许可证指南', '指导申请矿业许可证。', '说明申请流程和费用。', 'document', '玻利维亚'),
('案例：洪都拉斯农业用地纠纷', '农业用地租赁纠纷案例。', '法院判决合同有效。', 'case', '洪都拉斯'),
('期刊：危地马拉交通法建议', '提出交通法改革建议。', '讨论不足和改进措施。', 'journal', '危地马拉'),
('文书：萨尔瓦多旅游业许可证指南', '指导申请旅游业许可证。', '说明申请流程和费用。', 'document', '萨尔瓦多'),
('案例：尼加拉瓜体育赛事纠纷', '体育赛事组织纠纷案例。', '法院判决组织权。', 'case', '尼加拉瓜'),
('期刊：哥斯达黎加媒体法分析', '分析媒体法自由度。', '讨论实施效果和自由度。', 'journal', '哥斯达黎加'),
('文书：巴拿马网络安全手册', '指导遵守网络安全法。', '说明安全要求和实践。', 'document', '巴拿马'),
('案例：多米尼加数据保护诉讼', '数据保护诉讼案例。', '法院判决保护权。', 'case', '多米尼加'),
('期刊：海地反洗钱法报告', '评估反洗钱法实施。', '分析执行效果和挑战。', 'journal', '海地'),
('文书：古巴反恐措施指南', '指导实施反恐法。', '说明措施和步骤。', 'document', '古巴'),
('案例：波多黎各军事纪律处罚', '军事纪律处罚案例。', '法院判决处罚有效。', 'case', '波多黎各'),
('期刊：牙买加国际法适用分析', '分析国际法适用情况。', '讨论适用效果和挑战。', 'journal', '牙买加'),
('文书：巴西税务申报指南', '指导税务申报流程。', '说明申报要求和期限。', 'document', '巴西'),
('案例：阿根廷劳动合同纠纷', '劳动合同纠纷案例。', '法院判决合同条款有效。', 'case', '阿根廷'),
('期刊：墨西哥环境法实施报告', '评估环境法实施效果。', '分析污染防治成果。', 'journal', '墨西哥'),
('文书：智利土地使用协议模板', '符合土地法的协议模板。', '包括使用权和期限条款。', 'document', '智利'),
('案例：哥伦比亚公司设立纠纷', '公司设立纠纷案例。', '法院判决设立程序合法。', 'case', '哥伦比亚'),
('期刊：乌拉圭反洗钱法分析', '分析反洗钱法的监管效果。', '讨论金融监管措施。', 'journal', '乌拉圭'),
('文书：秘鲁学生权利保护指南', '指导维护学生权利。', '说明权利和申诉途径。', 'document', '秘鲁'),
('案例：委内瑞拉能源分配争议', '能源分配争议案例。', '法院判决分配政策有效。', 'case', '委内瑞拉'),
('期刊：巴拉圭农业法发展报告', '评估农业法对发展的影响。', '分析农民利益保护。', 'journal', '巴拉圭'),
('文书：厄瓜多尔移民居留指南', '指导申请居留许可。', '说明申请流程和条件。', 'document', '厄瓜多尔');

-- 创建法律与分类关联表
CREATE TABLE law_categories (
    law_id INTEGER,
    category_id INTEGER,
    FOREIGN KEY(law_id) REFERENCES laws(id),
    FOREIGN KEY(category_id) REFERENCES categories(id)
);

-- 插入法律与分类的关联
INSERT INTO law_categories (law_id, category_id) VALUES
(1, 5), (1, 1), -- 巴西环境保护法: 环境, 商务
(2, 2), (2, 1), -- 阿根廷反腐败法: 刑法, 商务
(3, 1),         -- 墨西哥劳动法改革法案: 商务
(4, 3), (4, 5), -- 智利宪法修正案: 民法, 环境
(5, 1),         -- 哥伦比亚税法: 商务
(6, 4),         -- 乌拉圭知识产权法: 知识产权
(7, 1),         -- 秘鲁反垄断法: 商务
(8, 2),         -- 委内瑞拉刑法: 刑法
(9, 3),         -- 巴拉圭家庭法: 民法
(10, 5),        -- 厄瓜多尔环境法: 环境
(11, 5),        -- 玻利维亚水资源管理法: 环境
(12, 1),        -- 洪都拉斯公司法: 商务
(13, 3),        -- 危地马拉土地法: 民法
(14, 3),        -- 萨尔瓦多教育法: 民法
(15, 3),        -- 尼加拉瓜健康法: 民法
(16, 5),        -- 哥斯达黎加能源法: 环境
(17, 5),        -- 巴拿马矿业法: 环境
(18, 1),        -- 多米尼加农业法: 商务
(19, 1),        -- 海地交通法: 商务
(20, 1),        -- 古巴旅游法: 商务
(21, 3),        -- 波多黎各体育法: 民法
(22, 3),        -- 牙买加媒体法: 民法
(23, 2),        -- 特立尼达和多巴哥网络安全法: 刑法
(24, 3),        -- 巴巴多斯数据保护法: 民法
(25, 2),        -- 圣卢西亚反洗钱法: 刑法
(26, 2),        -- 格林纳达反恐法: 刑法
(27, 2),        -- 安提瓜和巴布达军事法: 刑法
(28, 3),        -- 圣文森特和格林纳丁斯国际法: 民法
(29, 1),        -- 巴西公司法: 商务
(30, 7),        -- 阿根廷破产法: 重整与破产
(31, 6),        -- 墨西哥证券法: 资本市场
(32, 6),        -- 智利金融监管法: 资本市场
(33, 1),        -- 哥伦比亚消费者保护法: 商务
(34, 3),        -- 乌拉圭土地法: 民法
(35, 3),        -- 秘鲁移民法: 民法
(36, 3),        -- 委内瑞拉教育法: 民法
(37, 3),        -- 巴拉圭健康法: 民法
(38, 5),        -- 厄瓜多尔能源法: 环境
(39, 5),        -- 玻利维亚矿业法: 环境
(40, 1),        -- 洪都拉斯农业法: 商务
(41, 1),        -- 危地马拉交通法: 商务
(42, 1),        -- 萨尔瓦多旅游法: 商务
(43, 3),        -- 尼加拉瓜体育法: 民法
(44, 3),        -- 哥斯达黎加媒体法: 民法
(45, 2),        -- 巴拿马网络安全法: 刑法
(46, 3),        -- 多米尼加数据保护法: 民法
(47, 2),        -- 海地反洗钱法: 刑法
(48, 2),        -- 古巴反恐法: 刑法
(49, 2),        -- 波多黎各军事法: 刑法
(50, 3),        -- 牙买加国际法: 民法
(51, 1),        -- 巴西税法改革: 商务
(52, 1),        -- 阿根廷劳动法: 商务
(53, 5),        -- 墨西哥环境法: 环境
(54, 3),        -- 智利土地法: 民法
(55, 1),        -- 哥伦比亚公司法: 商务
(56, 2),        -- 乌拉圭反洗钱法: 刑法
(57, 3),        -- 秘鲁教育法: 民法
(58, 5),        -- 委内瑞拉能源法: 环境
(59, 1),        -- 巴拉圭农业法: 商务
(60, 3);        -- 厄瓜多尔移民法: 民法

-- 创建应用案例与分类关联表
CREATE TABLE application_categories (
    application_id INTEGER,
    category_id INTEGER,
    FOREIGN KEY(application_id) REFERENCES law_applications(id),
    FOREIGN KEY(category_id) REFERENCES categories(id)
);

-- 插入应用案例与分类的关联
INSERT INTO application_categories (application_id, category_id) VALUES
(1, 5), (1, 1), -- 案例：巴西森林砍伐诉讼: 环境, 商务
(2, 2), (2, 1), -- 期刊：阿根廷反腐败法成效分析: 刑法, 商务
(3, 1),         -- 文书：墨西哥劳动合同模板: 商务
(4, 3), (4, 5), -- 案例：智利土著土地权纠纷: 民法, 环境
(5, 1),         -- 期刊：哥伦比亚税法比较研究: 商务
(6, 4),         -- 文书：乌拉圭专利申请指南: 知识产权
(7, 1),         -- 案例：秘鲁市场垄断诉讼: 商务
(8, 2),         -- 期刊：委内瑞拉刑法改革探讨: 刑法
(9, 3),         -- 文书：巴拉圭离婚协议模板: 民法
(10, 5),        -- 案例：厄瓜多尔环境污染诉讼: 环境
(11, 5),        -- 期刊：玻利维亚水资源管理法报告: 环境
(12, 1),        -- 文书：洪都拉斯公司注册指南: 商务
(13, 3),        -- 案例：危地马拉土地所有权纠纷: 民法
(14, 3),        -- 期刊：萨尔瓦多教育法改革建议: 民法
(15, 3),        -- 文书：尼加拉瓜医疗服务协议: 民法
(16, 5),        -- 案例：哥斯达黎加能源政策诉讼: 环境
(17, 5),        -- 期刊：巴拿马矿业法环境评估: 环境
(18, 1),        -- 文书：多米尼加农业用地租赁合同: 商务
(19, 1),        -- 案例：海地交通事故责任认定: 商务
(20, 1),        -- 期刊：古巴旅游业发展分析: 商务
(21, 3),        -- 文书：波多黎各体育赛事指南: 民法
(22, 3),        -- 案例：牙买加媒体自由诉讼: 民法
(23, 2),        -- 期刊：特立尼达网络安全法报告: 刑法
(24, 3),        -- 文书：巴巴多斯数据保护手册: 民法
(25, 2),        -- 案例：圣卢西亚反洗钱调查: 刑法
(26, 2),        -- 期刊：格林纳达反恐法合作分析: 刑法
(27, 2),        -- 文书：安提瓜军事纪律手册: 刑法
(28, 3),        -- 案例：圣文森特国际法适用: 民法
(29, 1),        -- 期刊：巴西公司法改革建议: 商务
(30, 7),        -- 文书：阿根廷破产申请指南: 重整与破产
(31, 6),        -- 案例：墨西哥证券交易纠纷: 资本市场
(32, 6),        -- 期刊：智利金融监管法报告: 资本市场
(33, 1),        -- 文书：哥伦比亚消费者保护手册: 商务
(34, 3),        -- 案例：乌拉圭土地转让纠纷: 民法
(35, 3),        -- 期刊：秘鲁移民法改革建议: 民法
(36, 3),        -- 文书：委内瑞拉教育机构注册指南: 民法
(37, 3),        -- 案例：巴拉圭医疗事故认定: 民法
(38, 5),        -- 期刊：厄瓜多尔能源法评估: 环境
(39, 5),        -- 文书：玻利维亚矿业许可证指南: 环境
(40, 1),        -- 案例：洪都拉斯农业用地纠纷: 商务
(41, 1),        -- 期刊：危地马拉交通法建议: 商务
(42, 1),        -- 文书：萨尔瓦多旅游业许可证指南: 商务
(43, 3),        -- 案例：尼加拉瓜体育赛事纠纷: 民法
(44, 3),        -- 期刊：哥斯达黎加媒体法分析: 民法
(45, 2),        -- 文书：巴拿马网络安全手册: 刑法
(46, 3),        -- 案例：多米尼加数据保护诉讼: 民法
(47, 2),        -- 期刊：海地反洗钱法报告: 刑法
(48, 2),        -- 文书：古巴反恐措施指南: 刑法
(49, 2),        -- 案例：波多黎各军事纪律处罚: 刑法
(50, 3),        -- 期刊：牙买加国际法适用分析: 民法
(51, 1),        -- 文书：巴西税务申报指南: 商务
(52, 1),        -- 案例：阿根廷劳动合同纠纷: 商务
(53, 5),        -- 期刊：墨西哥环境法实施报告: 环境
(54, 3),        -- 文书：智利土地使用协议模板: 民法
(55, 1),        -- 案例：哥伦比亚公司设立纠纷: 商务
(56, 2),        -- 期刊：乌拉圭反洗钱法分析: 刑法
(57, 3),        -- 文书：秘鲁学生权利保护指南: 民法
(58, 5),        -- 案例：委内瑞拉能源分配争议: 环境
(59, 1),        -- 期刊：巴拉圭农业法发展报告: 商务
(60, 3);        -- 文书：厄瓜多尔移民居留指南: 民法

-- 创建法律与应用案例关联表
CREATE TABLE law_application_relation (
    law_id INTEGER,
    application_id INTEGER,
    FOREIGN KEY(law_id) REFERENCES laws(id),
    FOREIGN KEY(application_id) REFERENCES law_applications(id)
);

-- 插入法律与应用案例的关联
INSERT INTO law_application_relation (law_id, application_id) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10),
(11, 11), (12, 12), (13, 13), (14, 14), (15, 15), (16, 16), (17, 17), (18, 18), (19, 19), (20, 20),
(21, 21), (22, 22), (23, 23), (24, 24), (25, 25), (26, 26), (27, 27), (28, 28), (29, 29), (30, 30),
(31, 31), (32, 32), (33, 33), (34, 34), (35, 35), (36, 36), (37, 37), (38, 38), (39, 39), (40, 40),
(41, 41), (42, 42), (43, 43), (44, 44), (45, 45), (46, 46), (47, 47), (48, 48), (49, 49), (50, 50),
(51, 51), (52, 52), (53, 53), (54, 54), (55, 55), (56, 56), (57, 57), (58, 58), (59, 59), (60, 60);

-- 创建法律与标签关联表
CREATE TABLE law_tags (
    law_id INTEGER,
    tag_id INTEGER,
    FOREIGN KEY(law_id) REFERENCES laws(id),
    FOREIGN KEY(tag_id) REFERENCES tags(id)
);

-- 插入法律与标签的关联
INSERT INTO law_tags (law_id, tag_id) VALUES
(1, 1), (1, 11),    -- 巴西环境保护法: 环境保护, 污染
(2, 2), (2, 12),    -- 阿根廷反腐败法: 反腐败, 透明度
(3, 4), (3, 13),    -- 墨西哥劳动法改革法案: 劳动法, 工人权利
(4, 7), (4, 3),     -- 智利宪法修正案: 宪法, 人权
(5, 5), (5, 16),    -- 哥伦比亚税法: 税法, 合规
(6, 6), (6, 17),    -- 乌拉圭知识产权法: 知识产权, 专利
(7, 19), (7, 20),   -- 秘鲁反垄断法: 竞争法, 垄断
(8, 9), (8, 21),    -- 委内瑞拉刑法: 刑事诉讼, 犯罪
(9, 22), (9, 23),   -- 巴拉圭家庭法: 家庭法, 婚姻
(10, 1), (10, 24),  -- 厄瓜多尔环境法: 环境保护, 可持续发展
(11, 1),            -- 玻利维亚水资源管理法: 环境保护
(12, 29),           -- 洪都拉斯公司法: 公司法
(13, 34),           -- 危地马拉土地法: 土地法
(14, 36),           -- 萨尔瓦多教育法: 教育法
(15, 37),           -- 尼加拉瓜健康法: 健康法
(16, 38),           -- 哥斯达黎加能源法: 能源法
(17, 39),           -- 巴拿马矿业法: 矿业法
(18, 40),           -- 多米尼加农业法: 农业法
(19, 41),           -- 海地交通法: 交通法
(20, 42),           -- 古巴旅游法: 旅游法
(21, 43),           -- 波多黎各体育法: 体育法
(22, 44),           -- 牙买加媒体法: 媒体法
(23, 45),           -- 特立尼达和多巴哥网络安全法: 网络安全
(24, 46),           -- 巴巴多斯数据保护法: 数据保护
(25, 47),           -- 圣卢西亚反洗钱法: 反洗钱
(26, 48),           -- 格林纳达反恐法: 反恐
(27, 49),           -- 安提瓜和巴布达军事法: 军事法
(28, 50),           -- 圣文森特和格林纳丁斯国际法: 国际法
(29, 29),           -- 巴西公司法: 公司法
(30, 30),           -- 阿根廷破产法: 破产
(31, 31),           -- 墨西哥证券法: 证券法
(32, 32),           -- 智利金融监管法: 金融监管
(33, 33),           -- 哥伦比亚消费者保护法: 消费者保护
(34, 34),           -- 乌拉圭土地法: 土地法
(35, 35),           -- 秘鲁移民法: 移民法
(36, 36),           -- 委内瑞拉教育法: 教育法
(37, 37),           -- 巴拉圭健康法: 健康法
(38, 38),           -- 厄瓜多尔能源法: 能源法
(39, 39),           -- 玻利维亚矿业法: 矿业法
(40, 40),           -- 洪都拉斯农业法: 农业法
(41, 41),           -- 危地马拉交通法: 交通法
(42, 42),           -- 萨尔瓦多旅游法: 旅游法
(43, 43),           -- 尼加拉瓜体育法: 体育法
(44, 44),           -- 哥斯达黎加媒体法: 媒体法
(45, 45),           -- 巴拿马网络安全法: 网络安全
(46, 46),           -- 多米尼加数据保护法: 数据保护
(47, 47),           -- 海地反洗钱法: 反洗钱
(48, 48),           -- 古巴反恐法: 反恐
(49, 49),           -- 波多黎各军事法: 军事法
(50, 50),           -- 牙买加国际法: 国际法
(51, 5),            -- 巴西税法改革: 税法
(52, 4),            -- 阿根廷劳动法: 劳动法
(53, 1),            -- 墨西哥环境法: 环境保护
(54, 34),           -- 智利土地法: 土地法
(55, 29),           -- 哥伦比亚公司法: 公司法
(56, 47),           -- 乌拉圭反洗钱法: 反洗钱
(57, 36),           -- 秘鲁教育法: 教育法
(58, 38),           -- 委内瑞拉能源法: 能源法
(59, 40),           -- 巴拉圭农业法: 农业法
(60, 35);           -- 厄瓜多尔移民法: 移民法

-- 创建应用案例与标签关联表
CREATE TABLE application_tags (
    application_id INTEGER,
    tag_id INTEGER,
    FOREIGN KEY(application_id) REFERENCES law_applications(id),
    FOREIGN KEY(tag_id) REFERENCES tags(id)
);

-- 插入应用案例与标签的关联
INSERT INTO application_tags (application_id, tag_id) VALUES
(1, 1), (1, 14),    -- 案例：巴西森林砍伐诉讼: 环境保护, 森林砍伐
(2, 2), (2, 25),    -- 期刊：阿根廷反腐败法成效分析: 反腐败, 法律改革
(3, 4), (3, 26),    -- 文书：墨西哥劳动合同模板: 劳动法, 合同
(4, 7), (4, 15),    -- 案例：智利土著土地权纠纷: 宪法, 土著权利
(5, 5), (5, 27),    -- 期刊：哥伦比亚税法比较研究: 税法, 国际比较
(6, 6), (6, 17),    -- 文书：乌拉圭专利申请指南: 知识产权, 专利
(7, 19), (7, 20),   -- 案例：秘鲁市场垄断诉讼: 竞争法, 垄断
(8, 9), (8, 25),    -- 期刊：委内瑞拉刑法改革探讨: 刑事诉讼, 法律改革
(9, 22), (9, 28),   -- 文书：巴拉圭离婚协议模板: 家庭法, 离婚
(10, 1), (10, 11),  -- 案例：厄瓜多尔环境污染诉讼: 环境保护, 污染
(11, 1),            -- 期刊：玻利维亚水资源管理法报告: 环境保护
(12, 29),           -- 文书：洪都拉斯公司注册指南: 公司法
(13, 34),           -- 案例：危地马拉土地所有权纠纷: 土地法
(14, 36), (14, 25), -- 期刊：萨尔瓦多教育法改革建议: 教育法, 法律改革
(15, 37),           -- 文书：尼加拉瓜医疗服务协议: 健康法
(16, 38),           -- 案例：哥斯达黎加能源政策诉讼: 能源法
(17, 39),           -- 期刊：巴拿马矿业法环境评估: 矿业法
(18, 40),           -- 文书：多米尼加农业用地租赁合同: 农业法
(19, 41),           -- 案例：海地交通事故责任认定: 交通法
(20, 42),           -- 期刊：古巴旅游业发展分析: 旅游法
(21, 43),           -- 文书：波多黎各体育赛事指南: 体育法
(22, 44),           -- 案例：牙买加媒体自由诉讼: 媒体法
(23, 45),           -- 期刊：特立尼达网络安全法报告: 网络安全
(24, 46),           -- 文书：巴巴多斯数据保护手册: 数据保护
(25, 47),           -- 案例：圣卢西亚反洗钱调查: 反洗钱
(26, 48),           -- 期刊：格林纳达反恐法合作分析: 反恐
(27, 49),           -- 文书：安提瓜军事纪律手册: 军事法
(28, 50),           -- 案例：圣文森特国际法适用: 国际法
(29, 29), (29, 25), -- 期刊：巴西公司法改革建议: 公司法, 法律改革
(30, 30),           -- 文书：阿根廷破产申请指南: 破产
(31, 31),           -- 案例：墨西哥证券交易纠纷: 证券法
(32, 32),           -- 期刊：智利金融监管法报告: 金融监管
(33, 33),           -- 文书：哥伦比亚消费者保护手册: 消费者保护
(34, 34),           -- 案例：乌拉圭土地转让纠纷: 土地法
(35, 35), (35, 25), -- 期刊：秘鲁移民法改革建议: 移民法, 法律改革
(36, 36),           -- 文书：委内瑞拉教育机构注册指南: 教育法
(37, 37),           -- 案例：巴拉圭医疗事故认定: 健康法
(38, 38),           -- 期刊：厄瓜多尔能源法评估: 能源法
(39, 39),           -- 文书：玻利维亚矿业许可证指南: 矿业法
(40, 40),           -- 案例：洪都拉斯农业用地纠纷: 农业法
(41, 41), (41, 25), -- 期刊：危地马拉交通法建议: 交通法, 法律改革
(42, 42),           -- 文书：萨尔瓦多旅游业许可证指南: 旅游法
(43, 43),           -- 案例：尼加拉瓜体育赛事纠纷: 体育法
(44, 44),           -- 期刊：哥斯达黎加媒体法分析: 媒体法
(45, 45),           -- 文书：巴拿马网络安全手册: 网络安全
(46, 46),           -- 案例：多米尼加数据保护诉讼: 数据保护
(47, 47),           -- 期刊：海地反洗钱法报告: 反洗钱
(48, 48),           -- 文书：古巴反恐措施指南: 反恐
(49, 49),           -- 案例：波多黎各军事纪律处罚: 军事法
(50, 50),           -- 期刊：牙买加国际法适用分析: 国际法
(51, 5),            -- 文书：巴西税务申报指南: 税法
(52, 4),            -- 案例：阿根廷劳动合同纠纷: 劳动法
(53, 1),            -- 期刊：墨西哥环境法实施报告: 环境保护
(54, 34),           -- 文书：智利土地使用协议模板: 土地法
(55, 29),           -- 案例：哥伦比亚公司设立纠纷: 公司法
(56, 47),           -- 期刊：乌拉圭反洗钱法分析: 反洗钱
(57, 36),           -- 文书：秘鲁学生权利保护指南: 教育法
(58, 38),           -- 案例：委内瑞拉能源分配争议: 能源法
(59, 40),           -- 期刊：巴拉圭农业法发展报告: 农业法
(60, 35);           -- 文书：厄瓜多尔移民居留指南: 移民法

-- 创建搜索历史表
CREATE TABLE search_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    query TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);