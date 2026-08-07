(function () {
  'use strict';

  const KEY = 'renjianjuan_save_v1';
  const META_KEY = 'renjianjuan_meta_v1';
  const ALL_EVENTS = [].concat(EVENTS1, EVENTS2, EVENTS3, EVENTS4, EVENTS5);

  const ARCH_MIRROR = {
    water: '镜子里的人眉眼清浅，目光像一口安静的井。你忽然明白，为什么有人说你「看着冷」——你只是把暖都沉到了水底。',
    bamboo: '镜子里的人瘦了一点，笑纹还挂在眼角。你忽然明白，为什么有人说你「好相处」——因为你把真正的自己，藏在竹林深处。',
    blade: '镜子里的人轮廓分明，眉宇间有藏不住的锐气。你忽然明白，为什么有人说你「有距离感」——因为你在鞘里待得太久了。',
    lamp: '镜子里的人眼睛圆圆的，笑起来先弯了眼。你忽然明白，为什么有人说你「让人安心」——因为你习惯把光留给别人。',
    fire: '镜子里的人瞳仁亮得惊人。你忽然明白，为什么有人说你「有劲」——因为你心里一直烧着一团不肯灭的火。',
    pine: '镜子里的人沉默地看着你，像看一个老熟人。你忽然明白，为什么有人说你「难懂」——因为你的话都在心里长成了年轮。',
    pebble: '镜子里的人普通得让人安心。你忽然明白，为什么有人说你「靠谱」——因为水流了千万年，也没能磨掉你。',
    startled: '镜子里的人眉眼灵动，像纸上刚落下的墨。你忽然明白，为什么有人说你「有灵气」——因为你天生比别人多一窍，也多一分累。'
  };

  const ACHIEVEMENTS = [
    { id: 'born', name: '第一声啼哭', desc: '人生始于一声啼哭。', cond: () => true },
    { id: 'honest', name: '不碎的瓷', desc: '承认打碎的碗，也承认打碎的自己。', cond: () => st.flags.includes('honestBowl') },
    { id: 'boat', name: '纸船', desc: '你把糖给了别人，把纸船放进了水流。', cond: () => st.flags.includes('boatGift') },
    { id: 'moonlight', name: '白月光', desc: '十五岁的黄昏，心动了一次。', cond: () => st.flags.includes('firstLoveActive') },
    { id: 'married', name: '执子之手', desc: '与一个人共度余生。', cond: () => st.flags.includes('married') },
    { id: 'parent', name: '为人父母', desc: '把生命传下去。', cond: () => st.flags.includes('hasChild') },
    { id: 'money', name: '白手起家', desc: '家底与事业都站上了高坡。', cond: () => st.stats.wealth >= 70 && st.stats.career >= 60 },
    { id: 'wave', name: '弄潮儿', desc: '在时代的浪头起跳。', cond: () => st.flags.includes('rodeWave') },
    { id: 'keeper', name: '守桩人', desc: '风暴里抱住自己的锚。', cond: () => st.flags.includes('heldLine') },
    { id: 'health', name: '与身体和解', desc: '红灯亮起时，你选择了刹车。', cond: () => st.flags.includes('quitBadHabits') },
    { id: 'old', name: '活过九旬', desc: '九十年的光阴落进同一个名字。', cond: () => st.age >= 90 },
    { id: 'early', name: '英年早逝', desc: '命运的账单提前到来。', cond: () => !!st.death && st.age <= 55 },
    { id: 'reunion', name: '故人归来', desc: '多年后，你与白月光喝了杯茶。', cond: () => st.flags.includes('metOldLove') },
    { id: 'letters', name: '写信的人', desc: '把说不出口的话，交给纸。', cond: () => st.flags.some(f => ['letterSelf', 'letterMother', 'letterFirstLove'].includes(f)) },
    { id: 'cat', name: '养猫的人', desc: '雨里的一只猫，陪你十二年。', cond: () => st.flags.includes('keptCat') },
    { id: 'grave', name: '碑前和解', desc: '对着墓碑，把欠的话还了。', cond: () => st.flags.some(f => ['talkedToGrave', 'gravePromise', 'talkedToMotherGrave'].includes(f)) },
    { id: 'single', name: '一世独身', desc: '一个人，也走完了长路。', cond: () => !st.flags.includes('married') && st.age >= 60 },
    { id: 'regretless', name: '心无挂碍', desc: '遗憾指数低到尘埃落定。', cond: () => endingScores().regret <= 15 },
    { id: 'rewind', name: '逆命者', desc: '与命运讨价还价过一次。', cond: () => st.flags.includes('rewound') },
    { id: 'critical', name: '临界对话', desc: '在婚姻的暗礁前，你选择了谈。', cond: () => st.flags.includes('criticalTalk') },
    { id: 'wallet', name: '拾金不昧', desc: '地上的钱包，你选了归还。', cond: () => st.flags.includes('returnedWallet') },
    { id: 'broke', name: '决堤之夜', desc: '堤坝学会开闸的那一夜。', cond: () => st.flags.includes('brokeDown') },
    { id: 'cleareyes', name: '识人之明', desc: '洞察≥70。你看得懂笑容背后的算盘。', cond: () => st.stats.discern >= 70 },
    { id: 'cleanheart', name: '问心无愧', desc: '守心≥75。你走过人间，手是干净的。', cond: () => st.stats.integrity >= 75 },
    { id: 'fallen', name: '越过线的人', desc: '守心≤25。有些线，跨过去就没有回头路。', cond: () => st.stats.integrity <= 25 },
    { id: 'stood', name: '挺身而出', desc: '在墙角前，你选择了站在人前面。', cond: () => st.flags.includes('stoodUp') },
    { id: 'hook', name: '没上钩', desc: '你识破了代考、杀猪盘或传销的钩子。', cond: () => st.flags.some(f => ['refusedCheat', 'dodgedTrap', 'wokeFriend'].includes(f)) },
    { id: 'betrayed', name: '被辜负的人', desc: '你直面过情感的背叛，没有假装看不见。', cond: () => st.flags.some(f => ['confrontedTwoBoats', 'confrontedAffair', 'ignoredAffair'].includes(f)) },
    { id: 'whistle', name: '吹哨人', desc: '你举报过骗局、虐待或谣言。', cond: () => st.flags.some(f => ['stoppedScam', 'reportedNursingHome', 'reportedCyber', 'reportedTrap'].includes(f)) }
  ];

  function defaultMeta() {
    return { lives: [], endings: [], achievements: [], wish: null, wishCount: 0, settings: { speed: 'normal', autosave: true } };
  }

  function loadMeta() {
    try {
      const m = JSON.parse(localStorage.getItem(META_KEY) || 'null');
      if (m && m.lives) return m;
    } catch (e) { /* ignore */ }
    return defaultMeta();
  }

  function saveMeta(meta) {
    try { localStorage.setItem(META_KEY, JSON.stringify(meta)); } catch (e) { /* ignore */ }
  }

  let meta = loadMeta();

  const JOBS_FATHER = ['工人', '农民', '教师', '医生', '公务员', '司机', '商贩', '技术员', '军人'];
  const JOBS_MOTHER = ['工人', '农民', '教师', '护士', '裁缝', '售货员', '会计', '家庭主妇'];
  const ECONS = ['拮据', '温饱', '小康', '殷实'];
  const FAMILY_TYPES = ['双亲核心', '三代同堂', '隔代抚养', '重组家庭'];
  const TONES = ['经济压力下的早熟', '冲突裂痕中的敏感', '高期待下的奔跑', '温暖支持中的从容', '复杂人伦中的早慧'];

  const GEO_PRESETS = [
    ['苏州', '江南水乡'], ['绍兴', '江南水乡'], ['青岛', '滨海渔村'], ['厦门', '滨海渔村'],
    ['重庆', '山城溪谷'], ['成都', '山城溪谷'], ['西安', '西北大漠'], ['兰州', '西北大漠'],
    ['哈尔滨', '东北雪原'], ['长春', '东北雪原'], ['北京', '大都会'], ['上海', '大都会'],
    ['广州', '岭南湿热'], ['深圳', '岭南湿热'], ['济南', '北方平原'], ['郑州', '北方平原'],
    ['乌鲁木齐', '西北大漠'], ['昆明', '山城溪谷'], ['长沙', '寻常城镇'], ['海口', '滨海渔村']
  ];

  const $ = (id) => document.getElementById(id);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const chance = (p) => Math.random() < p;

  let st = null;      // 模拟状态（唯一事实来源）
  let currentEv = null;
  let currentChoices = null;
  let customOpen = false;

  // ---------- 状态创建 ----------
  function makeFamily(ch, surname) {
    const fam = {
      father: { name: NameGen.genFullName('男', ch.birth.y - 27, surname), job: ch.fatherJob, alive: true, closeness: 60 },
      mother: { name: NameGen.genFullName('女', ch.birth.y - 25, null, [surname]), job: ch.motherJob, alive: true, closeness: 62 },
      sibling: [],
      bff: null, firstLove: null, spouse: null, child: null, mentor: null, mirror: null
    };
    let sibCount = 0;
    if (ch.familyType === '三代同堂') sibCount = chance(.55) ? 1 : (chance(.5) ? 2 : 0);
    else if (ch.familyType === '重组家庭') sibCount = chance(.5) ? 1 : 0;
    else sibCount = chance(.55) ? 1 : (chance(.5) ? 2 : 0);
    for (let i = 0; i < sibCount; i++) {
      const older = chance(.5);
      const gender = chance(.5) ? '男' : '女';
      fam.sibling.push({
        name: NameGen.genFullName(gender, ch.birth.y + (older ? -3 : 2 + i * 3), surname),
        gender, role: (older ? (gender === '男' ? '哥哥' : '姐姐') : (gender === '男' ? '弟弟' : '妹妹')),
        alive: true, closeness: 55
      });
    }
    return fam;
  }

  function newState(ch, archetypeId, talents, attrPoints) {
    const arch = GeoKit.SOUL_ARCHETYPES.find(a => a.id === archetypeId);
    const econAdj = { '拮据': { wealth: -10, health: -2, mind: 3 }, '温饱': { mind: 1 }, '小康': { wealth: 5, family: 1 }, '殷实': { wealth: 12, family: 2, mind: 1 } }[ch.econ] || {};
    const toneAdj = {
      '经济压力下的早熟': { mind: 5, health: -2, friend: -2 },
      '冲突裂痕中的敏感': { mind: 4, family: -4, love: -2 },
      '高期待下的奔跑': { mind: 4, career: 4, health: -2 },
      '温暖支持中的从容': { family: 6, mind: 2, health: 2 },
      '复杂人伦中的早慧': { mind: 6, friend: 2, family: -2 }
    }[ch.tone] || {};
    const stats = {
      love: 40, friend: 40, family: 55, career: 25, wealth: 35, health: 80, mind: 45,
      mood: 62, luck: 45, discern: 42, integrity: 62
    };
    [econAdj, toneAdj, arch.effects].forEach(m => {
      Object.keys(m).forEach(k => { stats[k] = clamp(stats[k] + m[k], 0, 100); });
    });
    (talents || []).forEach(tid => {
      const t = (window.TalentKit.TALENTS || []).find(x => x.id === tid);
      if (t) Object.keys(t.effects).forEach(k => { stats[k] = clamp(stats[k] + t.effects[k], 0, 100); });
    });
    Object.keys(attrPoints || {}).forEach(k => { stats[k] = clamp(stats[k] + (attrPoints[k] || 0), 0, 100); });
    if (meta && meta.wish && meta.wish.stat) stats[meta.wish.stat] = clamp(stats[meta.wish.stat] + meta.wish.bonus, 0, 100);

    const fam = makeFamily(ch, ch.name[0]);
    const eraTags = GeoKit.eraTags(ch.birth.y);
    const ns = {
      v: 1,
      ch, fam, stats, arch,
      eraTags,
      talents: (talents || []),
      flags: [],
      history: [],
      achievements: [],
      pending: [],
      age: 0,
      year: ch.birth.y,
      used: [],
      pace: 'year',
      phase: 'event',
      rewindStack: [],
      rewindUsed: 0,
      lastBreakdown: -99,
      lifeEnd: computeLifeEnd({ stats, flags: [], ch, eraTags }),
      death: null,
      rngSeed: Math.random()
    };
    if (stats.luck >= 45 && !ns.flags.includes('luckMid')) ns.flags.push('luckMid');
    ns.fam.sibling.forEach((s, i) => { s.key = 'sibling' + i; });
    st = ns;
    return ns;
  }

  function computeLifeEnd(s) {
    let end = 74 + Math.round((s.stats.health - 55) / 9);
    if (s.ch.birth.y >= 1975) end += 3;
    if (s.ch.birth.y >= 1995) end += 2;
    const flagAdj = {
      ignoredHealth: -5, quitBadHabits: 3, balancedJob: 1, stayedFrog: 1,
      grindedJob: -1, strayed: -2, rushed: -1
    };
    Object.keys(flagAdj).forEach(f => { if (s.flags.includes(f)) end += flagAdj[f]; });
    return clamp(end, 66, 98);
  }

  // ---------- 占位符 ----------
  function ensureBff() {
    if (!st.fam.bff) {
      st.fam.bff = { name: NameGen.genFullName(chance(.5) ? '男' : '女', st.ch.birth.y), gender: null, closeness: 50, key: 'bff' };
      st.fam.bff.gender = st.fam.bff.name[0] === st.ch.name[0] ? st.ch.gender : (chance(.5) ? '男' : '女');
    }
    return st.fam.bff;
  }
  function ensureFirstLove() {
    if (!st.fam.firstLove) {
      const gender = st.ch.gender === '男' ? '女' : '男';
      st.fam.firstLove = { name: NameGen.genFullName(gender, st.ch.birth.y), gender, closeness: 55, key: 'firstLove' };
    }
    return st.fam.firstLove;
  }
  function ensureSpouse() {
    if (!st.fam.spouse) {
      const gender = st.ch.gender === '男' ? '女' : '男';
      st.fam.spouse = { name: NameGen.genFullName(gender, st.ch.birth.y), gender, closeness: 60, key: 'spouse' };
    }
    return st.fam.spouse;
  }
  function ensureChild() {
    if (!st.fam.child) {
      const gender = chance(.5) ? '男' : '女';
      st.fam.child = { name: NameGen.genFullName(gender, st.ch.birth.y + 28), gender, closeness: 60, key: 'child' };
    }
    return st.fam.child;
  }
  function ensureMentor() {
    if (!st.fam.mentor) {
      st.fam.mentor = { name: NameGen.genFullName(chance(.5) ? '男' : '女', st.ch.birth.y - 12), gender: null, closeness: 45, key: 'mentor' };
    }
    return st.fam.mentor;
  }
  function ensureMirror() {
    if (!st.fam.mirror) {
      const gender = chance(.5) ? '男' : '女';
      st.fam.mirror = { name: NameGen.genFullName(gender, st.ch.birth.y), gender, closeness: 40, key: 'mirror' };
    }
    return st.fam.mirror;
  }

  function renderText(tpl) {
    const ch = st.ch, fam = st.fam;
    const given = ch.name.length >= 2 ? ch.name.slice(1) : ch.name;
    const sib = fam.sibling[0];
    const love = fam.firstLove;
    const parentAlive = fam.father.alive ? 'father' : (fam.mother.alive ? 'mother' : null);
    const he = ch.gender === '男' ? '他' : '她';
    const his = ch.gender === '男' ? '他的' : '她的';
    const him = ch.gender === '男' ? '他' : '她';
    const geo = GeoKit.GEO_PROFILES[ch.geoKey] || GeoKit.GEO_PROFILES.town;
    const eraTexts = GeoKit.buildEraTexts(ch.birth.y, st.age);
    const map = {
      'name': ch.name, 'given': given, 'city': ch.city, 'geoLabel': GeoKit.detectGeo(ch.city).label,
      'seasonBirth': ['春天', '夏天', '秋天', '冬天'][Math.floor(((ch.birth.m || 1) - 1) / 3)],
      'geoSky': geo.sky, 'geoSmell': geo.smell, 'geoVista': geo.vista, 'geoRain': geo.rain, 'geoWind': geo.wind, 'geoSeason': geo.season,
      'father': fam.father.name, 'mother': fam.mother.name,
      'fatherJob': fam.father.job, 'motherJob': fam.mother.job,
      'sibling': sib ? sib.name : '手足', 'sibRole': sib ? sib.role : '',
      'he': he, 'his': his, 'him': him,
      'parent': parentAlive ? fam[parentAlive].name : fam.father.name,
      'parentWord': parentAlive === 'father' ? '爸' : (parentAlive === 'mother' ? '妈' : ''),
      'archetype:mirror': ARCH_MIRROR[st.arch.id] || ''
    };
    if (tpl.indexOf('{{bff}}') >= 0) map['bff'] = fam.bff ? fam.bff.name : ensureBff().name;
    if (tpl.indexOf('{{firstLove}}') >= 0 || tpl.indexOf('{{loveName}}') >= 0) {
      map['firstLove'] = love ? love.name : ensureFirstLove().name;
      map['loveName'] = love ? love.name : ensureFirstLove().name;
    }
    if (tpl.indexOf('{{spouse}}') >= 0) {
      map['spouse'] = fam.spouse ? fam.spouse.name : (st.flags.includes('lovePartner') && fam.firstLove ? fam.firstLove.name : '那个人');
    }
    if (tpl.indexOf('{{child}}') >= 0) map['child'] = fam.child ? fam.child.name : '孩子';
    if (tpl.indexOf('{{mentor}}') >= 0) map['mentor'] = fam.mentor ? fam.mentor.name : ensureMentor().name;
    if (tpl.indexOf('{{mirror}}') >= 0) map['mirror'] = fam.mirror ? fam.mirror.name : ensureMirror().name;
    Object.keys(eraTexts).forEach(k => { map['era:' + k] = eraTexts[k]; });
    let out = String(tpl);
    Object.keys(map).forEach(k => {
      out = out.split('{{' + k + '}}').join(map[k]);
    });
    return out;
  }

  // ---------- 事件推演 ----------
  function eligible(ev) {
    if (st.used.includes(ev.id)) return false;
    if (ev.terminal) return false;
    if (ev.minAge > st.age || ev.maxAge < st.age) return false;
    if (ev.need && !ev.need.every(f => st.flags.includes(f))) return false;
    if (ev.block && ev.block.some(f => st.flags.includes(f))) return false;
    if (ev.era && !ev.era.every(t => st.eraTags.includes(t))) return false;
    if (ev.onlyIf && !ev.onlyIf(st)) return false;
    return true;
  }

  function choiceVisible(choice) {
    if (choice.need && !choice.need.every(f => st.flags.includes(f))) return false;
    if (choice.needState && !choice.needState(st)) return false;
    if (choice.needStats) {
      for (const k in choice.needStats) {
        if ((st.stats[k] || 0) < choice.needStats[k]) return false;
      }
    }
    if (choice.needTalent && !choice.needTalent.every(t => st.talents.includes(t))) return false;
    return true;
  }

  function pickEvent() {
    const cands = ALL_EVENTS.filter(eligible);
    if (!cands.length) return null;
    cands.sort((a, b) => (a.minAge - b.minAge) || (b.weight - a.weight));
    const pool = cands.filter(c => c.minAge <= st.age);
    const list = pool.length ? pool : cands;
    const total = list.reduce((s, e) => s + Math.max(1, e.weight || 1), 0);
    let r = Math.random() * total;
    for (const e of list) {
      r -= Math.max(1, e.weight || 1);
      if (r <= 0) return e;
    }
    return list[list.length - 1];
  }

  function paceForAge() {
    if (st.pace === 'day' || st.pace === 'month') return 1;
    return st.age <= 18 ? 1 : 2;
  }

  function interludeBody() {
    const from = st.age;
    const to = Math.min(st.age + paceForAge(), st.lifeEnd);
    const y = st.ch.birth.y + st.age;
    const geo = GeoKit.GEO_PROFILES[st.ch.geoKey] || GeoKit.GEO_PROFILES.town;
    const parts = [];
    parts.push('岁月如流。' + from + '岁到' + to + '岁，' + (y + '年') + '，' + geo.season + '。');
    if (st.flags.includes('grindedJob')) parts.push('你的日子被工作填得满满的，回家的路灯有时比你还疲惫。');
    else if (st.stats.health < 45) parts.push('身体的旧账开始翻页，你学会了在人群中放慢脚步。');
    else if (st.stats.career > 70) parts.push('事业像涨起来的河，推着你往前走，你偶尔回头看岸上的灯火。');
    else if (st.stats.family > 70) parts.push('日子平淡而绵长，灶台上的烟火气，是这一程最稳的锚。');
    else parts.push('日子不紧不慢地过，像{{geoWind}}穿过巷子，你学会了与沉默相处。'.replace('{{geoWind}}', geo.wind));
    if (st.stats.mood < 35) parts.push('心里那盏灯忽明忽暗，你开始数得清自己有多少个没睡好的夜晚。');
    else if (st.stats.mood > 75) parts.push('心头的云薄了，你走路时偶尔会哼起一段很久没唱的歌。');
    if (st.stats.luck > 65) parts.push('这些年的运气像顺风的帆，总在要紧处轻轻推你一把。');
    else if (st.stats.luck < 30) parts.push('风总是逆着你吹。你没有怨天，只是学会了多备一把伞。');
    if (st.stats.integrity < 35) parts.push('你偶尔照镜子，会想：那个从前的自己，还认得现在的我吗？');
    else if (st.stats.integrity > 75) parts.push('你睡得越来越踏实——那些弯弯绕绕的事，终究没能把你的心绕进去。');
    if (st.stats.discern > 70) parts.push('这些年你看人的眼光越来越毒，笑脸背后的算盘，你一眼就能数清。');
    parts.push('这些年间，你的名字在别人的嘴里出现过，又被日子慢慢冲淡。没有大事发生——可人生的大多数，本来就不是大事。');
    return parts;
  }

  function nextStep() {
    // 到期事件
    const due = st.pending.filter(p => p.atAge <= st.age);
    if (due.length) {
      st.pending = st.pending.filter(p => p.atAge > st.age);
      const ev = ALL_EVENTS.find(e => e.id === due[0].eventId);
      if (ev && !st.used.includes(ev.id)) { runEvent(ev); return; }
    }
    // 终局判定
    if (st.age >= st.lifeEnd || st.stats.health <= 5) {
      runDeath();
      return;
    }
    // 决堤：心境跌破临界，情绪强制在场
    if (st.stats.mood <= 25 && st.age - st.lastBreakdown >= 10) {
      const ev = ALL_EVENTS.find(e => e.id === 'breakdown');
      if (ev) { runEvent(ev); return; }
    }
    // 常规事件
    const ev = pickEvent();
    if (ev) { runEvent(ev); return; }
    // 日常事件（偶尔）
    const daily = ALL_EVENTS.filter(e => e.weight > 0 && e.weight < 60 && eligible(e));
    if (daily.length && chance(.45)) {
      runEvent(pick(daily));
      return;
    }
    // 岁月插叙
    const oldAge = st.age;
    st.age = Math.min(st.age + paceForAge(), st.lifeEnd);
    // 心境与气运的缓慢漂移
    let moodShift = Math.floor(Math.random() * 8) - 3;
    if (st.stats.career > 75) moodShift -= 1;
    if (st.stats.family > 70) moodShift += 1;
    if (st.stats.health < 40) moodShift -= 2;
    if (st.flags.includes('balancedJob')) moodShift += 1;
    st.stats.mood = clamp(st.stats.mood + moodShift, 0, 100);
    st.stats.luck = clamp(Math.round(st.stats.luck + (50 - st.stats.luck) * .06), 0, 100);
    const body = interludeBody();
    const title = '岁月如流 · ' + oldAge + '岁到' + st.age + '岁';
    renderInterlude(title, body, oldAge);
  }

  function sceneCount() {
    const n = (currentEv && currentEv.scenes) ? currentEv.scenes.length : 1;
    if (st.pace === 'year') return 1;
    if (st.pace === 'month') return Math.min(2, n);
    return n;
  }

  function runEvent(ev) {
    currentEv = ev;
    currentChoices = null;
    st.phase = 'event';
    st.used.push(ev.id);
    st.flags = st.flags.filter(f => !(ev.removeFlags || []).includes(f));
    renderEvent(ev);
    save();
  }

  function applyChoice(choice) {
    const ev = currentEv;
    Sound.click();
    st.currentEvId = ev.id;
    if (st.rewindStack.length < 3) {
      st.rewindStack.push(JSON.stringify(st));
    }
    currentChoices = null;
    st.phase = 'result';
    // 属性
    Object.keys(choice.effects || {}).forEach(k => {
      if (st.stats[k] !== undefined) st.stats[k] = clamp(st.stats[k] + choice.effects[k], 0, 100);
    });
    // 关系
    Object.keys(choice.rel || {}).forEach(k => {
      const p = st.fam[k];
      if (p) p.closeness = clamp((p.closeness || 50) + choice.rel[k], 0, 100);
    });
    // 烙印
    (choice.flags || []).forEach(f => { if (!st.flags.includes(f)) st.flags.push(f); });
    (choice.removeFlags || []).forEach(f => { st.flags = st.flags.filter(x => x !== f); });
    // 特殊处理
    if (ev.id === 'farewell' || ev.id === 'farewellMother') {
      const target = st.fam.father.alive ? st.fam.father : st.fam.mother;
      const which = st.fam.father.alive ? 'father' : 'mother';
      target.alive = false;
      st.flags.push(which === 'father' ? 'fatherGone' : 'motherGone');
      st.history.push({ age: st.age, year: st.year, title: '送别' + (which === 'father' ? '父亲' : '母亲'), text: choice.text, memory: true });
    }
    if ((choice.flags || []).includes('married') && !st.fam.spouse) {
      if (st.flags.includes('lovePartner') && st.fam.firstLove) {
        st.fam.spouse = { name: st.fam.firstLove.name, gender: st.fam.firstLove.gender, closeness: 72, key: 'spouse' };
      } else {
        ensureSpouse();
      }
    }
    if ((choice.flags || []).includes('hasChild') && !st.fam.child) ensureChild();
    // 延迟后果
    if (choice.later) {
      st.pending.push({ atAge: st.age + choice.later.at, eventId: choice.later.event });
    }
    // 无常：风险坍缩
    if (choice.chance) {
      const effective = Math.max(.02, choice.chance.prob * (1 - (st.stats.luck || 40) / 300));
      if (chance(effective)) {
        st.pending.unshift({ atAge: st.age, eventId: choice.chance.event });
      }
    }
    if (st.stats.luck >= 45 && !st.flags.includes('luckMid')) st.flags.push('luckMid');
    if (ev.id === 'breakdown') st.lastBreakdown = st.age;
    // 记录
    if (ev.id !== 'farewell' && ev.id !== 'farewellMother') {
      const sceneLine = (ev.scenes && ev.scenes[0] && ev.scenes[0].body[0] || '').slice(0, 60);
      st.history.push({ age: st.age, year: st.year, title: ev.title, text: choice.text, memory: !!ev.memory, sceneLine, dark: !!ev.darkTheme });
    }
    // 结果
    const resultEl = $('event-result');
    const after = renderText(choice.after);
    const statNames = { love: '爱情', friend: '友情', family: '亲情', career: '事业', health: '健康', wealth: '家底', mind: '心智', mood: '心境', luck: '气运', discern: '洞察', integrity: '守心' };
    const delta = Object.keys(choice.effects || {})
      .filter(k => choice.effects[k] !== 0)
      .map(k => ({ k, v: choice.effects[k] }))
      .filter(d => st.stats[d.k] !== undefined);
    resultEl.innerHTML =
      '<div class="result-tag">命运回响</div>' +
      '<p>' + after + '</p>' +
      (delta.length ? '<p class="scene-line">' + delta.map(d => '『' + (statNames[d.k] || d.k) + '』' + (d.v > 0 ? '+' : '') + d.v).join(' · ') + '</p>' : '');
    resultEl.classList.remove('hidden');
    $('choices').classList.add('hidden');
    $('custom-row').classList.add('hidden');
    $('continue-row').classList.remove('hidden');
    renderSidebar();
    save();
    // 平行命运
    const parallelP = Math.min(.6, .3 + (st.stats.luck || 40) / 400);
    if (ev.parallel && chance(parallelP) && !st.flags.includes('parallel_' + ev.id)) {
      st.flags.push('parallel_' + ev.id);
      setTimeout(() => showParallel(ev.parallel), 500);
    }
    if (st.stats.health <= 5) {
      $('btn-continue-event').textContent = '走进病房';
    }
    refreshRewind();
    checkAchievements(true);
  }

  function customAnswer(text) {
    const t = text || '';
    const ev = currentEv;
    const cands = (currentChoices || []).filter(c => (c.keywords || []).some(k => t.includes(k)));
    if (cands.length) {
      applyChoice(cands[0]);
      $('event-result').innerHTML =
        '<div class="result-tag">以你之言 · 命运顺着你的心意转弯</div><p>' +
        renderText(cands[0].after) + '</p>';
      return;
    }
    st.stats.mind = clamp(st.stats.mind + 1, 0, 100);
    st.phase = 'result';
    st.history.push({ age: st.age, year: st.year, title: ev.title, text: '自定义作答：' + t, memory: false });
    const r = $('event-result');
    r.innerHTML = '<div class="result-tag">以你之言 · 选项之外的一页</div><p>你以自己的方式回答了这个世界——不在任何一张选项牌里，而在你自己写的那一页上。命运的笔顿了顿，然后顺着你的字迹继续写下去。</p>';
    r.classList.remove('hidden');
    $('choices').classList.add('hidden');
    $('custom-row').classList.add('hidden');
    $('continue-row').classList.remove('hidden');
    renderSidebar();
    save();
    checkAchievements(true);
  }

  // ---------- 终章 ----------
  function runDeath() {
    ['modal-save', 'modal-parallel', 'modal-archive', 'modal-settings'].forEach(id => $(id).classList.add('hidden'));
    st.age = Math.min(st.age, st.lifeEnd);
    st.death = { year: st.ch.birth.y + st.age };
    const title = endingTitle();
    const sc = endingScores();
    meta.lives.push({ name: st.ch.name, year: st.death.year, age: st.age, ending: title, scores: sc, date: new Date().toISOString().slice(0, 10) });
    if (!meta.endings.includes(title)) meta.endings.push(title);
    meta.wish = computeWish();
    meta.wishCount = (meta.wishCount || 0) + 1;
    checkAchievements(false);
    saveMeta(meta);
    save();
    const ev = ALL_EVENTS.find(e => e.id === 'death');
    renderEnding();
  }

  function endingTitle() {
    if (st.age <= 55) return '英年早逝';
    if (st.stats.integrity >= 80 && !st.flags.some(f => ['joinedBully', 'scapegoatedJunior', 'grabbedInheritance'].includes(f))) return '问心无愧';
    if (st.stats.integrity <= 20) return '越过线的人';
    if (st.flags.includes('married') && st.age >= 70) return '白首偕老';
    if (!st.flags.includes('married') && st.age >= 65) return '孤舟独行';
    if (st.flags.includes('rodeWave') && st.stats.career >= 65) return '时代弄潮';
    if (st.stats.career >= 75) return '大器晚成';
    if (st.stats.mind >= 75) return '静水流深';
    if (st.stats.love >= 80 && st.flags.includes('metOldLove')) return '一生所爱';
    if (endingScores().regret <= 20) return '落子无悔';
    if (st.stats.family >= 75) return '灯火可亲';
    return '平凡之路';
  }

  function computeWish() {
    const sc = endingScores();
    if (!st.flags.includes('married')) return { stat: 'love', bonus: 3, name: '未竟之约' };
    if (sc.regret >= 60) return { stat: 'mind', bonus: 3, name: '了却前尘' };
    if (st.stats.wealth < 40) return { stat: 'wealth', bonus: 3, name: '不再拮据' };
    if (st.stats.career < 40) return { stat: 'career', bonus: 3, name: '未走的路' };
    return { stat: 'luck', bonus: 2, name: '此生好运' };
  }

  function checkAchievements(notify) {
    if (!st) return;
    meta.achievements = meta.achievements || [];
    let any = false;
    ACHIEVEMENTS.forEach(a => {
      let hit = false;
      try {
        hit = !!a.cond();
      } catch (e) { /* 结算期部分条件不可用，忽略 */ }
      if (!hit) return;
      st.achievements = st.achievements || [];
      if (!st.achievements.includes(a.id)) st.achievements.push(a.id);
      if (!meta.achievements.includes(a.id)) {
        meta.achievements.push(a.id);
        any = true;
        if (notify) showToast('成就 · ' + a.name, a.desc);
      }
    });
    if (any) saveMeta(meta);
  }

  function showToast(title, desc) {
    const box = $('toasts');
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<div class="t-title">' + title + '</div><div class="t-desc">' + desc + '</div>';
    box.appendChild(el);
    setTimeout(() => {
      el.classList.add('out');
      setTimeout(() => el.remove(), 450);
    }, 3600);
  }

  function endingScores() {
    const s = st.stats;
    const relBonus = Math.round((st.fam.spouse ? st.fam.spouse.closeness : 0) / 40 + (st.fam.bff ? st.fam.bff.closeness : 0) / 40 + (st.fam.sibling[0] ? st.fam.sibling[0].closeness / 40 : 0));
    const loveDensity = clamp(Math.round(s.love * .35 + s.friend * .30 + s.family * .35 + relBonus * 3), 0, 100);
    const selfReal = clamp(Math.round(s.career * .45 + s.wealth * .25 + s.mind * .30 + (s.integrity || 60) * .10) + (st.flags.includes('rodeWave') ? 5 : 0) + (st.flags.includes('wentHighSchool') ? 3 : 0), 0, 100);
    let regret = 0;
    if (!st.flags.includes('married')) regret += 14;
    if (st.flags.includes('friendBroke')) regret += 12;
    if (st.flags.includes('refusedFriend')) regret += 8;
    if (st.flags.includes('silentReef')) regret += 10;
    if (st.flags.includes('strayed')) regret += 10;
    if (st.flags.includes('ignoredHealth')) regret += 8;
    if (st.flags.includes('postponedHome')) regret += 8;
    if (!st.flags.includes('talkedToGrave') && !st.flags.includes('gravePromise') && st.flags.includes('fatherGone')) regret += 10;
    if (st.flags.includes('keptSugar')) regret += 4;
    if ((s.integrity || 60) < 40) regret += 12;
    if (st.flags.some(f => ['confrontedTwoBoats', 'confrontedAffair', 'ignoredAffair'].includes(f))) regret += 6;
    regret = clamp(regret, 0, 100);
    const imprintFlags = ['rodeWave', 'heldLine', 'pivotedStorm', 'betBig', 'wentHighSchool', 'wentVocational', 'wentApprentice', 'college'].filter(f => st.flags.includes(f));
    const eraImprint = clamp(30 + imprintFlags.length * 12 + st.eraTags.length * 2, 0, 100);
    return { loveDensity, selfReal, regret, eraImprint };
  }

  function grade(v, hi, mid) { return v >= hi ? 3 : (v >= mid ? 2 : (v >= 40 ? 1 : 0)); }
  function verdictName(v, t) {
    if (t === 'love') return ['孤帆远影', '温润一生', '深情长卷', '灼热之心'][grade(v, 85, 68)];
    if (t === 'self') return ['岁月留白', '安身立命', '自成气象', '功不唐捐'][grade(v, 85, 68)];
    if (t === 'regret') return ['心无挂碍', '几笔留白', '未竟之约'][v >= 70 ? 2 : (v >= 45 ? 1 : 0)];
    return ['自己的时代', '潮中一叶', '时代的亲历者'][v >= 70 ? 2 : (v >= 45 ? 1 : 0)];
  }

  function buildEndingHTML() {
    const sc = endingScores();
    const montage = st.history.filter(h => h.memory).slice(-7);
    const montageHTML = montage.length
      ? montage.map(h =>
        '<div class="montage-item"><div class="m-age">' + h.age + '岁 · ' + h.year + '年</div>' +
        '<div class="m-title">' + h.title + '</div>' +
        '<div class="m-quote">「' + h.text.slice(0, 42) + '……」</div></div>').join('')
      : '<div class="montage-item"><div class="m-title">人间一场</div></div>';

    // 余烬：谁执悼词
    const rels = [];
    if (st.fam.spouse) rels.push(['爱人 ' + st.fam.spouse.name, st.fam.spouse.closeness]);
    if (st.fam.child) rels.push(['孩子 ' + st.fam.child.name, 68]);
    if (st.fam.bff) rels.push(['挚友 ' + st.fam.bff.name, st.fam.bff.closeness]);
    if (st.fam.sibling[0]) rels.push(['手足 ' + st.fam.sibling[0].name, st.fam.sibling[0].closeness]);
    rels.sort((a, b) => b[1] - a[1]);
    const eulogist = rels.length ? rels[0][0] : '一位故人';
    const eulogy = rels.length
      ? eulogist + '执笔写下悼词，写到一半搁了很久。最后只写了一行：「' + st.ch.name + '，这一生，辛苦了。」'
      : '悼词由一位早已记不清名字的故人执笔，纸上只有一句：「人间来过，足矣。」';

    let flowers = '一束白菊，没有署名，放在碑前，第二天被雨打湿了。';
    if (st.stats.love > 65 && st.flags.includes('metOldLove')) flowers = '一束白菊压着一封信，信里只有一句：「那年秋天，很好。」落款是' + st.fam.firstLove.name + '。';
    else if (st.fam.child) flowers = st.fam.child.name + '带来一束百合，说「这是您最喜欢的花」。其实你从没说过，但他/她记得你总在花摊前多站一会儿。';
    else if (st.stats.friend > 65 && st.fam.bff) flowers = st.fam.bff.name + '带来一束向日葵，放在碑前，像你们年轻时那个夏天。';

    let object = '一本旧笔记本被翻开，扉页上写着：「这一生，别后悔。」';
    if (st.flags.includes('letterSelf')) object = '抽屉最深处那封写给自己的信被' + (st.fam.child ? st.fam.child.name : '家人') + '发现。信纸已经泛黄，最后一行是：「你辛苦了，但这一生，值得。」';
    else if (st.flags.includes('keptCat')) object = '一个旧纸箱里，静静躺着那只猫的项圈。' + (st.fam.child ? st.fam.child.name : '家人') + '把它拿起来看了很久，又轻轻放回去。';
    else if (st.flags.includes('boatGift')) object = '一本旧课本里掉出一只折得很旧的纸船，船底写着一个早已模糊的名字。';

    const ripple = st.history.slice(-3).map(h => h.text).pop() || '那些没说出口的话，留在了风里。';
    return {
      title: '终章 · ' + endingTitle(),
      sub: st.ch.name + ' · ' + st.ch.birth.y + '年—' + st.death.year + '年 · 终年' + st.age + '岁',
      scores: [
        ['情感密度', sc.loveDensity, verdictName(sc.loveDensity, 'love')],
        ['自我实现', sc.selfReal, verdictName(sc.selfReal, 'self')],
        ['遗憾指数', sc.regret, verdictName(sc.regret, 'regret')],
        ['时代印记', sc.eraImprint, verdictName(sc.eraImprint, 'era')]
      ],
      radar: [st.stats.love, st.stats.career, Math.round((st.stats.friend + st.stats.family) / 2), st.stats.health, st.stats.mind],
      achieves: st.achievements || [],
      humanity: {
        darkCount: st.history.filter(h => h.dark).length,
        lastDark: st.history.filter(h => h.dark).slice(-1)[0] || null,
        integrity: Math.round(st.stats.integrity || 60),
        discern: Math.round(st.stats.discern || 42)
      },
      montageHTML,
      eulogy, flowers, object, ripple
    };
  }

  function renderEnding() {
    const d = buildEndingHTML();
    const scoresHTML = d.scores.map(s =>
      '<div class="score-cell"><div class="num">' + s[1] + '</div><div class="name">' + s[0] + '</div><div class="grade">' + s[2] + '</div></div>').join('');
    $('ending-wrap').innerHTML =
      '<div class="ending-title">' + d.title + '</div>' +
      '<div class="ending-sub">' + d.sub + '</div>' +
      '<div class="ending-section"><h3>走马灯 · 一生中的几个刹那</h3>' + d.montageHTML + '</div>' +
      '<div class="ending-section"><h3>命运的结算</h3><div class="score-grid">' + scoresHTML + '</div>' +
      '<div class="radar-wrap"><canvas id="radar" width="560" height="560"></canvas></div></div>' +
      '<div class="ending-section"><h3>这一生的勋章</h3><div class="ending-achieves">' +
      ACHIEVEMENTS.filter(a => d.achieves.includes(a.id)).map(a => '<span class="chip">' + a.name + '</span>').join('') +
      (d.achieves.length ? '' : '<span class="chip">此生尚无勋章</span>') + '</div></div>' +
      '<div class="ending-section"><h3>人性的暗面 · 与你的底线</h3>' +
      '<p>这一生，你撞见过 <b>' + d.humanity.darkCount + ' 次</b>人性的险恶：' +
      (d.humanity.lastDark ? '最暗的一页，是' + d.humanity.lastDark.age + '岁那年——「' + d.humanity.lastDark.title + '」。' : '也或许，命运替你挡在了门外。') + '</p>' +
      '<p>你的洞察是 <b>' + d.humanity.discern + '</b>' + (d.humanity.discern >= 70 ? '——你看得懂笑容背后的算盘，也躲过了许多明枪暗箭。' : d.humanity.discern >= 45 ? '——你偶尔看穿，偶尔看漏，像大多数普通人。' : '——你更愿意相信人，也因此吃过亏。') + '</p>' +
      '<p>你的守心是 <b>' + d.humanity.integrity + '</b>' + (d.humanity.integrity >= 75 ? '——走过人间，手是干净的；那些线，你没有跨。' : d.humanity.integrity >= 45 ? '——你动摇过，也踩过线边，但终究没有走太远。' : '——你越过了几条线。没有回头路，但至少你记得自己在哪一天跨过去的。') + '</p></div>' +
      '<div class="ending-section"><h3>余烬 · 身后事</h3>' +
      '<p><b>悼词：</b>' + d.eulogy + '</p>' +
      '<p><b>最后一束花：</b>' + d.flowers + '</p>' +
      '<p><b>遗留之物：</b>' + d.object + '</p>' +
      '<p><b>话语余波：</b>你最后留在人间的那些话——「' + d.ripple + '」——仍在某个人的余生里，轻轻泛起涟漪。</p></div>' +
      '<div class="restart-row"><button class="btn-ghost" id="btn-end-again">再活一次</button>' +
      '<button class="btn-primary" id="btn-end-rewind">轮回 · 带着遗愿再来</button></div>';
    showScreen('screen-ending');
    drawRadar(d.radar);
    $('btn-end-again').onclick = () => location.reload();
    $('btn-end-rewind').onclick = () => location.reload();
  }

  function drawRadar(values) {
    const cv = $('radar');
    if (!cv || !cv.getContext) return;
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    const cx = W / 2, cy = H / 2, R = Math.min(W, H) * .36;
    const labels = ['爱情', '事业', '亲友', '健康', '心智'];
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(201,168,106,.25)';
    ctx.fillStyle = 'rgba(201,168,106,.08)';
    ctx.lineWidth = 1;
    for (let ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      for (let i = 0; i <= 5; i++) {
        const a = -Math.PI / 2 + i * Math.PI * 2 / 5;
        const x = cx + Math.cos(a) * R * ring / 4;
        const y = cy + Math.sin(a) * R * ring / 4;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + i * Math.PI * 2 / 5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
      ctx.stroke();
    }
    ctx.beginPath();
    for (let i = 0; i <= 5; i++) {
      const a = -Math.PI / 2 + i * Math.PI * 2 / 5;
      const v = values[i % 5] / 100;
      const x = cx + Math.cos(a) * R * v;
      const y = cy + Math.sin(a) * R * v;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(201,168,106,.85)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.font = '15px "Noto Serif SC", "Songti SC", serif';
    ctx.fillStyle = '#e8e2d5';
    ctx.textAlign = 'center';
    labels.forEach((lb, i) => {
      const a = -Math.PI / 2 + i * Math.PI * 2 / 5;
      ctx.fillText(lb, cx + Math.cos(a) * (R + 26), cy + Math.sin(a) * (R + 26) + 5);
    });
  }

  // ---------- 渲染 ----------
  function showScreen(id) {
    ['screen-intro', 'screen-create', 'screen-soul', 'screen-talent', 'screen-main', 'screen-ending'].forEach(s => {
      $(s).classList.toggle('hidden', s !== id);
    });
  }

  function renderEvent(ev) {
    st.year = st.ch.birth.y + st.age;
    const geo = GeoKit.GEO_PROFILES[st.ch.geoKey] || GeoKit.GEO_PROFILES.town;
    $('event-meta').innerHTML =
      '<span>' + st.age + '岁 · ' + st.year + '年</span>' +
      '<span>' + st.ch.city + ' · ' + geo.label + '</span>';
    $('event-title').textContent = ev.title;
    const n = sceneCount();
    const paras = [];
    for (let i = 0; i < n && i < ev.scenes.length; i++) {
      const sc = ev.scenes[i];
      if (sc.time || sc.env) paras.push({ cls: 'scene-line', text: renderText((sc.time || '') + (sc.env ? ' · ' + sc.env : '')) });
      (Array.isArray(sc.body) ? sc.body : [sc.body]).forEach(p => paras.push({ text: renderText(p) }));
    }
    $('event-body').innerHTML = '';
    $('choices').classList.add('hidden');
    $('choices').innerHTML = '';
    $('event-result').classList.add('hidden');
    $('event-result').innerHTML = '';
    $('continue-row').classList.add('hidden');
    $('custom-row').classList.add('hidden');
    $('foot-date').textContent = st.ch.birth.y + '年—' + st.year + '年 · 第' + (st.age + 1) + '年';
    $('foot-flag').textContent = st.flags.length ? '烙印 × ' + st.flags.length : '人生初白';
    showScreen('screen-main');
    renderSidebar();
    window.scrollTo(0, 0);
    playNarration(paras, () => {
      buildChoices(ev);
      if (st.phase !== 'result') $('foot-flag').textContent = '选择将至 · 1~4 键落笔';
    });
  }

  function buildChoices(ev) {
    let choices = ev.choicesFn ? (ev.choicesFn(st) || []) : ev.choices;
    choices = choices.filter(choiceVisible);
    currentChoices = choices;
    const wrap = $('choices');
    wrap.classList.remove('hidden');
    wrap.innerHTML = choices.map((c, i) =>
      '<button class="choice-btn" data-i="' + i + '"><span>' + renderText(c.text) + '</span>' +
      '<span class="risk-tag ' + riskClass(c.risk) + '">' + (c.risk || '平静') + '</span></button>').join('') +
      '<button class="choice-btn" id="btn-custom-open"><span>跳出选项，以我之言作答</span><span class="risk-tag">自定义</span></button>';
    choices.forEach((c, i) => {
      wrap.querySelector('[data-i="' + i + '"]').onclick = () => applyChoice(c);
    });
    $('btn-custom-open').onclick = () => {
      customOpen = !customOpen;
      $('custom-row').classList.toggle('hidden', !customOpen);
    };
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function playNarration(paras, onDone) {
    st.skipText = false;
    const wrap = $('event-body');
    wrap.innerHTML = '';
    let finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      wrap.innerHTML = paras.map(p => '<p' + (p.cls ? ' class="' + p.cls + '"' : '') + '>' + escapeHtml(p.text) + '</p>').join('');
      onDone();
    }
    const hint = document.createElement('div');
    hint.className = 'type-hint';
    hint.textContent = '点击正文可快进';
    wrap.appendChild(hint);
    let i = 0;
    function nextPara() {
      if (st.skipText) { finish(); return; }
      if (i >= paras.length) { setTimeout(finish, 200); return; }
      const p = paras[i++];
      const el = document.createElement('p');
      if (p.cls) el.className = p.cls;
      wrap.appendChild(el);
      typeChars(el, p.text, () => setTimeout(nextPara, 130));
    }
    function typeChars(el, text, done) {
      if (st.skipText) { finish(); return; }
      let n = 0;
      const step = () => {
        if (st.skipText) { finish(); return; }
        n += 2;
        el.textContent = text.slice(0, n);
        el.classList.add('typing');
        if (n < text.length) setTimeout(step, typeSpeedMs());
        else { el.classList.remove('typing'); done(); }
      };
      step();
    }
    nextPara();
  }

  function typeSpeedMs() {
    const sp = (meta && meta.settings && meta.settings.speed) || 'normal';
    return sp === 'slow' ? 30 : sp === 'fast' ? 7 : 14;
  }

  function riskClass(r) {
    if (r === '平静') return 'r-low';
    if (r === '微澜') return 'r-mid';
    return 'r-high';
  }

  function renderInterlude(title, body, fromAge) {
    st.phase = 'interlude';
    st.year = st.ch.birth.y + st.age;
    $('event-meta').innerHTML =
      '<span>' + fromAge + '岁→' + st.age + '岁 · ' + st.year + '年</span>' +
      '<span>' + st.ch.city + '</span>';
    $('event-title').textContent = title;
    $('event-body').innerHTML = '';
    $('choices').classList.add('hidden');
    $('choices').innerHTML = '';
    $('event-result').classList.add('hidden');
    $('event-result').innerHTML = '';
    $('custom-row').classList.add('hidden');
    $('continue-row').classList.add('hidden');
    $('btn-continue-event').textContent = '岁月继续';
    $('foot-date').textContent = st.ch.birth.y + '年—' + st.year + '年';
    $('foot-flag').textContent = '时间如舟';
    showScreen('screen-main');
    renderSidebar();
    window.scrollTo(0, 0);
    playNarration(body.map(p => ({ text: renderText(p) })), () => {
      $('continue-row').classList.remove('hidden');
    });
  }

  function renderSidebar() {
    $('avatar').textContent = st.ch.name[0];
    $('avatar').classList.toggle('aged', st.age >= 55);
    $('avatar').classList.toggle('old', st.age >= 75);
    $('side-name').textContent = st.ch.name + (st.ch.gender === '男' ? ' · 乾' : ' · 坤');
    $('side-age').textContent = st.age + '岁 · ' + st.year + '年 · ' + st.ch.city;
    Object.keys(st.stats).forEach(k => {
      const el = document.querySelector('[data-stat="' + k + '"]');
      if (el) {
        el.style.width = st.stats[k] + '%';
        el.closest('.stat-row').removeAttribute('data-high');
        el.closest('.stat-row').removeAttribute('data-low');
        if (k === 'health' || k === 'wealth' || k === 'mind') {
          if (st.stats[k] >= 70) el.closest('.stat-row').setAttribute('data-high', '1');
          if (st.stats[k] <= 30) el.closest('.stat-row').setAttribute('data-low', '1');
        }
      }
    });
    const fam = st.fam;
    const people = [];
    people.push([fam.father.name + (fam.father.alive ? '' : '（已故）'), fam.father.job, fam.father.closeness]);
    people.push([fam.mother.name + (fam.mother.alive ? '' : '（已故）'), fam.mother.job, fam.mother.closeness]);
    fam.sibling.forEach(s => people.push([s.role + ' ' + s.name, '', s.closeness]));
    if (fam.bff) people.push(['挚友 ' + fam.bff.name, '', fam.bff.closeness]);
    if (fam.firstLove) people.push(['白月光 ' + fam.firstLove.name, '', fam.firstLove.closeness || 50]);
    if (fam.spouse) people.push(['爱人 ' + fam.spouse.name, '', fam.spouse.closeness]);
    if (fam.child) people.push(['孩子 ' + fam.child.name, '', 66]);
    $('side-family').innerHTML = people.map(p =>
      '<div class="person"><span><b>' + p[0] + '</b>' + (p[1] ? '<small> · ' + p[1] + '</small>' : '') + '</span>' +
      '<span class="rel">' + (p[2] >= 80 ? '极深' : p[2] >= 60 ? '深厚' : p[2] >= 40 ? '寻常' : '疏离') + '</span></div>').join('');
    $('side-flags').innerHTML = st.flags.length
      ? st.flags.map(f => '<span class="chip">' + flagName(f) + '</span>').join('')
      : '<span class="chip">命运尚未落印</span>';
    $('side-talents').innerHTML = (st.talents || []).length
      ? st.talents.map(tid => {
          const t = (window.TalentKit.TALENTS || []).find(x => x.id === tid);
          return t ? '<span class="chip" style="color:var(--gold);border-color:rgba(201,168,106,.45);">' + t.name + '</span>' : '';
        }).join('')
      : '<span class="chip">无</span>';
    document.querySelectorAll('.pace-btn').forEach(b => b.classList.toggle('active', b.dataset.pace === st.pace));
    refreshRewind();
  }

  function refreshRewind() {
    const btn = $('btn-rewind');
    if (btn) {
      btn.disabled = !(st && st.rewindStack && st.rewindStack.length && st.phase === 'result');
      btn.textContent = '回溯 · 余' + (st && st.rewindStack ? st.rewindStack.length : 0) + '次';
    }
  }

  function rewind() {
    if (!st.rewindStack || !st.rewindStack.length || st.phase !== 'result') return;
    const stack = st.rewindStack;
    const snap = JSON.parse(st.rewindStack.pop());
    const prevId = st.currentEvId;
    Object.keys(snap).forEach(k => {
      if (k !== 'rewindStack') st[k] = snap[k];
    });
    st.rewindStack = stack;
    st.rewindUsed = (st.rewindUsed || 0) + 1;
    // 既视感诅咒：一段高浓度记忆开始消融
    st.history.pop();
    st.stats.mind = clamp(st.stats.mind - 4, 0, 100);
    st.stats.love = clamp(st.stats.love - 2, 0, 100);
    if (!st.flags.includes('rewound')) st.flags.push('rewound');
    st.phase = 'event';
    const ev = ALL_EVENTS.find(e => e.id === prevId);
    if (ev) {
      currentEv = ev;
      currentChoices = null;
      renderEvent(ev);
    }
    renderSidebar();
    save();
    $('parallel-text').innerHTML =
      '你撕开时间的纸页，退回到抉择之前。代价已经扣下：一段高浓度的情感记忆正在消融，你隐约觉得「这一幕好像经历过」，却说不清在哪一世。' +
      '而命运轻微偏转——某个与你相关的人，将走上与原本略有不同的路。';
    $('modal-parallel').classList.remove('hidden');
  }

  function flagName(f) {
    const map = {
      learnedShare: '学会分享', keptSugar: '独享之甜', honestBowl: '坦诚', liedBowl: '第一个谎', silentBowl: '沉默之答',
      firstLoveActive: '白月光', lovePartner: '执手之人', married: '已婚', hasChild: '为人父母',
      wentHighSchool: '读书人', wentVocational: '早慧者', wentApprentice: '手艺身',
      rodeWave: '弄潮儿', heldLine: '守桩人', friendBroke: '裂痕', friendReunited: '故友重逢',
      talkedToGrave: '碑前之言', gravePromise: '来世之约', keptCat: '养过一只猫', fedCat: '喂过一只猫',
      quitBadHabits: '与身体和解', ignoredHealth: '欠身体的债', criticalTalk: '临界对话', strayed: '越线',
      letterMother: '家书', letterFirstLove: '秋天的信', letterSelf: '与己和解', metOldLove: '故人归来'
      , returnedWallet: '拾金不昧', keptWallet: '不义之财', rainShared: '伞下的同行', brokeDown: '决堤之夜',
      wroteItOut: '写出来的人', calledSomeone: '深夜的电话', enduredAlone: '独自天亮',
      fleaBought: '旧物的眼光', keptOldPhoto: '留住了自己', wroteDream: '记梦人',
      gaokaoEidetic: '过目不忘', instinctJob: '第六感', coolPromotion: '冷静裁决', toughHealth: '铁打的身板',
      luckMid: '气运渐起', rewound: '逆命者', talkedToMotherGrave: '坟前桂花', boatGift: '纸船',
      wentHomeOften: '常回家', postponedHome: '改天再说', stayedWithParents: '多住几日', caredParents: '接来同住',
      gavePromotion: '让贤', foughtPromotion: '力争', coolPromotion: '冷静裁决', brokeMarriage: '未许之约',
      keptWatch: '守夜人', hiredCare: '量力而行', retiredHome: '含饴弄孙', retiredStudy: '老来学艺',
      tookBlame: '代人受过', toldOnFriend: '指认', plantedBack: '塞回原位', stoodUp: '挺身而出', lookedAway: '绕行', joinedBully: '墙角那边',
      refusedCheat: '没上钩', cheatedForMoney: '代考者', confrontedTwoBoats: '直面两条船', quietlyLeftLove: '安静离场', revengeFlirt: '以牙还牙',
      chasedDebt: '当面算账', forgaveDebt: '一笔勾销', publicShamed: '当众讨债', tookBlameWork: '职场扛锅', evidenceFight: '证据说话', scapegoatedJunior: '甩锅',
      threeWayTalk: '三方摊牌', cooledTriangle: '放凉', publicShamedTriangle: '放风声', dodgedTrap: '识破蜜糖', fellForTrap: '蜜糖之伤', ignoredTrap: '不理',
      stoppedScam: '救回母亲', letScamGo: '由她去吧', confrontedScammer: '找骗子理论', settledRelativeDebt: '饭桌算账', letRelativeDebtGo: '忍下', shamedRelative: '当众揭短',
      confrontedRumor: '直面谣言', silencedRumor: '任其自烂', counterRumor: '以谣制谣', confrontedAffair: '直面实锤', ignoredAffair: '假装不知', exposedAffair: '公之于众',
      cutChildOff: '爱有牙齿', gaveChildAgain: '最后一次', iouChild: '借条之绳', reportedNursingHome: '吹哨人', movedNursingHome: '换一家', hiredRevenge: '以暴制暴',
      gaveInheritance: '让产', lawInheritance: '依法而分', grabbedInheritance: '先下手', wokeFriend: '叫醒老友', leftPyramid: '离席', joinedPyramid: '入局',
      reportedCyber: '网络自证', silencedCyber: '关掉评论', counterCyber: '以牙还牙', refusedHypocrite: '看穿哭者', exposedHypocrite: '当众拆穿', trustedHypocrite: '交出了钥匙',
      admittedCheat: '全部承认', liedThrough: '咬死不认', answeredDebt: '回了那封信', burnedDebt: '烧了信', reportedTrap: '报警止损', hidTrap: '删掉痕迹'
      , bornLoud: '哭声嘹亮', bornQuiet: '静水深眠', clungFather: '抓住父亲', heldTears: '拥抱眼泪', pretendedTears: '假装没看见', askedTears: '你怎么了',
      firstAnswer: '第一声报到', quietAnswer: '小声应答', observeFirst: '先看再答', earlyListener: '旁听大人', earlyRunner: '窗外的人',
      noteYes: '纸条的回音', bffSeed: '朋友之种', noteSilent: '未回的字条', noteTeased: '哄堂大笑', sawFatherHand: '看见茧', askedFatherTired: '爸，你累吗', shadowWalk: '踩着影子',
      keptSecret: '守口如瓶', toldSecret: '泄了底的秘密', feignedSleep: '装睡', selfAccepted: '与镜中人和解', selfShy: '躲开镜子', selfPromise: '了不起的约定',
      wroteHome: '报平安', sawCityLights: '万家灯火', sleptEarly: '蒙头大睡', loveSecretHeard: '听她说', loveSecretShared: '交换软肋', loveJoked: '玩笑岔开',
      observedOffice: '看透办公室', hedgedWave: '两边观望', tightenedBelt: '勒紧腰带', learnedNewSkill: '留后路', askedParentsMove: '接来同住', sentMoneyHome: '只寄钱',
      halfQuit: '半戒', postponedMarriage: '再等等', loveArranged: '相亲结缘', singleChoice: '宁缺毋滥', retiredAdvising: '退而不休',
      refusedOldLove: '守住十五岁', loveTransparent: '坦荡赴约', refusedFriend: '婉拒', lentFriend: '雪中送炭', halfLentFriend: '一半的信任'
    };
    return map[f] || f;
  }

  // ---------- 向导 ----------
  let wizard = { step: 1, gender: null, name: '', geo: null, fatherJob: null, motherJob: null, econ: null, familyType: null, tone: null, archetype: null };

  function initWizard() {
    const ySel = $('sel-year');
    if (!ySel.options.length) {
      for (let y = 1935; y <= 2010; y++) ySel.appendChild(new Option(y + '年', y));
      const mSel = $('sel-month');
      for (let m = 1; m <= 12; m++) mSel.appendChild(new Option(m + '月', m));
      const dSel = $('sel-day');
      for (let d = 1; d <= 31; d++) dSel.appendChild(new Option(d + '日', d));
      ySel.value = '1988';
      mSel.value = '5';
      dSel.value = '15';
    }
    ySel.onchange = updateDateHint;
    updateDateHint();
    // 地域预设
    $('geo-grid').innerHTML = GEO_PRESETS.map(g =>
      '<div class="geo-item" data-place="' + g[0] + '">' + g[0] + '<small>' + g[1] + '</small></div>').join('');
    document.querySelectorAll('.geo-item').forEach(el => {
      el.onclick = () => {
        document.querySelectorAll('.geo-item').forEach(x => x.classList.remove('selected'));
        el.classList.add('selected');
        $('inp-place').value = el.dataset.place;
        applyGeo();
      };
    });
    $('btn-geo-ok').onclick = applyGeo;
    // 职业/家底/结构/基调
    buildChips('job-father', JOBS_FATHER, v => wizard.fatherJob = v);
    buildChips('job-mother', JOBS_MOTHER, v => wizard.motherJob = v);
    buildChips('econ', ECONS, v => wizard.econ = v);
    buildChips('family-type', FAMILY_TYPES, v => wizard.familyType = v);
    buildChips('tone', TONES, v => wizard.tone = v);
  }

  function buildChips(id, list, set) {
    $(id).innerHTML = list.map(v => '<span class="chip selectable" data-v="' + v + '">' + v + '</span>').join('');
    $(id).querySelectorAll('.chip').forEach(el => {
      el.onclick = () => {
        $(id).querySelectorAll('.chip').forEach(x => x.classList.remove('selected'));
        el.classList.add('selected');
        set(el.dataset.v);
      };
    });
  }

  function updateDateHint() {
    const y = parseInt($('sel-year').value);
    const tags = GeoKit.eraTags(y);
    let hint = '你将降生于' + y + '年。';
    if (y <= 1945) hint += '战火尚未完全熄灭，你的第一声啼哭，落在百废待兴的国度。';
    else if (y <= 1958) hint += '集体化的号角正在吹响，你童年的天空下，广播声此起彼伏。';
    else if (y <= 1968) hint += '一个剧烈变动的年代。你的书桌旁，大人们压低声音说话。';
    else if (y <= 1978) hint += '你将见证改革开放的第一缕光。时代的门，正在你面前缓缓打开。';
    else if (y <= 1988) hint += '你与电视机、录像厅和磁带一起长大，城市的天际线开始长高。';
    else if (y <= 1998) hint += '互联网的潮水即将漫过堤岸。你的青春里，QQ 头像闪烁，世界开始联网。';
    else if (y <= 2006) hint += '你出生在移动互联的黎明。手指滑动，成了你这一代人的本能。';
    else hint += '你与短视频和人工智能一起长大，信息像空气一样无处不在。';
    $('date-hint').textContent = hint;
  }

  function applyGeo() {
    const v = $('inp-place').value.trim();
    if (!v) return;
    const g = GeoKit.detectGeo(v);
    wizard.geo = { city: v, geoKey: g.key };
    $('geo-flavor').classList.remove('hidden');
    $('geo-flavor').textContent = '你的故土是' + g.label + '——' + g.profile.smell + '。';
  }

  function validateStep(n) {
    if (n === 1) {
      if (!wizard.gender) { alert('请先择定性别。'); return false; }
      if (wizard.name.length < 2) { alert('请写下你的姓名（至少两个字）。'); return false; }
    }
    if (n === 2) {
      const y = parseInt($('sel-year').value), m = parseInt($('sel-month').value), d = parseInt($('sel-day').value);
      if (!y || !m || !d) { alert('请选完整年月日。'); return false; }
    }
    if (n === 3) {
      applyGeo();
      if (!wizard.geo) { alert('请选择或写下你的出生地。'); return false; }
    }
    if (n === 4) {
      if (!wizard.fatherJob || !wizard.motherJob || !wizard.econ || !wizard.familyType || !wizard.tone) {
        alert('请完成最初的屋檐的每一项设定。');
        return false;
      }
    }
    return true;
  }

  function goStep(n) {
    if (n > wizard.step && !validateStep(wizard.step)) return;
    wizard.step = n;
    document.querySelectorAll('.wizard-step').forEach(s => s.classList.toggle('hidden', parseInt(s.dataset.step) !== n));
    $('step-now').textContent = n;
    $('btn-prev').classList.toggle('hidden', n === 1);
    $('btn-next').classList.toggle('hidden', n === 4);
    $('btn-submit').classList.toggle('hidden', n !== 4);
  }

  function submitWizard() {
    if (!validateStep(4)) return;
    const y = parseInt($('sel-year').value), m = parseInt($('sel-month').value), d = parseInt($('sel-day').value);
    const ch = {
      name: wizard.name.trim(),
      gender: wizard.gender,
      birth: { y, m, d },
      city: wizard.geo.city,
      geoKey: wizard.geo.geoKey,
      fatherJob: wizard.fatherJob,
      motherJob: wizard.motherJob,
      econ: wizard.econ,
      familyType: wizard.familyType,
      tone: wizard.tone
    };
    const season = m >= 3 && m <= 5 ? '春' : m >= 6 && m <= 8 ? '夏' : m >= 9 && m <= 11 ? '秋' : '冬';
    window._pendingCh = ch;
    window._pendingSeason = season;
    showScreen('screen-soul');
    renderSoul(ch);
  }

  function renderSoul(ch) {
    const gender = ch.gender;
    const opts = GeoKit.SOUL_ARCHETYPES.slice().sort(() => Math.random() - .5).slice(0, 4);
    $('soul-cards').innerHTML = opts.map((a, i) =>
      '<div class="soul-card" data-i="' + i + '">' +
      '<div class="soul-title">' + a.title + '</div>' +
      '<div class="soul-appear">' + a.appear + '</div>' +
      '<div class="soul-soul">' + a.soul + '</div>' +
      '<div class="soul-tags">' + a.tags.map(t => '<span>' + t + '</span>').join('') + '</div></div>').join('');
    document.querySelectorAll('.soul-card').forEach((el, i) => {
      el.onclick = () => {
        document.querySelectorAll('.soul-card').forEach(x => x.classList.remove('selected'));
        el.classList.add('selected');
        setTimeout(() => {
          window._pendingCh = ch;
          window._pendingArch = opts[i].id;
          renderTalent();
        }, 350);
      };
    });
  }

  let talentPick = [];
  let attrPts = {};
  let attrLeft = 3;

  function renderTalent() {
    talentPick = [];
    const draw = TalentKit.drawTalents(10);
    window._talentDraw = draw;
    const wish = meta.wish;
    const wishEl = $('wish-line');
    if (wish) {
      const statName = { love: '爱情', friend: '友情', family: '亲情', career: '事业', health: '健康', wealth: '家底', mind: '心智', mood: '心境', luck: '气运' }[wish.stat] || wish.stat;
      wishEl.textContent = '前世遗愿 · ' + wish.name + '：' + statName + ' +' + wish.bonus + '（第 ' + ((meta.wishCount || 0) + 1) + ' 世）';
      wishEl.classList.remove('hidden');
    } else {
      wishEl.classList.add('hidden');
    }
    $('talent-grid').innerHTML = draw.map((t, i) =>
      '<div class="talent-card ' + (t.rarity === '传说' ? 'r-legend' : t.rarity === '稀有' ? 'r-rare' : 'r-common') + '" data-i="' + i + '">' +
      '<span class="t-check">✓</span>' +
      '<span class="t-rarity ' + (t.rarity === '传说' ? 'legend' : t.rarity === '稀有' ? 'rare' : 'common') + '">' + t.rarity + '</span>' +
      '<div class="t-name">' + t.name + '</div>' +
      '<div class="t-desc">' + t.desc + '</div>' +
      '<div class="t-fx">' + Object.keys(t.effects).map(k => '『' + (statLabel(k)) + '』' + (t.effects[k] > 0 ? '+' : '') + t.effects[k]).join(' · ') + '</div></div>').join('');
    document.querySelectorAll('.talent-card').forEach(el => {
      el.onclick = () => {
        const t = window._talentDraw[parseInt(el.dataset.i)];
        const idx = talentPick.indexOf(t.id);
        if (idx >= 0) {
          talentPick.splice(idx, 1);
          el.classList.remove('selected');
        } else if (talentPick.length < 2) {
          talentPick.push(t.id);
          el.classList.add('selected');
        }
        document.querySelectorAll('.talent-card').forEach(x => x.classList.toggle('picked', !x.classList.contains('selected') && talentPick.length >= 2));
        updateTalentUI();
      };
    });
    updateTalentUI();
    showScreen('screen-talent');
  }

  function updateTalentUI() {
    $('talent-count').textContent = '已选 ' + talentPick.length + ' / 2';
    $('btn-talent-done').disabled = talentPick.length < 1;
  }

  function renderAttr() {
    attrPts = {};
    attrLeft = 3;
    const stats = ['love', 'friend', 'family', 'career', 'health', 'wealth', 'mind'];
    $('attr-rows').innerHTML = stats.map(k =>
      '<div class="attr-row">' +
      '<span>' + statLabel(k) + '</span>' +
      '<div class="bar"><i style="width:' + (st ? st.stats[k] : 40) + '%"></i></div>' +
      '<div class="attr-ctl"><button class="minus" data-k="' + k + '">−</button><span class="attr-val" data-v="' + k + '">0</span><button class="plus" data-k="' + k + '">+</button></div></div>').join('');
    document.querySelectorAll('.attr-row .plus').forEach(b => b.onclick = () => {
      const k = b.dataset.k;
      if (attrLeft <= 0 || (attrPts[k] || 0) >= 3) return;
      attrPts[k] = (attrPts[k] || 0) + 1;
      attrLeft--;
      refreshAttr();
    });
    document.querySelectorAll('.attr-row .minus').forEach(b => b.onclick = () => {
      const k = b.dataset.k;
      if (!attrPts[k]) return;
      attrPts[k]--;
      attrLeft++;
      refreshAttr();
    });
    $('attr-step').classList.remove('hidden');
    refreshAttr();
    $('attr-step').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function refreshAttr() {
    $('attr-left').textContent = '余 ' + attrLeft + ' 点';
    $('btn-attr-done').disabled = attrLeft > 0;
    document.querySelectorAll('.attr-val').forEach(el => el.textContent = attrPts[el.dataset.v] || 0);
    document.querySelectorAll('.attr-row .plus').forEach(b => b.disabled = attrLeft <= 0 || (attrPts[b.dataset.k] || 0) >= 3);
    document.querySelectorAll('.attr-row .minus').forEach(b => b.disabled = !(attrPts[b.dataset.k] || 0));
  }

  function startLife() {
    const ch = window._pendingCh;
    const archId = window._pendingArch;
    st = newState(ch, archId, talentPick, attrPts);
    renderSidebar();
    checkAchievements(false);
    nextStep();
  }

  function statLabel(k) {
    return { love: '爱情', friend: '友情', family: '亲情', career: '事业', health: '健康', wealth: '家底', mind: '心智', mood: '心境', luck: '气运', discern: '洞察', integrity: '守心' }[k] || k;
  }

  // ---------- 存档 ----------
  function save(force) {
    if (!force && meta && meta.settings && meta.settings.autosave === false) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ st, currentEvId: currentEv ? currentEv.id : null }));
    } catch (e) { /* 忽略隐私模式 */ }
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return false;
      const d = JSON.parse(raw);
      if (!d || !d.st) return false;
      st = d.st;
      st.arch = GeoKit.SOUL_ARCHETYPES.find(a => a.id === st.arch.id) || st.arch;
      st.talents = st.talents || [];
      st.stats.mood = st.stats.mood || 62;
      st.stats.luck = st.stats.luck || 45;
      st.stats.discern = st.stats.discern || 42;
      st.stats.integrity = st.stats.integrity || 62;
      st.lastBreakdown = st.lastBreakdown || -99;
      st.rewindStack = st.rewindStack || [];
      st.rewindUsed = st.rewindUsed || 0;
      st.achievements = st.achievements || [];
      if (st.phase === 'event' && d.currentEvId) {
        const ev = ALL_EVENTS.find(e => e.id === d.currentEvId);
        if (ev) {
          currentEv = ev;
          currentChoices = null;
          renderEvent(ev);
          return true;
        }
      }
      currentEv = null;
      st.phase = st.phase === 'result' ? 'result' : 'interlude';
      renderSidebar();
      return true;
    } catch (e) { return false; }
  }

  function showParallel(text) {
    $('parallel-text').textContent = text;
    $('modal-parallel').classList.remove('hidden');
  }

  // ---------- 命运档案 ----------
  function openArchive() {
    renderArchiveTab('timeline');
    $('modal-archive').classList.remove('hidden');
  }

  function renderArchiveTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    const body = $('archive-body');
    if (tab === 'timeline') {
      const lines = st.history.slice().reverse().slice(0, 60).map(h =>
        '<div class="montage-item"><div class="m-age">' + h.age + '岁 · ' + h.year + '年</div><div class="m-title">' + h.title + '</div><div class="m-quote">「' + h.text + '」</div></div>').join('');
      body.innerHTML = lines || '<p style="color:var(--text-dim);">命运尚无一字落定。</p>';
    } else if (tab === 'memory') {
      const mems = st.history.filter(h => h.memory).slice().reverse().slice(0, 30);
      body.innerHTML = mems.map(h =>
        '<div class="montage-item"><div class="m-age">' + h.age + '岁 · ' + h.year + '年 · 记忆</div>' +
        '<div class="m-title">' + h.title + '</div><div class="m-quote">' + (h.sceneLine ? '「' + h.sceneLine + '……」' : '「' + h.text.slice(0, 30) + '……」') + '</div></div>').join('') ||
        '<p style="color:var(--text-dim);">记忆的匣子还是空的。</p>';
    } else {
      const unlocked = meta.achievements || [];
      body.innerHTML = '<div class="achieve-grid">' + ACHIEVEMENTS.map(a => {
        const has = unlocked.includes(a.id);
        return '<div class="achieve-cell' + (has ? '' : ' locked') + '"><div class="a-name">' + (has ? '✦ ' : '· ') + a.name + '</div><div class="a-desc">' + a.desc + '</div></div>';
      }).join('') + '</div>';
    } if (tab === 'dark') {
      const darks = st.history.filter(h => h.dark).slice().reverse().slice(0, 30);
      const darkCount = st.history.filter(h => h.dark).length;
      body.innerHTML =
        '<div class="achieve-grid" style="grid-template-columns:repeat(auto-fill,minmax(150px,1fr));margin-bottom:14px;">' +
        '<div class="achieve-cell"><div class="a-name">见过暗面</div><div class="a-desc">' + darkCount + ' 次</div></div>' +
        '<div class="achieve-cell"><div class="a-name">洞察</div><div class="a-desc">' + Math.round(st.stats.discern) + ' / 100</div></div>' +
        '<div class="achieve-cell"><div class="a-name">守心</div><div class="a-desc">' + Math.round(st.stats.integrity) + ' / 100</div></div></div>' +
        (darks.length
          ? darks.map(h => '<div class="montage-item"><div class="m-age">' + h.age + '岁 · ' + h.year + '年</div><div class="m-title">' + h.title + '</div><div class="m-quote">「' + h.text + '」</div></div>').join('')
          : '<p style="color:var(--text-dim);">这一生，你还未撞见人性的暗面——或是你选择没有看见。</p>');
    }
  }

  // ---------- 设置与导出 ----------
  function syncSettings() {
    const sp = (meta.settings && meta.settings.speed) || 'normal';
    document.querySelectorAll('#speed-row .chip').forEach(c => c.classList.toggle('selected', c.dataset.speed === sp));
    const snd = Sound.isOn();
    $('btn-sound-setting').textContent = snd ? '关' : '开';
    $('btn-autosave-setting').textContent = (meta.settings && meta.settings.autosave === false) ? '关' : '开';
  }

  function exportData() {
    try {
      const code = btoa(unescape(encodeURIComponent(JSON.stringify({ st, meta }))));
      $('export-area').value = code;
      showToast('导出码已生成', '复制保存，换设备时粘贴导入。');
    } catch (e) {
      $('export-area').value = '导出失败：' + e.message;
    }
  }

  function importData() {
    try {
      const code = $('export-area').value.trim();
      if (!code) { showToast('导入失败', '请先粘贴导出码。'); return; }
      const d = JSON.parse(decodeURIComponent(escape(atob(code))));
      if (!d || !d.st || !d.st.ch || !d.st.v) { showToast('导入失败', '这不是有效的命运导出码。'); return; }
      st = d.st;
      meta = d.meta || defaultMeta();
      save(true);
      saveMeta(meta);
      renderSidebar();
      $('modal-settings').classList.add('hidden');
      showToast('导入成功', '这一生的记忆已恢复。');
      nextStep();
    } catch (e) {
      showToast('导入失败', '导出码无法解析，请确认完整复制。');
    }
  }

  // ---------- 声音 ----------
  const Sound = (() => {
    let ctx = null, master = null, oscs = [], timer = null, on = false;
    function start() {
      if (!ctx) {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        master = ctx.createGain();
        master.gain.value = 0;
        master.connect(ctx.destination);
        const freqs = [110, 164.81, 220];
        freqs.forEach((f, i) => {
          const o = ctx.createOscillator();
          o.type = 'sine';
          o.frequency.value = f;
          const g = ctx.createGain();
          g.gain.value = .04 + i * .015;
          o.connect(g); g.connect(master);
          o.start();
          oscs.push(o);
        });
      }
      ctx.resume();
      master.gain.linearRampToValueAtTime(.14, ctx.currentTime + 2);
      timer = setInterval(() => {
        if (!on || !ctx) return;
        const t = ctx.currentTime;
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.value = 660 + Math.random() * 120;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(.025, t + .02);
        g.gain.exponentialRampToValueAtTime(.0001, t + 1.8);
        o.connect(g); g.connect(master);
        o.start(t); o.stop(t + 2);
      }, 9000 + Math.random() * 6000);
    }
    return {
      toggle() {
        on = !on;
        if (on) start(); else if (master) master.gain.linearRampToValueAtTime(0, ctx.currentTime + .6);
        return on;
      },
      isOn() { return on; },
      click() {
        if (!on || !ctx) return;
        const t = ctx.currentTime;
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.setValueAtTime(540, t);
        o.frequency.exponentialRampToValueAtTime(720, t + .08);
        const g = ctx.createGain();
        g.gain.setValueAtTime(.05, t);
        g.gain.exponentialRampToValueAtTime(.0001, t + .16);
        o.connect(g); g.connect(master);
        o.start(t); o.stop(t + .18);
      },
      page() {
        if (!on || !ctx) return;
        const t = ctx.currentTime;
        const o = ctx.createOscillator();
        o.type = 'triangle';
        o.frequency.setValueAtTime(220, t);
        o.frequency.exponentialRampToValueAtTime(160, t + .18);
        const g = ctx.createGain();
        g.gain.setValueAtTime(.035, t);
        g.gain.exponentialRampToValueAtTime(.0001, t + .3);
        o.connect(g); g.connect(master);
        o.start(t); o.stop(t + .32);
      }
    };
  })();

  // ---------- 绑定 ----------
  function bind() {
    $('btn-begin').onclick = () => { showScreen('screen-create'); initWizard(); };
    $('btn-continue').onclick = () => {
      if (load()) { nextStep(); }
    };
    $('btn-prev').onclick = () => goStep(wizard.step - 1);
    $('btn-next').onclick = () => goStep(wizard.step + 1);
    $('btn-submit').onclick = submitWizard;

    document.querySelectorAll('[data-gender]').forEach(el => {
      el.onclick = () => {
        document.querySelectorAll('[data-gender]').forEach(x => x.classList.remove('selected'));
        el.classList.add('selected');
        wizard.gender = el.dataset.gender;
      };
    });
    $('inp-name').oninput = e => wizard.name = e.target.value.trim();
    $('btn-suggest-name').onclick = () => {
      if (!wizard.gender) { alert('先择定性别，再抽取时代之名。'); return; }
      const names = NameGen.suggestNames(wizard.gender, parseInt($('sel-year').value || '1988'), 4);
      $('name-suggest').innerHTML = names.map(n => '<span class="chip selectable" data-n="' + n + '">' + n + '</span>').join('');
      $('name-suggest').querySelectorAll('.chip').forEach(el => {
        el.onclick = () => { $('inp-name').value = el.dataset.n; wizard.name = el.dataset.n; };
      });
    };
    $('inp-place').oninput = () => { wizard.geo = null; $('geo-flavor').classList.add('hidden'); };

    $('btn-continue-event').onclick = () => { Sound.page(); nextStep(); };
    $('btn-custom').onclick = () => customAnswer($('inp-custom').value.trim());
    $('btn-parallel-close').onclick = () => $('modal-parallel').classList.add('hidden');
    $('btn-save-close').onclick = () => $('modal-save').classList.add('hidden');
    $('btn-save').onclick = () => {
      save(true);
      $('save-text').textContent = '命运已刻入档案（' + st.age + '岁 · ' + st.year + '年）。回到此页可「继续前尘」。';
      $('modal-save').classList.remove('hidden');
    };
    $('btn-archive').onclick = openArchive;
    $('btn-archive-close').onclick = () => $('modal-archive').classList.add('hidden');
    document.querySelectorAll('.tab-btn').forEach(b => b.onclick = () => renderArchiveTab(b.dataset.tab));
    $('btn-restart').onclick = () => {
      if (confirm('抹去这一生，从头再来？旧档案将无法找回。')) {
        localStorage.removeItem(KEY);
        location.reload();
      }
    };
    $('btn-rewind').onclick = rewind;
    $('btn-talent-done').onclick = renderAttr;
    $('btn-attr-done').onclick = startLife;
    $('btn-settings').onclick = () => { syncSettings(); $('modal-settings').classList.remove('hidden'); };
    $('btn-settings-close').onclick = () => $('modal-settings').classList.add('hidden');
    document.querySelectorAll('#speed-row .chip').forEach(c => c.onclick = () => {
      meta.settings = meta.settings || {};
      meta.settings.speed = c.dataset.speed;
      saveMeta(meta);
      syncSettings();
    });
    $('btn-autosave-setting').onclick = () => {
      meta.settings = meta.settings || {};
      meta.settings.autosave = meta.settings.autosave === false;
      saveMeta(meta);
      syncSettings();
    };
    $('btn-sound-setting').onclick = function () {
      Sound.toggle();
      $('btn-sound').classList.toggle('on', Sound.isOn());
      $('btn-sound').textContent = Sound.isOn() ? '♪' : '静';
      syncSettings();
    };
    $('btn-export').onclick = exportData;
    $('btn-import').onclick = importData;
    document.querySelectorAll('.pace-btn').forEach(b => {
      b.onclick = () => {
        st.pace = b.dataset.pace;
        renderSidebar();
        save();
      };
    });
    $('btn-sound').onclick = function () {
      const on = Sound.toggle();
      this.classList.toggle('on', on);
      this.textContent = on ? '♪' : '静';
    };
    // 打字机快进
    $('stage').addEventListener('click', () => { if (st) st.skipText = true; });
    // 键盘操作
    document.addEventListener('keydown', e => {
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const anyModalOpen = ['modal-save', 'modal-parallel', 'modal-archive', 'modal-settings'].some(id => !$(id).classList.contains('hidden'));
      if (e.key === 'Escape') {
        ['modal-save', 'modal-parallel', 'modal-archive', 'modal-settings'].forEach(id => $(id).classList.add('hidden'));
        return;
      }
      if (anyModalOpen && e.key === 'Enter') {
        if (!$('modal-parallel').classList.contains('hidden')) $('btn-parallel-close').click();
        else if (!$('modal-archive').classList.contains('hidden')) $('btn-archive-close').click();
        else if (!$('modal-settings').classList.contains('hidden')) $('btn-settings-close').click();
        else if (!$('modal-save').classList.contains('hidden')) $('btn-save-close').click();
        return;
      }
      if (anyModalOpen) return;
      if (e.key >= '1' && e.key <= '4') {
        const idx = parseInt(e.key) - 1;
        if (currentChoices && idx < currentChoices.length && !$('choices').classList.contains('hidden')) {
          applyChoice(currentChoices[idx]);
        }
      }
      if (e.key === 'Enter' && !$('continue-row').classList.contains('hidden')) {
        Sound.page();
        nextStep();
      }
    });
    // 前世遗愿
    if (meta.wish) {
      const w = meta.wish;
      $('intro-wish').textContent = '前世遗愿 · ' + w.name + '：' + statLabel(w.stat) + ' +' + w.bonus + '，将注入第 ' + ((meta.wishCount || 0) + 1) + ' 世';
      $('intro-wish').classList.remove('hidden');
    }
    // 存档存在时显示继续
    if (localStorage.getItem(KEY)) $('continue-wrap').classList.remove('hidden');
  }

  document.addEventListener('DOMContentLoaded', bind);

  // 调试/测试出口：不影响正常游戏
  window.RJ = {
    newState, nextStep, choose: (i) => applyChoice(currentChoices[i]),
    pickEvent, renderText, st: () => st, rewind,
    choices: () => currentChoices,
    buildEndingHTML, endingScores, save, load,
    meta: () => meta,
    ALL: ALL_EVENTS
  };
})();
