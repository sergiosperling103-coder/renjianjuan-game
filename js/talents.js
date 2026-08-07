// 出生天赋 · 十连抽卡池
const TALENTS = [
  { id: 'eidetic', name: '过目不忘', rarity: '传说', desc: '翻过的书页像刻进瞳孔，考卷在你眼里是旧相识。', effects: { mind: 8, career: 3 } },
  { id: 'lucky', name: '幸运星', rarity: '传说', desc: '抛硬币总能落在你想要的那一面，雨伞总在需要时出现。', effects: { luck: 12 } },
  { id: 'rich', name: '财神眷顾', rarity: '传说', desc: '风口总能吹到你的衣角，旧货堆里也能翻出金子。', effects: { wealth: 10, career: 3 } },
  { id: 'early', name: '早慧', rarity: '传说', desc: '别人还在学走路，你已经会问为什么。', effects: { mind: 10, mood: -3 } },
  { id: 'beauty', name: '天生丽质', rarity: '稀有', desc: '人群里第一眼被看见的，是你。', effects: { love: 4, friend: 3 } },
  { id: 'body', name: '铁打的身板', rarity: '稀有', desc: '感冒绕着走，骨头比嘴硬。', effects: { health: 9 } },
  { id: 'charm', name: '高情商', rarity: '稀有', desc: '你知道什么时候该说话，什么时候该沉默。', effects: { friend: 5, love: 3, family: 2 } },
  { id: 'cool', name: '冷静如冰', rarity: '稀有', desc: '天塌下来，你先数到三。', effects: { mind: 7, mood: 5 } },
  { id: 'art', name: '艺术细胞', rarity: '稀有', desc: '眼里有别人看不见的颜色，手上有留得住它的本事。', effects: { mind: 3, career: 4, love: 2 } },
  { id: 'instinct', name: '直觉敏锐', rarity: '稀有', desc: '第六感像一条隐秘的河，总在你犹豫时给出方向。', effects: { luck: 6, mind: 4 } },
  { id: 'heaven', name: '贵人缘', rarity: '稀有', desc: '人生岔路口，总有人恰好经过，替你点一盏灯。', effects: { friend: 4, luck: 5 } },
  { id: 'mouth', name: '嘴甜', rarity: '常见', desc: '一句话能哄三个人开心。', effects: { friend: 3, family: 3 } },
  { id: 'curious', name: '好奇心', rarity: '常见', desc: '对世界永远问为什么，也永远不满足于答案。', effects: { mind: 4 } },
  { id: 'owl', name: '夜猫子', rarity: '常见', desc: '夜深人静时，你的脑子最亮。', effects: { career: 2, mind: 2, health: -3 } },
  { id: 'tough', name: '坚韧', rarity: '常见', desc: '被打倒十次，第十一次站起来。', effects: { health: 4, mind: 3 } },
  { id: 'warm', name: '天生暖意', rarity: '常见', desc: '靠近你的人，都会慢下来。', effects: { family: 5, friend: 2, mood: 3 } }
];

const RARITY_ORDER = { '传说': 2, '稀有': 1, '常见': 0 };

function drawTalents(count) {
  const pool = TALENTS.slice();
  const out = [];
  const weighted = [];
  pool.forEach(t => {
    const w = t.rarity === '传说' ? 10 : t.rarity === '稀有' ? 16 : 24;
    for (let i = 0; i < w; i++) weighted.push(t);
  });
  while (out.length < (count || 10) && weighted.length) {
    const t = weighted.splice(Math.floor(Math.random() * weighted.length), 1)[0];
    if (!out.some(x => x.id === t.id)) out.push(t);
  }
  return out.sort((a, b) => RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity]);
}

window.TalentKit = { TALENTS, drawTalents, RARITY_ORDER };
