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
      title: "Are you sure you want to delete this category?",
      content: "Once deleted, you will not be able to recover this category.",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        deleteCategory(id);
      },
    });
  };

  if (loading) return <Spin size="large" />;
  if (error)
    return (
      <Alert
        message="Error"
        description="Failed to load categories."
        type="error"
      />
    );

  return (
    <div>
      <Title level={3}>Categories</Title>
      <Button type="primary" onClick={showAddModal}>
        Add Category
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={categories}
        renderItem={(category) => (
          <List.Item
            actions={[
              // <Button type="link" onClick={() => showEditModal(category)}>
              //   Edit
              // </Button>,
              <Popconfirm
                title="Are you sure you want to delete this category?"
                onConfirm={() => handleDelete(category.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link">Delete</Button>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta title={category.name} description={category.desc} />
          </List.Item>
        )}
      />
      <Modal
        title={editCategory ? "Edit Category" : "Add Category"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the category name!" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="Description"
            name="desc"
            rules={[
              {
                required: true,
                message: "Please enter the category description!",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
