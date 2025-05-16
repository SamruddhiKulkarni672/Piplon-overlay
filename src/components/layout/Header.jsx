import React from "react";
import { Layout, Typography } from "antd";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
  return (
    <Header
      style={{
        background: "#001529",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        height: 64,
      }}
    >
      <Title level={3} style={{ color: "#fff", margin: 0 }}>
        Overlay Controller
      </Title>
    </Header>
  );
};

export default AppHeader;
