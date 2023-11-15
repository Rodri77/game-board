"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Dropdown, Spin, Table } from "antd";
import Link from "next/link";

import { leaderBoardColumns, regionItems } from "@/constants";
import { gameApi } from "../api";
import { Loading, ScrollLoading } from "../components/Loading";
import type { LeaderboardData, Player } from "../types/leaderboard";
import "./style.css";

export default function LeaderBoard() {
  const [boardData, setBoardData] = useState<LeaderboardData>();
  const [region, setRegion] = useState<string>("eu");
  const { data, isLoading, isFetching } =
    gameApi.useGetLeaderboardByRegionQuery(region);
  const nameRender = (name: string, record: Player) => (
    <Link href={`leaderboard/${region}/${name}/${record.tagLine}`}>{name}</Link>
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

  const onClick = ({ key }: { key: string }) => {
    setRegion(key);
  };

  return isLoading || isFetching ? (
    <Loading />
  ) : (
    <div>
      <div className="container">
        <p>Region: </p>
        <Dropdown
          menu={{ items: regionItems, onClick }}
          placement="bottomLeft"
          arrow
        >
          <Button>{region}</Button>
        </Dropdown>
      </div>
      <InfiniteScroll
        dataLength={boardData?.players.length ?? 0}
        next={fetchNext}
        hasMore={boardData?.total_players !== boardData?.players.length}
        loader={<ScrollLoading />}
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
