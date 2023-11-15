"use client";

import { Spin } from "antd";

import "./style.css";

export function Loading() {
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  );
}
