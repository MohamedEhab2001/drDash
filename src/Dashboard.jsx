// Dashboard.jsx
import React from "react";
import { Tabs, Layout } from "antd";
import Categories from "./Categories/Categories";
import Products from "./Products/Products";

const { Content, Header, Footer } = Layout;
const { TabPane } = Tabs;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: 0 }}>
        <div style={{ margin: "16px" }}>
          <h2>لوحة التحكم</h2>
        </div>
      </Header>
      <Content style={{ padding: "24px", background: "#fff", flex: 1 }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Categories" key="2">
            <Categories />
          </TabPane>
          <TabPane tab="Products" key="3">
            <Products />
          </TabPane>
        </Tabs>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Dr/Elsayed ©2024 Created by VistaWeb - 01027708044
      </Footer>
    </Layout>
  );
};

export default Dashboard;
