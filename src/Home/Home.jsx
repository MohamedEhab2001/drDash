// Home/Home.jsx
import React from "react";
import { useContentContext } from "../App";
import { Layout, Collapse, Spin, Typography } from "antd";
import MainParagraphs from "./MainParagraphs";
import HomepageContent from "./HomepageContent";
import AboutContent from "./AboutContent";
import FAQManager from "./FAQManager";

const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;

const Home = () => {
  const { data, loading, error } = useContentContext();

  if (loading) {
    return (
      <Layout
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography.Title level={3}>Error loading content</Typography.Title>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header style={{ background: "#fff", padding: 0 }}>
        <Typography.Title level={2} style={{ margin: "16px" }}>
          Dolphin dashboard
        </Typography.Title>
      </Header>
      <Content style={{ padding: "24px", minHeight: "calc(100vh - 64px)" }}>
        {data ? (
          <Collapse defaultActiveKey={["1", "2", "3", "4"]} accordion>
            <Panel header="تحديث الفقرات الرئيسية" key="1">
              <MainParagraphs />
            </Panel>
            <Panel header="تحديث محتوى الصفحة الرئيسية" key="2">
              <HomepageContent />
            </Panel>
            <Panel header="تحديث محتوى صفحة 'عن الشركة'" key="3">
              <AboutContent />
            </Panel>
            <Panel header="إدارة الأسئلة الشائعة" key="4">
              <FAQManager />
            </Panel>
          </Collapse>
        ) : (
          <Typography.Title level={4}>No content available</Typography.Title>
        )}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2024 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Home;
