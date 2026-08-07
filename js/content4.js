// 新增可能性：日常褶皱 · 无常 · 决堤
const EVENTS4 = [
  {
    id: 'foundWallet',
    title: '地上的钱包',
    minAge: 8, maxAge: 50, weight: 45,
    scenes: [
      {
        time: '午后',
        env: '{{city}} · 街角',
        body: [
          '一个钱包躺在路边，鼓鼓的，拉链半开，露出几张钞票和一张工作证。四周没有人。',
          '风把一片叶子吹到钱包上，又吹走了。它像在问你：现在，你打算怎么办？'
        ]
      }
    ],
    choices: [
      {
        text: '等在原地，直到失主气喘吁吁地跑回来',
        risk: '微澜',
        effects: { mind: 4, friend: 1, mood: 3 },
        flags: ['returnedWallet'],
        after: '失主执意要请你吃一碗面。那碗面很普通，但你吃出了「心安」两个字。',
        keywords: ['等','归还','失主','原地']
      },
      {
        text: '把钱包交到最近的派出所/管理处',
        risk: '平静',
        effects: { mind: 3, mood: 2 },
        flags: ['returnedWallet'],
        after: '你填了一张登记表。失主后来找到你道谢，你说「应该的」——这三个字，你那天说得很顺。',
        keywords: ['派出所','交','警察','管理']
      },
      {
        text: '揣进口袋，当作没看见',
        risk: '暗流',
        effects: { wealth: 3, mind: -3, mood: -2 },
        flags: ['keptWallet'],
        after: '钱花掉的那几天，你总觉得有人盯着你。其实没有。真正盯着你的，是你自己心里那面镜子。',
        keywords: ['揣','口袋','拿走','装']
      }
    ],
    parallel: '如果你等在了原地，会在三十年后的某个下午，收到一笔匿名汇款和一张字条：「那年的面，该我还了。」而这一世——你还有机会。'
  },
  {
    id: 'lostWay',
    title: '迷路',
    minAge: 6, maxAge: 18, weight: 45,
    scenes: [
      {
        time: '傍晚',
        env: '{{city}} · 陌生的巷子/街道',
        body: [
          '你只顾追一只蜻蜓/看橱窗，回过神来，周围的房子全不认识了。天色一点点暗下去，路灯还没亮。',
          '远处传来大人们说话的声音，近处是一个岔路口。'
        ]
      }
    ],
    choices: [
      {
        text: '走上前去问路，声音有点抖，但还是问了',
        risk: '平静',
        effects: { mind: 3, friend: 1, mood: 2 },
        flags: ['askedWay'],
        after: '路人把你送回了家。{{mother}}在巷口等你，看见你，什么都没说，只是把你搂得很紧。你学会了一件事：迷路时，开口比乱走快。',
        keywords: ['问','开口','路人','求助']
      },
      {
        text: '凭记忆往回走，相信自己能找到',
        risk: '微澜',
        effects: { mind: 4, mood: 1 },
        after: '你多绕了两条街，最后还是摸回了家。{{mother}}说你胆子大，其实你手心全是汗。有些路，得自己走过一遍才算数。',
        keywords: ['自己','记忆','找','走']
      },
      {
        text: '蹲在路边哭了起来，等大人来找',
        risk: '平静',
        effects: { family: 3, mind: -1, mood: -2 },
        after: '{{father}}找过来时，你哭得满脸花。他把你扛在肩上，说「不怕，爸在」。你后来知道，那天他请了半天假，找遍了半座城。',
        keywords: ['哭','等','蹲']
      }
    ]
  },
  {
    id: 'rainShare',
    title: '雨中共伞',
    minAge: 16, maxAge: 34, weight: 50,
    scenes: [
      {
        time: '骤雨',
        env: '城市 · 屋檐下',
        body: [
          '雨来得又急又密，你被困在屋檐下。身边站着一个人，也只带了一把伞。',
          '雨帘把世界隔成两半。你侧过头，正好对上他/她的目光。'
        ]
      }
    ],
    choices: [
      {
        text: '开口：「要不，一起走？」',
        risk: '微澜',
        effects: { love: 3, friend: 1, mood: 3 },
        flags: ['rainShared'],
        after: '你们共了一把伞，走过一条街。到岔路口时，他/她把伞塞给你，自己冲进雨里跑了。那把伞你用了很多年，直到伞骨坏掉，也没舍得扔。',
        keywords: ['一起','开口','伞','走']
      },
      {
        text: '把伞递过去：「你先用吧，我跑得快。」',
        risk: '平静',
        effects: { friend: 3, mind: 2, mood: 2 },
        after: '那人愣了一下，说「那怎么好意思」。你笑着冲进雨里，浑身湿透，却莫名觉得痛快。',
        keywords: ['递','你先','跑','让']
      },
      {
        text: '低头看手机，等雨小',
        risk: '平静',
        effects: { mood: -1 },
        after: '雨小了，你先走了。走出几步，你听见身后那把伞也收了。你们各自走进各自的雨里——人生的大多数相遇，本来就是这样。',
        keywords: ['手机','低头','等','躲']
      }
    ]
  },
  {
    id: 'nightCall',
    title: '深夜来电',
    minAge: 28, maxAge: 62, weight: 40,
    scenes: [
      {
        time: '深夜 · 十一点',
        env: '家',
        body: [
          '电话响了。接起来，那头沉默了几秒，一个陌生人的声音说：「对不起，打错了……您是第一个接电话的人。」',
          '那头顿了顿：「我本来想跟一个人说说话，但不知道该打给谁。」'
        ]
      }
    ],
    choices: [
      {
        text: '陪他/她聊几句，听听那个打错的电话里的人生',
        risk: '微澜',
        effects: { friend: 2, mind: 2, mood: 2 },
        after: '你们聊了十分钟。挂断前，那人说：「谢谢你，今晚我睡得着了。」你放下电话，觉得这十分钟，比白天许多小时都值得。',
        keywords: ['聊','听','陪','说']
      },
      {
        text: '说「你打错了」，轻轻挂断',
        risk: '平静',
        effects: { mind: 1 },
        after: '电话挂断，屋里重新安静下来。你躺回床上，忽然想：如果有一天，你也有个说不出口的电话，会打给谁？',
        keywords: ['打错','挂','挂了']
      }
    ]
  },
  {
    id: 'fleaMarket',
    title: '旧货市场的赌注',
    minAge: 24, maxAge: 62, weight: 40,
    scenes: [
      {
        time: '周末',
        env: '旧货市场',
        body: [
          '摊位上堆着旧钟、泛黄的书、看不出年代的瓷器。摊主叼着烟，说：「这些可都是好东西，识货的才拿得走。」',
          '你在一堆旧物里，看见一样让你停住的东西。'
        ]
      }
    ],
    choices: [
      {
        text: '凭直觉买下那件不起眼的东西',
        risk: '微澜',
        effects: { wealth: -2, mind: 1 },
        flags: ['fleaBought'],
        after: '回去擦干净，你发现它比想象中精致。多年后，它值了一笔小钱，也值了一段念想——你常常看着它，想起那个热闹的周末。',
        keywords: ['买','直觉','旧','挑']
      },
      {
        text: '讨价还价半天，最后只买那本旧书',
        risk: '平静',
        effects: { mind: 3, wealth: -1 },
        flags: ['fleaBook'],
        after: '书里有前主人夹着的车票、字条和一枚干花。你像读了一封写给陌生人的信。书很旧，但里面的时间还是新的。',
        keywords: ['书','还价','旧书','字条']
      },
      {
        text: '空手而归，说「都是骗人的」',
        risk: '平静',
        effects: { wealth: 1, mood: -1 },
        after: '你两手空空地走了。后来听说那摊子上的某件东西被人低价买走，转手卖了大价钱。你笑笑，没后悔——有些缘分，本来就不属于你。',
        keywords: ['不买','空手','骗人','走']
      }
    ]
  },
  {
    id: 'lottery',
    title: '彩票',
    minAge: 20, maxAge: 66, weight: 35,
    needStats: { luck: 45 },
    scenes: [
      {
        time: '某个下午',
        env: '街角彩票站',
        body: [
          '彩票站的老板朝你招手：「今天感觉不错，来一张？」玻璃柜里五颜六色的彩票，像一群等待开奖的谜。',
          '你的口袋里有刚好够买一张的钱，也只够买一张。'
        ]
      }
    ],
    choices: [
      {
        text: '买一张，号码随手写的',
        risk: '微澜',
        effects: { wealth: -1, mood: 1 },
        chance: { prob: .10, event: 'lotteryWin' },
        after: '开奖那天你对了三遍，中了。金额不大不小，够你高兴好一阵。你后来常想：那一串随手写的数字，是不是命运递来的小纸条？',
        keywords: ['买','彩票','写','一张']
      },
      {
        text: '不买，把钱省下来买一本想看的书',
        risk: '平静',
        effects: { mind: 2, wealth: 1 },
        after: '你买了书。那本书后来陪了你很多年，比彩票值钱多了——至少它从不让你失望。',
        keywords: ['不买','书','省']
      },
      {
        text: '财神眷顾：随手挑一张，连号都没看',
        risk: '微澜',
        effects: { wealth: -1, mood: 2 },
        chance: { prob: .35, event: 'lotteryWin' },
        needTalent: ['rich'],
        after: '开奖那天，你握着彩票的手有点抖。中了——数额够你乐呵一整年。你后来总说，财神爷认熟面孔。',
        keywords: ['随手','财神','挑','买']
      }
    ]
  },
  {
    id: 'lotteryWin',
    title: '意外的进账',
    minAge: 20, maxAge: 66, weight: 0,
    scenes: [
      {
        time: '开奖后的早晨',
        env: '家',
        body: [
          '你盯着屏幕/报纸上的号码，又对了一遍。中奖了——钱不多，但够你过一段舒坦日子。',
          '你忽然想起那句老话：运气这东西，来得快去得也快。你得想想，怎么接住它。'
        ]
      }
    ],
    choices: [
      {
        text: '存一半，花一半，给家人买点好东西',
        risk: '平静',
        effects: { wealth: 6, family: 3, mood: 3 },
        after: '你给{{mother}}买了件厚衣裳，给自己存了笔压箱底的钱。中奖的喜悦过去了，那份踏实留了下来。',
        keywords: ['存','一半','家人','买']
      },
      {
        text: '投进一笔生意/投资，赌它翻倍',
        risk: '暗流',
        effects: { wealth: -2, mind: 1 },
        chance: { prob: .35, event: 'hospital' },
        after: '运气没有第二次眷顾。你亏了一半，另一半买了教训。你后来总说：人只能接到住得下的钱。',
        keywords: ['投资','生意','翻倍','赌']
      }
    ]
  },
  {
    id: 'oldPhoto',
    title: '一张老照片',
    minAge: 45, maxAge: 80, weight: 40,
    scenes: [
      {
        time: '整理旧物时',
        env: '家',
        body: [
          '你从箱底翻出一张老照片，边角已经发黄。照片里的人还很年轻，笑得没有一丝心事。',
          '你认出那是二十/三十年前的自己，也认出照片背景里那座已经拆掉的房子。'
        ]
      }
    ],
    choices: [
      {
        text: '把照片装进相框，放在看得见的地方',
        risk: '平静',
        effects: { mind: 3, mood: 3, family: 1 },
        flags: ['keptOldPhoto'],
        after: '相框摆上书架，每天路过都能看见。你发现，那个年轻的自己一直在提醒你：别把现在的日子过成遗憾。',
        keywords: ['相框','摆','放','留']
      },
      {
        text: '看了一会儿，又把它放回箱底',
        risk: '微澜',
        effects: { mind: 2, mood: -2 },
        after: '有些照片，翻出来是为了再藏回去。你把箱子合上，像把某一段年月轻轻锁好。',
        keywords: ['放回','箱底','藏']
      },
      {
        text: '拍下照片，发给当年照片里的另一个人',
        risk: '微澜',
        effects: { friend: 3, love: 2, mood: 2 },
        needState: (s) => s.fam.bff || s.fam.firstLove,
        after: '对方回了一条消息：「那时候真年轻。」你们隔着屏幕笑了一会儿。照片没有变老，变老的是看着照片的人。',
        keywords: ['发','照片','对方','微信']
      }
    ]
  },
  {
    id: 'neighborDog',
    title: '邻居家的狗',
    minAge: 10, maxAge: 44, weight: 45,
    scenes: [
      {
        time: '傍晚',
        env: '{{city}} · 楼道/巷口',
        body: [
          '邻居家的狗蹲在门口，看见你，尾巴摇了摇。它脖子上没有项圈，毛有点乱，像是又溜出来玩了。',
          '它看看你，又看看巷口——那边正在放它爱看的动静。'
        ]
      }
    ],
    choices: [
      {
        text: '蹲下来摸摸它，陪它等到主人回来',
        risk: '平静',
        effects: { friend: 2, mood: 3 },
        after: '你陪它蹲了十分钟，它把爪子搭在你膝盖上。主人回来连声道谢。后来它每次见到你，都会先摇尾巴——动物记得所有温柔的瞬间。',
        keywords: ['摸','陪','等','蹲']
      },
      {
        text: '不理它，径直走过去',
        risk: '平静',
        effects: { mood: -1 },
        after: '你走过去了。回头看时，它还蹲在那里，尾巴已经放下来了。你告诉自己别多想——但那天晚上，你梦里有一条摇尾巴的影子。',
        keywords: ['不理','走','不管']
      }
    ]
  },
  {
    id: 'dream',
    title: '一场梦',
    minAge: 12, maxAge: 88, weight: 40,
    scenes: [
      {
        time: '深夜',
        env: '梦',
        body: [
          '你梦见自己走在{{city}}的巷子里，迎面走来一个人，看不清脸，却觉得无比熟悉。他/她朝你笑了笑，说：「你来了。」',
          '梦里的阳光很好。你醒来时，天还没亮，枕边有种说不清的味道。'
        ]
      }
    ],
    choices: [
      {
        text: '把梦记下来，写进日记/备忘录',
        risk: '平静',
        effects: { mind: 3, mood: 2 },
        flags: ['wroteDream'],
        after: '字迹在纸上洇开。后来你再翻到那一页，还是会愣一下——有些梦，像命运提前寄来的信。',
        keywords: ['记','写','日记','梦']
      },
      {
        text: '翻个身，把它还给黑夜',
        risk: '平静',
        effects: { mood: 1 },
        after: '你很快又睡着了，梦却没有续上。有些事，错过了那个醒来的瞬间，就再也抓不住。',
        keywords: ['睡','翻身','不管']
      }
    ]
  },
  {
    id: 'strangerStation',
    title: '车站的陌生人',
    minAge: 18, maxAge: 50, weight: 40,
    scenes: [
      {
        time: '候车厅',
        env: '车站/机场',
        body: [
          '广播里传来检票通知，你发现车票不见了。翻遍口袋和背包，只剩下手心一层汗。',
          '身后有人拍了拍你的肩：「掉地上了，刚有人差点踩到。」'
        ]
      }
    ],
    choices: [
      {
        text: '连声道谢，问对方去哪，聊了一路',
        risk: '平静',
        effects: { friend: 3, mood: 3 },
        after: '原来你们坐同一班车，座位隔了三排。下车时互道珍重，谁也没留联系方式——有些温暖，只属于那一程。',
        keywords: ['谢','聊','问','谢谢']
      },
      {
        text: '道谢后匆忙检票，把这件事丢在风里',
        risk: '平静',
        effects: { mind: 1 },
        after: '你赶上了车。那个人后来淹没在人群里。你偶尔会想起他/她，像想起一个没有署名的善意。',
        keywords: ['谢','赶','走','检票']
      }
    ]
  },
  {
    id: 'firstSnow',
    title: '初雪',
    minAge: 5, maxAge: 34, weight: 45,
    scenes: [
      {
        time: '冬天 · 清晨',
        env: '{{city}}',
        body: [
          '你推开窗/门，雪正落在{{geoVista}}上。世界忽然安静下来，连声音都变软了。',
          '雪地上还没有脚印。你是这座城今天第一个踩雪的人。'
        ]
      }
    ],
    choices: [
      {
        text: '跑到雪里，接住第一片雪花',
        risk: '平静',
        effects: { mood: 4, health: 1 },
        after: '雪在掌心化成一滴水。你哈了口气，白雾升起来。那一刻，你觉得自己被冬天认真对待了。',
        keywords: ['跑','接','雪','玩']
      },
      {
        text: '站在窗前看了一会儿，泡了杯热茶',
        risk: '平静',
        effects: { mind: 2, mood: 2 },
        after: '茶的热气模糊了窗。你隔着雾看雪，像看一场无声的电影。有些风景，安静地看，反而记得更久。',
        keywords: ['看','茶','窗','站']
      }
    ]
  },
  {
    id: 'breakdown',
    title: '决堤',
    minAge: 12, maxAge: 88, weight: 0, memory: true,
    scenes: [
      {
        time: '某个普通的深夜',
        env: '家 / 空无一人的地方',
        body: [
          '那些被咽下去的话，忽然全都涌了上来。你没有做错什么大事，只是累了——像一道堤坝，平日里承受着所有水流，今夜裂开了一道缝。',
          '你听见自己哭出来的声音，陌生得像别人的。窗外有雨/有风/有路灯，替你守着这个夜晚。'
        ]
      }
    ],
    choices: [
      {
        text: '拨通最信任的那个人的电话，哪怕只是哭一场',
        risk: '微澜',
        effects: { mood: 14, friend: 3, family: 2 },
        flags: ['brokeDown', 'calledSomeone'],
        after: '那头接起电话，听见你的声音，只说了一句：「我在。」就这一句，你哭了好久。天亮时你发现，堤坝没有塌——它只是学会了开闸。',
        keywords: ['电话','打','哭','信任']
      },
      {
        text: '把那些话写在纸上，写到最后手抖得握不住笔',
        risk: '平静',
        effects: { mood: 10, mind: 4 },
        flags: ['brokeDown', 'wroteItOut'],
        after: '纸写满了，你又翻到背面继续写。写完的那一刻，你像卸下了一袋沙。纸没有回答你，但纸没有嘲笑你——那已经够了。',
        keywords: ['写','纸','笔','日记']
      },
      {
        text: '一个人熬到天亮，不让任何人看见',
        risk: '暗流',
        effects: { mood: 4, health: -3, mind: -1 },
        flags: ['brokeDown', 'enduredAlone'],
        after: '天亮了，你洗了把脸，照常出门，笑得很正常。没有人知道你昨夜在哪里。身体替你记着这笔账——它最诚实。',
        keywords: ['熬','天亮','一个人','忍']
      }
    ]
  }
];
