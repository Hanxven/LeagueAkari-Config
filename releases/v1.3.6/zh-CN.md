# v1.3.6 (2025-06-22)

本次为 v1.3.6 更新，发布于 2025-06-22。在这个版本中，主要涉及应用架构的调整，提高了其灵活性和稳定性，同时也引入了一些新的特性。

下文为本次更新的详细内容。

## 1. 功能性更新

### 1.1. 历史对局回顾

在之前的版本中，在一局游戏结束后，应用会自动记录本次对局的游戏 ID 并存储到数据库中，但并没有提供再次查看的方式。它们仅会在对局页面作为 "遇到过" 标签存在。

现在这些记录也会展示在该玩家战绩页面的左侧边栏中，包括对局时间、胜负、是否是队友以及 KDA。

![img0](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/0.png)

> League Akari 使用 SQLite 作为数据库，存放在 `C:\Users\<用户名>\AppData\Roaming\league-akari\LeagueAkari.db` 中。这些数据实际存在于 EncounteredGames 表中。

### 1.2. 升级后的游戏内发送

在之前的版本中，应用允许玩家提供一个自定义的模板，以生成任何想要的内容，并发送到游戏中。

但这个功能存在一些问题：

- 只支持一个自定义的模板。
- 使用非常阴间的 `ejs` 语法。
- 使用门槛对于普通用户来说太高。

针对上述三点，在这个版本进行了调整。调整后的它可能有点复杂，但灵活性也易用性显著提升。

#### 1.2.1. 发送项与模板分离

为了确保可以使用多个不同的模板，在这个版本中，模板被单独分离出去了。

现在，每一个发送项都可以被设定为下面两种之一：基于**纯文本**或基于**模板**。

纯文本就是直接发送已经定义好的且固定的内容。

重点在于基于**模板**，它意味着你需要定义一个基于 JavaScript 语法的模板，并且需要按照规则定义几个函数，就可以生成任何想要的内容。

![img2](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/2.png)

拥有一个模板后，你只需要在发送项中引用它，如下图所示。

![img3](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/3.png)

你可以在发送前点击**试运行**按钮，以查看模板是否正确，或是否符合你的预期。

#### 1.2.2. 不再使用 EJS

EJS 虽然也是 JavaScript 语法，但它的语法和 JavaScript 并不完全相同，并且其语法非常阴间，即使对于进阶用户也并不友好。

因此，它直接被替换成 JavaScript，这也意味着之前的模板语法**不再可用**。

> 需要注意的是，为了确保自由度，位于模板中的 JavaScript 代码**没有任何隔离**，包括 `require` 在内的所有 Node.js 模块都可以被使用。

#### 1.2.3. 创建或导入模板

在模板定义中，你可以手动创建一个空白模板，或直接使用**云端模板**。

