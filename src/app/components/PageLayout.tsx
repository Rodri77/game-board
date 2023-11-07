"use client";

import { Breadcrumb, Layout } from "antd";
import SideBar from "./SideBar";

const { Header, Content } = Layout;

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ color: "white" }}>Game Board</h1>
      </Header>
      <Layout>
        <SideBar />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "white",
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
