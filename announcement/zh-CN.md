---
alertLevel: medium
---

## 当前已知问题 (新)

已发现导出的设置文件无法被正常读取。请等待近期的修复。

2025 年 6 月 26 日，新版大乱斗更新后，原有的小窗口记录功能和自动选择功能失效。请等待近期的适配修复。

对于主窗口大小异常问题，可[点击这里](akari://renderer-link/evaluate?target=main-window&code=%28%28%29%20%3D%3E%20%7B%0A%20%20const%20w%20%3D%20akariManager.getInstance%28%27window-manager-renderer%27%29.mainWindow%3B%0A%20%20w%3F.unmaximize%28%29%3B%0A%20%20w%3F.setSize%281200%2C%20720%29%3B%0A%7D%29%28%29)尝试修复，可能有用。

---

## Akari 公告

偶尔来看看，或许你会获得一些有用的信息。

v1.3.6 已发布，[查看更新内容](akari://renderer-link/overlays/release-modal)。

---

### 千万注意！尤其是上个版本的用户

1. 如果你使用 **卡莎** 的 **「联盟不朽 卡莎」** 作为背景图片……
2. **请不要再** 使用 **ID 以 `6b817ce1-aac3-…` 开头** 的装饰！
3. 否则客户端会无限闪退！

![HINT](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250614/cbffa9c7-0a4f-4c76-915b-9e2388f557bb.png)

> 虽然在 v1.3.6+ 之后，错误的装饰将不再被允许选用，但仍要在此进行提醒，以警示那些用过旧版本的用户。

> **番外篇: 不早说，我已经无限闪退了**
>
> 解决办法： 打开客户端连接成功的瞬间，将生涯背景换成任何正常皮肤，要快。

---

### **关于 League Akari**

它是**免费**、**开源**的，许可证是 GPL-3.0。

如果你花钱从某个付费的渠道（倒卖、套壳等）获取了此软件……请务必通知我们，我们会开瓶<span class="flow-gradient-text-9e2b3c0b">🥂 香槟</span>祝贺，另外别忘了去退款。

觉得这个项目不错？去 [GitHub](https://github.com/LeagueAkari/LeagueAkari) 免费点颗 ⭐，以支持我们继续开发。

---

### 聚集地 & 反馈渠道之一

|                  | 传送门                                      | 备注                                 |
| ---------------- | ------------------------------------------- | ------------------------------------ |
| QQ 群 (一号据点) | [301157623](https://qm.qq.com/q/F1Xv85etlm) | 口令 **akari**，会定期清理潜水人员。 |
| Telegram         | [@LeagueAkari](https://t.me/leagueakari)    | 分身群兼避难所                       |

<style>
  .flow-gradient-text-9e2b3c0b {
    background-image: linear-gradient(
      90deg,
      #91dcff 0%,
      #91dcff 10%,
      #ff59cb 55%,
      #ffc1eb 100%
    );
    background-size: 400% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    animation: gradientMove-9e2b3c0b 8s ease-in-out infinite;
    font-weight: bold;
  }
  @keyframes gradientMove-9e2b3c0b {
    0% {
      background-position: 0% 0;
    }
    50% {
      background-position: 100% 0;
    }
    100% {
      background-position: 0% 0;
    }
  }
</style>
