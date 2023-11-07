"use client";

import { useState } from "react";
import Link from "next/link";

import { Menu, MenuProps, Layout } from "antd";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "Leaderboard",
    "sub1",
    <Link href="/leaderboard">
      <UserOutlined />
    </Link>
  ),
  getItem(
    "Posts",
    "sub2",
    <Link href="/posts">
      <TeamOutlined />
    </Link>
  ),
];

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
}
