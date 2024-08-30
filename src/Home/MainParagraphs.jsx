// Home/MainParagraphs.jsx
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useContentHook, useContentUpdate } from "../ServerHooks";

const { Title } = Typography;

const MainParagraphs = () => {
  const { data, loading } = useContentHook();
  const { updateContent } = useContentUpdate();
  const [form] = Form.useForm();
  const [content, setContent] = useState({
    companyArabic: "",
    companyEnglish: "",
    faqTitle: "",
    faqDesc: "",
  });

  useEffect(() => {
    if (!loading && data) {
      setContent({
        companyArabic: data.companyArabic,
        companyEnglish: data.companyEnglish,
        faqTitle: data.faqTitle,
        faqDesc: data.faqDesc,
      });
      form.setFieldsValue({
        companyArabic: data.companyArabic,
        companyEnglish: data.companyEnglish,
        faqTitle: data.faqTitle,
        faqDesc: data.faqDesc,
      });
    }
  }, [data, loading, form]);

  const handleSubmit = async (values) => {
    try {
      await updateContent(data, values); // Adjust ID if needed
      alert("Content updated successfully!");
    } catch (error) {
      alert("Failed to update content");
    }
  };

  return (
    <div style={{ marginBottom: "24px" }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={content}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="اسم الشركة (Arabic)"
          name="companyArabic"
          rules={[
            {
              required: true,
              message: "Please input the company name in Arabic!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="اسم الشركة (English)"
          name="companyEnglish"
          rules={[
            {
              required: true,
              message: "Please input the company name in English!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="FAQ عنوان"
          name="faqTitle"
          rules={[{ required: true, message: "Please input the FAQ title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="FAQ وصف"
          name="faqDesc"
          rules={[
            { required: true, message: "Please input the FAQ description!" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MainParagraphs;
