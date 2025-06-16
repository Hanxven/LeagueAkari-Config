// FROM https://github.com/real-web-world/hh-lol-prophet

// 基础分
const BASE_SCORE = 100;

// 在 5 小时以内，算作近期对局
const RECENT_WINDOW_HOURS = 5;

// 分数权重：近期权重 vs 历史权重，需要满足 RECENT_WEIGHT + OLD_WEIGHT = 1
const RECENT_WEIGHT = 0.8; // 近期权重 80%
const OLD_WEIGHT = 0.2; // 历史权重 20%

// 指标排名得分，如第一名 10分，第五名 -10分
const RANKING_SCORE = { 0: 10, 1: 5, 2: 0, 3: -5, 4: -10 };

// 评级门槛
const GRADE_THRESHOLDS = { S: 180, A: 150, B: 125, C: 105, D: 95 };

// 牛马中文名
const NIUMA_NAME = {
  S: "通天代",
  A: "小代",
  B: "上等马",
  C: "中等马",
  D: "下等马",
  E: "牛马",
  F: "没有马",
};

// 多杀分数奖励
const MULTI_KILL_BONUS = { triple: 5, quadra: 10, penta: 20 };

// 补兵分数奖励
const CS_BONUS = { 10: 20, 9: 10, 8: 5 };

// 占比 + 具体数值奖励
const CONTRIBUTION_BONUS = {
  heavy: [
    [15, 40],
    [10, 20],
    [5, 10],
  ],
  light: [
    [15, 20],
    [10, 10],
    [5, 5],
  ],
};

// 如果敌方某成员分数低于 D，则将其设置为 F，而不是 E
const TRANSFORM_ENEMY_TO_F = true;

const noZero = (n) => (n === 0 ? 1 : n);
const avg = (arr) => sumBy(arr, (x) => x.base) / arr.length;
const sumBy = (arr, pick) => arr.reduce((t, x) => t + pick(x), 0);

function extractGame(puuid, game) {
  const pId = game.participantIdentities.find(
    (p) => p.player.puuid === puuid
  )?.participantId;
  if (!pId) return null;

  const me = game.participants.find((p) => p.participantId === pId);
  if (!me) return null;

  // 队友集合
  const mates = game.participants.filter((p) => p.teamId === me.teamId);

  const totalKills = sumBy(mates, (p) => p.stats.kills);
  const totalDmg = sumBy(mates, (p) => p.stats.totalDamageDealtToChampions);
  const totalAss = sumBy(mates, (p) => p.stats.assists);

  // ---------- 排名 ----------
  const rank = (arr) => arr.findIndex((p) => p.participantId === pId);
  const sortBy = (key) =>
    [...mates].sort((a, b) => b.stats[key] - a.stats[key]);

  const kprRank = rank(
    [...mates].sort((a, b) => {
      const ka = a.stats.kills + a.stats.assists;
      const kb = b.stats.kills + b.stats.assists;
      return ka === kb ? a.stats.deaths - b.stats.deaths : kb - ka;
    })
  );
  const grRank = rank(sortBy("goldEarned"));
  const drRank = rank(sortBy("totalDamageDealtToChampions"));
  const vrRank = rank(sortBy("visionScore"));

  // ---------- 占比 ----------
  const kr = me.stats.kills / noZero(totalKills);
  const dr = me.stats.totalDamageDealtToChampions / noZero(totalDmg);
  const ar = me.stats.assists / noZero(totalAss);

  return {
    isRecent:
      Date.now() - game.gameCreation < RECENT_WINDOW_HOURS * 60 * 60 * 1000,
    isSupport: me.stats.teamPosition
      ? me.stats.teamPosition === "UTILITY"
      : null,

    // 里程碑
    isFirstBlood: me.stats.firstBloodKill,
    isFirstBloodAssist: me.stats.firstBloodAssist,
    triple: me.stats.tripleKills,
    quadra: me.stats.quadraKills,
    penta: me.stats.pentaKills,

    // 基础
    kills: me.stats.kills,
    deaths: me.stats.deaths,
    assists: me.stats.assists,

    // 排名
    kprRank,
    grRank,
    drRank,
    vrRank,

    // 占比 > 0.35 / 0.5
    isKrGt35: kr > 0.35,
    isKrGt50: kr > 0.5,
    isDrGt35: dr > 0.35,
    isDrGt50: dr > 0.5,
    isArGt35: ar > 0.35,
    isArGt50: ar > 0.5,

    csPerMin:
      (me.stats.totalMinionsKilled + me.stats.neutralMinionsKilled) /
      (game.gameDuration / 60),

    kpr: (me.stats.kills + me.stats.assists) / noZero(totalKills),
    kda: (me.stats.kills + me.stats.assists) / noZero(me.stats.deaths),
    memberCount: mates.length,
  };
}

/**
 * 单场评分
 */
