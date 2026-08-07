// 地域基因 · 时代纹理 · 灵魂初胚
const GEO_PROFILES = {
  jiangnan: {
    label: '江南水乡',
    sky: '灰绸般的云低低压着屋檐，雨丝斜织',
    smell: '青石板缝里渗出的潮气，混着桂花与河腥',
    vista: '河埠头泊着乌篷船，白墙黛瓦一路铺到水尽头',
    rain: '梅雨',
    wind: '穿堂河风',
    season: '春有杏花雨，秋有桂子香'
  },
  coast: {
    label: '滨海渔村',
    sky: '极高极蓝的天，海鸥在天线上排成一列',
    smell: '咸腥海风混着晒鱼干的焦香',
    vista: '海平线从屋檐后升起，渔船的桅杆在雾里起落',
    rain: '台风季的暴雨',
    wind: '常年不断的海风',
    season: '夏有台风过境，冬有凛冽的盐风'
  },
  mountain: {
    label: '山城溪谷',
    sky: '被山脊切成长条的天空，雾气从谷底爬上来',
    smell: '雨后泥土与竹叶的清苦气息',
    vista: '青黛远山叠着远山，石板台阶通向云雾深处',
    rain: '山间的急雨',
    wind: '松涛与穿谷风',
    season: '山樱早春，雾凇隆冬'
  },
  plain: {
    label: '北方平原',
    sky: '辽阔坦荡，云朵在麦田上空拖出长影',
    smell: '晒谷场上新麦与泥土的干燥气味',
    vista: '白杨夹道，麦浪一直滚到天地相接处',
    rain: '夏日的雷阵雨',
    wind: '卷着黄土的北风',
    season: '春有风沙，秋有金浪'
  },
  northeast: {
    label: '东北雪原',
    sky: '冬天清晨发青发白，呵气成霜',
    smell: '炉膛与烤土豆的焦香，混着雪的味道',
    vista: '白桦林立在雪里，烟囱的白烟直直地升上去',
    rain: '夏天的急雨',
    wind: '刮骨的白毛风',
    season: '一年有一半是冬天'
  },
  northwest: {
    label: '西北大漠',
    sky: '极高极净，晚霞烧透半边天',
    smell: '干土、骆驼刺与远处沙尘的气息',
    vista: '戈壁在天边起伏，胡杨在风口弯成岁月的形状',
    rain: '难得一见的急雨',
    wind: '裹着沙粒的风',
    season: '昼夜如两季'
  },
  south: {
    label: '岭南湿热',
    sky: '低而闷，云层厚得仿佛能拧出水',
    smell: '榕树气根、潮湿水泥与早茶蒸笼的气味',
    vista: '骑楼连成片，凤凰木开得满街通红',
    rain: '说来就来的骤雨',
    wind: '带着海气的热风',
    season: '四季常绿，夏天漫长得没有尽头'
  },
  metropolis: {
    label: '大都会',
    sky: '被楼群切成的窄条天空，黄昏时霓虹先亮起来',
    smell: '柏油、尾气与路边小吃摊的油香',
    vista: '高架桥盘成银灰色的结，灯光在夜里汇成河',
    rain: '下在霓虹里的雨',
    wind: '楼宇间的穿堂风',
    season: '梧桐落叶与空调外机的嗡鸣'
  },
  town: {
    label: '寻常城镇',
    sky: '不高不低，四季分明',
    smell: '煤炉、豆浆与街角修车铺的机油味',
    vista: '一条主街走到头就是田野，广播在午后准时响起',
    rain: '缠缠绵绵的连阴雨',
    wind: '四季各管各的风',
    season: '春联与麦收，一年两回大热闹'
  }
};

const GEO_RULES = [
  ['江南水乡', ['苏州','绍兴','杭州','无锡','嘉兴','宁波','乌镇','周庄','湖州','扬州','南京','上海','镇江','南通'], 'jiangnan'],
  ['滨海渔村', ['青岛','厦门','大连','烟台','威海','舟山','三亚','海口','汕头','连云港','泉州','湛江'], 'coast'],
  ['山城溪谷', ['重庆','成都','昆明','贵阳','桂林','丽江','大理','遵义','宜宾','泸州','恩施','宜昌','十堰','都江堰'], 'mountain'],
  ['北方平原', ['北京','天津','济南','郑州','石家庄','保定','邯郸','徐州','阜阳','菏泽','南阳','许昌'], 'plain'],
  ['东北雪原', ['哈尔滨','长春','沈阳','吉林','齐齐哈尔','佳木斯','大庆','鞍山'], 'northeast'],
  ['西北大漠', ['兰州','西安','乌鲁木齐','银川','西宁','敦煌','嘉峪关','喀什','延安'], 'northwest'],
  ['岭南湿热', ['广州','深圳','佛山','东莞','珠海','南宁','福州','泉州','潮州'], 'south'],
  ['大都会', ['上海','北京','广州','深圳','香港'], 'metropolis'],
  ['寻常城镇', [], 'town']
];

