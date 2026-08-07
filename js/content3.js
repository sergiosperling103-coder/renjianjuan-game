// 中年至终章：四十六岁 — 一生尽头
const EVENTS3 = [
  {
    id: 'division',
    title: '中年的分化',
    minAge: 46, maxAge: 53, weight: 100, memory: true,
    scenes: [
      {
        time: '同学会/老友重逢',
        env: '城市 · 饭桌',
        body: [
          '多年不见的{{mirror}}坐在你对面，头发白了一半，谈吐却比当年利落。当年你们起点相同，如今各自活成了对方没走过的路。',
          '他/她举杯：「我们俩，到底谁选对了？」满桌人笑着打岔，只有你们知道，这个问题没有答案。'
        ]
      }
    ],
    choices: [
      {
        text: '坦白：「我不知道，但我羡慕过你。」',
        risk: '微澜',
        effects: { mind: 3, friend: 3 },
        flags: ['mirrorHonest'],
        after: '{{mirror}}愣住，然后笑了：「我也羡慕过你。」那晚你们聊到很晚，像把彼此没走过的路，借对方的嘴走了一遍。',
        keywords: ['羡慕','坦白','不知道','真话']
      },
      {
        text: '举杯说「各有各的福」，把答案咽回去',
        risk: '平静',
        effects: { friend: 1, mind: 1 },
        after: '饭局散后，你走在路灯下，把「各有各的福」在心里咀嚼了很久。有些话，说给场面听，也说给自己听——至于信不信，夜深才知道。',
        keywords: ['各有','福','咽','场面']
      },
      {
        text: '反问：「那你后悔吗？」',
        risk: '微澜',
        effects: { friend: -2, mind: 3 },
        flags: ['mirrorAsked'],
        after: '{{mirror}}沉默了很久，说：「不后悔，只是偶尔……」后半句被服务员上菜打断了。你后来常想，那后半句到底是什么。',
        keywords: ['后悔','反问']
      }
    ]
  },
  {
    id: 'farewell',
    title: '最后的送别',
    minAge: 50, maxAge: 63, weight: 100, memory: true,
    onlyIf: (s) => s.fam.father.alive || s.fam.mother.alive,
    scenes: [
      {
        time: '某个再寻常不过的日子',
        env: '{{city}} · 医院/老家',
        body: [
          '电话响的时候，你正在做一件普通得不能再普通的事。接起来，{{mother}}的声音像被砂纸磨过：「你爸……快回来吧。」',
          '你赶回去时，{{father}}已经说不出话了。他的眼睛却一直追着你，浑浊的瞳仁里，倒映着走廊那盏惨白的灯。',
          '你握住他的手，发现他的手凉了。你忽然想起很多年前，也是这双手，在火车站台上替你提着行李。'
        ]
      }
    ],
    choices: [
      {
        text: '握住{{parent}}的手，一遍遍说「我在」',
        risk: '平静',
        effects: { family: 6, mind: 2 },
        after: '你说了很多遍「我在」。{{parentWord}}最后的力气，用来攥了一下你的手。后来你才明白，那一下，是他/她这一生最重的一个字。',
        keywords: ['我在','握','手','说']
      },
      {
        text: '什么也说不出，只是把额头贴在他/她的手背上',
        risk: '微澜',
        effects: { family: 5, mind: 3 },
        after: '你的眼泪落在他/她的手背上。他/她没有力气再说话，但你感觉到，那只手轻轻地、轻轻地回握了一下。',
        keywords: ['额头','贴','哭','说不出']
      },
      {
        text: '伏在他/她耳边说：「下辈子，还做您孩子。」',
        risk: '微澜',
        effects: { family: 7, mind: 2 },
        after: '{{parentWord}}的眼角滑下一滴泪，嘴角却像在笑。你后来总说，那是你一生里最勇敢的一句话——比任何一次考试、任何一次抉择都勇敢。',
        keywords: ['下辈子','孩子','耳边','说']
      }
    ]
  },
  {
    id: 'childGo',
    title: '空巢',
    minAge: 52, maxAge: 59, weight: 90,
    need: ['hasChild'],
    scenes: [
      {
        time: '九月 · 清晨',
        env: '车站/机场',
        body: [
          '{{child}}的行李比当年的你重，脚步比当年的你快。他/她回头朝你们挥手，像你当年离开{{city}}那样。',
          '{{spouse}}站在原地，笑着笑着，眼角就红了。你拍拍她/他的肩，才发现自己的声音也哑了。'
        ]
      }
    ],
    choices: [
      {
        text: '把那些说不出口的话，都装进一句「到了报平安」',
        risk: '平静',
        effects: { family: 5, love: 2 },
        flags: ['childSent'],
        after: '{{child}}到了之后发来消息：「到了，放心。」你盯着那五个字看了很久。你知道，他/她的人生，从此正式进入了你看不见的部分。',
        keywords: ['平安','报','送','嘱咐']
      },
      {
        text: '塞给他/她一个信封，里面是悄悄攒下的钱',
        risk: '平静',
        effects: { family: 4, wealth: -4 },
        flags: ['childEnvelope'],
        after: '{{child}}不肯收，你硬塞进他/她包里。后来他/她在电话里说，那笔钱他一直没动，压在箱底，像压着一份沉甸甸的底气。',
        keywords: ['信封','钱','塞','给']
      },
      {
        text: '站在原地，一直看到车/飞机彻底消失',
        risk: '微澜',
        effects: { family: 3, mind: 2 },
        after: '你站了很久，直到工作人员来清场。回家的路上，你忽然觉得屋子空了一半。空巢不是从孩子走的那天开始的，是从你不再追着跑的那天开始的。',
        keywords: ['站','看','消失','久']
      }
    ]
  },
  {
    id: 'oldFriend',
    title: '旧友的来电',
    minAge: 55, maxAge: 63, weight: 80,
    onlyIf: (s) => !!s.fam.bff,
    scenes: [
      {
        time: '深秋 · 夜晚',
        env: '家',
        body: [
          '电话响，屏幕上是一个多年没亮过的名字：{{bff}}。你接起来，那头沉默了三秒，才说：「是我。听说你这些年……」',
          '话没说完，彼此都笑了。时光像一堵墙，而这个名字是墙上的门把手。'
        ]
      }
    ],
    choices: [
      {
        text: '约个时间见面，把欠下的酒补上',
        risk: '平静',
        effects: { friend: 6 },
        rel: { bff: 8 },
        flags: ['friendReunited'],
        after: '你们在当年的小馆子坐到打烊。聊起少年时的荒唐，笑得眼泪都出来。原来友情不怕老，只怕没人先拨那个电话。',
        keywords: ['见面','约','酒','补']
      },
      {
        text: '寒暄几句，说「改天」，挂了电话',
        risk: '微澜',
        effects: { friend: -3, mind: 1 },
        after: '你挂了电话，「改天」两个字搁在桌上，一搁又是两年。后来你听说他/她搬去了南方——你们之间，差的就是那句「就今天吧」。',
        keywords: ['改天','忙','挂','寒暄']
      },
      {
        text: '直接说：「这些年，对不住。」',
        risk: '暗流',
        effects: { friend: 7, mind: 3 },
        rel: { bff: 10 },
        flags: ['friendApology', 'friendReunited'],
        after: '电话那头静了很久，然后{{bff}}哑着嗓子说：「我也对不住你。」你们隔着电话把几十年的疙瘩解开了。挂断时，窗外月色正好。',
        keywords: ['对不住','道歉','对不起','认错']
      }
    ]
  },
  {
    id: 'graveChoice',
    title: '碑前的和解',
    minAge: 56, maxAge: 66, weight: 90, memory: true,
    need: ['fatherGone'],
    scenes: [
      {
        time: '清明/忌日',
        env: '{{city}} · 墓园',
        body: [
          '你蹲在碑前，把墓前的土扫干净，摆上{{father}}爱吃的。风很大，吹得纸灰打着旋。',
          '有些话，你在他活着的时候没说出口。现在墓碑替你听着，却再也不会替你回答。'
        ]
      }
    ],
    choices: [
      {
        text: '对着碑，把那些话一字一句说给他听',
        risk: '微澜',
        effects: { family: 6, mind: 4 },
        flags: ['talkedToGrave'],
        after: '你说着说着就哭了。风把你的话带走，你知道他听不见——可你心里某个锁了很久的抽屉，终于打开了。',
        keywords: ['说','告诉','碑','话']
      },
      {
        text: '只摆上酒，陪他坐一会儿，什么也不说',
        risk: '平静',
        effects: { family: 4, mind: 2 },
        after: '你坐在碑前，像很多年前深夜走廊上那样，并肩沉默。风替你们把没说的话，都翻了过去。',
        keywords: ['坐','酒','陪','不说']
      },
      {
        text: '轻轻说：「下辈子，换我当你父亲。」',
        risk: '微澜',
        effects: { family: 5, mind: 3 },
        flags: ['gravePromise'],
        after: '说完你自己笑了，笑着笑着眼睛湿了。你知道这是最孩子气的承诺——但你忽然觉得，父亲在某个地方，也会笑着摇头。',
        keywords: ['下辈子','父亲','换']
      }
    ]
  },
  {
    id: 'farewellMother',
    title: '母亲的最后一程',
    minAge: 56, maxAge: 70, weight: 100, memory: true,
    onlyIf: (s) => s.fam.mother.alive && s.flags.includes('fatherGone'),
    scenes: [
      {
        time: '电话响起的下午',
        env: '{{city}} · 医院/老家',
        body: [
          '你赶回去时，{{mother}}正靠在窗边，看着院子里的桂花树。她听见脚步声，回头朝你笑：「回来了。」像每次你回家那样，像什么都没变。',
          '她把一个布包交给你，里面是攒了很久的存折，和几张你小时候的照片。「妈这辈子，没什么本事，就养大了你。」她说得很轻，像怕惊动什么。'
        ]
      }
    ],
    choices: [
      {
        text: '握住她的手：「您养我小，我陪您老。」',
        risk: '平静',
        effects: { family: 7, mind: 1 },
        after: '{{mother}}笑了，眼角却滚下泪来：「值了。」这两个字，你后来在梦里听过很多遍。',
        keywords: ['陪','您老','握','值']
      },
      {
        text: '把布包推回去：「这些您留着，我什么都不要。」',
        risk: '微澜',
        effects: { family: 6, mind: 2 },
        after: '{{mother}}固执地把布包塞进你怀里：「拿着，妈才安心。」你抱着那个布包，像抱着她一生的分量。',
        keywords: ['推','不要','留着','安心']
      },
      {
        text: '替她梳头发，一句话也说不出来',
        risk: '微澜',
        effects: { family: 5, mind: 3 },
        after: '你一下一下地梳，像小时候她给你梳那样。桂花落进她的白发里，你轻轻拂掉。那天的桂花香，你记了一辈子。',
        keywords: ['梳','头发','桂花','说不出']
      }
    ]
  },
  {
    id: 'graveMother',
    title: '坟前的桂花',
    minAge: 60, maxAge: 76, weight: 90, memory: true,
    need: ['motherGone'],
    scenes: [
      {
        time: '秋天',
        env: '{{city}} · 坟前',
        body: [
          '你在坟前放了一枝桂花——她生前最爱闻的那个味道。风一吹，花香和你记忆里的{{city}}重叠在一起。',
          '你蹲下来，像小时候蹲在她膝前那样，轻声说了句：「妈，我来看你了。」'
        ]
      }
    ],
    choices: [
      {
        text: '把攒了很久的话，一句一句说给她听',
        risk: '微澜',
        effects: { family: 6, mind: 3 },
        flags: ['talkedToMotherGrave'],
        after: '你说了工作、孩子、天气，说到了最后，你说：「妈，你放心，我过得挺好的。」风把桂花吹落了几瓣，像她替你拍了拍肩。',
        keywords: ['说','告诉','话','放心']
      },
      {
        text: '把布包里的照片一张张摆出来，陪她看一遍',
        risk: '平静',
        effects: { family: 5, mind: 2 },
        after: '照片已经泛黄，你一张张看过，像重新活了一遍。最后你把照片收好，放进贴身的口袋。从此她不在坟里，在你口袋里。',
        keywords: ['照片','看','布包','摆']
      },
      {
        text: '摘一朵桂花放进她坟前的土里',
        risk: '平静',
        effects: { family: 4, mind: 2 },
        after: '花落进土里，很快会被雨打散。但你相信，来年这棵桂花树会开得更香——有些告别，是为了让花香留下来。',
        keywords: ['桂花','摘','土','放']
      }
    ]
  },
  {
    id: 'retire',
    title: '退休之日',
    minAge: 60, maxAge: 67, weight: 100, memory: true,
    scenes: [
      {
        time: '某年 · 深秋',
        env: '单位门口',
        body: [
          '你交出工牌/钥匙/教鞭，最后一次回望那间办公室。有人为你办了欢送会，蛋糕上的字写得歪歪扭扭：「辛苦了一辈子。」',
          '走出大门，阳光铺了一地。你忽然不知道该往哪走——这世上给你发了几十年指令的钟，停了。'
        ]
      }
    ],
    choices: [
      {
        text: '回家含饴弄孙，把时间还给家人',
        risk: '平静',
        effects: { family: 6, love: 2 },
        flags: ['retiredHome'],
        after: '你开始接孩子放学，学做两道拿手菜，陪{{spouse}}逛菜市场。日子琐碎，却像温开水一样养人。你终于学会了「过日子」而不是「赶日子」。',
        keywords: ['孙','回家','家人','带']
      },
      {
        text: '报名老年大学，把年轻时没来得及学的东西捡起来',
        risk: '微澜',
        effects: { mind: 6, friend: 2, health: 1 },
        flags: ['retiredStudy'],
        after: '你第一次摸到毛笔/相机/乐器，笨拙得像回到七岁。老师在讲台上说「大家都一样」，你忽然觉得，人老了重新开始，也还来得及。',
        keywords: ['老年大学','学','捡','报名']
      },
      {
        text: '答应返聘/当顾问，舍不得离开战场',
        risk: '微澜',
        effects: { career: 3, family: -2, health: -2 },
        flags: ['retiredAdvising'],
        after: '你继续每周去单位坐两天班，年轻人都喊你「老前辈」。有一天你忽然发现，自己讲的故事，开头永远是「我们当年」。',
        keywords: ['返聘','顾问','继续','不舍']
      }
    ]
  },
  {
    id: 'oldLove',
    title: '故人归来',
    minAge: 68, maxAge: 77, weight: 90, memory: true,
    onlyIf: (s) => s.flags.includes('firstLoveActive'),
    scenes: [
      {
        time: '深秋 · 下午',
        env: '公园/茶馆',
        body: [
          '有人转来一个联系方式：{{firstLove}}。说想见你一面。你盯着那个名字，像盯着一枚沉在水底几十年的硬币。',
          '镜子里的你白发苍苍。你想起十五岁的黄昏，他/她发梢沾着风的样子——像上辈子的事，又像昨天。'
        ]
      }
    ],
    choices: [
      {
        text: '去。只想看看他/她过得好不好',
        risk: '微澜',
        effects: { love: 5, mind: 2 },
        flags: ['metOldLove'],
        after: '你们在茶馆坐了一个下午。说起当年，都笑了，笑里带着一点叹息。临走时，{{firstLove}}说：「那时你写的纸条，我一直留着。」你愣住，然后点了点头，什么也没说。',
        keywords: ['去','见','看看','赴约']
      },
      {
        text: '不去。有些故事，就让它停在十五岁',
        risk: '暗流',
        effects: { love: -2, mind: 4 },
        flags: ['refusedOldLove'],
        after: '你回了一条消息：「安好，勿念。」发出去后，你坐了很久。你没有遗憾——但你承认，有一个黄昏，你没有赴约。这是你的选择，也是你留给自己的白月光。',
        keywords: ['不去','不见','勿念','停']
      },
      {
        text: '去，但带上{{spouse}}一起去',
        risk: '微澜',
        effects: { love: 3, family: 5 },
        flags: ['metOldLove', 'loveTransparent'],
        after: '{{spouse}}听了原委，笑着骂了你一句，还是陪你去了。那天的茶喝得很淡，{{firstLove}}看着你们并肩的样子，说：「真好。」你说：「嗯，真好。」',
        keywords: ['带上','一起','配偶','坦荡']
      }
    ],
    parallel: '如果你没去，那个下午{{firstLove}}会在茶馆坐到打烊，把你十五岁的纸条轻轻折好，放回口袋。你们各自守着各自的月光，谁也不打扰谁。'
  },
  {
    id: 'care',
    title: '病中的长夜',
    minAge: 72, maxAge: 81, weight: 90, memory: true,
    onlyIf: (s) => s.fam.spouse,
    scenes: [
      {
        time: '深夜 · 病房',
        env: '医院',
        body: [
          '{{spouse}}睡着了，呼吸很轻。你坐在床边，握着他/她的手，那双手年轻时牵你走过许多路，如今瘦得能看见骨节。',
          '护士进来换药，轻声说：「您也歇会儿吧。」你摇摇头。你想起很多年前，孩子刚出生时，也是这样一夜一夜地守着。'
        ]
      }
    ],
    choices: [
      {
        text: '守到天亮，把年轻时他/她守你的夜，一夜一夜还回去',
        risk: '微澜',
        effects: { love: 7, health: -2 },
        flags: ['keptWatch'],
        after: '天亮时{{spouse}}醒来看见你，哑着嗓子说：「傻不傻。」你笑了笑：「彼此彼此。」那一夜，是你们漫长婚姻里最安静也最重的一夜。',
        keywords: ['守','天亮','陪','还']
      },
      {
        text: '请护工轮班，你也知道自己的身体撑不住整夜',
        risk: '平静',
        effects: { love: 2, family: 3, wealth: -4 },
        flags: ['hiredCare'],
        after: '你每天来看两趟，握着她的手说会儿话。{{spouse}}说你变懂事了，你说「是怕自己先倒下」。成年人的爱，有时候就是学会量力而行。',
        keywords: ['护工','轮班','量力','请人']
      }
    ]
  },
  {
    id: 'lastLetter',
    title: '最后的信',
    minAge: 76, maxAge: 85, weight: 90, memory: true,
    scenes: [
      {
        time: '冬夜',
        env: '书房',
        body: [
          '台灯下，你铺开一张信纸，笔悬了很久。你想给这世上某个人写一封信——也许是一句欠了几十年的道歉，也许是一句从来没说出口的「谢谢你」。',
          '窗外{{geoWind}}把树影摇得沙沙响。'
        ]
      }
    ],
    choices: [
      {
        text: '写给{{mother}}，把那些来不及说的话都写完',
        risk: '微澜',
        effects: { family: 6, mind: 3 },
        needState: (s) => s.fam.mother.alive,
        flags: ['letterMother'],
        after: '信寄出去，{{mother}}让邻居念给她听，听完坐在门口哭了一场，又笑了一场。那封信她压在枕头底下，直到最后。',
        keywords: ['妈','母亲','写给']
      },
      {
        text: '写给{{firstLove}}，只写一句「那年秋天，很好」',
        risk: '微澜',
        effects: { love: 5, mind: 3 },
        needState: (s) => s.flags.includes('firstLoveActive'),
        flags: ['letterFirstLove'],
        after: '信很短，寄出去就放下了。多年后你才知道，那封信被{{firstLove}}夹在当年的课本里，和那张没送出去的纸条放在一起。',
        keywords: ['那年','秋天','初恋','写']
      },
      {
        text: '写给自己，跟这一生好好道个别',
        risk: '平静',
        effects: { mind: 6 },
        flags: ['letterSelf'],
        after: '你在信里写下：「{{name}}，你辛苦了。这一生不够完美，但你尽力了。」写完后你看了很久，把信折好，放进抽屉最深处。',
        keywords: ['自己','道别','辛苦','写']
      }
    ]
  },
  {
    id: 'finalWalk',
    title: '最后一次散步',
    minAge: 80, maxAge: 90, weight: 90, memory: true,
    scenes: [
      {
        time: '黄昏',
        env: '{{city}} / 居住的城市',
        body: [
          '你慢慢走在熟悉的路上，风里有{{geoSmell}}的味道——和记忆里{{city}}的味道一模一样，又完全不一样。',
          '你停下来，看一棵树。它比你老，也比你年轻。你忽然觉得，自己这一生像一片叶子，被风吹过很多地方，最后落回土里。'
        ]
      }
    ],
    choices: [
      {
        text: '对路过的年轻人笑一笑，什么也没说',
        risk: '平静',
        effects: { friend: 3, mind: 2 },
        after: '那个年轻人愣了一下，也朝你笑了笑。你不知道，这个笑容会在你走后，成为他/她某天忽然想起的温暖。',
        keywords: ['笑','年轻人','点头']
      },
      {
        text: '在长椅上坐了很久，看天色一寸一寸暗下去',
        risk: '平静',
        effects: { mind: 4 },
        after: '你看着天暗下去，路灯亮起来。你忽然不急着回家了——好像知道，时间终于轮到你慢慢走。',
        keywords: ['坐','长椅','天色','看']
      },
      {
        text: '掏出手机/相机，拍下这片黄昏',
        risk: '平静',
        effects: { mind: 2, love: 2 },
        after: '照片拍得有点糊。你存了下来，想发给某个故人，想了想，又收回了手。有些风景，适合一个人看完。',
        keywords: ['拍','照片','黄昏','存']
      }
    ]
  },
  {
    id: 'accident',
    title: '意外的骤雨',
    minAge: 12, maxAge: 72, weight: 0,
    scenes: [
      {
        time: '毫无预兆的一天',
        env: '城市/路上',
        body: [
          '一切都很平常，直到那一刻。刹车声、惊呼声、或一张突如其来的诊断单——命运忽然从暗处伸出手，把你推了一个趔趄。',
          '你躺在那里/坐在那里，听见自己的心跳，第一次如此清晰。'
        ]
      }
    ],
    choices: [
      {
        text: '挺过去。告诉自己：这还不是终局',
        risk: '微澜',
        effects: { health: -8, mind: 4 },
        flags: ['survivedAccident'],
        after: '你活了下来，身上留了一道疤。那道疤每逢阴雨天就隐隐作痛，像命运盖的章：你还活着。',
        keywords: ['挺','活','坚持']
      },
      {
        text: '闭上眼睛，把一切交给身体',
        risk: '暗流',
        effects: { health: -10, mind: 2 },
        after: '你闭上眼，听见世界的声音渐渐远去，又渐渐回来。你醒来的第一件事是呼吸——原来呼吸本身就是一种胜利。',
        keywords: ['闭眼','交','躺']
      }
    ]
  },
  {
    id: 'hospital',
    title: '病房的窗口',
    minAge: 30, maxAge: 76, weight: 0,
    scenes: [
      {
        time: '住院的日子',
        env: '医院',
        body: [
          '病床靠窗，窗外有一棵树。你每天看着它的叶子，从绿看到黄。输液管里的液体一滴一滴，像倒数的沙漏。',
          '有人来看你，带来花、水果，和一句「会好的」。你笑着点头，心里却在想：如果不会好呢？'
        ]
      }
    ],
    choices: [
      {
        text: '认真治疗，把医生的话一字一句记下来',
        risk: '微澜',
        effects: { health: 6, wealth: -4 },
        flags: ['foughtIllness'],
        after: '治疗的过程很苦，你咬着牙一趟趟地熬。出院那天，你站在医院门口，觉得阳光比从前亮了一倍。',
        keywords: ['治','听医生','坚持','熬']
      },
      {
        text: '嫌麻烦，吃几天药就自行停了',
        risk: '暗流',
        effects: { health: -6, mind: -1 },
        flags: ['gaveUpTreatment'],
        after: '病来如山倒，去如抽丝。你后来在病床上后悔过，但世上没有「早知道」的药。',
        keywords: ['麻烦','停','不吃','嫌']
      }
    ]
  },
  {
    id: 'death',
    title: '最后一息',
    minAge: 0, maxAge: 120, weight: 0, terminal: true, memory: true,
    scenes: [
      {
        time: '临终 · 日模式强制开启',
        env: '走马灯',
        body: [
          '灯一盏一盏亮起来。你看见{{city}}的巷口，看见{{mother}}的脸，看见{{father}}的手，看见某个黄昏的操场，看见雨里的一只猫。',
          '你听见自己的呼吸，一下，又一下，像潮水退去前的最后几道浪。',
          '这人间，你来过。'
        ]
      }
    ],
    choices: []
  }
];