function calcBaseScore(s) {
  let score = BASE_SCORE;

  // 一血
  if (s.isFirstBlood) score += 10;
  if (s.isFirstBloodAssist) score += 5;

  // 多杀
  score +=
    (s.triple ? MULTI_KILL_BONUS.triple : 0) +
    (s.quadra ? MULTI_KILL_BONUS.quadra : 0) +
    (s.penta ? MULTI_KILL_BONUS.penta : 0);

  // 排名得分
  score += RANKING_SCORE[s.kprRank] ?? 0;
  if (s.isSupport ? s.grRank <= 1 : true) score += RANKING_SCORE[s.grRank] ?? 0;
  if (s.drRank <= 1) score += RANKING_SCORE[s.drRank] ?? 0;
  if (s.vrRank <= 1) score += RANKING_SCORE[s.vrRank] ?? 0;

  // 占比 + 数值奖励
  const addContribution = (heavy, cnt) => {
    const table = CONTRIBUTION_BONUS[heavy ? "heavy" : "light"];
    for (const [threshold, bonus] of table) if (cnt > threshold) return bonus;
    return 0;
  };
  score += s.isKrGt50
    ? addContribution(true, s.kills)
    : s.isKrGt35
    ? addContribution(false, s.kills)
    : 0;
  score += s.isArGt50
    ? addContribution(true, s.assists)
    : s.isArGt35
    ? addContribution(false, s.assists)
    : 0;
  score += s.isDrGt50
    ? addContribution(true, s.kills)
    : s.isDrGt35
    ? addContribution(false, s.kills)
    : 0;

  // CS 奖励
  for (const cs in CS_BONUS)
    if (s.csPerMin >= cs) {
      score += CS_BONUS[cs];
      break;
    }

  // KDA + KPR 修正
  score += s.kda + ((s.kills - s.deaths) / noZero(s.memberCount)) * s.kpr;

  return score;
}

/**
 * 按权重计算最终得分
 */
function mergeScores(list) {
  const recent = list.filter((i) => i.isRecent);
  const old = list.filter((i) => !i.isRecent);

  if (!recent.length) return avg(old);
  if (!old.length) return avg(recent);
  return avg(recent) * RECENT_WEIGHT + avg(old) * OLD_WEIGHT;
}

/**
 * 评级，从 S 到 F。根据设置，己方最低分为 E，敌方最低分为 F
 */
function gradeName(score, isAlly) {
  if (score >= GRADE_THRESHOLDS.S) return NIUMA_NAME.S;
  if (score >= GRADE_THRESHOLDS.A) return NIUMA_NAME.A;
  if (score >= GRADE_THRESHOLDS.B) return NIUMA_NAME.B;
  if (score >= GRADE_THRESHOLDS.C) return NIUMA_NAME.C;
  if (score >= GRADE_THRESHOLDS.D) return NIUMA_NAME.D;
  return TRANSFORM_ENEMY_TO_F && !isAlly ? NIUMA_NAME.F : NIUMA_NAME.E;
}

/**
 * 生成要发送的文本
 */
function buildPlayerLine({ env, puuid, score }) {
  const inChampSelect = env.queryStage.phase === "champ-select";

  // 显示名：选人阶段 -> 召唤师；其余 -> 英雄
  const display = inChampSelect
    ? env.summoner[puuid]?.data.gameName || "未知召唤师"
    : env.gameData.champions[env.championSelections[puuid] ?? -1]?.name ||
      "未知英雄";

  if (score === null) return `${display} 近期无有效对局`;

  const isAlly = env.allyMembers.includes(puuid);
  const grade = gradeName(score, isAlly);

  const {
    averageKda = 0,
    count = 0,
    winRate = 0,
  } = env.playerStats.players[puuid]?.summary || {};

  const fixedScore = inChampSelect ? score.toFixed(0) : score.toFixed(1);
  const kdaFixed = averageKda.toFixed(inChampSelect ? 1 : 2);

  return `${grade} ${display} 评分: ${fixedScore}，近${count}场KDA ${kdaFixed} 胜率 ${(
    winRate * 100
  ).toFixed(0)}%`;
}

/**
 * 生成聊天输出
 * @param {import('./env-types').TemplateEnv} env
 * @returns {string[]}
 */
function getMessages(env) {
  const players = env.targetMembers.map((puuid) => {
    const mh = env.matchHistory[puuid];
    if (!mh?.data) return { puuid, score: null };

    const valid = mh.data.filter((g) => !env.utils.isPveQueue(g.queueId));

    const scores = valid
      .map((g) => extractGame(puuid, g))
      .filter(Boolean)
      .map((s) => ({ base: calcBaseScore(s), isRecent: s.isRecent }));

    if (!scores.length) return { puuid, score: null };
    return { puuid, score: mergeScores(scores) };
  });

  const lines = players.map((p) =>
    buildPlayerLine({ env, puuid: p.puuid, score: p.score })
  );
  return lines;
}

/** 模板元数据 */
function getMetadata() {
  return { version: 10, type: "ongoing-game" };
}
