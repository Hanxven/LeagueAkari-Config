# Part 1：常规公告

### 千万注意！

在设置生涯背景时，如果选择了**卡莎**的**联盟不朽 卡莎**，请勿选择 `6b817ce1-aac3-....` 开头的装饰，这会造成游戏客户端无限重启！

![IMG](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250614/cbffa9c7-0a4f-4c76-915b-9e2388f557bb.png)

#### 番外篇：我已经无限重启了怎么办？

请在客户端启动时的短时间内立即将生涯背景设置成随便一个正常的皮肤即可，要快！

### 阿卡日

QQ Group：[301157623](https://qm.qq.com/q/F1Xv85etlm) (Passcode：akari)

Telegram: [@LeagueAkari](https://t.me/leagueakari)

阿卡日是基于 GPL-3.0 许可证的开源软件。

阿卡日完全免费，没有任何付费功能。如果您通过任何渠道购买了本软件，那真的 house。

如果您支持本项目，请在 GitHub 上给它一个 Star ❤️。

# Part 2：复杂文档

## 代码块

```ts
import {
  World,
  Character,
  Scene,
  Dialogue,
  Expression,
  Emotion,
  Outfit,
  HireContract,
  MagicStaff,
  Schedule,
  EyeContact,
  ParentBias,
  TalentAssessment,
} from "@mushoku/core";

const world = World.load("greyrat-village");
const home = world.place("GreyratHouse");

const paul = Character.create("保罗").as("parent").withTrait("knight");
const zenith = Character.create("塞妮丝").as("parent");
const rudy = Character.create("鲁迪")
  .as("child")
  .age(3)
  .withTraits("聪明", "早熟")
  .setSchedule(Schedule.daily().morning("magic").afternoon("sword"));

const roxy = Character.create("洛琪希")
  .as("tutor")
  .age(14)
  .wear(Outfit.MageRobe.brown())
  .withHair("skyblue", "braided")
  .withSkin("pale")
  .withEyes("half-closed")
  .withExpression(Expression.Cold)
  .carry(new MagicStaff())
  .arriveAt(home);

Scene.create(world)
  .title("家庭教师的到来")
  .start(() => {
    const tutorContract = HireContract.propose()
      .from(home)
      .toGuild("WizardGuild")
      .withSalary("standard_noble")
      .targetRole("tutor");

    const result = tutorContract.fulfillWith(roxy);
    if (!result.success) return;

    home.accept(roxy);
    roxy.speak("我叫洛琪希，请多指教。");

    paul.freeze();
    zenith.freeze();
    home.react("惊讶");

    rudy.narrate(`
      萝莉、没好气的半眯眼、冷淡的态度。
      凑齐三个要素的她很完美。
      请务必成为我老婆。
    `);

    rudy.makeEyeContactWith(roxy);
    rudy.say("看起来很小。");

    roxy.emote(Emotion.Annoyed);
    roxy.say("你没有资格说我小。");

    roxy.lookAround();
    roxy.ask("我要教导的学生在哪里？");

    zenith.hold(rudy);
    zenith.say("啊，就是这孩子。");
    rudy.wink("right");

    roxy.widenEyes();
    roxy.sigh();
    roxy.murmur("唉……偶尔就是会有这种人呢……");
    roxy.comment(
      "只不过是成长稍微快了一点，就认定自己小孩很有才能的笨蛋父母……"
    );

    rudy.narrate("我听得到喔！不过算了，我也非常同意这句评论。");

    zenith.ask("有什么问题吗？");

    roxy.assess(
      TalentAssessment.create(rudy).forSubject("magic").result("不乐观")
    );
    roxy.say("我并不认为令郎可以理解魔术的理论。");

    zenith.defendWith(ParentBias.high());
    zenith.say("没问题，我们家的小鲁迪非常优秀！");

    roxy.sigh();
    roxy.say("唉……我明白了，我就尽力而为吧。");

    Schedule.assign(roxy, {
      daily: {
        morning: "teachMagic",
        afternoon: "studyTheory",
      },
    });

    rudy.startLessonWith(roxy);
    rudy.startSwordTrainingWith(paul);
  });
```

## 长文本 + HTML

<style>
  [data-scope="genshin"] {
    font-family: 'Segoe UI', sans-serif;
    background-color: #1e1e1e;
    color: #d4d4d4;
    padding: 2em;
    border-radius: 12px;
    line-height: 1.8;
  }
  [data-scope="genshin"] .quote-card {
    border: 1px solid #333;
    background: #2c2c2c;
    padding: 1em;
    margin-bottom: 1.5em;
    border-radius: 8px;
  }
  [data-scope="genshin"] .character-name {
    color: #82aaff;
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  [data-scope="genshin"] blockquote {
    margin: 0;
    padding-left: 1em;
    border-left: 3px solid #555;
    font-style: italic;
  }
  [data-scope="genshin"] .element-anemo { color: #56c7c7; }
  [data-scope="genshin"] .element-pyro { color: #ff6b6b; }
  [data-scope="genshin"] .element-cryo { color: #6bcfff; }
  [data-scope="genshin"] .element-electro { color: #d085ff; }
  [data-scope="genshin"] .element-geo { color: #f2c97d; }
  [data-scope="genshin"] .element-hydro { color: #67d5e3; }
  [data-scope="genshin"] .element-dendro { color: #a5d66a; }
</style>

<section data-scope="genshin">

<div class="quote-card">
  <div class="character-name element-electro">雷电将军（Raiden Shogun）</div>
  <blockquote>
    「愿此刻永恒。」<br>
    「人的愿望是永不停歇的洪流，想要给予其形体，并赋予其‘永恒’，也许正是神的职责吧。」
  </blockquote>
</div>

<div class="quote-card">
  <div class="character-name element-anemo">温迪（Venti）</div>
  <blockquote>
    「风带来了故事的种子，时间会让它发芽。」<br>
    「我不是谁的神，只是风而已，恰巧经过你心中的那阵风。」
  </blockquote>
</div>

<div class="quote-card">
  <div class="character-name element-geo">钟离（Zhongli）</div>
  <blockquote>
    「人间烟火，风花雪月，终归尘土。但契约，永恒不变。」<br>
    「万物皆有其代价，契约也不例外。」
  </blockquote>
</div>

<div class="quote-card">
  <div class="character-name element-pyro">胡桃（Hu Tao）</div>
  <blockquote>
    「人生苦短，来点儿甜的吧！」<br>
    「生死有命，富贵在天，但我负责超度～嘻嘻。」
  </blockquote>
</div>

<div class="quote-card">
  <div class="character-name element-hydro">夜兰（Yelan）</div>
  <blockquote>
    「信息，是胜利的钥匙。情报的掌控者，才是黑暗中的王者。」<br>
    「就算你隐藏再深，也终究逃不过我的眼睛。」
  </blockquote>
</div>

<div class="quote-card">
  <div class="character-name element-cryo">神里绫华（Kamisato Ayaka）</div>
  <blockquote>
    「雪落无声，心念无痕。正如我剑下无情，却心系人间。」<br>
    「有礼、有节、有义，才能有力。」
  </blockquote>
</div>

<div class="quote-card">
  <div class="character-name element-dendro">纳西妲（Nahida）</div>
  <blockquote>
    「知识是美好的，但智慧，是温柔的力量。」<br>
    「人不是为知识而活，而是为了活着而学习。」
  </blockquote>
</div>

<div class="quote-card">
  <div class="character-name element-anemo">枫原万叶（Kazuha）</div>
  <blockquote>
    「我心向风，便随风而去。」<br>
    「人如浮叶，心似游云，不问世间沉浮。」
  </blockquote>
</div>

</section>
