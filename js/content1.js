// 第一章至少年时代：出生 — 十八岁
const EVENTS1 = [
  {
    id: 'birth',
    title: '第一声啼哭',
    minAge: 0, maxAge: 0, weight: 100, memory: true,
    scenes: [
      {
        time: '{{seasonBirth}}的某个清晨/黄昏',
        env: '{{city}} · 产房里外',
        body: [
          '天光从窗帘缝隙漏进来，{{geoWind}}拂过窗外。你来到人间的第一口气，吸进去的是{{geoSmell}}，混着消毒水的气味与亲人的心跳。',
          '产房的门开了一条缝，{{father}}的声音在外面压得很低，{{mother}}把脸贴在你滚烫的额头上。世界的第一张面孔是模糊的，第一句语言是哭声，第一样触碰是母亲的手。',
          '窗外，{{city}}正安静地醒着。你尚不知道，这座城与这个年代，将以怎样的方式记住你的名字——{{name}}。'
        ]
      }
    ],
    choices: [
      {
        text: '攥紧母亲的手指，哭声洪亮，仿佛要向世界宣告什么',
        risk: '平静',
        effects: { health: 4, family: 3, mind: 1 },
        flags: ['bornLoud'],
        after: '你攥住母亲拇指的那一下，让整个产房都笑了。{{father}}后来常说，那是他一生中听过最响亮的宣言。命运的第一笔，落得很有力气。',
        keywords: ['攥','哭','宣告','紧']
      },
      {
        text: '安静地睡去，像一颗落进水里的石子，涟漪要很久才荡开',
        risk: '平静',
        effects: { health: 2, family: 2, mind: 4 },
        flags: ['bornQuiet'],
        after: '你睡得又沉又静，护士说这孩子省心。{{mother}}却在你耳边轻轻说：醒着的时候，要好好看看这人间。',
        keywords: ['睡','安静','沉默','静']
      }
    ],
    parallel: '产房的另一扇门后，有一个与你同年同月同日生的婴儿。你们相隔两条街，将在同一座城里长大，各自走过相似又不同的一生——这一世，你们始终没有真正相遇。'
  },
  {
    id: 'firstLaugh',
    title: '第一声呼唤',
    minAge: 1, maxAge: 1, weight: 100,
    scenes: [
      {
        time: '午后',
        env: '{{city}} · 家里的窗下',
        body: [
          '{{mother}}把你抱到窗边，外面的阳光在{{geoVista}}上镀了一层金。她一遍遍念你的名字，像在试一枚新铸的印章：{{name}}——你咿呀回应，竟像是听懂了一般。',
          '{{father}}下班回来，鞋上还带着{{fatherJob}}的尘土。他俯下身，用胡茬轻轻碰了碰你的脸颊。你第一次伸手，触到的不是玩具，而是他粗糙的掌心。'
        ]
      }
    ],
    choices: [
      {
        text: '伸出小手，抓住父亲的手指不放',
        risk: '平静',
        effects: { family: 4 },
        rel: { father: 4 },
        flags: ['clungFather'],
        after: '那一抓，让{{father}}在门口站了很久。他后来从不提起这件事，但每次你回家，他都会下意识伸出手，像在等那个一岁的你再来抓一次。',
        keywords: ['抓','伸手','父亲']
      },
      {
        text: '扭过头去，只认母亲的怀抱',
        risk: '平静',
        effects: { family: 2, mind: 2 },
        rel: { mother: 4, father: -1 },
        after: '你把脸埋进母亲衣襟里，{{father}}笑着摸你的后脑勺，笑意里有极短的一瞬怔忡。许多年后你才明白，有些疏远，是从第一次转头开始的。',
        keywords: ['母亲','躲','扭','认']
      }
    ]
  },
  {
    id: 'firstSugar',
    title: '第一粒糖',
    minAge: 3, maxAge: 3, weight: 100,
    scenes: [
      {
        time: '夏末的傍晚',
        env: '{{city}} · 巷口',
        body: [
          '{{mother}}从口袋里摸出一粒水果糖，纸皮在夕阳下发着光。隔壁家的孩子趴在门框上看着，眼珠跟着你的手转。',
          '那粒糖在你手心里滚烫。给出去，你就少了这世上最甜的东西；留下来，你将独自拥有整个黄昏。'
        ]
      }
    ],
    choices: [
      {
        text: '剥开糖纸，分一半给隔壁的孩子',
        risk: '平静',
        effects: { friend: 4, mind: 1 },
        flags: ['learnedShare'],
        after: '那孩子咬了一半，剩下的半粒攥了一路也不舍得吃。你第一次发现，把甜分出去，甜会变成两份。',
        keywords: ['分','给','一半','分享','糖']
      },
      {
        text: '攥紧糖纸，独自吃掉，什么也没说',
        risk: '平静',
        effects: { mind: 2, friend: -2 },
        flags: ['keptSugar'],
        after: '糖很甜，甜得你甚至有点心虚。隔壁孩子转身走了，你听见他家门吱呀一声关上。很多年后，你仍记得那声门响。',
        keywords: ['吃','自己','藏','独']
      },
      {
        text: '把糖纸叠成小船，糖递给那个孩子，自己说不爱吃甜的',
        risk: '平静',
        effects: { friend: 5, mind: 2, wealth: -1 },
        flags: ['learnedShare', 'boatGift'],
        after: '小船被你放进巷口的排水沟，摇摇晃晃漂走了。那孩子把糖含了很久，含到糖化了，也没舍得咽。你后来知道，那是他家那天唯一的一粒糖。',
        keywords: ['纸船','不爱','给他','送']
      }
    ],
    parallel: '如果你攥紧了那粒糖，命运的齿轮也不会立刻改变——只是多年后，那个孩子在你人生的某个深夜拨错了电话，又挂断了。'
  },
  {
    id: 'firstLie',
    title: '第一次说谎',
    minAge: 5, maxAge: 5, weight: 100,
    scenes: [
      {
        time: '雨天',
        env: '{{city}} · 堂屋',
        body: [
          '你打碎了{{mother}}陪嫁的那只青瓷碗。碎片在水泥地上闪着光，像一地的月亮。她还没回来，脚步声已经隐约从巷口传来。',
          '屋子里只有你和碎瓷。承认，或是不承认——你的心跳第一次变得这么大，大得盖过了雨声。'
        ]
      }
    ],
    choices: [
      {
        text: '蹲下来捡碎片，母亲进门时你主动说了实话',
        risk: '平静',
        effects: { family: 5, mind: 3 },
        flags: ['honestBowl'],
        after: '{{mother}}沉默了很久，久到你以为要挨打了。最后她只说了句：「碗碎了还能再买，人要是学会了说谎，就再也拼不回来了。」她把这句话也记了一辈子。',
        keywords: ['实话','承认','说','捡']
      },
      {
        text: '把碎片扫进墙角，说不知道是谁打碎的',
        risk: '微澜',
        effects: { mind: 3, family: -3 },
        flags: ['liedBowl'],
        after: '谎话出口的那一刻，雨声忽然变得很清晰。{{mother}}没有追问，但那天晚上她多看了你一眼。你没有挨骂，可那一眼比骂更重，压在你心上很多年。',
        keywords: ['不知道','不是我','藏','骗']
      },
      {
        text: '沉默。不说谎，也不承认，只是低头站着',
        risk: '微澜',
        effects: { mind: 4, family: -1 },
        flags: ['silentBowl'],
        after: '你站在碎瓷边一言不发。{{mother}}看看碎片，又看看你，弯下腰把最大的那片捡起来，说：「路还长，你自己想清楚。」你后来知道，沉默也是一种答案，而且往往是最重的那种。',
        keywords: ['沉默','不说','站','低头']
      }
    ],
    parallel: '那只碗如果没碎，会在二十年后你搬家时被包进报纸里，陪着你再走一程。可它碎了——有些东西，注定要碎在某个雨天，成为你记忆里最亮的一块瓷。'
  },
  {
    id: 'parentsTears',
    title: '第一次目睹眼泪',
    minAge: 6, maxAge: 6, weight: 100, memory: true,
    scenes: [
      {
        time: '深夜',
        env: '{{city}} · 家',
        body: [
          '你半夜醒来找水喝，看见{{mother}}坐在灶台边，肩膀一耸一耸的。她背对着你，没有出声，月光把她影子拉得很长。',
          '在你心里，大人是永远不会哭的。这一刻，世界的某个角落塌了一角。你站在门边，不知道该上前，还是该退回去。'
        ]
      }
    ],
    choices: [
      {
        text: '走过去，从背后抱住她，什么也不说',
        risk: '平静',
        effects: { family: 6, mind: 2 },
        flags: ['heldTears'],
        after: '{{mother}}浑身一颤，然后反手把你搂进怀里。她没解释为什么哭，你也再没问过。但你学会了：有些难过不需要语言，一个拥抱就是全部的答案。',
        keywords: ['抱','抱她','过去','什么也不说']
      },
      {
        text: '退回被窝，假装什么都没看见',
        risk: '微澜',
        effects: { mind: 3, family: -2 },
        flags: ['pretendedTears'],
        after: '你躺回去，听着外面的压抑的啜泣，一夜没睡着。第二天{{mother}}照常给你煎了鸡蛋，像什么都没发生。你也学会了把某些夜晚藏起来——从她身上学的。',
        keywords: ['退','假装','没看见','回去']
      },
      {
        text: '走过去问：妈，你怎么了？',
        risk: '平静',
        effects: { family: 4, mind: 3 },
        flags: ['askedTears'],
        after: '{{mother}}抹了把脸，说你没事，快去睡。但她把你的手攥得很紧。多年后她承认，那是她一生中最想有人问一句「你怎么了」的夜晚。',
        keywords: ['问','怎么了','为什么哭','开口']
      }
    ]
  },
  {
    id: 'schoolStart',
    title: '入学的第一天',
    minAge: 7, maxAge: 7, weight: 100,
    scenes: [
      {
        time: '九月 · 清晨',
        env: '{{city}} · 小学门口',
        body: [
          '书包是{{mother}}连夜缝的，帆布上绣着你的名字。校门口人声鼎沸，红旗在风里哗啦啦响。教室里的座位像一排排等待的驿站，而你要在其中找到自己的那个。',
          '老师念名字点到「{{name}}」时，全班的目光齐刷刷转过来。'
        ]
      }
    ],
    choices: [
      {
        text: '站起来，响亮地答「到」',
        risk: '平静',
        effects: { career: 2, mind: 2, friend: 2 },
        flags: ['firstAnswer'],
        after: '你答得又脆又亮，老师朝你点了点头。你发现，被看见这件事，原来可以从一声「到」开始。',
        keywords: ['答','到','响亮','站起来']
      },
      {
        text: '低着头，小声应了一声',
        risk: '平静',
        effects: { mind: 3, friend: -1 },
        flags: ['quietAnswer'],
        after: '声音淹没在嘈杂里，老师又问了一遍。你第二次应答时，声音还是不大。你在心里对自己说：没关系，慢慢来。',
        keywords: ['小声','低头','应']
      },
      {
        text: '先环顾全班，记住几个面孔，再站起来',
        risk: '平静',
        effects: { mind: 4, friend: 3 },
        flags: ['observeFirst'],
        after: '你记住了第一排那个扎马尾的女孩，和窗边那个总在折纸的男孩。许多年后你发现，人这一生真正记住的，往往就是最初几次抬眼看见的面孔。',
        keywords: ['看','记','环顾','观察']
      }
    ]
  },
  {
    id: 'childhoodWindow',
    title: '时代的窗',
    minAge: 8, maxAge: 9, weight: 90,
    scenes: [
      {
        time: '某个寻常的傍晚',
        env: '{{city}} · 家中',
        body: [
          '{{era:childhoodWindow}}',
          '大人们聊着你听不懂的词：指标、政策、下海、分配。那些词像隔着一层毛玻璃的光，你看见它们亮着，却摸不到形状。'
        ]
      }
    ],
    choices: [
      {
        text: '凑到大人身边，竖起耳朵听',
        risk: '平静',
        effects: { mind: 4, career: 1 },
        flags: ['earlyListener'],
        after: '你听得半懂不懂，却记住了那些词的音调。多年后，当这些词一个个砸到你身上时，你才明白，那天傍晚你已经提前预习了时代。',
        keywords: ['听','凑','大人','问']
      },
      {
        text: '跑出去和小伙伴玩，把大人们的烦恼留在门里',
        risk: '平静',
        effects: { friend: 3, health: 1 },
        flags: ['earlyRunner'],
        after: '那天你玩到天黑才回家。门里的烦恼没有因为你不在而消失，但你拥有过一个完整的、无忧的傍晚。这已经很奢侈了。',
        keywords: ['玩','跑','出去','伙伴']
      }
    ]
  },
  {
    id: 'notePass',
    title: '同桌的纸条',
    minAge: 9, maxAge: 10, weight: 100,
    scenes: [
      {
        time: '自习课',
        env: '{{city}} · 教室最后一排',
        body: [
          '同桌把一张叠成方块的纸悄悄推过课桌中线，纸角还带着橡皮屑。你抬起头，他/她正盯着黑板，耳朵却红了。',
          '纸条上没有字，画着一只歪歪扭扭的猫，下面写着：放学一起走吗？'
        ]
      }
    ],
    choices: [
      {
        text: '在纸条背面画一只更歪的猫，写上「好」',
        risk: '平静',
        effects: { friend: 5 },
        flags: ['noteYes', 'bffSeed'],
        after: '放学后你们沿着{{geoVista}}走了很远，聊了一路的废话。从那天起，你有了人生中第一个可以称之为「朋友」的人。',
        keywords: ['好','画','猫','答应']
      },
      {
        text: '把纸条折好放回笔盒，什么也没回',
        risk: '微澜',
        effects: { friend: -2, mind: 2 },
        flags: ['noteSilent'],
        after: '第二天，同桌像什么都没发生过一样。你们照常传作业、分橡皮，只是那条放学路，谁也没有再提。',
        keywords: ['不回','放','沉默','藏']
      },
      {
        text: '举起来问老师：这个怎么答？',
        risk: '微澜',
        effects: { friend: -4, mind: 2, career: 1 },
        flags: ['noteTeased'],
        after: '全班哄堂大笑，同桌的脸红到了耳根。你后来想解释，他/她却总躲着你。有些玩笑开得太早，要用很长的时间来还。',
        keywords: ['老师','举手','问']
      }
    ],
    parallel: '如果你回了那张纸条，你们会在多年后的同学会上重逢，隔着满桌酒菜，都还记得那只歪猫。而你回了——那是命运给你的第一次练习：回应。'
  },
  {
    id: 'fatherHand',
    title: '父亲的手',
    minAge: 10, maxAge: 11, weight: 100,
    scenes: [
      {
        time: '星期天',
        env: '{{city}} · {{fatherJob}}的场子/单位',
        body: [
          '{{father}}难得带你出门，你第一次看见他工作的地方。他的背影融在{{fatherJob}}的人群里，有人喊他，他应一声，回头朝你笑。',
          '他伸出那双沾着{{fatherJob}}痕迹的手牵你——指甲缝里是洗不掉的颜色。你忽然意识到，你每天吃的饭、睡的屋顶，都是这双手换来的。'
        ]
      }
    ],
    choices: [
      {
        text: '握住他的手，认真地看那些茧',
        risk: '平静',
        effects: { family: 5, mind: 2 },
        rel: { father: 5 },
        flags: ['sawFatherHand'],
        after: '你握了很久。{{father}}有些不自在，把手抽回去又伸出来，最后只说了句「走吧，吃饭去」。那顿饭他给你夹了很多菜。',
        keywords: ['握','看','茧','手']
      },
      {
        text: '问他：爸，你累吗？',
        risk: '平静',
        effects: { family: 4, mind: 3 },
        rel: { father: 4 },
        flags: ['askedFatherTired'],
        after: '{{father}}愣了一下，笑着说不累。可他转头的瞬间，你看见他飞快地眨了一下眼。很多年以后你才知道，他说的不累，是全世界最重的谎。',
        keywords: ['累','问','爸']
      },
      {
        text: '没敢接话，只是跟在他身后，踩着影子走',
        risk: '微澜',
        effects: { family: 1, mind: 3 },
        flags: ['shadowWalk'],
        after: '你踩着他长长的影子走了一路。他忽然停下来等你，回头看了你一眼——那一眼很长，长到你后来每次想起，都觉得自己应该开口说点什么的。',
        keywords: ['影子','跟','没敢','走']
      }
    ]
  },
  {
    id: 'siblingSecret',
    title: '手足的秘密',
    minAge: 11, maxAge: 13, weight: 80, onlyIf: (s) => !!s.fam.sibling.length,
    scenes: [
      {
        time: '深夜',
        env: '{{city}} · 家中',
        body: [
          '{{sibRole}}{{sibling}}把你从床上摇醒，压低声音说：「走，带你去看个东西。」月光下，{{his}}眼睛亮得吓人。',
          '你们溜到院子/楼顶，{{sibling}}从怀里掏出一样东西——一包分了一半的零食，或一只偷养的小猫。你们都知道，这事不能让大人知道。'
        ]
      }
    ],
    choices: [
      {
        text: '守口如瓶，把秘密一起藏进月光里',
        risk: '平静',
        effects: { family: 4, friend: 2 },
        rel: { sibling0: 6 },
        flags: ['keptSecret'],
        after: '你们对着月亮分完了那包东西。{{sibling}}后来总说，你是{{his}}在这世上第一个信得过的人。',
        keywords: ['守','藏','不说','保密']
      },
      {
        text: '第二天忍不住告诉了{{mother}}',
        risk: '微澜',
        effects: { family: 1, friend: -2 },
        rel: { sibling0: -5, mother: 2 },
        flags: ['toldSecret'],
        after: '{{sibling}}挨了一顿数落，看你的眼神里多了一层隔膜。你后来拼命想补偿，但有些秘密一旦泄了底，就再也圆不回来。',
        keywords: ['告诉','妈','说']
      },
      {
        text: '故意装睡，装作根本没被叫醒',
        risk: '微澜',
        effects: { mind: 2, family: 0 },
        rel: { sibling0: -1 },
        flags: ['feignedSleep'],
        after: '{{sibling}}推了你两下，见你不醒，独自去了。第二天{{his}}没提这事，你也假装不知道。你们之间从此有了一个谁也不点破的谜。',
        keywords: ['装睡','没醒','不去']
      }
    ]
  },
  {
    id: 'mirror',
    title: '镜中的自己',
    minAge: 12, maxAge: 14, weight: 100, memory: true,
    scenes: [
      {
        time: '青春期的某个下午',
        env: '{{city}} · 家中镜子前',
        body: [
          '你第一次在镜子里认真地看自己。身高变了，声音变了，眼神里多了点说不清的东西。',
          '{{archetype:mirror}}',
          '你忽然意识到：这副皮囊，这具灵魂，就是你要带着走完一生一世的行囊。'
        ]
      }
    ],
    choices: [
      {
        text: '对着镜子笑了笑，接纳这具正在长大的身体',
        risk: '平静',
        effects: { health: 3, mind: 3 },
        flags: ['selfAccepted'],
        after: '你冲镜子里的自己笑了笑。那一笑很生涩，但你在心里对自己说：往后余生，多多关照。',
        keywords: ['笑','接纳','好','照']
      },
      {
        text: '移开视线，不太想看见现在的自己',
        risk: '微澜',
        effects: { mind: 2, health: -2 },
        flags: ['selfShy'],
        after: '你避开镜子里的目光。青春期像是身体与你签下的一份不平等条约，你还在适应它的条款。别急，岁月会替你谈。',
        keywords: ['不看','躲','移','不想']
      },
      {
        text: '在心里与镜中人约定：要活成一个了不起的大人',
        risk: '平静',
        effects: { mind: 4, career: 3 },
        flags: ['selfPromise'],
        after: '你对着镜子里的自己许下承诺。很多年后你也许忘了那个下午，但那个约定没有忘——它会在你每一次想放弃时，轻轻推你一把。',
        keywords: ['约定','了不起','大人','承诺']
      }
    ]
  },
  {
    id: 'midSchool',
    title: '升学的岔路',
    minAge: 14, maxAge: 15, weight: 100, memory: true,
    scenes: [
      {
        time: '初三/毕业班的春天',
        env: '{{city}} · 学校与家之间',
        body: [
          '成绩单摆在桌上。班主任找你谈过话，{{father}}和{{mother}}在厨房里压低声音算着账。你人生的第一道分岔，就这样摊开在眼前。',
          '{{era:gaokao}}'
        ]
      }
    ],
    choices: [
      {
        text: '报考重点高中，咬咬牙把书读下去',
        risk: '微澜',
        effects: { career: 6, mind: 3, family: -1, wealth: -2 },
        flags: ['wentHighSchool'],
        after: '录取通知书到的那天，{{father}}破例买了一挂鞭炮。家里紧巴了三年，但那三年里，你第一次觉得，自己握住了某种向上的可能。',
        keywords: ['高中','重点','读','考']
      },
      {
        text: '报考师范/中专，早点工作，给家里减负',
        risk: '微澜',
        effects: { career: 4, wealth: 4, family: 3, mind: -2 },
        flags: ['wentVocational'],
        after: '你背着行李走的那天，{{mother}}站在巷口一直看到车拐弯。你提前一步踏进了成年人的世界——早熟是穷人家的孩子最快的成长，也是最贵的。',
        keywords: ['师范','中专','工作','减负','技校']
      },
      {
        text: '跟着师傅去学手艺，先挣钱再说',
        risk: '暗流',
        effects: { wealth: 6, career: 3, mind: -5, friend: -2 },
        flags: ['wentApprentice'],
        after: '你把手上的墨水味换成了机油/汗味。师傅说你是块材料。夜深人静时，你偶尔会梦见教室，梦里的黑板永远擦不干净。',
        keywords: ['师傅','手艺','挣钱','学徒']
      }
    ],
    parallel: '如果你选了另一条路，会在二十年后某个黄昏，与今天的你擦肩而过——一个穿着工装，一个夹着公文包。你们互相看了一眼，谁也没认出谁。'
  },
  {
    id: 'firstLove',
    title: '心动 · 白月光',
    minAge: 15, maxAge: 16, weight: 100, memory: true,
    scenes: [
      {
        time: '秋天 · 放学后',
        env: '{{city}} · 操场/校门口',
        body: [
          '那天黄昏的光正好，{{firstLove}}从操场那头走过来，发梢沾着风。你忽然觉得，全世界的声音都安静下来，只剩心跳在胸腔里擂鼓。',
          '你们每天在同一间教室上课，可从这一天起，教室变得不一样了。你会假装看窗外，实则在余光里找他/她。'
        ]
      }
    ],
    choices: [
      {
        text: '把酝酿了一周的纸条塞进他/她的课本里',
        risk: '微澜',
        effects: { love: 6, mind: 1, friend: -1 },
        flags: ['confessedLove', 'firstLoveActive'],
        after: '纸条写了两遍，第一遍揉成团扔了。第二天{{firstLove}}在你桌上放了一颗糖，没留字。你们谁都没说破，但那个秋天，空气都是甜的。',
        keywords: ['纸条','塞','写','表白','信']
      },
      {
        text: '什么也不做，只是把这份喜欢放进心里，酿成秘密',
        risk: '微澜',
        effects: { love: 3, mind: 3 },
        flags: ['secretLove', 'firstLoveActive'],
        after: '你把名字写在课桌最角落，又用橡皮擦掉。这份喜欢像一粒没发芽的种子，埋进土里。许多年后，它会在某个夜里忽然开花，开得你措手不及。',
        keywords: ['秘密','不说','藏','心里']
      },
      {
        text: '故意在他/她面前大声说笑，试图引起注意',
        risk: '微澜',
        effects: { love: 2, friend: 1, mind: -1 },
        flags: ['playfulLove', 'firstLoveActive'],
        after: '{{firstLove}}多看了你两眼，你的笑声更响了。后来他/她说，你那时候的样子，像一只努力开屏的小孔雀，笨拙得可爱。',
        keywords: ['说笑','引起','大声','注意']
      }
    ],
    parallel: '多年后你会知道，那个黄昏{{firstLove}}本来要过来跟你说话，却被同学喊走了。如果那声呼唤晚三秒，你们的故事会从十五岁开始。'
  },
  {
    id: 'examCheat',
    title: '作弊的诱惑',
    minAge: 15, maxAge: 17, weight: 70,
    scenes: [
      {
        time: '期末考 · 午后',
        env: '{{city}} · 考场',
        body: [
          '最后一道大题你完全不会。前桌的答案摊在桌角，只要抄一眼，名次就能前进十名。监考老师正低头看报纸。',
          '窗外的蝉叫得震天响。'
        ]
      }
    ],
    choices: [
      {
        text: '把笔放下，交上那道空着的题',
        risk: '平静',
        effects: { mind: 5, family: 1 },
        flags: ['honestExam'],
        after: '你交卷时，前桌回头看了你一眼。成绩出来后你掉了三名，但你在本子上写：这题我不会，可我知道怎么赢。',
        keywords: ['不抄','交','空','放下']
      },
      {
        text: '飞快地抄下答案，心跳得快要冲出胸腔',
        risk: '暗流',
        effects: { career: 3, mind: -4 },
        flags: ['cheatedExam'],
        after: '你得了高分，却躲了那道题整整一个暑假。第一次得手的感觉，比想象中的胜利更烫——它会在你之后每一次伸手时，轻轻勾你的指尖。',
        keywords: ['抄','答案','看']
      }
    ],
    parallel: '如果你没有抄，那个名次会在三年后的升学里替你省下一分运气；如果你抄了，那份心虚会在某个深夜忽然回来敲门。人生从不免费，只是账单的日期不同。'
  },
  {
    id: 'friendRift',
    title: '友情的裂隙',
    minAge: 16, maxAge: 17, weight: 90, memory: true,
    scenes: [
      {
        time: '冬 · 放学后',
        env: '{{city}} · 回家的岔路口',
        body: [
          '{{bff}}忽然拦住你，眼睛红红的：「那件事，你为什么瞒着我？」你愣在原地。你确实瞒了他/她一件事——一件你觉得说出来会伤他/她的事。',
          '北风把你们的影子吹得又长又冷。'
        ]
      }
    ],
    choices: [
      {
        text: '把事情原原本本说清楚，哪怕难堪',
        risk: '微澜',
        effects: { friend: 6, mind: 3 },
        rel: { bff: 8 },
        flags: ['friendHonest'],
        after: '你说了。{{bff}}沉默了很久，然后骂了你一句，又给了你一拳，最后说：「下次再瞒我，绝交。」你们并肩走了那条最冷的路，心却是热的。',
        keywords: ['说','解释','清楚','坦白']
      },
      {
        text: '咬紧牙关说「没什么」，转身先走',
        risk: '暗流',
        effects: { friend: -5, mind: 2 },
        rel: { bff: -6 },
        flags: ['friendBroke'],
        after: '你走了。身后的脚步声停了。从那以后，你们还在一个班，却像隔了一条河。很多年后你路过那个岔路口，还会下意识放慢脚步。',
        keywords: ['没什么','走','转身','不说']
      },
      {
        text: '反问：「你先说，你是不是也有事瞒着我？」',
        risk: '暗流',
        effects: { friend: -3, mind: 2 },
        rel: { bff: -3 },
        flags: ['friendCounter'],
        after: '{{bff}}愣住了，然后笑了一声，说「算了」。你们各走各路。那句「算了」很轻，却把你们之间的一扇门，轻轻地关上了。',
        keywords: ['反问','你先说','瞒我','互揭']
      }
    ],
    parallel: '如果你坦白了，你们的友谊会在二十年后依然坚固，成为你人生里最稳的一条线。而这一世——你还有机会，在某个岔路口重新选择。'
  },
  {
    id: 'corridor',
    title: '深夜走廊',
    minAge: 16, maxAge: 18, weight: 90, memory: true,
    scenes: [
      {
        time: '深夜 · 十二点',
        env: '{{city}} · 家的走廊',
        body: [
          '你起夜，撞见{{father}}站在走廊尽头的窗前。他背对着你，烟头一明一灭，窗外的灯火已经稀了。',
          '他听见脚步声，没回头。空气里只有烟味和沉默。你知道有些话在他嘴边，也知道有些话在你嘴边——可走廊太窄，装不下两个人同时开口。'
        ]
      }
    ],
    choices: [
      {
        text: '走过去，和他并排站在窗前，不说话',
        risk: '平静',
        effects: { family: 5, mind: 2 },
        rel: { father: 6 },
        flags: ['nightStand'],
        after: '你站到他旁边。他侧头看了你一眼，没赶你走。你们一起看了很久的夜色。那一夜你们没说一个字，却好像什么都说了。',
        keywords: ['并排','站','窗前','不说']
      },
      {
        text: '主动开口：「爸，有心事？」',
        risk: '平静',
        effects: { family: 5, mind: 3 },
        rel: { father: 6 },
        flags: ['nightAsk'],
        after: '{{father}}灭了烟，沉默半晌，说：「没什么，就是最近厂里/单位里……」话没说完，但他愿意开口了。你第一次觉得，父亲也需要人接话。',
        keywords: ['心事','开口','问','爸']
      },
      {
        text: '退回房间，把门轻轻带上',
        risk: '微澜',
        effects: { family: -2, mind: 3 },
        flags: ['nightClose'],
        after: '门合上的声音很轻。你躺在床上，听见他长长地叹了口气。后来很多个深夜，你都会想起那声叹息——像一枚钉子，钉在走廊尽头。',
        keywords: ['退','回房','关门','躲']
      }
    ]
  },
  {
    id: 'gaokao',
    title: '命运的大考',
    minAge: 18, maxAge: 19, weight: 100, memory: true,
    scenes: [
      {
        time: '六月 · 或恢复高考的冬天',
        env: '{{city}} · 考场门前',
        body: [
          '{{era:gaokao}}',
          '进考场前，{{mother}}往你书包里塞了两个煮鸡蛋，{{father}}把你送到路口，只说了一句「去吧」。那两个字，是他这辈子最重的托付。',
          '铃声响起。你的笔悬在试卷上方，像悬在命运的分界线上。'
        ]
      }
    ],
    choices: [
      {
        text: '深吸一口气，把所有的夜都写进答卷',
        risk: '微澜',
        effects: { career: 8, mind: 3 },
        flags: ['gaokaoAllIn'],
        after: '你写得手心出汗。出考场时天光正好，你忽然觉得，那三年的煤油灯、深夜的台灯、打瞌睡时掐自己的手背，都在这一刻有了回音。',
        keywords: ['全力以赴','写','拼','考']
      },
      {
        text: '最后一题不会，但你把想到的都写满了',
        risk: '平静',
        effects: { career: 5, mind: 2, family: 1 },
        flags: ['gaokaoFilled'],
        after: '你交卷时手在抖。多年后你才知道，那题你写错了一半——但人生的题从来不止一道，你后来补上了。',
        keywords: ['写满','不会','尽力','答完']
      },
      {
        text: '提前交卷，去赴约——有人在考场外等你',
        risk: '暗流',
        effects: { career: -4, love: 5, mind: -1 },
        flags: ['gaokaoLove'],
        need: ['firstLoveActive'],
        after: '你提前四十分钟交卷。考场外阳光很好，{{firstLove}}站在老槐树下等你。那年夏天的风记住了你们，而分数记住了你们的任性。',
        keywords: ['提前','赴约','等','爱']
      },
      {
        text: '凭过目不忘，把最后的大题从记忆深处捞出来',
        risk: '微澜',
        effects: { career: 9, mind: 2 },
        flags: ['gaokaoEidetic'],
        needTalent: ['eidetic'],
        after: '你闭上眼，那些背过的公式像鱼群一样浮上来。走出考场时你确信：天赋是命运提前预支的利息，而你把它还成了本钱。',
        keywords: ['过目不忘','背','记','捞']
      }
    ],
    parallel: '如果那一年你晚交半小时卷，命运会给你多三分——三分够不够改变人生？谁也不知道。但差之毫厘的错过，本身就是人生的一部分。'
  },
  {
    id: 'leaveHome',
    title: '第一次离乡',
    minAge: 18, maxAge: 20, weight: 100, memory: true,
    scenes: [
      {
        time: '秋天 · 清晨',
        env: '{{city}} · 车站/路口',
        body: [
          '行李袋里装着{{mother}}连夜做的干粮，口袋里是{{father}}塞给你的皱巴巴的钱。车站的广播响了，你要去的地方，是地图上需要坐很久车才能到达的远方。',
          '{{mother}}站在月台上，风把她的头发吹乱了。她没有哭，只是把手举起来，一直举着，直到车开远。'
        ]
      }
    ],
    choices: [
      {
        text: '隔着车窗，用力朝她挥手，一直到看不见为止',
        risk: '平静',
        effects: { family: 4, mind: 2 },
        rel: { mother: 5 },
        flags: ['wavedGoodbye'],
        after: '你挥了很久，手酸了也没放。你后来才知道，她站在原地，等到车的影子彻底消失，才转身慢慢往回走。',
        keywords: ['挥手','招手','看她']
      },
      {
        text: '别过头去，不让母亲看见你的眼泪',
        risk: '微澜',
        effects: { family: 2, mind: 3 },
        flags: ['hidTears'],
        after: '你忍住没哭，等车开出两站才哭出来。多年后你才发现，你学会了母亲的本事——把眼泪留给没人的地方。',
        keywords: ['不哭','别头','忍','眼泪']
      },
      {
        text: '在心里发誓：混不出名堂，绝不回来',
        risk: '暗流',
        effects: { career: 4, mind: 2, family: -1 },
        flags: ['vowedReturn'],
        after: '这个誓言像一根鞭子，赶着你往前跑。你确实跑远了——远到很多年后的某个除夕，你站在窗前，忽然发现已经很久没回过家了。',
        keywords: ['发誓','名堂','不回来','拼']
      }
    ],
    parallel: '那班车如果晚点五分钟，你会听见{{mother}}喊出那句藏了一路的话：「常回来看看。」这句话，你用了很多年才在电话里替她补上。'
  },
  {
    id: 'strayCat',
    title: '雨里的猫',
    minAge: 8, maxAge: 20, weight: 55,
    scenes: [
      {
        time: '雨天',
        env: '{{city}} · 街角',
        body: [
          '一只瘦猫蹲在屋檐下，{{geoRain}}把它的毛淋成一绺一绺的。它看见你，叫了一声，声音哑得像被雨泡过。',
          '你口袋里有一块干粮/一枚硬币，书包里有一个可以装它的空纸盒。'
        ]
      }
    ],
    choices: [
      {
        text: '蹲下来，把干粮/硬币放在它面前',
        risk: '平静',
        effects: { friend: 2, mind: 2, wealth: -1 },
        flags: ['fedCat'],
        after: '它闻了闻，低头吃起来。你走时它跟了你两步，又停住了。多年后你还会想起那双眼睛——你没有能力带走它，但你至少让它吃了一顿饱饭。',
        keywords: ['喂','放','蹲','猫']
      },
      {
        text: '脱下外套裹住它，抱回家',
        risk: '微澜',
        effects: { family: 2, friend: 1, wealth: -2 },
        flags: ['keptCat'],
        after: '{{mother}}嘴上嫌你多事，还是找了一个旧纸箱。那只猫在你家活了十二年。它走的那天，你抱着空纸箱坐了很久。',
        keywords: ['抱','带回家','养','外套']
      },
      {
        text: '低头走过去，当作没看见',
        risk: '平静',
        effects: { mind: 1 },
        after: '你走过去了。雨声很大，盖住了身后的猫叫。很多事就是这样——你选择不看，它就留在原地，成为记忆里模糊的一团湿毛。',
        keywords: ['走','没看见','不理']
      }
    ]
  }
];
