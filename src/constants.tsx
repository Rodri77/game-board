import { ColumnsType } from "antd/es/table";
import type { Player } from "./app/types/leaderboard";
import { MappedMatchData } from "./app/types/matchHistory";
import { Image } from "antd";

export const BASE_URL = "https://api.henrikdev.xyz";
export const POSTS_BASE_URL = "https://6396aee2a68e43e41808fa18.mockapi.io/api";

export const leaderBoardColumns: ColumnsType<Player> = [
  {
    title: "Rank",
    dataIndex: "leaderboardRank",
    key: "leaderboardRank",
  },
  {
    title: "Name",
    dataIndex: "gameName",
    key: "gameName",
  },
  {
    title: "LP",
    dataIndex: "rankedRating",
    key: "rankedRating",
  },
  {
    title: "Wins",
    dataIndex: "numberOfWins",
    key: "numberOfWins",
  },
];

export const regionItems = [
  { key: "eu", label: "Eu" },
  { key: "na", label: "Na" },
  { key: "ap", label: "Ap" },
  { key: "kr", label: "Kr" },
  { key: "latam", label: "Latam" },
  { key: "br", label: "Br" },
];

export const matchHistoryColumns: ColumnsType<MappedMatchData> = [
  {
    title: "Map",
    dataIndex: ["metadata", "map"],
    key: "metadata.map",
  },
  {
    title: "Match Result",
    dataIndex: "hasWon",
    key: "hasWon",
    render: value => (
      <div
        style={{
          background: `linear-gradient(90deg, ${
            value ? "rgb(132, 204, 22)" : "rgb(242, 82, 82)"
          } 0%, rgba(132, 204, 22, 0) 100%)`,
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "white", fontWeight: "700" }}>
          {value ? "Victory" : "Defeat"}
        </p>
      </div>
    ),
  },
  {
    title: "KDA",
    dataIndex: "kda",
    key: "kda",
  },
  {
    title: "Agent Used",
    dataIndex: ["playerData", "character"],
    key: "playerData.character",
  },
  {
    title: "Match Started",
    dataIndex: ["metadata", "game_start_patched"],
    key: "metadata.game_start_patched",
  },
  {
    title: "Match Duration",
    dataIndex: ["metadata", "game_length"],
    key: "metadata.game_length",
    render: value => {
      const minutes = Math.floor(value / 60);
      const seconds = value - minutes * 60;

      return (
        <p>
          {minutes}:{String(seconds).padStart(2, "0")}
        </p>
      );
    },
  },
  {
    title: "Player Image",
    dataIndex: ["playerData", "assets", "card", "small"],
    key: "playerData.assets.card.small",
    render: value => <Image src={value} alt={value} height={80} width={80} />,
  },
  {
    title: "Agent Image",
    dataIndex: ["playerData", "assets", "agent", "small"],
    key: "playerData.assets.agent.small",
    render: value => <Image src={value} alt={value} height={80} width={80} />,
  },
];
