recentGame = (stats) => {
  const { gameName, gameLogo, gamePlayTime, animationDelay, translateY } = stats;
  return `
        <g transform="translate(0, ${translateY})">
            <g class="stagger" style="animation-delay: ${animationDelay}ms" transform="translate(25, 0)">
            <image height="40" href="${gameLogo}" />
            <text class="game-header bold" x="45" y="15">${gameName}</text>
            <text class="stat" x="45" y="33">${gamePlayTime} played in last 2 weeks</text>
            </g>
        </g>
    `;
};

convertGamePlayTime = (playTime2) => {
  return (playTime2 === 0 ? 0 : (playTime2 / 60).toFixed(2)) + " hours";
};

renderRecentGames = (recentGames) => {
  let groupItems;
  let animationDelay = 450;
  let translateY = 0;
  recentGames.forEach((game) => {
    groupItems += recentGame({
      gameName: game.name,
      gameLogo: game.iconURL,
      gamePlayTime: convertGamePlayTime(game.playTime2),
      animationDelay: animationDelay,
      translateY: translateY
    });
    animationDelay += 150;
    translateY += 45;
  });
  return groupItems;
};

exports.renderRecentStatCard = (profileStats, recentGames) => {
  const {
    nickname,
    steamProfileUrl,
    avatarMedium,
    recentPlayHours,
    personaState,
  } = profileStats;

  return `
    <svg width="320" height="200" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>
            .header {
            font: 600 16px "Segoe UI", Ubuntu, Sans-Serif;
            fill: #ffffff;
            animation: fadeInAnimation 0.8s ease-in-out forwards;
            }

            .game-header {
            font: 600 14px "Segoe UI", Ubuntu, Sans-Serif;
            fill: #bcbab8;
            }

            .stat {
            font: 400 14px "Motiva Sans", Ubuntu, "Helvetica Neue", Sans-Serif;
            fill: #bcbab8;
            animation: fadeInAnimation 0.8s ease-in-out forwards;
            }
            
            .stagger {
            opacity: 0;
            animation: fadeInAnimation 0.3s ease-in-out forwards;
            }

            .bold {
            font-weight: 700;
            }
            
            @keyframes fadeInAnimation {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
            }
        </style>
        undefined
        <rect x="0.5" y="0.5" rx="4.5" height="99%" stroke="#E4E2E2" width="316" fill="#171a21" stroke-opacity="1" />

        <g transform="translate(25, 35)">
            <g transform="translate(0, 0)">
            <image href="${avatarMedium}" x="0" y="-15" class="header" height="55"></image>
            <a href="${steamProfileUrl}">
                <text x="65" y="0" class="header" text-decoration="underline">${nickname}</text>
            </a>
            
            <text x="65" y="40" class="stat">Status: ${personaState}</text>
            <text x="65" y="22" class="stat">
                <tspan font-weight="bold">
                ${recentPlayHours}
                </tspan> played in last 2 weeks
            </text>
            </g>
        </g>
        
        <line x1="10" y1="85" x2="306" y2="85" style="stroke:#bcbab8;animation: fadeInAnimation 1s ease-in-out forwards;" />

        <g transform="translate(0, 95)">
            <svg x="0" y="0">
            ${renderRecentGames(recentGames)}
            </svg>
        </g>
    </svg>

  `;
};
