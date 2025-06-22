# v1.3.6 (2025-06-22)

This is the v1.3.6 update, released on June 22, 2025. It focuses on several architectural changes to make the application more flexible and stable, while also introducing a few new features.

Below is the full list of changes.

The content of this update announcement is translated by AI, so it may contain some errors.

## 1. Functional Updates

### 1.1. Match-History Review

In previous versions, every finished game was saved to the database (the EncounteredGames table), but there was no way to review them—apart from the "Encountered" tag shown on the match page.

Now the records appear in the left sidebar of the player-stats page, showing match time, win/loss, ally/enemy status, and KDA.

![img0](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/0.png)

> League Akari uses an SQLite database located at
> `C:\Users\<username>\AppData\Roaming\league-akari\LeagueAkari.db`.

### 1.2. Upgraded In-Game Messaging

The previous version let you send any custom content to the game via a user-supplied template, but it had several drawbacks:

- Only one template was allowed.
- It relied on cumbersome **EJS** syntax.
- The learning curve was steep for most users.

All three issues are addressed in this release. The new system is slightly more complex, but vastly more flexible and easier to use.

#### 1.2.1. Separating "Sendable Items" from Templates

To support multiple templates, they are now managed separately.

Each **sendable item** can be one of two types:

- **Plain text** – sends fixed content as defined.
- **Template-based** – uses a JavaScript template where you define several required functions to generate any content you like.

![img2](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/2.png)

Once a template exists, simply reference it in a sendable item:

![img3](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/3.png)

Click **Test Run** beforehand to preview the output.

#### 1.2.2. Goodbye, EJS

Because EJS syntax differs from JavaScript and is notoriously unfriendly, it has been replaced by pure JavaScript. **Old EJS templates will no longer work.**

> For maximum freedom, JavaScript inside a template runs **un-sandboxed**—all Node.js modules (including `require`) are available.

#### 1.2.3. Creating or Importing Templates

You can create a blank template or pull one from the **cloud template** library hosted in the [LeagueAkari-Config](https://github.com/LeagueAkari/LeagueAkari-Config) repository. Cloud templates are plug-and-play and updated regularly; feel free to suggest ideas or contribute directly.

![img4](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/4.png)

![img5](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/5.png)

> Template environment typings are defined in [env-types.ts](https://github.com/LeagueAkari/LeagueAkari/blob/main/src/main/shards/in-game-send/templates/env-types.ts).

> Currently only Chinese content is available.

### 1.3. Summoner Search

You can now store more recently visited summoners and pin them to the top. A friends list is shown below for quick lookup.

![img6](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/6.png)

### 1.4. Exporting/Importing Tagged Players

Players you've tagged on this PC (with any account) can now be exported or imported. The option lives under **Storage** in settings.

![img7](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/7.png)

Share your tag list with others if you like.

### 1.5. OP.GG Window

Because Chinese users sometimes face connectivity issues with OP.GG, loading can now be cancelled early via a **Cancel** button. A small panel in the lower-right lets you browse all champions in the current match during champ select or in-game.

When importing item builds, certain items (e.g., Seraph's, Muramana) are reverted to their base forms.

### 1.6. "Tagged" Label on Match Page

The match page now shows tags you applied **with other accounts on the same region**, not just the current account.

### 1.7. Match Replay Download

A quick-access button on the match-details card lets you attempt to download the replay. It works like the official client but is **not limited to your last 20 games**.

![img8](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/8.png)

By default, replays (`*.rofl`) are saved to
`C:\Users\<username>\Documents\League of Legends\Replays`.

Very old replays still can't be downloaded if the game version has changed, and only matches from the same region are supported.

## 2. Tweaks & Fixes

### 2.1. New Icon

The name **League Akari** is inspired by YuruYuri's "protagonist" Akaza Akari. The new logo uses her signature bun hairstyle.

![img9](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/9.png)

### 2.2. Automated Bravery

The **Bravery** (ID `-3`) is now included in the auto-pick list, but only for Arena mode; it is **ignored** elsewhere.

### 2.3. Better "Offline" Mode

Online status was not previously forced to "Offline." It now is, so others will always see you as offline.

### 2.4. Multi-Client Connections

UI for client connections has been refined. Unconnected clients are displayed with character previews via pre-loading, and some League Client UX actions have moved here.

![img10](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250621/10.png)

### 2.5. One More Reconnect Attempt

If LeagueClientUx closes while LeagueClient keeps running, reconnecting fails. The app now caches the last connection command line and—upon restart—performs up to **one** reconnect attempt after validation.

### 2.6. Rich-Text Rendering

Screens that render rich text now use **GitHub Markdown style** and additionally support HTML tags.

### 2.7. Match Page with LCU Data Source

Previously, choosing LCU as the data source disabled cross-region queries. Cross-region queries now **always fall back to the SGP data source**.

## 3. For Advanced Users

### 3.1. Dynamic Repository Sources

Perhaps the most impactful change: the app relied too heavily on GitHub, which is slow for many mainland-China users. It now offers both **GitHub and Gitee** sources, with Gitee chosen by default inside China.

### 3.2. Unified Config Repository

Some periodically fetched cloud data (SGP server configs, announcements, etc.) has moved to the `LeagueAkari-Config` repo, allowing rapid response to urgent issues without frequent app updates.

### 3.3. Experimental Custom Module Loading

If a `shards` directory exists alongside the executable, all `*.js` files inside are autoloaded. Each must follow the format below and will be loaded in dependency order. Example:

```js
class ExampleShard {
  // must be unique
  static id = "example-shard-main";

  // no circular dependencies
  static dependencies = ["app-common-main", "league-client-main"];

  // higher priority loads first if multiple shards are present
  static priority = 0;

  // dependencies are passed in the order listed above
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

This feature is experimental.

### 3.4. Reverting Title-Bar "Traffic Lights"

The previous Native Windows TitleBar Overlays caused issues, so we've reverted to a simulated title bar.

### 3.5. Telemetry

League Akari now collects and uploads certain information—but **never any private data**.
