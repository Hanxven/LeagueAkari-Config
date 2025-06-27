## Current Known Issues (New)

The exported settings file cannot be read properly. Please wait for the upcoming fixes.

As of June 26, 2025, the new version of the game has caused the existing small window recording and auto-selection features to fail. Please wait for the upcoming fixes.

For the main window size issue, you can try [clicking here](akari://renderer-link/evaluate?target=main-window&code=%28%28%29%20%3D%3E%20%7B%0A%20%20const%20w%20%3D%20akariManager.getInstance%28%27window-manager-renderer%27%29.mainWindow%3B%0A%20%20w%3F.unmaximize%28%29%3B%0A%20%20w%3F.setSize%281200%2C%20720%29%3B%0A%7D%29%28%29) to fix it, which might work.

---

## Akari Announcement

Occasionally checking in, you might find some useful information.

When setting your **Profile Background** in the client:

- If you select **Kai’Sa — “League Immortal”**, **do not** apply the decoration whose ID begins with `6b817ce1-aac3-…`.
- Doing so will cause the client to enter an endless crash loop.

![Screenshot showing the problematic decoration](https://cdn.jsdelivr.net/gh/LeagueAkari/LeagueAkari-Config@main/assets/20250614/cbffa9c7-0a4f-4c76-915b-9e2388f557bb.png)

---

#### Already stuck in a crash loop?

Launch the client and, during the brief startup window, immediately switch your Career Background to any other normal skin. The application should then start normally on the next launch.

---

### 2. About League Akari

League Akari is an open-source project licensed under **GPL-3.0**.
It is completely free and contains **no paid features**.

If you find the project useful, please consider giving it a free ⭐ on [GitHub](https://github.com/LeagueAkari/LeagueAkari) to support ongoing development.

---

### 3. Community Channels

| Platform | Link                                        | Notes                                                                                  |
| -------- | ------------------------------------------- | -------------------------------------------------------------------------------------- |
| QQ Group | [301157623](https://qm.qq.com/q/F1Xv85etlm) | Password: `akari`. The group is periodically audited; inactive members may be removed. |
| Telegram | [@LeagueAkari](https://t.me/leagueakari)    | Open for bug reports and discussion.                                                   |

---

Please refer back to this page periodically; the content is updated as needed.
