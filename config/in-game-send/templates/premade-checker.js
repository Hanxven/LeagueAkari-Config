// 包括自己的队伍吗?
const includeSelf = false

// 展示英雄名而不是玩家名，若缺失信息，则展示英雄名
const showChampionName = true

function getMessages(env) {
  const groups = Object.values(env.teamParticipantGroups).filter((g) => {
    if (g.length < 2) {
      return false
    }

    // 排除自己的组
    if (!includeSelf && g.includes(env.selfPuuid)) {
      return false
    }

    // 如果组中任何成员属于某方，此组为需要的组
    return g.some((m) => env.targetMembers.includes(m))
  })

  if (groups.length === 0) {
    switch (env.target) {
      case 'ally':
        return ['我方没有开黑小队']
      case 'enemy':
        return ['敌方没有开黑小队']
      case 'all':
        return ['本局没有开黑小队']
      default:
        return []
    }
  }

  const SIDE = {
    ally: '我方',
    enemy: '敌方',
    all: ''
  }

  const messages = groups.map((g) => {
    const names = g.map((m) => {
      const championName = env.gameData.championName(env.championSelections[m] || -1)

      if (showChampionName) {
        return championName
      } else {
        return env.summoner[m]?.data.gameName || championName
      }
    })

    return `${SIDE[env.target]}开黑 [${names.join(' ')}]`
  })

  return messages
}

function getMetadata() {
  return {
    version: 10,
    type: 'ongoing-game'
  }
}
