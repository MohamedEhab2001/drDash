// Home/HomepageContent.jsx
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useContentHook, useContentUpdate } from "../ServerHooks";

const { Title } = Typography;

const HomepageContent = () => {
  const { data, loading } = useContentHook();
  const { updateContent } = useContentUpdate();
  const [form] = Form.useForm();
  const [homepageContent, setHomepageContent] = useState({
    footermessage: "",
    inTroDescription: "",
    homepageButton: "",
  });

  useEffect(() => {
    if (!loading && data) {
      setHomepageContent({
        footermessage: data.homepage.footermessage,
        inTroDescription: data.homepage.inTroDescription,
        homepageButton: data.homepage.homepageButton,
      });
      form.setFieldsValue({
        footermessage: data.homepage.footermessage,
        inTroDescription: data.homepage.inTroDescription,
        homepageButton: data.homepage.homepageButton,
      });
    }
  }, [data, loading, form]);

  const handleSubmit = async (values) => {
    try {
      await updateContent(data, { homepage: values }); // Adjust ID and payload as needed
      alert("Homepage content updated successfully!");
    } catch (error) {
      alert("Failed to update homepage content");
    }
  };

  return (
    <div style={{ marginBottom: "24px" }}>
      <Title level={3}>تحديث محتوى الصفحة الرئيسية</Title>
      <Form
        form={form}
        layout="vertical"
        initialValues={homepageContent}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="رسالة الفوتر"
          name="footermessage"
          rules={[
            {
              required: true,
              message: "يرجى إدخال رسالة الفوتر!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="وصف المقدمة"
          name="inTroDescription"
          rules={[
            {
              required: true,
              message: "يرجى إدخال وصف المقدمة!",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="زر الصفحة الرئيسية"
          name="homepageButton"
          rules={[{ required: true, message: "يرجى إدخال نص الزر!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            تحديث
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HomepageContent;