function detectGeo(place) {
  const p = place || '';
  for (const [label, cities, key] of GEO_RULES) {
    if (!cities.length) continue;
    if (cities.some(c => p.includes(c))) return { key, label, profile: GEO_PROFILES[key] };
  }
  // 关键字兜底
  if (/海|岛|渔|港/.test(p)) return { key: 'coast', label: '滨海渔村', profile: GEO_PROFILES.coast };
  if (/山|川|峡|谷|岭|云贵|渝/.test(p)) return { key: 'mountain', label: '山城溪谷', profile: GEO_PROFILES.mountain };
  if (/江|湖|河|桥|塘/.test(p)) return { key: 'jiangnan', label: '江南水乡', profile: GEO_PROFILES.jiangnan };
  if (/雪|寒|松花/.test(p)) return { key: 'northeast', label: '东北雪原', profile: GEO_PROFILES.northeast };
  if (/沙|漠|戈壁|疆/.test(p)) return { key: 'northwest', label: '西北大漠', profile: GEO_PROFILES.northwest };
  if (/广州|深圳|南|热带/.test(p)) return { key: 'south', label: '岭南湿热', profile: GEO_PROFILES.south };
  return { key: 'town', label: '寻常城镇', profile: GEO_PROFILES.town };
}

// 时代标签：出生年份决定一生面对的时代洪流
function eraTags(birthYear) {
  const tags = [];
  if (birthYear <= 1945) tags.push('war');
  if (birthYear >= 1949 && birthYear <= 1962) tags.push('collective');
  if (birthYear >= 1952 && birthYear <= 1970) tags.push('crYouth');
  if (birthYear >= 1960 && birthYear <= 1976) tags.push('crTeen');
  if (birthYear >= 1963 && birthYear <= 1978) tags.push('gaokao78');
  if (birthYear >= 1970 && birthYear <= 1984) tags.push('gaige');
  if (birthYear >= 1974 && birthYear <= 1988) tags.push('xiahai');
  if (birthYear >= 1976 && birthYear <= 1990) tags.push('xiagang');
  if (birthYear >= 1980 && birthYear <= 1992) tags.push('college');
  if (birthYear >= 1982 && birthYear <= 1995) tags.push('internet');
  if (birthYear >= 1986 && birthYear <= 1998) tags.push('house');
  if (birthYear >= 1988 && birthYear <= 2002) tags.push('mobile');
  if (birthYear >= 1992 && birthYear <= 2006) tags.push('pandemic');
  if (birthYear >= 1996) tags.push('digital');
  if (birthYear >= 2002) tags.push('ai');
  return tags;
}

// 灵魂初胚（容颜底色 × 灵魂质地）
const SOUL_ARCHETYPES = [
  {
    id: 'water', title: '静水深流',
    appear: '眉眼清浅，肤色沉静，目光里有退潮后的安静。人群里不显眼，却总有人忍不住再看一眼。',
    soul: '内在敏锐而长情，喜怒都不形于色。别人以为你淡，其实你的海面下藏着整座沉船。',
    tags: ['内敛', '敏锐', '长情'],
    effects: { mind: 8, friend: 2, love: 4, health: 2 }
  },
  {
    id: 'bamboo', title: '风过疏竹',
    appear: '身形清瘦，笑纹先于笑意抵达，走路的步子比说话轻。',
    soul: '外热内冷，讲义气却不易交付真心。合群是你的礼貌，孤独才是你的归处。',
    tags: ['外向表象', '疏离内核', '重义'],
    effects: { mind: 4, career: 4, friend: 4, love: -2 }
  },
  {
    id: 'blade', title: '霜刃藏匣',
    appear: '五官轮廓分明，天生自带一段距离感，笑的时候也像隔着薄雾。',
    soul: '心气极高，锋芒都收在鞘里。你信命由己，最怕的不是输，而是平庸。',
    tags: ['好胜', '自律', '孤独'],
    effects: { career: 8, mind: 4, love: -3, health: -1 }
  },
  {
    id: 'lamp', title: '暖灯一豆',
    appear: '面圆眼亮，笑起来先弯了眼睛，让人想起冬夜炉边那盏灯。',
    soul: '灵魂宽厚，习惯把最后一口饭留给人。你温暖，也易被索取；你懂得原谅，却未必懂得拒绝。',
    tags: ['宽厚', '共情', '隐忍'],
    effects: { family: 8, friend: 4, career: -2, health: 1 }
  },
  {
    id: 'fire', title: '山间野火',
    appear: '眉骨英气，发丝总有一撮不肯服帖，瞳仁亮得像烧着的柴。',
    soul: '热烈、冲动、不计后果。你爱得用力，恨得干脆，心口的血比旁人的热三度。',
    tags: ['热烈', '冲动', '坦荡'],
    effects: { love: 8, health: 4, mind: -3, wealth: -2 }
  },
  {
    id: 'pine', title: '月下孤松',
    appear: '寡言，常在人群边缘，背影比正脸容易辨认。',
    soul: '耐得住长久的孤独，也习惯把话咽回去。你以为沉默是安全，却不知它在心上积成雪。',
    tags: ['沉默', '坚韧', '慢热'],
    effects: { mind: 10, health: 2, friend: -4, love: -2 }
  },
  {
    id: 'pebble', title: '河底卵石',
    appear: '长相寻常，走在大街上立刻被淹没。但细看，眉宇间有种被水流磨过的圆润与笃定。',
    soul: '坚韧耐磨，不求快，只求不断。你是一块石头，岁月能磨圆你，却磨不没你。',
    tags: ['坚韧', '踏实', '不争'],
    effects: { health: 8, career: 4, mind: 1, love: -1 }
  },
  {
    id: 'startled', title: '纸上惊鸿',
    appear: '眉眼灵动，一颦一笑都带着灵气，站在人群里像画上落下来的墨点。',
    soul: '才气外露，心思七窍玲珑。你容易被人看见，也容易被自己的聪明绊倒。',
    tags: ['才情', '敏感', '多变'],
    effects: { career: 6, mind: 6, health: -4, wealth: 2 }
  }
];

