// Home/FAQManager.jsx
import React, { useState, useEffect } from "react";
import { Form, Input, Button, List, Typography, Modal } from "antd";
import { useContentHook, useContentUpdate } from "../ServerHooks";

const { Title } = Typography;

const FAQManager = () => {
  const { data, loading } = useContentHook();
  const { updateContent } = useContentUpdate();
  const [form] = Form.useForm();
  const [faqs, setFaqs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!loading && data) {
      setFaqs(data.faq);
    }
  }, [data, loading]);

  const handleAdd = async (values) => {
    const newFaq = {
      id: Date.now(), // Generate a new unique ID
      title: values.title,
      content: values.content,
    };
    const updatedFaqs = [...faqs, newFaq];
    await updateContent(1, { faq: updatedFaqs }); // Adjust ID and payload as needed
    setFaqs(updatedFaqs);
    form.resetFields();
    setVisible(false);
  };

  const handleDelete = async (id) => {
    const updatedFaqs = faqs.filter((faq) => faq.id !== id);
    await updateContent(data, { faq: updatedFaqs }); // Adjust ID and payload as needed
    setFaqs(updatedFaqs);
  };

  const handleEdit = (faq) => {
    setEditing(faq);
    form.setFieldsValue(faq);
    setVisible(true);
  };

  const handleSubmitEdit = async (values) => {
    const updatedFaqs = faqs.map((faq) =>
      faq.id === editing.id ? { ...editing, ...values } : faq
    );
    await updateContent(data, { faq: updatedFaqs }); // Adjust ID and payload as needed
    setFaqs(updatedFaqs);
    form.resetFields();
    setVisible(false);
    setEditing(null);
  };

  return (
    <div style={{ marginBottom: "24px" }}>
      <Title level={3}>إدارة الأسئلة الشائعة</Title>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        style={{ marginBottom: "16px" }}
      >
        إضافة سؤال جديد
      </Button>
      <List
        bordered
        dataSource={faqs}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => handleEdit(item)}>
                تعديل
              </Button>,
              <Button type="link" danger onClick={() => handleDelete(item.id)}>
                حذف
              </Button>,
            ]}
          >
            <List.Item.Meta title={item.title} description={item.content} />
          </List.Item>
        )}
      />
      <Modal
        title={editing ? "تعديل السؤال" : "إضافة سؤال"}
        visible={visible}
        footer={null}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
          setEditing(null);
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={editing ? handleSubmitEdit : handleAdd}
        >
          <Form.Item
            label="السؤال"
            name="title"
            rules={[{ required: true, message: "يرجى إدخال السؤال!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="الإجابة"
            name="content"
            rules={[{ required: true, message: "يرجى إدخال الإجابة!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editing ? "تحديث" : "إضافة"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FAQManager;
