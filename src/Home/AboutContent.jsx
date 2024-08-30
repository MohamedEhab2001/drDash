// Home/AboutContent.jsx
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography, InputNumber } from "antd";
import { useContentHook, useContentUpdate } from "../ServerHooks";

const { Title } = Typography;

const AboutContent = () => {
  const { data, loading } = useContentHook();
  const { updateContent } = useContentUpdate();
  const [form] = Form.useForm();
  const [aboutContent, setAboutContent] = useState({
    years: "",
    pageDesc: "",
    pageTitle: "",
    title: "",
    desc: "",
    button: "",
  });

  useEffect(() => {
    if (!loading && data) {
      setAboutContent({
        years: data.about.years,
        pageDesc: data.about.pageDesc,
        pageTitle: data.about.pageTitle,
        title: data.about.title,
        desc: data.about.desc,
        button: data.about.button,
      });
      form.setFieldsValue({
        years: data.about.years,
        pageDesc: data.about.pageDesc,
        pageTitle: data.about.pageTitle,
        title: data.about.title,
        desc: data.about.desc,
        button: data.about.button,
      });
    }
  }, [data, loading, form]);

  const handleSubmit = async (values) => {
    try {
      await updateContent(data, { about: values }); // Adjust ID and payload as needed
      alert("About content updated successfully!");
    } catch (error) {
      alert("Failed to update about content");
    }
  };

  return (
    <div style={{ marginBottom: "24px" }}>
      <Title level={3}>تحديث محتوى صفحة "عن الشركة"</Title>
      <Form
        form={form}
        layout="vertical"
        initialValues={aboutContent}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="عدد السنوات"
          name="years"
          rules={[
            {
              required: true,
              message: "يرجى إدخال عدد السنوات!",
            },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="وصف الصفحة"
          name="pageDesc"
          rules={[
            {
              required: true,
              message: "يرجى إدخال وصف الصفحة!",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="عنوان الصفحة"
          name="pageTitle"
          rules={[
            {
              required: true,
              message: "يرجى إدخال عنوان الصفحة!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="العنوان"
          name="title"
          rules={[{ required: true, message: "يرجى إدخال العنوان!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="الوصف"
          name="desc"
          rules={[{ required: true, message: "يرجى إدخال الوصف!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="زر الاتصال"
          name="button"
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

export default AboutContent;
