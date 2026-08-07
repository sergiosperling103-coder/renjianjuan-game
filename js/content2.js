// 青年至中年：十九岁 — 四十五岁
const EVENTS2 = [
  {
    id: 'newCity',
    title: '新城市的第一个夜晚',
    minAge: 19, maxAge: 21, weight: 100,
    scenes: [
      {
        time: '深夜',
        env: '新城市 · 宿舍/出租屋',
        body: [
          '天花板上有水渍，窗户关不严，楼下的车声像潮水一样涌进来又退去。你躺在这张陌生的床上，第一次意识到：故乡的月亮和这里的月亮，其实是同一轮。',
          '{{city}}的方向，是今晚地图上的一个点。'
        ]
      }
    ],
    choices: [
      {
        text: '爬起来给家里写信/打电话，说一切都好',
        risk: '平静',
        effects: { family: 4 },
        rel: { mother: 4, father: 3 },
        flags: ['wroteHome'],
        after: '电话那头，{{mother}}的声音里带着笑，又带着点别的什么。你说一切都好，她也说家里一切都好——你们互相瞒着，这是成年人之间最早学会的默契。',
        keywords: ['写信','电话','家里','报平安']
      },
      {
        text: '爬上楼顶，看这座城的万家灯火',
        risk: '平静',
        effects: { career: 3, mind: 3 },
        flags: ['sawCityLights'],
        after: '灯很多，每一盏灯下都有一个故事。你对自己说：总有一天，这里会有一盏灯为你亮着。那一夜的灯火，成了你此后许多年的燃料。',
        keywords: ['楼顶','灯','看','夜景']
      },
      {
        text: '蒙头大睡，把孤独留给明天',
        risk: '平静',
        effects: { health: 3, mind: 1 },
        flags: ['sleptEarly'],
        after: '你睡得很沉。梦里回到了{{city}}的巷口，{{geoSmell}}扑面而来。醒来时枕边有点湿，你不确定是汗，还是别的什么。',
        keywords: ['睡','蒙头','明天']
      }
    ]
  },
  {
    id: 'loveWarm',
    title: '爱情的升温 · 脆弱交换',
    minAge: 20, maxAge: 23, weight: 100, memory: true,
    scenes: [
      {
        time: '傍晚 · 雨后',
        env: '新城市 · 河边/天桥/小店',
        body: [
          '{{loveName}}坐在你对面，雨后的空气里有种干净的凉意。你们已经认识很久了——久到可以一起沉默，却还没久到可以坦诚。',
          '「我有一件事，从来没跟别人说过。」{{loveName}}低下头，声音很轻，「你要听吗？」',
          '你知道，这句话是一扇门。推开它，你们会更近；退回去，你们还能停在原地。'
        ]
      }
    ],
    choices: [
      {
        text: '点头：「你说，我听着。」',
        risk: '微澜',
        effects: { love: 8, mind: 2 },
        flags: ['loveSecretHeard', 'lovePartner'],
        after: '{{loveName}}说了——一件藏了很久的事。你说不出漂亮话，只是伸出手，覆在他/她的手背上。那一刻，你们各自卸下了人生中的一块盔甲。',
        keywords: ['听','你说','点头','说']
      },
      {
        text: '也说出一件自己的秘密，作为交换',
        risk: '暗流',
        effects: { love: 10, mind: -1 },
        flags: ['loveSecretShared', 'lovePartner'],
        after: '你把自己藏得最深的那件事也说了出来。说出的一瞬间，你觉得轻了，又觉得怕了——从此这世上多了一个握着你软肋的人。这是爱最危险的开始，也是它最真的开始。',
        keywords: ['交换','秘密','也','自己的']
      },
      {
        text: '用玩笑岔开：「这种事，等喝多了再说吧。」',
        risk: '微澜',
        effects: { love: -2, mind: 2 },
        flags: ['loveJoked'],
        after: '{{loveName}}笑了笑，没再继续。那扇门没有关上，却在你面前虚掩了很久。后来你们终于还是走近了，只是那句话，他/她再也没提过第二遍。',
        keywords: ['玩笑','岔开','喝','下次']
      }
    ],
    parallel: '如果那晚你没有接话，{{loveName}}会在十年后的一次醉酒里，把同样的话再说一遍——而那时，你们已经隔着一整个回不去的青春。'
  },
  {
    id: 'firstJob',
    title: '职场的初雪',
    minAge: 21, maxAge: 24, weight: 100, memory: true,
    scenes: [
      {
        time: '入职的第一周',
        env: '新城市 · 办公室',
        body: [
          '工位靠窗，窗外的梧桐落了叶。{{mentor}}把你领到角落，扔给你一摞资料：「先看，不懂就问。」',
          '你坐在那里，第一次真切地感到：学校教你的东西，和世界要的东西，中间隔着一整片海。'
        ]
      }
    ],
    choices: [
      {
        text: '晚上留下来，把资料从头啃到尾',
        risk: '微澜',
        effects: { career: 6, health: -2 },
        flags: ['grindedJob'],
        later: { at: 12, event: 'hospital' },
        after: '你走的时候，整层楼只剩你一盏灯。{{mentor}}第二天看到你做的笔记，没夸你，但把你带到了核心项目组。灯没白亮。',
        keywords: ['加班','啃','资料','努力']
      },
      {
        text: '先观察谁真正说了算，再决定怎么用力',
        risk: '微澜',
        effects: { career: 4, mind: 4 },
        flags: ['observedOffice'],
        after: '你花了两周看清办公室的暗流。后来你的每一步都踩在点子上，{{mentor}}说你「心眼活」。心眼活是天赋，也是负担。',
        keywords: ['观察','看','说了算','琢磨']
      },
      {
        text: '按点下班，工作是工作，生活是生活',
        risk: '微澜',
        effects: { career: -2, health: 3, mind: 2 },
        flags: ['balancedJob'],
        after: '你到点就走，同事的眼神里有些复杂。多年后你才知道，准时下班是种需要勇气的习惯——而它保护了你人生里最宝贵的那部分。',
        keywords: ['下班','准时','生活','点']
      },
      {
        text: '凭直觉捕捉办公室真正的规矩，第一天就站对了队',
        risk: '微澜',
        effects: { career: 5, mind: 2, luck: 1 },
        flags: ['instinctJob'],
        needTalent: ['instinct'],
        after: '你的第六感像一根线，牵着你在复杂的办公室里稳稳走位。{{mentor}}多看了你一眼，说：「这年轻人，有点意思。」',
        keywords: ['直觉','站队','第六感','规矩']
      }
    ]
  },
  {
    id: 'friendMoney',
    title: '金钱的试金石',
    minAge: 22, maxAge: 27, weight: 90, memory: true,
    onlyIf: (s) => !!s.fam.bff,
    scenes: [
      {
        time: '深夜 · 电话/出租屋门口',
        env: '新城市',
        body: [
          '{{bff}}来找你，坐下半天没说话。最后他/她开口：「我急用一笔钱，你手头有吗？」数目不小，够你攒两年。',
          '屋子里静得能听见钟。你们之间那些年的交情，忽然压到了这叠钞票上。'
        ]
      }
    ],
    choices: [
      {
        text: '二话不说，把钱借给他/她',
        risk: '暗流',
        effects: { friend: 6, wealth: -8 },
        rel: { bff: 10 },
        flags: ['lentFriend'],
        after: '他/她接过钱，手在抖，说「我一定还」。后来他/她确实还了，还带着利息和一瓶酒。那瓶酒你们喝到半夜，谁也没提那晚的事——但你们知道，有些交情，过过钱才算真的过命。',
        keywords: ['借','二话不说','给','拿去']
      },
      {
        text: '问清用途，借一半，让他/她写下欠条',
        risk: '微澜',
        effects: { friend: 2, wealth: -4, mind: 2 },
        rel: { bff: 2 },
        flags: ['halfLentFriend'],
        after: '他/她愣了一下，还是写了。后来钱还清了，欠条你们一起烧了。他/她说：「你是第一个借我钱还让我写欠条的人。」你说：「所以我才愿意借你。」',
        keywords: ['一半','欠条','问','用途']
      },
      {
        text: '说自己也没有，婉拒了',
        risk: '暗流',
        effects: { friend: -5, wealth: 2 },
        rel: { bff: -8 },
        flags: ['refusedFriend'],
        after: '他/她说「没事」，坐了一会儿就走了。你们后来还见面，但有些话再也没接上。多年后他/她发达了，提起那晚，只说：「那时候，我是真的走投无路了。」',
        keywords: ['没有','婉拒','不借','拒绝']
      }
    ],
    parallel: '如果你借了，他/她会在你最需要的时候把这份恩情还回来——以一种你完全没想到的方式。而这一世，那扇门开着，你还来得及推开。'
  },
  {
    id: 'parentCall',
    title: '电话那头的故乡',
    minAge: 23, maxAge: 28, weight: 90,
    scenes: [
      {
        time: '某个周末的晚上',
        env: '新城市 · 出租屋',
        body: [
          '{{mother}}在电话里说：「你爸今天又念叨你了。」背景音里，{{father}}在电视前咳嗽了两声，嘴硬说「谁念叨了」。',
          '他们没说要你回去，但电话这头，你听见了{{city}}的风声。'
        ]
      }
    ],
    choices: [
      {
        text: '订票，这个月就回去一趟',
        risk: '平静',
        effects: { family: 5, wealth: -2 },
        rel: { mother: 5, father: 4 },
        flags: ['wentHomeOften'],
        after: '你推门进屋时，{{mother}}正在择菜，愣了一下，眼睛就亮了。那顿饭你吃了三碗。返程时你才明白，所谓故乡，就是有人替你留着的那盏灯。',
        keywords: ['回去','订票','回家','车票']
      },
      {
        text: '嘴上应着，挂了电话却算着来回的路费',
        risk: '微澜',
        effects: { family: -2, wealth: 2 },
        flags: ['postponedHome'],
        after: '路费是省下了，可心里那笔账越记越沉。你告诉自己：等混好了就回去。这个「等」，后来成了你人生里最贵的一个字。',
        keywords: ['路费','等','下次','再说']
      },
      {
        text: '问他们愿不愿意搬来同住',
        risk: '微澜',
        effects: { family: 4, wealth: -3 },
        rel: { mother: 4, father: 3 },
        flags: ['askedParentsMove'],
        after: '电话那头沉默了一会儿，{{father}}说：「故土难离，我们就不去添乱了。」你听着，鼻子一酸。你知道他们不是不想，是不想拖累你。',
        keywords: ['搬来','同住','接','一起住']
      }
    ]
  },
  {
    id: 'eraWave',
    title: '时代的浪潮',
    minAge: 24, maxAge: 31, weight: 90, memory: true,
    scenes: [
      {
        time: '时代的分水岭',
        env: '新城市 · 办公室/饭桌',
        body: [
          '{{era:careerStart}}',
          '身边有人辞了职，有人换了赛道，有人攥着旧船票不肯下船。饭桌上，每个人都像站在浪头前，不知道哪一脚是岸，哪一脚是海。'
        ]
      }
    ],
    choices: [
      {
        text: '跳进新浪潮，把安稳押给未来',
        risk: '暗流',
        effects: { career: 8, wealth: 4, health: -2 },
        flags: ['rodeWave'],
        chance: { prob: .08, event: 'hospital' },
        after: '你辞职那天，风很大。后来的路证明你赌对了一半——时代确实换了海，而你游得够快。但每次夜深，你都会想起那个铁饭碗，像想起一个老情人。',
        keywords: ['跳','辞职','新','创业','下海']
      },
      {
        text: '留在老本行，把已有的做精做深',
        risk: '微澜',
        effects: { career: 4, wealth: 1, mind: 2 },
        flags: ['heldLine'],
        after: '你没有追浪。你在老行当里扎得更深，成了别人离不开的人。后来浪潮退去，人们才发现，岸上的人也需要一根稳的桩。',
        keywords: ['留','本行','做精','守']
      },
      {
        text: '两只脚都踩一点，一边上班一边观望',
        risk: '暗流',
        effects: { career: 1, mind: 3, health: -2 },
        flags: ['hedgedWave'],
        after: '你既没上岸也没下海，站在浪里晃了很多年。稳是稳了，可你后来总说，那几年像隔着玻璃看别人活。',
        keywords: ['观望','两边','再看','等等']
      }
    ],
    parallel: '如果你跳了下去，会在几年后路过老单位门口，看见旧同事们在门口晒太阳。你会想：如果我没走——而他们会想：如果我也走了。'
  },
  {
    id: 'busSeat',
    title: '车厢里的让座',
    minAge: 12, maxAge: 34, weight: 50,
    scenes: [
      {
        time: '晚高峰',
        env: '城市 · 公交车/地铁',
        body: [
          '你刚坐下，车门开了，上来一位老人/孕妇。车厢里很挤，没有人动。你坐的位置，刚好是离他/她最近的那个。',
          '有人看向你。'
        ]
      }
    ],
    choices: [
      {
        text: '站起来：「您坐。」',
        risk: '平静',
        effects: { friend: 2, mind: 2 },
        flags: ['gaveSeat'],
        after: '老人坐下，朝你点点头。你站了一路，腿有点酸，心里却莫名熨帖。很小的善，也会在身体里留下温度。',
        keywords: ['让','您坐','站']
      },
      {
        text: '低头看手机，假装没看见',
        risk: '平静',
        effects: { mind: -1 },
        after: '你低头的那几分钟，车厢的摇晃变得格外漫长。后来你下车时，老人还站在原来的位置。你走得很快，像在躲什么。',
        keywords: ['低头','手机','没看见']
      }
    ]
  },
  {
    id: 'marriage',
    title: '婚姻的关口',
    minAge: 26, maxAge: 32, weight: 100, memory: true,
    scenes: [
      {
        time: '某个周末的晚上',
        env: '家 / 出租屋',
        body: [
          '你们面对面坐着，桌上放着两杯茶，已经凉了。有些话在你们之间悬了很久，像屋檐下将落未落的雪。',
          '「你有没有想过，以后……」{{loveName}}说到一半，又低下头。「以后」这两个字，在这一刻忽然有了重量。'
        ]
      }
    ],
    choicesFn: (s) => {
      if (s.flags.includes('lovePartner')) {
        return [
          {
            text: '握住他/她的手：「我们结婚吧。」',
            risk: '微澜',
            effects: { love: 8, family: 4, wealth: -5 },
            flags: ['married'],
            after: '{{loveName}}愣了很久，然后笑了，笑得眼泪都出来了：「就等你这句话。」婚礼那天，{{city}}的亲戚来了一屋子。你牵着他/她的手，像牵住了余生。',
            keywords: ['结婚','娶','嫁','领证']
          },
          {
            text: '再等等，等事业更稳一些',
            risk: '暗流',
            effects: { love: -4, career: 3 },
            flags: ['postponedMarriage'],
            after: '{{loveName}}说「好，我等你」，可眼神里有什么东西轻轻暗了一下。事业确实越来越稳了，只是有些灯，等久了会变暗。',
            keywords: ['等','事业','再等等','稳']
          },
          {
            text: '坦白说：我还没想好，要不要过一辈子',
            risk: '暗流',
            effects: { love: -8, mind: 2 },
            flags: ['brokeMarriage'],
            after: '那天你们谈了很久。最后{{loveName}}说：「那我先不等了。」你点头，以为这是成熟。多年后你才知道，有些告别，是从一句诚实的「没想好」开始的。',
            keywords: ['没想好','坦白','分手','过一辈子']
          }
        ];
      }
      return [
        {
          text: '答应去相亲，见见那个被夸了很久的人',
          risk: '微澜',
          effects: { love: 3, family: 3, mind: -1 },
          flags: ['married', 'loveArranged'],
          after: '相亲那天阳光很好。你们聊得不算热烈，也不算尴尬。{{spouse}}后来成了你的另一半——爱未必是电光火石，也可以是日积月累的暖。',
          keywords: ['相亲','见','答应']
        },
        {
          text: '婉拒相亲：宁缺毋滥',
          risk: '暗流',
          effects: { love: -2, mind: 3, family: -2 },
          flags: ['singleChoice'],
          after: '{{mother}}在电话里叹了很久的气。你挂掉电话，站在窗前看万家灯火，忽然问自己：我到底在等什么？这个问题，你很多年后才答上来。',
          keywords: ['不去','婉拒','宁缺毋滥','单身']
        }
      ];
    }
  },
  {
    id: 'climb',
    title: '职场的坡道',
    minAge: 28, maxAge: 34, weight: 90,
    scenes: [
      {
        time: '竞聘/晋升季',
        env: '办公室',
        body: [
          '位置只有一个，你和你的搭档都够格。领导把你们叫进去，话里话外都带着钩子。',
          '搭档也是你的朋友。这个位置像一枚硬币，落在谁手里，另一个人的眼神都会变。'
        ]
      }
    ],
    choices: [
      {
        text: '光明正大地争取，把成绩摊开来说',
        risk: '微澜',
        effects: { career: 6, friend: -2 },
        flags: ['foughtPromotion'],
        after: '你赢了。搭档向你道贺，但笑容里有一道极细的裂缝。后来你们还是朋友，只是多了一层客套——有些东西，得到的同时就在失去。',
        keywords: ['争取','成绩','竞争','光明']
      },
      {
        text: '把机会让给搭档，说「你比我合适」',
        risk: '微澜',
        effects: { career: -4, friend: 5 },
        rel: { bff: 4 },
        flags: ['gavePromotion'],
        after: '搭档愣住了，后来认真地说：「我欠你一次。」你笑笑说别放在心上。三年后你才发现，那次让，让你的职场晚跑了三年——但你赢回了一个真朋友。',
        keywords: ['让','你合适','退出']
      },
      {
        text: '在领导面前不动声色地踩了搭档一脚',
        risk: '暗流',
        effects: { career: 8, mind: -5, friend: -8 },
        flags: ['sabotagedPromotion'],
        after: '你得到了位置。搭档临走时看了你一眼，什么都没说。那一眼，你后来在很多个夜里反复回放——它比任何指责都重。',
        keywords: ['踩','暗示','说坏话','手段']
      },
      {
        text: '冷静如冰——把所有人的牌在桌上摆开，请领导公平裁决',
        risk: '微澜',
        effects: { career: 7, mind: 3, friend: 1 },
        flags: ['coolPromotion'],
        needTalent: ['cool'],
        after: '你不争不吵，只把事实摆成牌面。领导当场拍板：「就他了。」搭档输得心服口服——你们后来还一起喝了一顿酒。',
        keywords: ['冷静','摆','裁决','公平']
      }
    ],
    parallel: '如果你让了，领导会在三年后把另一个更大的机会递给你，说「我知道你让过」。而这一世，机会仍在路上，等你重新选择。'
  },
  {
    id: 'child',
    title: '啼哭的新一代',
    minAge: 30, maxAge: 36, weight: 90, memory: true,
    need: ['married'],
    block: ['hasChild'],
    scenes: [
      {
        time: '春天/冬天 · 凌晨',
        env: '医院 / 家中',
        body: [
          '一声啼哭划破产房的门。你第一次抱到那个皱巴巴的小人儿，他/她眯着眼，像在辨认你。',
          '{{spouse}}累得睡着了，手还攥着你的衣角。你抱着孩子，忽然明白了一个词——「传承」。'
        ]
      }
    ],
    choices: [
      {
        text: '把脸贴在婴儿的额头上，在心里许愿他/她平安',
        risk: '平静',
        effects: { family: 6, love: 3, wealth: -4 },
        flags: ['hasChild'],
        after: '你许的愿后来都实现了——只是实现的路上，需要你们一起趟过许多河。{{child}}长大后的某个深夜，也会像你一样，抱着自己的孩子许同一个愿。',
        keywords: ['贴','许愿','平安','抱']
      },
      {
        text: '转身握住{{spouse}}的手，说「辛苦了」',
        risk: '平静',
        effects: { family: 5, love: 6, wealth: -3 },
        flags: ['hasChild'],
        after: '{{spouse}}半梦半醒地笑了一下，把你和孩子一起圈进怀里。那句话很轻，却成了你们婚姻里最牢的一颗铆钉。',
        keywords: ['辛苦','握','爱','谢谢']
      },
      {
        text: '手足无措地站在床边，不知道手该放哪里',
        risk: '微澜',
        effects: { family: 3, mind: 2, wealth: -4 },
        flags: ['hasChild'],
        after: '护士笑着教你怎么抱。你笨手笨脚的样子，后来被{{spouse}}笑话了很多年。但孩子认得你的心跳——他/她第一次安稳入睡，就是在你的怀里。',
        keywords: ['不会','笨','站','手足无措']
      }
    ]
  },
  {
    id: 'eraStorm',
    title: '风暴过境',
    minAge: 33, maxAge: 43, weight: 90, memory: true,
    scenes: [
      {
        time: '时代的风暴',
        env: '城市',
        body: [
          '{{era:storm}}',
          '你身边的人各有各的浪。有人连夜改简历，有人卖房周转，有人关起门来谁也不见。风暴不管你的名字，它只按时代的路牌走。'
        ]
      }
    ],
    choices: [
      {
        text: '收紧开支，稳住基本盘，熬过冬天',
        risk: '微澜',
        effects: { wealth: -3, family: 2, health: 1 },
        flags: ['tightenedBelt'],
        after: '你把账单翻来覆去算了三遍，砍掉了所有能砍的。那几年过得紧，但家没散。冬天过去后，你发现你比很多人都完整。',
        keywords: ['省','收紧','熬','稳']
      },
      {
        text: '趁低抄底，把积蓄押进别人不敢碰的地方',
        risk: '暗流',
        effects: { wealth: 8, health: -2 },
        flags: ['betBig'],
        chance: { prob: .12, event: 'hospital' },
        after: '你赌了一把。赢了的那天，你在阳台上站了很久，没有想象中那么高兴——你想起那些没敢赌的人，忽然不确定赢是不是唯一的路。',
        keywords: ['抄底','赌','押','敢']
      },
      {
        text: '转头去做新方向，把危机当成转场',
        risk: '暗流',
        effects: { career: 6, wealth: -2, mind: 3 },
        flags: ['pivotedStorm'],
        after: '你换了赛道，从头开始。老同事说你想不开，你笑笑没解释。很多年后，他们夸你有远见——只有你知道，那不过是被逼到墙角时，本能地翻了个身。',
        keywords: ['转','新方向','改行','换']
      }
    ]
  },
  {
    id: 'frogWater',
    title: '温水的锅',
    minAge: 36, maxAge: 44, weight: 90,
    scenes: [
      {
        time: '工作日 · 下午',
        env: '办公室',
        body: [
          '你已经在这家公司待了多年，业务熟得闭着眼都能做完。薪水每年涨一点，职位原地不动。窗外的年轻人来了又走，有人喊你「老师」。',
          '你忽然算不清：是这份工作离不开你，还是你离不开这份工作？'
        ]
      }
    ],
    choices: [
      {
        text: '辞职，把多年的积累换成新的战场',
        risk: '暗流',
        effects: { career: 8, wealth: -4, health: -1 },
        flags: ['jumpedFrog'],
        chance: { prob: .08, event: 'hospital' },
        after: '你走的那天，办公室安安静静。新战场上，你的经验确实值钱，但你的身体开始跟你算旧账。你赢了前半场，后半场在还债。',
        keywords: ['辞职','跳槽','新战场','创业']
      },
      {
        text: '留在原地，把日子过成一种熟悉的安稳',
        risk: '微澜',
        effects: { career: -2, family: 3, health: 2 },
        flags: ['stayedFrog'],
        after: '温水没有煮你，它只是把你养得越来越像它。你准时下班，陪孩子长大，工资条平平无奇。偶尔深夜，你会梦见那个辞职的自己——他过得怎么样？',
        keywords: ['留','安稳','原地','熬']
      },
      {
        text: '利用业余时间学一项新技能，给自己留一条后路',
        risk: '微澜',
        effects: { career: 4, mind: 4, health: -2 },
        flags: ['learnedNewSkill'],
        after: '白天上班，晚上上课，周末考证。很累，但你心里踏实。三年后，那条后路真的用上了——它救了你一次。',
        keywords: ['学','技能','晚上','后路']
      }
    ]
  },
  {
    id: 'parentAge',
    title: '父母的白发',
    minAge: 38, maxAge: 47, weight: 90, memory: true,
    scenes: [
      {
        time: '某个回家的假期',
        env: '{{city}} · 老家',
        body: [
          '你推门进去，{{mother}}正扶着墙从椅子上站起来。她笑着喊你的小名，可你看见她的手腕细了一圈。{{father}}在院子里佝偻着腰，背影比记忆里矮了。',
          '你忽然发现，你已经开始数他们剩下的日子了。'
        ]
      }
    ],
    choices: [
      {
        text: '留下来多住几天，陪他们做那些寻常的事',
        risk: '平静',
        effects: { family: 6, career: -1 },
        rel: { mother: 6, father: 5 },
        flags: ['stayedWithParents'],
        after: '你陪{{father}}下棋，陪{{mother}}买菜。那些日子平淡得像水，却在你后来的记忆里，成了最贵重的一笔存款。',
        keywords: ['留','多住','陪','照顾']
      },
      {
        text: '提出接他们到身边，请人照料',
        risk: '微澜',
        effects: { family: 4, wealth: -5 },
        rel: { mother: 4, father: 3 },
        flags: ['caredParents'],
        after: '他们拗不过你，搬来了。水土不服，他们嘴上不说，夜里翻来覆去。半年后他们坚持回了老家——你才明白，对老人来说，故土比儿女的孝心更养人。',
        keywords: ['接','照顾','请人','养老']
      },
      {
        text: '多打些钱回去，说自己走不开',
        risk: '微澜',
        effects: { family: -2, wealth: -3, career: 1 },
        flags: ['sentMoneyHome'],
        after: '钱到账了，电话里他们都说够用。可你后来听邻居说，{{mother}}常坐在巷口，看着别人家的孩子回来的方向。',
        keywords: ['打钱','走不开','忙','汇']
      }
    ]
  },
  {
    id: 'marriageReef',
    title: '婚姻的暗礁',
    minAge: 40, maxAge: 48, weight: 90, memory: true,
    need: ['married'],
    scenes: [
      {
        time: '某个寻常的夜晚',
        env: '家',
        body: [
          '你们背对背睡下，中间隔着一年没有聊完的话。{{spouse}}的呼吸很均匀，你的却像深夜的浪。',
          '白天，有个人的目光在你身上多停了两秒；晚上，你想起{{spouse}}年轻时笑起来的样子。你分不清，是日子磨平了爱，还是你们忘了给爱浇水。'
        ]
      }
    ],
    choices: [
      {
        text: '转过身，把{{spouse}}摇醒：「我们谈谈吧。」',
        risk: '暗流',
        effects: { love: 6, family: 4, health: -1 },
        flags: ['criticalTalk'],
        after: '那一夜谈了很久，哭了，也笑了。天亮时，你们像把一艘搁浅的船重新推回了水里。婚姻没有因此变完美，但它重新开始呼吸了。',
        keywords: ['谈','谈谈','沟通','说开']
      },
      {
        text: '把话咽下去，继续维持表面的平静',
        risk: '暗流',
        effects: { love: -5, family: -2, mind: 2 },
        flags: ['silentReef'],
        after: '你选择了体面。日子照常过，饭照常做，只是有些话越积越深。后来你才知道，沉默的婚姻不是风平浪静，是海面下的暗流。',
        keywords: ['咽','不说','维持','忍']
      },
      {
        text: '走向那个人，试图在别处重新感受心动',
        risk: '深渊',
        effects: { love: 5, family: -8, mind: -4 },
        flags: ['strayed'],
        chance: { prob: .10, event: 'hospital' },
        after: '你越了线。那个人的目光确实让你重新年轻了几天，可每夜回家，你都要在楼下坐很久才上楼。有些路，走进去容易，走出来要扒一层皮。',
        keywords: ['那个人','越线','心动','出轨']
      }
    ],
    parallel: '如果你叫醒了{{spouse}}，你们会在二十年后金婚宴上，举杯敬那个深夜。而这一世，门还虚掩着——它等你决定要不要推开。'
  },
  {
    id: 'healthRed',
    title: '身体的红灯',
    minAge: 44, maxAge: 51, weight: 90, memory: true,
    scenes: [
      {
        time: '体检报告出来的下午',
        env: '医院 / 办公室',
        body: [
          '报告单上的几个箭头像红灯，在纸上亮着。医生说：「注意休息，戒了吧，不然……」他没说完，但那个省略号你已经听懂了。',
          '你走出医院，阳光很好。你忽然想起自己很久没有认真看过天空了。'
        ]
      }
    ],
    choices: [
      {
        text: '戒。把烟酒/熬夜的习惯连根拔掉',
        risk: '微澜',
        effects: { health: 8, mind: -2 },
        flags: ['quitBadHabits'],
        after: '戒断的日子很难熬，手心出汗，脾气暴躁。三个月后，你第一次跑完五公里，站在终点喘了很久——那是你给身体的道歉信。',
        keywords: ['戒','戒掉','运动','改']
      },
      {
        text: '把报告塞进抽屉，照旧',
        risk: '暗流',
        effects: { health: -8 },
        flags: ['ignoredHealth'],
        later: { at: 2, event: 'hospital' },
        after: '你照常抽烟/熬夜，假装那些箭头是机器出错。身体不会撒谎，它只是沉默地记账，等一个日子连本带利地讨回来。',
        keywords: ['塞','抽屉','照旧','没事']
      },
      {
        text: '减少一半，安慰自己「适量没事」',
        risk: '微澜',
        effects: { health: 3, mind: 1 },
        flags: ['halfQuit'],
        after: '你减了一半，以为这是和解。身体却知道，那只是拖延——账还挂着，只是利息慢一点。',
        keywords: ['一半','适量','少']
      },
      {
        text: '铁打的身板：医生的话记下，但你知道自己扛得住',
        risk: '微澜',
        effects: { health: 4, mind: 1 },
        flags: ['toughHealth'],
        needTalent: ['body'],
        after: '你确实扛过来了，复查指标一路向好。可你也学会了一件事：再铁的身板，也需要每年保养一次。',
        keywords: ['身板','扛','铁打','没事']
      }
    ]
  }
];
