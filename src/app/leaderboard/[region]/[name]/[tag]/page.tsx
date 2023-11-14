"use client";

import { Table } from "antd";
import { useParams } from "next/navigation";

import { gameApi } from "@/app/api";
import type { MatchQuery } from "@/app/types/matchHistory";
import { matchHistoryColumns } from "@/constants";
import "./style.css";

export default function Page() {
  const { region, name, tag } = useParams();
  const { data } = gameApi.useGetUserMatchesByRegionAndNameQuery({
    region,
    name,
    tag,
  } as MatchQuery);
  return (
    <Table
      dataSource={data}
      columns={matchHistoryColumns}
      pagination={false}
      rowClassName="match-row"
    />
  );
}