云端模板定义在 [LeagueAkari-Config](https://github.com/LeagueAkari/LeagueAkari-Config) 仓库中，开箱即用。它会定期更新，你也可以提出任何创意或直接的贡献。

![img4](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/4.png)

![img5](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/5.png)

> 模板环境的类型定义在 [env-types.ts](https://github.com/LeagueAkari/LeagueAkari/blob/main/src/main/shards/in-game-send/templates/env-types.ts) 中。

### 1.3. 召唤师搜索

现在，可以存放更多的近期访问的召唤师，也支持将其置顶。

另外，在下面会提供一个好友列表，以快速搜索。

![img6](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/6.png)

### 1.4. 导出或导入被标记的玩家

现在，你曾经用这台电脑标记过的玩家 (无论是哪个账号)，可以被导出或导入。它位于设置项的**存储**标签中。

![img7](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/7.png)

或许你可以将它分享给其他人。

### 1.5. OP.GG 窗口

鉴于国内用户在某些时段访问 OP.GG 会遇到网络问题，现在它的加载可以提前取消。提供了一个取消按钮，用于立即取消正在进行中的加载。

另外，在右下角不起眼处提供了一个快捷面板，可以在**游戏进行或英雄选择阶段**快速浏览所有本局涉及到的英雄。

在进行装备导入时，部分装备 (如炽天使之杖、魔切等) 会被还原为其原始形态。

### 1.6. 对局页面的"已标记"标签

现在会展示这个大区你曾经使用过的其他账号对此玩家进行的标记。原本它只会展示当前账号的标记。

### 1.7. 对局回放下载

在战绩卡片的详情界面中，提供了一个便捷入口，用于尝试下载本局回放。它的工作原理和客户端相同，但它不再仅限于最近 20 场对局。

![img8](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/8.png)

默认情况下，客户端下载后的回放文件 (\*.rofl) 会存放在 `C:\Users\<用户名>\Documents\League of Legends\Replays` 下。

注意，过于早期的回放文件仍然不可下载，因为游戏版本发生了变化。

注意，仅支持同大区玩家的回放下载。

## 2. 一些细节调整或修复

### 2.1. 图标更改

League **Akari** 的命名来源是《摇曳百合》的"主角"赤座灯里 (Akaza Akari)。

因此新的 LOGO 的构图元素采用了她的标志性丸子头。

![img9](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/9.png)

### 2.2. 自动化的勇敢举动

勇敢举动 (ID 为 `-3`) 现在加入到了自动英雄选择的列表中。

仅在斗魂竞技场模式中生效，其他模式下该选项将被**忽略**。

### 2.3. 更好地隐身

在之前的版本中，在线状态不会被修正为离线状态。现在它会被修正为离线状态，让你可以更好地隐藏自己，别人只会看到一个离线的你。

### 2.4. 多客户端可连接的情况

连接到客户端相关的 UI 进行了一些调整，现在会更好地显示其他未连接客户端的角色预览，基于一些预先加载的方式。

![img10](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/10.png)

同时，有关 League Client UX 的部分操作也移动到了这里。

### 2.5. 再一次重连尝试

连接到 LeagueClient 的命令行需要从 LeagueClientUx 进程获取，但如果 UX 进程被关闭，同时 LeagueClient 仍在运行，这会导致应用无法再次连接到 LeagueClient。

为了解决这种情况，应用会对上一次的连接命令行进行缓存，同时在应用再次启动时，会进行一些检查步骤，并执行**至多一次**的重新连接尝试。

### 2.6. 复杂格式渲染

对于一些需要渲染富文本的场景，现在基于 GitHub Markdown Style。

同时也额外支持 HTML 标签。

### 2.7. LCU 情况下战绩页面

在之前的版本中，如果设置了 LCU 作为数据源，那么会导致跨区查询不可用。现在跨区的查询会**强制**使用 SGP 数据源。

## 3. 面向进阶用户

### 3.1. 动态仓库源

这几乎是本次最有意义的改动之一。

在之前的版本中，应用过度依赖 GitHub 作为仓库源，但它的速度对于部分中国大陆用户来说，太慢了。

因此，现在会同时提供 GitHub 和 Gitee 两个平台作为仓库源，大陆用户会默认分配到 Gitee 以保证连通性。

### 3.2. 统一仓库配置中心

现在部分需要定期拉取的云端数据已经被迁移到 `LeagueAkari-Config` 仓库中，并由它负责拉取。

包括 SGP 服务器配置，或公告等。这能提供一些突发情况的快速响应，以避免应用的频繁更新。

### 3.3. 实验性的自定义模块加载

如果在程序 exe 目录同级存在 `shards` 目录，则会自动加载其中所有的 `*.js` 文件。它必须定义为以下格式，并遵循内部依赖顺序被应用加载。一个例子如下：

```js
class ExampleShard {
  // must be unique
  static id = "example-shard-main";

  // no circular dependencies
  static dependencies = ["app-common-main", "league-client-main"];

  // if multiple shards can be loaded at the same time, the one with higher priority will be loaded first
  static priority = 0;

  // the order of dependencies is guaranteed, same as defined in `dependencies`
  constructor(appCommon, leagueClient) {
    this.appCommon = appCommon;
    this.leagueClient = leagueClient;
  }

  async onInit() {
    // your code here
  }
}

module.exports = ExampleShard;
```

目前是实验性的。

### 3.4. 回调标题栏交通灯

在之前的版本中，使用了 Native Windows TitleBar Overlays。目前看来似乎存在一些问题，现在已被回调，继续使用模拟的标题栏。

### 3.5. 信息收集

目前 League Akari 会收集并上传一些运行时信息，**但不会包括任何隐私信息**。
