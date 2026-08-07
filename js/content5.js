// 人性的险恶：暗面事件库
const EVENTS5 = [
  {
    id: 'framedFriend',
    title: '被指认的时候',
    minAge: 6, maxAge: 12, weight: 50, darkTheme: true,
    scenes: [
      {
        time: '课间',
        env: '{{city}} · 教室',
        body: [
          '同桌的钢笔不见了，老师站在讲台上，目光扫过全班：「谁拿的，自己站出来。」',
          '你的好朋友脸色发白。你忽然想起来——课间他借过你的手，把什么东西塞进了你的书包夹层。',
          '老师的目光停在你身上。全班安静得像一间空教室。'
        ]
      }
    ],
    choices: [
      {
        text: '站起来：「不是他拿的，是我。」',
        risk: '暗流',
        effects: { friend: 5, integrity: 3, mind: -1 },
        flags: ['tookBlame'],
        after: '你替他扛了。老师罚你站了一节课，你在心里默默算了算这笔账：值。他后来再没提过这件事——直到很多年后，他忽然说：「当年那支笔，是我藏进去的。」',
        keywords: ['是我','扛','站出来','承认']
      },
      {
        text: '把他供出来：「老师，我看见是他拿的。」',
        risk: '微澜',
        effects: { friend: -6, integrity: 1, mind: 1 },
        flags: ['toldOnFriend'],
        after: '他挨了批评，回头看你时，眼神里的东西你很久才读懂——那不是恨，是失望。你后来总想：当时我是不是应该先问问他，为什么？',
        keywords: ['是他','供','揭发','老师']
      },
      {
        text: '趁乱把钢笔塞回他书包，假装什么都不知道',
        risk: '暗流',
        effects: { friend: -3, integrity: -3, mind: 3 },
        flags: ['plantedBack'],
        after: '你动作很快，没人看见。钢笔在他书包里被找到，他百口莫辩。那天放学，他一个人走了，你也没追。有些线，跨过去就再也回不来。',
        keywords: ['塞','不知道','趁乱','装']
      }
    ],
    parallel: '如果你站出来扛了，这支笔会成为你们友谊里一根拔不掉的刺——但也可能成为多年后他帮你挡下一次灾祸的伏笔。'
  },
  {
    id: 'bullyWatch',
    title: '墙角的人',
    minAge: 10, maxAge: 16, weight: 50, darkTheme: true,
    scenes: [
      {
        time: '放学后',
        env: '{{city}} · 学校围墙边',
        body: [
          '几个高年级学生把一个人堵在墙角，书包被扔在地上，课本散了一地。',
          '领头的那个是你认识的“大哥”，他朝你抬了抬下巴，意思是：一起过来玩。',
          '被堵住的人抬头看了你一眼——他/她认识你，你们同过班。'
        ]
      }
    ],
    choices: [
      {
        text: '走过去，把课本捡起来，挡在他/她前面',
        risk: '暗流',
        effects: { friend: 3, integrity: 5, health: -3 },
        flags: ['stoodUp'],
        after: '你站过去了。高年级的人嗤笑一声，散了。你的手在抖，但你的脚跟没有动。那天你懂了：勇气不是不害怕，是害怕了还站着。',
        keywords: ['挡','捡','站','出头']
      },
      {
        text: '低头绕过去，假装没看见',
        risk: '微澜',
        effects: { integrity: -3, mind: 1, mood: -2 },
        flags: ['lookedAway'],
        after: '你走过去了。身后传来书本落地的声音，你没有回头。那声音后来在你很多个夜晚里，轻轻响过。',
        keywords: ['绕','没看见','低头','走']
      },
      {
        text: '加入他们，笑着踢了一脚',
        risk: '深渊',
        effects: { friend: 2, integrity: -8, mind: -2 },
        flags: ['joinedBully'],
        after: '你踢了。大家笑得更响，你也在笑，可笑声里有什么东西裂开了一条缝。很多年后你路过那个墙角，还会下意识加快脚步。',
        keywords: ['加入','踢','一起','笑']
      }
    ],
    parallel: '如果你站了出去，那个被堵在墙角的人会在二十年后替你挡住一次更险恶的构陷——善有回音，只是路远。'
  },
  {
    id: 'cheatOffer',
    title: '代考的代价',
    minAge: 13, maxAge: 18, weight: 50, darkTheme: true,
    scenes: [
      {
        time: '放学后 · 巷口',
        env: '{{city}}',
        body: [
          '高年级的“朋友”把你叫到巷口，递过一支烟（你没接）：「听说你成绩好，帮我考一次，钱不是问题。」',
          '他拍了拍你的肩：「放心，天知地知你知我知。」他的笑容很熟，像在街角见过无数次。'
        ]
      }
    ],
    choices: [
      {
        text: '直觉不对——「这事不简单，我不干。」',
        risk: '微澜',
        effects: { mind: 2, integrity: 2 },
        needStats: { discern: 52 },
        flags: ['refusedCheat'],
        after: '你转身走了。后来你听说，答应替他考的那个人被抓了现行，而他撇得干干净净。你后背一阵发凉——原来那条巷子，早就给他备好了替罪羊。',
        keywords: ['不干','直觉','不对','拒绝']
      },
      {
        text: '答应，但只帮他这一次',
        risk: '暗流',
        effects: { wealth: 3, integrity: -4 },
        flags: ['cheatedForMoney'],
        later: { at: 2, event: 'revealCheat' },
        after: '钱到手的那天，你把它压在枕头底下，一夜没睡好。后来你才明白，有些第一次，是专门用来打开门的。',
        keywords: ['答应','帮他','钱','一次']
      },
      {
        text: '拒绝，但没多说什么，也不想得罪他',
        risk: '平静',
        effects: { mind: 1 },
        after: '你说「我不行」，他笑了笑说「行吧」。你走得很快。他没有追上来，但你知道，这条巷子你最好绕开走。',
        keywords: ['不行','拒绝','走','不干']
      }
    ]
  },
  {
    id: 'loveTwoBoats',
    title: '两条船',
    minAge: 16, maxAge: 22, weight: 55, darkTheme: true,
    scenes: [
      {
        time: '傍晚 · 天桥上',
        env: '城市',
        body: [
          '你看见{{firstLove}}和另一个人并肩走在天桥那头，手在风里碰了一下，又分开。',
          '你的心沉到胃里。你没有立刻冲上去，只是站在原地，看着两个背影越走越远。'
        ]
      }
    ],
    choices: [
      {
        text: '当晚摊牌：「我都看见了。」',
        risk: '暗流',
        effects: { love: -5, mind: 3, integrity: 1 },
        flags: ['confrontedTwoBoats'],
        after: '{{firstLove}}沉默了很久，说「对不起」。你点头，转身，没有回头。那天的风很冷，但你觉得，自己终于没有在谎话里多待一天。',
        keywords: ['摊牌','看见了','当面','说']
      },
      {
        text: '什么也不说，慢慢淡出这段关系',
        risk: '微澜',
        effects: { love: -4, mind: 2 },
        flags: ['quietlyLeftLove'],
        after: '你没有质问，只是不再回消息，不再赴约。{{firstLove}}后来追问过一次，你说「没什么」。有些告别不需要台词，只需要转身。',
        keywords: ['淡','不回','走','不说']
      },
      {
        text: '我也去撩别人，让你也尝尝',
        risk: '深渊',
        effects: { love: 2, integrity: -7, mind: -2 },
        flags: ['revengeFlirt'],
        after: '你确实让他/她难受了。可你在镜子里看见自己笑起来的样子，忽然觉得陌生——你报复的是他/她，可弄脏的是自己的手。',
        keywords: ['报复','撩','也','故意']
      }
    ],
    parallel: '如果你当场摊牌，会在多年后收到一条短信：「那时是我对不起你，但你的背影让我学会了珍惜下一个人。」'
  },
  {
    id: 'debtGone',
    title: '借钱与失踪',
    minAge: 22, maxAge: 30, weight: 55, darkTheme: true,
    scenes: [
      {
        time: '第三个月',
        env: '城市 · 出租屋',
        body: [
          '{{bff}}向你借的那笔钱，三个月没还了。电话从“在路上了”变成无人接听，最后变成了空号。',
          '你从共同的朋友那里听说：他/她拿那笔钱去赌了，输了，人已经离开这座城市。'
        ]
      }
    ],
    choices: [
      {
        text: '找到他/她，当面把话说清楚，钱分期还',
        risk: '微澜',
        effects: { wealth: 4, friend: -4, integrity: 1 },
        flags: ['chasedDebt'],
        later: { at: 1, event: 'revealDebt' },
        after: '你找到了人。他/她低着头说「对不起」。钱分了一年还清，你们再没做过朋友，但也没变成仇人。成年人的账，算清了就是清了。',
        keywords: ['找','当面','分期','要']
      },
      {
        text: '算了，就当用这笔钱看清一个人',
        risk: '微澜',
        effects: { wealth: -5, mind: 3, integrity: 1 },
        flags: ['forgaveDebt'],
        later: { at: 1, event: 'revealDebt' },
        after: '你删掉了那个号码。钱没要回来，但你买了个明白：有些人出现在你生命里，是为了教会你一句话的分量。',
        keywords: ['算了','看清','不要','删']
      },
      {
        text: '去他/她单位门口堵人，让他/她把脸丢尽',
        risk: '深渊',
        effects: { wealth: 3, friend: -8, integrity: -6, mood: -3 },
        flags: ['publicShamed'],
        after: '钱要回来了一半，可他/她后来听说辞职搬走了。你赢了，可你赢回来的钱，每一张都带着那天的难堪。你偶尔想：值吗？',
        keywords: ['堵','单位','丢脸','闹']
      }
    ],
    parallel: '如果你算了，会在五年后收到一笔匿名转账，数额正好是那笔钱，附言只有两个字：「谢谢。」'
  },
  {
    id: 'bossScapegoat',
    title: '背上的锅',
    minAge: 26, maxAge: 36, weight: 55, darkTheme: true,
    scenes: [
      {
        time: '周五 · 下班前',
        env: '办公室',
        body: [
          '领导把你叫进办公室，关上门：「那个合同，是你签的，对吧？」',
          '你确实签了——是在他反复催促下签的，条款你当时提出过疑问，他说「没问题，出了事我担着」。',
          '现在出了事。他微笑着看着你，像看着一枚早就选好的棋子。'
        ]
      }
    ],
    choices: [
      {
        text: '扛下来：「是我签的，我负责。」',
        risk: '暗流',
        effects: { career: -3, integrity: 4, mind: 2 },
        flags: ['tookBlameWork'],
        after: '你背了处分，降了级。领导拍拍你的肩说「委屈你了」。三个月后他调走了，临走前把你推荐给了新来的总经理：「这个人，靠得住。」',
        keywords: ['扛','负责','是我','认']
      },
      {
        text: '把邮件记录和聊天记录摊开，公事公办',
        risk: '暗流',
        effects: { career: -1, integrity: 3, mind: 4, friend: -2 },
        needStats: { discern: 55 },
        flags: ['evidenceFight'],
        after: '你早有准备——每一次催签，你都留了记录。领导脸色变了几变，最后说「那可能是我记错了」。你保住了自己，也从此成了他的眼中钉。',
        keywords: ['记录','证据','摊开','邮件']
      },
      {
        text: '把锅推给刚来的实习生：「是他经手的。」',
        risk: '深渊',
        effects: { career: 4, integrity: -9, mood: -4 },
        flags: ['scapegoatedJunior'],
        after: '实习生被辞退了。他收拾东西那天，在门口站了很久，回头看了你一眼。你低下头，假装在忙。那一眼，你后来梦见过很多次。',
        keywords: ['实习生','推','是他','甩锅']
      }
    ]
  },
  {
    id: 'loverBestFriend',
    title: '两条相交的线',
    minAge: 24, maxAge: 34, weight: 50, darkTheme: true,
    onlyIf: (s) => !!s.fam.spouse || s.flags.includes('lovePartner'),
    scenes: [
      {
        time: '深夜 · 咖啡店外',
        env: '城市',
        body: [
          '你看见{{spouse}}和{{bff}}坐在靠窗的位置。他/她们没有牵手，但你看得懂那种距离——那是只有彼此熟悉的人才有的松弛。',
          '你站在玻璃外，隔着灯光看了一会儿，转身走了。'
        ]
      }
    ],
    choices: [
      {
        text: '分别约他们出来，把三张牌摊在桌上',
        risk: '暗流',
        effects: { love: -3, friend: -3, mind: 4, integrity: 1 },
        flags: ['threeWayTalk'],
        after: '那天你们谈了很久。{{spouse}}承认了心动，{{bff}}低下了头。你最后说：「我不恨你们，但我们都该诚实。」有些关系的结束，可以体面。',
        keywords: ['摊牌','三方','谈','诚实']
      },
      {
        text: '什么都不说，把这段关系慢慢放凉',
        risk: '暗流',
        effects: { love: -5, friend: -4, mind: 2 },
        flags: ['cooledTriangle'],
        after: '你开始加班，开始沉默。他们大概也感觉到了，谁都没有挑破。半年后你们体面地分开——像三片叶子，各自落向不同的地方。',
        keywords: ['放凉','沉默','不说','淡']
      },
      {
        text: '在朋友圈/单位里放出风声，让所有人看他们笑话',
        risk: '深渊',
        effects: { friend: -6, love: -6, integrity: -8, mood: -2 },
        flags: ['publicShamedTriangle'],
        after: '谣言像长了腿。他们被议论、被排挤，你站在远处，以为这样会痛快。可你发现，别人看你的眼神也变了——人们知道是你放的线。',
        keywords: ['放风','谣言','公开','笑话']
      }
    ]
  },
  {
    id: 'sweetTrap',
    title: '蜜糖与刀',
    minAge: 28, maxAge: 45, weight: 55, darkTheme: true,
    scenes: [
      {
        time: '深夜 · 手机屏幕',
        env: '城市 · 出租屋/家',
        body: [
          '你在网上认识的“朋友”聊了三个月，每天早晚安，声音好听，还“无意间”提起一个稳赚的内部项目：「我已经投了，就等你。」',
          '他/她发来一个链接，页面做得非常漂亮，收益数字红得诱人。',
          '窗口右下角，系统提示：该网站未通过安全认证。'
        ]
      }
    ],
    choices: [
      {
        text: '直觉像针一样扎了一下——先查再投',
        risk: '微澜',
        effects: { mind: 3, wealth: 2, integrity: 1 },
        needStats: { discern: 55 },
        flags: ['dodgedTrap'],
        after: '你查了。注册主体、客服话术、那个“稳赚”的收益曲线——全是造出来的。你删掉对话，拉黑了号码。三个月后新闻曝光，同一个套路，很多人倾家荡产。',
        keywords: ['查','直觉','先查','骗']
      },
      {
        text: '投一小笔试试水',
        risk: '深渊',
        effects: { wealth: -4, integrity: -2, mood: -3 },
        flags: ['fellForTrap'],
        later: { at: 1, event: 'revealTrap' },
        after: '第一笔“收益”到账时，你松了口气。第二笔投得更多。第三个月，平台打不开了。你盯着那个加载失败的页面，很久没有动。',
        keywords: ['试试','投','小笔','信']
      },
      {
        text: '不理它，也不再回复消息',
        risk: '平静',
        effects: { mind: 1, friend: -1 },
        flags: ['ignoredTrap'],
        after: '你删掉了对话框。他/她后来又发过几次验证码式的消息，你没有点开。你不知道自己躲过了什么，但你睡得着觉。',
        keywords: ['不理','删','不回复','拉黑']
      }
    ],
    parallel: '如果你查了，会发现那家平台的“法人”三个月前刚被列为失信被执行人——而这条信息，就躺在新闻页第三屏。'
  },
  {
    id: 'grandmaScam',
    title: '母亲的“健康课”',
    minAge: 35, maxAge: 55, weight: 50, darkTheme: true,
    onlyIf: (s) => s.fam.mother.alive,
    scenes: [
      {
        time: '周末回家',
        env: '{{city}} · 老家',
        body: [
          '{{mother}}兴冲冲地给你看一箱保健品：「效果特别好，听课还送鸡蛋，我已经投了三万。」',
          '你的血一下子冲上头顶。你知道那种“健康讲座”：先送鸡蛋，再喊爸妈，最后掏空养老钱。'
        ]
      }
    ],
    choices: [
      {
        text: '陪她去“听课”，当场把话挑明，然后报警',
        risk: '暗流',
        effects: { family: -2, wealth: 4, integrity: 4, mind: 2 },
        flags: ['stoppedScam'],
        after: '会场被查了，钱追回来大半。{{mother}}在派出所门口红着眼说：「我就是怕给你们添麻烦，想自己赚点……」。你抱了抱她，什么都没说。',
        keywords: ['报警','陪','听课','挑明']
      },
      {
        text: '算了，劝不动就由她吧，钱就当买她开心',
        risk: '微澜',
        effects: { wealth: -3, family: 1, integrity: -2 },
        flags: ['letScamGo'],
        after: '那箱保健品后来堆在墙角，落了灰。{{mother}}再没提过赚钱的事，但你知道，她心里那笔账没有平。有些沉默，比争吵更疼。',
        keywords: ['算了','由她','买开心','不劝']
      },
      {
        text: '带着母亲去找那个“老师”，把钱要回来',
        risk: '暗流',
        effects: { wealth: 3, integrity: 1, health: -2 },
        flags: ['confrontedScammer'],
        after: '你堵在会场门口，对方人多势众，最后只退了五千。你护着母亲走出来时，听见身后有人骂你“多管闲事”。你攥紧了拳头，没有回头。',
        keywords: ['找','要钱','堵','老师']
      }
    ]
  },
  {
    id: 'relativeDebt',
    title: '亲戚的账',
    minAge: 30, maxAge: 50, weight: 50, darkTheme: true,
    scenes: [
      {
        time: '过年 · 饭桌',
        env: '{{city}} · 老家',
        body: [
          '亲戚借走的钱已经拖了三年。今年饭桌上，对方举着酒杯，笑着对满桌人说：「都是一家人，他那点钱，急什么？」',
          '满桌人都看向你。有人打圆场，有人低头夹菜。那一瞬间，你分不清谁是亲人，谁是看客。'
        ]
      }
    ],
    choices: [
      {
        text: '把借条摊在桌上：「一家人，更要把账算清。」',
        risk: '微澜',
        effects: { wealth: 4, family: -3, integrity: 2 },
        flags: ['settledRelativeDebt'],
        after: '饭桌安静了几秒，亲戚讪讪地笑了：「开个玩笑嘛。」钱后来还了，但每年过年，你们之间的座位，都隔着一个看不见的空位。',
        keywords: ['借条','算清','摊','当面']
      },
      {
        text: '笑着举杯：「不急，您先用着。」',
        risk: '微澜',
        effects: { wealth: -4, family: 2, integrity: 1 },
        flags: ['letRelativeDebtGo'],
        after: '你咽下了那口气。母亲事后说「你做得对」。可那天夜里，你在阳台上站了很久——你分不清那是对，还是只是好欺负。',
        keywords: ['不急','算了','举杯','忍']
      },
      {
        text: '当着全家人的面，把他当年求你的样子说出来',
        risk: '深渊',
        effects: { wealth: 4, family: -5, integrity: -5, mood: -3 },
        flags: ['shamedRelative'],
        after: '你赢了。他脸色铁青，摔了筷子走人。满桌人沉默着吃完那顿饭。你回到家，母亲叹了口气：「都是一家人，何必呢。」那口气，你记了很久。',
        keywords: ['说出来','揭','当年','丢脸']
      }
    ]
  },
  {
    id: 'rumorMill',
    title: '谣言的牙齿',
    minAge: 30, maxAge: 50, weight: 50, darkTheme: true,
    scenes: [
      {
        time: '茶水间/楼道',
        env: '办公室/小区',
        body: [
          '你忽然发现，同事/邻居看你的眼神变了。有人在背后说你和领导“关系不一般”——而你知道，那只是你拒绝过三次的应酬。',
          '谣言没有署名，但所有人都知道它从谁的嘴里出来。你路过茶水间时，声音恰好停下来。'
        ]
      }
    ],
    choices: [
      {
        text: '当面找源头谈：「有什么话，站到明处说。」',
        risk: '微澜',
        effects: { mind: 2, integrity: 2, friend: 1 },
        flags: ['confrontedRumor'],
        after: '那人涨红了脸，说“我也是听别人说的”。你知道，这就是谣言的生存方式——没有源头，只有接力。但你的那句话，让接力断了一棒。',
        keywords: ['当面','源头','谈','明处']
      },
      {
        text: '不解释。日子久了，谣言自己会烂',
        risk: '平静',
        effects: { mind: 3, mood: -2 },
        flags: ['silencedRumor'],
        after: '你确实熬过去了，谣言慢慢淡了。但你知道，有些人的耳朵永远留着那道划痕——他们不需要真相，他们只需要故事。',
        keywords: ['不解释','熬','沉默','算了']
      },
      {
        text: '以谣制谣：放一个更响的“消息”出去',
        risk: '深渊',
        effects: { friend: -2, integrity: -7, mind: -1 },
        flags: ['counterRumor'],
        after: '新的谣言盖住了旧的。你安全了，可你发现，自己也成了那种人——你用来保护自己的武器，有一天也会划伤别人。',
        keywords: ['放','谣言','更响','反击']
      }
    ]
  },
  {
    id: 'spouseAffair',
    title: '抽屉里的实锤',
    minAge: 36, maxAge: 48, weight: 55, darkTheme: true,
    scenes: [
      {
        time: '整理衣柜的下午',
        env: '家',
        body: [
          '你在{{spouse}}的旧外套口袋里，摸到一张电影票根。日期是你出差那晚，旁边还有两张，并排。',
          '你没有声张，把它放回口袋。那晚你们照常吃饭、看电视、道晚安——像一场无声的对手戏。'
        ]
      }
    ],
    choices: [
      {
        text: '把票根放在桌上：「我们谈谈。」',
        risk: '暗流',
        effects: { love: -5, family: -2, integrity: 1, mind: 4 },
        flags: ['confrontedAffair'],
        after: '那晚谈了很久，哭过，也沉默过。{{spouse}}承认了。你们没有立刻决定去留，但至少，谎言的墙被凿开了一个口子。',
        keywords: ['票根','谈','放在桌上','摊牌']
      },
      {
        text: '把票根放回去，当作没看见',
        risk: '暗流',
        effects: { love: -6, family: -2, integrity: -2, mind: 1 },
        flags: ['ignoredAffair'],
        after: '你们继续过着“正常”的日子。只是从那以后，你每晚会多看他/她几秒——你不知道自己是在寻找证据，还是在等一个回头。',
        keywords: ['放回','没看见','装','忍']
      },
      {
        text: '跟踪、取证、让他/她在所有人面前难堪',
        risk: '深渊',
        effects: { love: -8, family: -6, integrity: -8, mind: -1 },
        flags: ['exposedAffair'],
        after: '你赢了这场战争，也输掉了这个家。亲戚朋友都站在你这边，可你深夜醒来，看着身边空荡荡的位置，忽然不知道赢来了什么。',
        keywords: ['跟踪','取证','曝光','难堪']
      }
    ],
    parallel: '如果你放回了票根，这段婚姻会带着那道裂缝再走十年——裂缝不会消失，它只是学会了安静。'
  },
  {
    id: 'childSquander',
    title: '孩子的“创业”',
    minAge: 50, maxAge: 65, weight: 50, darkTheme: true,
    need: ['hasChild'],
    scenes: [
      {
        time: '深夜',
        env: '家',
        body: [
          '{{child}}第三次开口要钱，理由是“创业”。你查了查他/她说的项目，发现法人早就注销了——而账单显示，钱流向了赌场和直播打赏。',
          '你坐在客厅里，手里攥着那张打印出来的流水，灯下看了很久。'
        ]
      }
    ],
    choices: [
      {
        text: '把流水拍在桌上：「钱，一分都不给了。」',
        risk: '微澜',
        effects: { family: -4, wealth: 3, integrity: 3, mind: 1 },
        flags: ['cutChildOff'],
        after: '他/她摔门走了。一个月后，他/她回来，低着头说「爸/妈，我错了」。那笔流水你留了很多年，不是为了翻旧账，是为了提醒自己：爱，也要有牙齿。',
        keywords: ['不给','流水','拍','断']
      },
      {
        text: '再给最后一次，说好是最后一笔',
        risk: '暗流',
        effects: { family: 2, wealth: -5, integrity: -2 },
        flags: ['gaveChildAgain'],
        after: '“最后一次”像一道永远关不上的门。他/她越来越熟练，你越来越沉默。你偶尔想：这到底是爱，还是害怕失去爱？',
        keywords: ['最后一次','给','再给','心软']
      },
      {
        text: '逼他/她签借条，按银行利息算',
        risk: '微澜',
        effects: { family: -2, wealth: 4, integrity: 2 },
        flags: ['iouChild'],
        after: '他/她签字时手在抖，骂你“冷血”。但那张借条成了绳子，把他/她从悬崖边拉回来了几次。多年后他/她说：「那时候我恨你，现在谢谢你。」',
        keywords: ['借条','利息','签','冷血']
      }
    ]
  },
  {
    id: 'nursingHome',
    title: '养老院的窗',
    minAge: 60, maxAge: 75, weight: 45, darkTheme: true,
    scenes: [
      {
        time: '探望日',
        env: '养老院',
        body: [
          '{{mother}}/{{father}}住进养老院的第三个月，你去看他/她。护工笑着说“老人最近闹脾气”，但你注意到，他/她手腕上有淤青，袖口正好盖住。',
          '院长把你叫到办公室，热情地递茶：「老人家年纪大了，磕磕碰碰难免。要是闹出去，对谁都不好，你说是不是？」'
        ]
      }
    ],
    choices: [
      {
        text: '当面不说，出门就报警 + 卫健委举报',
        risk: '暗流',
        effects: { family: 4, integrity: 5, mind: 2, health: -2 },
        flags: ['reportedNursingHome'],
        after: '调查组来了，护工被处理，老人被接回家。你后来请了人专门照料。那段时间很累，但你每次看见他/她安睡的脸，都觉得值。',
        keywords: ['报警','举报','取证','接回']
      },
      {
        text: '换一家贵一点的养老院，多一事不如少一事',
        risk: '微澜',
        effects: { family: 1, wealth: -4, integrity: -3 },
        flags: ['movedNursingHome'],
        after: '新养老院确实好些。但那天你坐在车上，看着旧楼越来越远，忽然觉得自己像是把什么“交给了别人”——包括本该自己背的那份责。',
        keywords: ['换','贵','多一事','转院']
      },
      {
        text: '找人“教训”那个护工，让他知道厉害',
        risk: '深渊',
        effects: { family: 2, integrity: -8, health: -2, mood: -2 },
        flags: ['hiredRevenge'],
        after: '护工确实不敢了。但你也成了他口中“惹不起的人”。你保护了家人，可那天晚上你对着镜子看了很久——你不确定镜子里的自己，还是不是原来那个人。',
        keywords: ['教训','找人','打','厉害']
      }
    ]
  },
  {
    id: 'inheritanceFight',
    title: '遗产与人心',
    minAge: 55, maxAge: 75, weight: 50, darkTheme: true,
    scenes: [
      {
        time: '后事办完的第七天',
        env: '{{city}} · 老屋',
        body: [
          '父母留下的老屋和存折，摆在桌上。兄弟姐妹围坐着，空气里有一种小时候过年时才有的紧张——只是这一次，没有人夹菜。',
          '有人先开口：「房子怎么分？」'
        ]
      }
    ],
    choices: [
      {
        text: '主动让一步：「我那份，给条件最差的。」',
        risk: '微澜',
        effects: { family: 5, wealth: -4, integrity: 4, mind: 1 },
        flags: ['gaveInheritance'],
        after: '桌上安静了几秒。条件最差的那个兄弟姐妹低下了头。多年后，他/她在你最难的时候，把那份情还了回来。',
        keywords: ['让','给','最差','不要']
      },
      {
        text: '请律师来，按法律清清楚楚地分',
        risk: '微澜',
        effects: { wealth: 2, family: -2, mind: 3, integrity: 2 },
        flags: ['lawInheritance'],
        after: '分得很公平，谁也没多占。但“公平”两个字在饭桌上放凉了，那顿散伙饭，你们吃得很快。',
        keywords: ['律师','法律','公平','分']
      },
      {
        text: '抢先一步，把值钱的东西先搬走',
        risk: '深渊',
        effects: { wealth: 6, family: -7, integrity: -9, mood: -3 },
        flags: ['grabbedInheritance'],
        after: '你搬走了东西，也搬走了那几年的团圆。后来每逢过年，你的座位总空着——不是没人叫，是没人知道怎么面对你。',
        keywords: ['先搬','抢','抢先','值钱']
      }
    ],
    parallel: '如果你让了那一步，会在某个深夜收到一条语音：「哥/姐，那年的房子……谢谢你。」声音是哑的，你听了一遍又一遍。'
  },
  {
    id: 'pyramidScheme',
    title: '老友的“项目”',
    minAge: 40, maxAge: 60, weight: 50, darkTheme: true,
    scenes: [
      {
        time: '饭局',
        env: '城市 · 餐馆',
        body: [
          '多年不见的老同学请你吃饭，酒过三巡，他/她压低声音：「有个项目，稳赚。你只要再拉三个人，躺赚。」',
          '你想起大学时他/她借过你笔记、替你打过饭。但你也看见，他/她手腕上的表比上个月多了两块。'
        ]
      }
    ],
    choices: [
      {
        text: '直接点破：「这是传销，你醒醒。」',
        risk: '微澜',
        effects: { friend: -3, integrity: 3, mind: 2 },
        flags: ['wokeFriend'],
        after: '他/她脸色变了，说「你不懂」。你们不欢而散。一年后他/她给你打电话，声音疲惫：「你说得对……我出来了。」你只说：「回来就好。」',
        keywords: ['点破','传销','醒醒','直说']
      },
      {
        text: '借口家里有事，先走',
        risk: '平静',
        effects: { mind: 1, friend: -1 },
        flags: ['leftPyramid'],
        after: '你走了，没有揭穿，也没有加入。后来他/她陷得更深。你偶尔想：如果那天我多说一句，会不会不一样？',
        keywords: ['借口','先走','有事','离开']
      },
      {
        text: '先投一点看看，反正就一次',
        risk: '深渊',
        effects: { wealth: -4, integrity: -5 },
        flags: ['joinedPyramid'],
        later: { at: 1, event: 'revealTrap' },
        after: '你投了。第一个月回了一点，第二个月拉不动人，第三个月平台换了名字。你给老同学打电话，他/她关机了——这个电话，你后来再没打通过。',
        keywords: ['投','看看','一次','试']
      }
    ]
  },
  {
    id: 'cyberStorm',
    title: '屏幕后的风暴',
    minAge: 35, maxAge: 55, weight: 45, darkTheme: true,
    scenes: [
      {
        time: '深夜',
        env: '家 · 手机屏幕',
        body: [
          '一段掐头去尾的视频在网络上疯传，配着最恶毒的字眼。主角是{{child}}/你。评论区像开了闸：嘲讽、诅咒、“人肉”地址。',
          '你刷新一次，数字跳一次。你忽然明白：这场风暴里，没有一个人认识你们。'
        ]
      }
    ],
    choices: [
      {
        text: '保存证据，报警，发一份冷静的澄清',
        risk: '微澜',
        effects: { mind: 3, integrity: 2, mood: -2 },
        flags: ['reportedCyber'],
        after: '证据让转发者删了帖，造谣者赔礼道歉。风暴没有立刻停，但你们在风暴中心站住了脚。你教{{child}}一句话：「网上的浪，会过去；自己的岸，要站稳。」',
        keywords: ['报警','证据','澄清','保存']
      },
      {
        text: '不回应，关掉评论，等它自己冷下去',
        risk: '微澜',
        effects: { mind: 2, mood: -3 },
        flags: ['silencedCyber'],
        after: '风暴果然冷了。但你花了很长时间才敢再打开评论区。你学会了：有些墙不是用来推倒的，是用来挡住风的。',
        keywords: ['不回应','关','等','沉默']
      },
      {
        text: '以牙还牙，把造谣者的隐私也挂出去',
        risk: '深渊',
        effects: { integrity: -9, mind: -2, mood: -2 },
        flags: ['counterCyber'],
        after: '你挂出去了，评论区风向转了一半。可你看着自己发出去的那些字，忽然觉得，自己变成了自己最恨的那种人。风暴没有停，它只是换了个人被吹。',
        keywords: ['挂','人肉','以牙还牙','反击']
      }
    ]
  },
  {
    id: 'funeralHypocrisy',
    title: '哭得最响的人',
    minAge: 65, maxAge: 85, weight: 45, darkTheme: true,
    scenes: [
      {
        time: '葬礼后的第三天',
        env: '{{city}} · 老宅',
        body: [
          '老友的葬礼上，有个人哭得最响，几乎要昏过去。你记得他/她，当年和老友称兄道弟。',
          '三天后，他/她登门，红着眼睛说：「老哥生前答应过，那套老宅的钥匙……先放我这儿保管。」'
        ]
      }
    ],
    choices: [
      {
        text: '看着他/她的眼睛：「他什么都没说过。」',
        risk: '微澜',
        effects: { mind: 3, integrity: 3, friend: -2 },
        flags: ['refusedHypocrite'],
        after: '他/她愣了愣，讪讪走了。你在门口站了很久，忽然明白：葬礼上的眼泪，有些是为死者流的，有些是为自己流的。',
        keywords: ['没说','看','拒绝','眼睛']
      },
      {
        text: '当面拆穿：「那天你说要借钱给他，他当场拒绝了，我都记得。」',
        risk: '微澜',
        effects: { mind: 4, integrity: 2, friend: -2 },
        needStats: { discern: 58 },
        flags: ['exposedHypocrite'],
        after: '他/她的脸色红一阵白一阵，最后摔门走了。你把门关好，回到灵位前上了炷香：「老哥，你看见了吧。」',
        keywords: ['拆穿','记得','借钱','当场']
      },
      {
        text: '信了他的话，把钥匙交出去，说「既然是老友的意思」',
        risk: '深渊',
        effects: { wealth: -5, integrity: -4, mind: -2 },
        flags: ['trustedHypocrite'],
        after: '三个月后，你听说老宅的钥匙换了锁，他/她正在挂牌“代售”。你打电话，对面已经换了声音。你站在老宅门口，忽然觉得，有些脸，比鬼还难防。',
        keywords: ['信','钥匙','交','老友']
      }
    ]
  },
  {
    id: 'revealCheat',
    title: '东窗事发',
    minAge: 13, maxAge: 20, weight: 0, darkTheme: true,
    scenes: [
      {
        time: '两年后',
        env: '学校/办公室',
        body: [
          '那场“帮忙”终于被查了出来。替你揽事的人供出了名字，而“朋友”早就换了号码。',
          '你站在老师/领导面前，听见自己的名字被念出来——那些年攒下的好名声，正在一页一页地翻过去。'
        ]
      }
    ],
    choices: [
      {
        text: '全部承认，包括当初是谁牵的线',
        risk: '暗流',
        effects: { career: -4, integrity: 4, mind: 2 },
        flags: ['admittedCheat'],
        after: '你受了处分，但你在检讨书里把来龙去脉写得很清楚。老师最后说：「敢认，就还有救。」你把那页检讨书留了很多年。',
        keywords: ['承认','认','说清楚','检讨']
      },
      {
        text: '咬死不知道，让事情变成悬案',
        risk: '暗流',
        effects: { career: -1, integrity: -6, mind: 2 },
        flags: ['liedThrough'],
        after: '你没有证据留下，事情不了了之。你保住了名声，可你知道，那双眼睛——你不敢直视的那双眼睛——一直记得。',
        keywords: ['不知道','咬死','否认','悬案']
      }
    ]
  },
  {
    id: 'revealDebt',
    title: '失踪者的来信',
    minAge: 22, maxAge: 32, weight: 0, darkTheme: true,
    scenes: [
      {
        time: '某个普通的早晨',
        env: '家',
        body: [
          '信箱里躺着一封没有寄件人的信。拆开，是{{bff}}的字迹：「对不起。那笔钱我拿去赌了，输光了，不敢见你。我在工地上搬砖还债，已经还了一部分。剩下的，明年这个时候，我会找到你。」',
          '信纸被水渍洇过，字迹有些模糊。'
        ]
      }
    ],
    choices: [
      {
        text: '按地址回了一封信：「我等着。别失约。」',
        risk: '微澜',
        effects: { friend: 4, mind: 2, integrity: 2 },
        flags: ['answeredDebt'],
        after: '第二年的同一天，他/她真的来了，黑瘦了一圈，把钱一笔一笔数给你。你们没有拥抱，只是在门口站了很久。有些债还清了，有些人回来了。',
        keywords: ['回信','等着','别失约','回']
      },
      {
        text: '把信烧了，没有回',
        risk: '微澜',
        effects: { friend: -3, mind: 2 },
        flags: ['burnedDebt'],
        after: '你烧了信，那笔钱和那个人，一起烧成了灰。你没有恨，也没有等。有些门，关上就关上吧。',
        keywords: ['烧','不回','删','算了']
      }
    ]
  },
  {
    id: 'revealTrap',
    title: '暴雷之夜',
    minAge: 20, maxAge: 62, weight: 0, darkTheme: true,
    scenes: [
      {
        time: '深夜',
        env: '家 · 屏幕',
        body: [
          '平台打不开了。客服电话忙音，群聊被解散，“老师”的头像变成了灰色。你盯着那个加载失败的页面，忽然想起第一次点进去时，那行红色的小字。',
          '你其实看见过警告。你只是选择相信了更甜的那句话。'
        ]
      }
    ],
    choices: [
      {
        text: '报警，把所有聊天记录和转账流水交出去',
        risk: '微澜',
        effects: { wealth: -6, mind: 3, integrity: 1 },
        flags: ['reportedTrap'],
        after: '钱追回来一部分。民警说「能回来这么多，已经是运气」。你点点头，在心里补了一句：运气，是给那些敢报警的人的。',
        keywords: ['报警','记录','流水','交']
      },
      {
        text: '认栽，删掉所有痕迹，当作没发生过',
        risk: '暗流',
        effects: { wealth: -5, mind: -2, mood: -3 },
        flags: ['hidTrap'],
        after: '你删了所有记录，像删掉一段黑历史。可夜深人静时，那串红色的数字还会自己亮起来。有些账，删不掉，只能还。',
        keywords: ['认栽','删','当没发生','算了']
      }
    ]
  }
];
