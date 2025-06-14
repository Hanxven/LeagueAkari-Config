// 包括自己吗?
const includeSelf = false

// 展示英雄名而不是玩家名
const showChampionName = true

function getMessages(env) {
  const rats = env.targetMembers
    .filter((m) => env.summoner[m])
    .map((m) => env.summoner[m].data)
    .filter((s) => s.privacy === 'PRIVATE')
    .filter((m) => !includeSelf || m.puuid !== env.selfPuuid)

  if (rats.length === 0) {
    switch (env.target) {
      case 'ally':
        return ['我方无隐藏战绩玩家！可喜可贺']
      case 'enemy':
        return ['敌方无隐藏战绩玩家！可喜可贺']
      case 'all':
        return ['本局无隐藏战绩玩家！可喜可贺']
      default:
        return []
    }
  }

  const messages = rats.map((s) => {
    let name
    if (showChampionName) {
      const championId = env.championSelections[s.puuid] || -1
      name = env.gameData.championName(championId)
    } else {
      name = s.gameName
    }

    const base = [`滴滴滴，检测到 ${name} 锁战绩`]

    const stats = env.playerStats?.players[s.puuid]
    if (stats) {
      const { averageKda, winRate } = stats.summary
      base.push(`KDA ${averageKda.toFixed(1)} 胜率 ${(winRate * 100).toFixed(0)}%`)

      const soloDeathGames = env.matchHistory[s.puuid].data
        .map((g) => stats.games[g.gameId]?.soloDeaths)
        .filter((g) => g !== null)

      const totalDeaths = soloDeathGames.reduce((acc, g) => acc + g.length, 0)

      if (totalDeaths > 0) {
        base.push(`在最近 ${soloDeathGames.length} 场游戏中，被单杀共 ${totalDeaths} 次`)
      }
    }

    return base.join(' ')
  })

  return messages
}

function getMetadata() {
  return {
    version: 10,
    type: 'ongoing-game'
  }
}
