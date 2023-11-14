"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin, Table } from "antd";
import Link from "next/link";

import { leaderBoardColumns } from "@/constants";
import { gameApi } from "../api";
import type { LeaderboardData, Player } from "../types/leaderboard";

export default function LeaderBoard() {
  const [boardData, setBoardData] = useState<LeaderboardData>();
  const { data } = gameApi.useGetLeaderboardByRegionQuery("eu");
  const nameRender = (name: string, record: Player) => (
    <Link href={`leaderboard/eu/${name}/${record.tagLine}`}>{name}</Link>
  );
  const columnsWithRender = leaderBoardColumns.map(column =>
    column.title === "Name" ? { ...column, render: nameRender } : column
  );

  useEffect(() => {
    setBoardData({ ...data, players: data?.players.slice(0, 1000) ?? [] });
  }, [data]);

  const fetchNext = () => {
    setBoardData(prev => ({
      ...prev,
      players: [
        ...(prev?.players ?? []),
        ...(data?.players.slice(
          prev?.players.length,
          (prev?.players.length ?? 0) + 1000
        ) ?? []),
      ],
    }));
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={boardData?.players.length ?? 0}
        next={fetchNext}
        hasMore={boardData?.total_players !== boardData?.players.length}
        loader={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100px",
            }}
          >
            <Spin size="large" />
          </div>
        }
      >
        <Table
          dataSource={boardData?.players}
          columns={columnsWithRender}
          pagination={false}
        />
      </InfiniteScroll>
    </div>
  );
}
