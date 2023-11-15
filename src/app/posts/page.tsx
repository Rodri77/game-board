"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import { Input, Typography } from "antd";

import { postsApi } from "../api";
import type { PostData } from "../types/posts";
import { ScrollLoading } from "../components/Loading";
import PostCard from "../components/Card";
import "./style.css";

const { Title } = Typography;

export default function Posts() {
  const debounceRef = useRef<NodeJS.Timeout>();
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
  }, [search]);

  const getData =
    search === ""
      ? postsApi.useGetPostsQuery
      : postsApi.useGetPostsBySearchValueQuery;
  const param = debouncedSearch === "" ? String(page) : debouncedSearch;
  const { data } = getData(param);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setPosts(prev => (search === "" ? [...prev, ...(data ?? [])] : data ?? []));
  }, [data, search]);

  const fetchNext = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="container">
      <Input placeholder="Search" onChange={onChange} value={search} />
      <InfiniteScroll
        dataLength={posts?.length ?? 0}
        next={fetchNext}
        hasMore={search === "" && posts.length < 100}
        loader={<ScrollLoading />}
      >
        {posts.map(post => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <PostCard post={post} />
          </Link>
        ))}
        {posts.length === 0 && (
          <div>
            <Title level={3}>No Data Available.</Title>
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}
