"use client";

import { Table } from "antd";
import { useParams } from "next/navigation";

import { gameApi } from "@/app/api";
import { Loading } from "@/app/components/Loading";
import { matchHistoryColumns } from "@/constants";
import type { MatchQuery } from "@/app/types/matchHistory";
import "./style.css";

export default function Page() {
  const { region, name, tag } = useParams();
  const { data, isLoading, isFetching } =
    gameApi.useGetUserMatchesByRegionAndNameQuery({
      region,
      name,
      tag,
    } as MatchQuery);
  return isLoading || isFetching ? (
    <Loading />
  ) : (
    <Table
      dataSource={data}
      columns={matchHistoryColumns}
      pagination={false}
      rowClassName="match-row"
    />
  );
}