// 时代纹理：根据出生年份与当前年龄给出具体的时代之景
function buildEraTexts(birthYear, age) {
  const y = birthYear + age;
  const t = {};

  t.childhoodWindow =
    y <= 1978 ? '广播里传来国家大事的消息，大人们围在收音机前，表情像在听潮水预报。' :
    y <= 1985 ? '胡同里搬来第一台电视机，晚饭后半个院子的人都聚在屏幕前，《霍元甲》的片头曲一响，连蝉都不叫了。' :
    y <= 1995 ? '街角录像厅的招牌换成了游戏厅，小虎队的歌从磁带里沙沙地响，你第一次知道什么叫「偶像」。' :
    y <= 2005 ? '家里装了电话，后来又有了第一台电脑，上网要先等猫叫三声。QQ 头像在屏幕右下角一闪一闪。' :
    '手机屏幕成了新的窗户，短视频一个接一个滑过去，世界变得又快又亮，也变得越来越远。';

  t.gaokao =
    y < 1977 ? '高考停了多年，读书的前路像雾里的河，谁也说不准能不能过。' :
    y === 1977 || y === 1978 ? '恢复高考的消息像春雷滚过田埂，煤油灯下忽然多了许多熬夜的人影。' :
    y <= 1998 ? '高考是千军万马过独木桥，录取通知书一张薄纸，压着全家人的心跳。' :
    y <= 2015 ? '大学扩招后，桥宽了些，可毕业后的路反而更挤了。' :
    '高考仍是许多家庭六月里最大的一件事，考场外挤满穿旗袍的母亲。';

  t.careerStart =
    y <= 1984 ? '铁饭碗还是最体面的去处，分配工作像发牌，你攥着介绍信，不知道牌面是好是坏。' :
    y <= 1995 ? '「下海」两个字像磁铁，办公室里有人悄悄递来辞呈，也有人攥着铁饭碗不敢松手。' :
    y <= 2005 ? '外企和 IT 成了年轻人嘴里的新词，写字楼里的灯亮到很晚，每个人都觉得自己赶上了好时候。' :
    y <= 2015 ? '互联网公司像雨后春笋，创业、融资、PPT，成了饭桌上最热闹的词。' :
    '算法推着简历在系统里筛选，你投出去的每一份都像扔进大海的漂流瓶。';

  t.storm =
    y === 2008 ? '金融海啸从大洋彼岸卷来，厂里的订单忽然少了，写字楼里有人抱着纸箱走出门。' :
    y === 2020 ? '疫情封城，街上空得能听见风声。口罩、健康码、核酸，成了新的日常。' :
    y <= 1997 ? '国企改制的大潮涌来，有人主动下海，有人被动上岸，铁饭碗碎了一地。' :
    y >= 2016 ? '房价与算法一起疯长，城市的夜晚灯火通明，可每个人心里都有一块没着落的地方。' :
    '时代换了新赛道，老经验正在贬值，新规则还没写完。';

  t.house =
    y <= 1995 ? '单位分房还在排队，一间筒子楼能装下三代人的烟火。' :
    y <= 2008 ? '商品房成了新词，首付是两家老人凑的，贷款像根长长的绳子，把后半生拴在月供上。' :
    '房价成了饭桌上绕不开的话题，有人庆幸上车早，有人望着售楼处的沙盘发呆。';

  return t;
}

window.GeoKit = { GEO_PROFILES, detectGeo, eraTags, buildEraTexts, SOUL_ARCHETYPES };
