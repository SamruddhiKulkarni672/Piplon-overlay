import React from "react";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider
      width={250}
      style={{
        background: "#f0f2f5",
        padding: "24px 16px",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <p className="hover:bg-[#001529] hover:text-white p-2 rounded-2">Controller</p>
    </Sider>
  );
};

export default Sidebar;
