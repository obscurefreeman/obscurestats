import fetch from "node-fetch";

export async function imageToData(imageUrl) {
  const imageData = await fetch(imageUrl);
  const buff = await imageData.arrayBuffer();
  return `data:image/jpg;base64,${Buffer.from(buff).toString("base64")}`;
}

export function countRecentPlayHours(recentGames) {
  let recentMinutes = 0;
  recentGames.forEach((g) => (recentMinutes += parseInt(g.playTime2)));
  return (recentMinutes === 0 ? 0 : (recentMinutes / 60).toFixed(2)) + " hours";
}

export async function recentlyPlayedGames(recentGames) {
  return await Promise.all(
    recentGames.map(async (game) => {
      return {
        name: game.name,
        playTime2: game.playTime2,
        iconURL: await this.imageToData(game.iconURL),
      };
    })
  );
}

export function recentlyPlayedGamesName(recentGames) {
  return recentGames.map((game) => game.name).join(", ");
}

const personaMap = {
  0: "离线",
  1: "在线",
  2: "忙碌",
  3: "离开",
  4: "打盹",
  5: "寻找交易",
  6: "寻找游戏",
};

export function convertPersonaState(personaState) {
  return personaMap[parseInt(personaState)];
}

export function convertNicknameColor(personaMap) {
  let nicknameColor;
  if (personaMap === 0) {
    nicknameColor = "white";
  } else if (personaMap === 1) {
    nicknameColor = "blue";
  } else if (personaMap === 2) {
    nicknameColor = "green";
  } else {
    nicknameColor = "unknown";
  }
  return nicknameColor;
}


export async function downloadGamesImages(recentGames) {
  await Promise.all(
    recentGames.map(async (game) => {
      game.iconURL = await imageToData(game.iconURL);
      // game.logoURL = await imageToData(game.logoURL);
    })
  );
}

export function formatRecentlyPlayedGamesName(names) {
  return names.replace("&", "&amp;");
}
