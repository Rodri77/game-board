"use client";

import { useParams } from "next/navigation";

import { postsApi } from "@/app/api";
import PostCard from "@/app/components/Card";
import { Loading } from "@/app/components/Loading";

export default function Page() {
  const { id } = useParams();
  const { data, isLoading } = postsApi.useGetPostByIdQuery(id as string);

  return isLoading || data === undefined ? (
    <Loading />
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PostCard post={data} />
    </div>
  );
}
