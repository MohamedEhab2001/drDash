// Dashboard.jsx
import React from "react";
import { Tabs, Layout } from "antd";
import Categories from "./Categories/Categories";
import Products from "./Products/Products";
import CContent from "./Content";
import { useContentContext } from "./App";

const { Content, Header, Footer } = Layout;
const { TabPane } = Tabs;

const Dashboard = () => {
  const { usageData } = useContentContext();
  console.log(
    "Usage Data:",
    JSON.stringify(usageData.data.storageUsageGB, null, 2)
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: 0 }}>
        <div
          style={{
            margin: "16px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <h2>لوحة التحكم</h2>
          <div>
            <h2>
              استهلاك السحابة : {usageData?.data?.storageUsageGB} جيجا بايت
            </h2>
          </div>
        </div>
      </Header>
      <Content style={{ padding: "24px", background: "#fff", flex: 1 }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Opening hours" key="1">
            <CContent />
          </TabPane>
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
