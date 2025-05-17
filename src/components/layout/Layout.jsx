import React from "react";
import { Layout as AntLayout } from "antd";

import Sidebar from "./Sidebar";
import AppHeader from "./Header";
import Controller from "../../screens/Controller";

const { Content } = AntLayout;

const Layout = () => {
  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <AntLayout>
        <Sidebar />
        <Content style={{ margin: "24px", background: "#fff", padding: 24 }}>
          <Controller />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
