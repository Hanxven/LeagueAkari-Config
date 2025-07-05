# v1.3.7 (2025-07-06)

This is the v1.3.7 update, released on 2025-07-06.

This release is primarily focused on bug fixes.

---

## 1. Fixes

### 1.1. Stored Configuration Import

In v1.3.6, configuration export worked normally, but could not be imported correctly. This version fixes this issue.

### 1.2. No Longer Counting Non-existent Riot Client

When checking client installation locations, non-existent RiotClient installations are no longer erroneously counted.

### 1.3. Window Size Issues

In previous versions, window sizes could become abnormal, such as becoming extremely large and unusable.

Now, all windows check the validity of their position and size on startup. A "Adjust All Window Positions" option has also been added to the dev menu in the system tray.

> You can perform a manual correction by going to the tray icon menu -> **dev** -> **Adjust All Window Positions**.

### 1.4. Auto-select Berserker

Now, in Arena mode, auto-selecting **Berserker** will take effect.

### 1.5. Auto-select in ARAM

Now, auto-selecting will also take effect in the card selection phase.

## 2. Adjustments

### 2.1. Announcement and Update Modals

These two modals will no longer automatically pop up under normal circumstances.

For announcements, they will only be forced to pop up when involving higher priority issues.

### 2.2. ARAM Tracker

After the new ARAM update, it is no longer possible to accurately record events. Therefore, the ARAM tracker has been removed.

At the same time, the auxiliary window bench feature has been adjusted and can now properly display the status of selectable champions.
