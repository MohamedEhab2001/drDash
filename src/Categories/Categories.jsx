// Categories/Categories.jsx
import React, { useState } from "react";
import {
  Typography,
  Button,
  List,
  Modal,
  Form,
  Input,
  Spin,
  Alert,
  Popconfirm,
} from "antd";
import { useCategoryContext } from "../App";

const { Title } = Typography;

const Categories = () => {
  const {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useCategoryContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [form] = Form.useForm();

  const showAddModal = () => {
    setEditCategory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (category) => {
    setEditCategory(category);
    form.setFieldsValue(category);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editCategory) {
          updateCategory(editCategory.id, values);
        } else {
          addCategory(values);
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "هل أنت متأكد أنك تريد حذف هذه الفئة؟",
      content: "بمجرد الحذف، لا يمكن استرجاع هذه الفئة.",
      okText: "نعم",
      cancelText: "لا",
      onOk: () => {
        deleteCategory(id);
      },
    });
  };

  if (loading) return <Spin size="large" />;
  if (error)
    return (
      <Alert message="خطأ" description="فشل في تحميل الفئات." type="error" />
    );

  return (
    <div>
      <Title level={3}>الفئات</Title>
      <Button type="primary" onClick={showAddModal}>
        إضافة فئة
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={categories}
        renderItem={(category) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => showEditModal(category)}>
                تعديل
              </Button>,
              <Popconfirm
                title="هل أنت متأكد أنك تريد حذف هذه الفئة؟"
                onConfirm={() => handleDelete(category.id)}
                okText="نعم"
                cancelText="لا"
              >
                <Button type="link">حذف</Button>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta title={category.name} description={category.desc} />
          </List.Item>
        )}
      />
      <Modal
        title={editCategory ? "تعديل الفئة" : "إضافة فئة"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="الاسم"
            name="name"
            rules={[{ required: true, message: "الرجاء إدخال اسم الفئة!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="الوصف"
            name="desc"
            rules={[{ required: true, message: "الرجاء إدخال وصف الفئة!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
