import { ColumnsType } from "antd/es/table";
import type { Player } from "./app/types/leaderboard";

export const BASE_URL = "https://api.henrikdev.xyz";

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
