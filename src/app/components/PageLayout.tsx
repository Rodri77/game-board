"use client";

import { Provider } from "react-redux";
import { Layout } from "antd";

import SideBar from "./SideBar";
import { store } from "../store";

const { Header, Content } = Layout;

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <h1 style={{ color: "white" }}>Game Board</h1>
        </Header>
        <Layout>
          <SideBar />
          <Content style={{ margin: "0 10px" }}>
            <div
              style={{
                padding: 15,
                minHeight: 360,
                background: "white",
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Provider>
  );
}
