// Products/Products.jsx
import React, { useState } from "react";
import {
  Typography,
  Button,
  Modal,
  Form,
  Input,
  Spin,
  Alert,
  Popconfirm,
  Table,
  Image,
  Select,
} from "antd";
import { useProductContext, useCategoryContext } from "../App";

const { Title } = Typography;
const { Option } = Select;

const Products = () => {
  const { products, loading, error, addProduct, updateProduct, deleteProduct } =
    useProductContext();
  const { categories } = useCategoryContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form] = Form.useForm();

  const showAddModal = () => {
    setEditProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (product) => {
    setEditProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editProduct) {
          updateProduct(editProduct.id, values);
        } else {
          addProduct(values);
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "هل أنت متأكد أنك تريد حذف هذا المنتج؟",
      content: "بمجرد الحذف، لا يمكن استرجاع هذا المنتج.",
      okText: "نعم",
      cancelText: "لا",
      onOk: () => {
        deleteProduct(id);
      },
    });
  };

  if (loading) return <Spin size="large" />;
  if (error)
    return (
      <Alert message="خطأ" description="فشل في تحميل المنتجات." type="error" />
    );

  // Map category ID to name
  const categoryMap = categories.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});

  const columns = [
    {
      title: "الصورة",
      dataIndex: "img",
      key: "img",
      render: (img) => <Image width={100} src={img} />,
    },
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "العدد",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "التصنيف",
      dataIndex: "category_id",
      key: "category_id",
      render: (categoryId) => categoryMap[categoryId] || "غير محدد",
    },
    {
      title: "الوسم",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "الإجراءات",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showEditModal(record)}>
            تعديل
          </Button>
          <Popconfirm
            title="هل أنت متأكد أنك تريد حذف هذا المنتج؟"
            onConfirm={() => handleDelete(record.id)}
            okText="نعم"
            cancelText="لا"
          >
            <Button type="link">حذف</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Title level={3}>المنتجات</Title>
      <Button
        type="primary"
        onClick={showAddModal}
        style={{ marginBottom: "16px" }}
      >
        إضافة منتج
      </Button>
      <Table columns={columns} dataSource={products} rowKey="id" />
      <Modal
        title={editProduct ? "تعديل المنتج" : "إضافة منتج"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="الاسم"
            name="name"
            rules={[{ required: true, message: "الرجاء إدخال اسم المنتج!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="العدد"
            name="count"
            rules={[{ required: true, message: "الرجاء إدخال عدد المنتج!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="رابط الصورة"
            name="img"
            rules={[{ required: true, message: "الرجاء إدخال رابط الصورة!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="التصنيف"
            name="category_id"
            rules={[{ required: true, message: "الرجاء إدخال التصنيف!" }]}
          >
            <Select placeholder="حدد التصنيف">
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="الوسم"
            name="tag"
            rules={[{ required: true, message: "الرجاء إدخال الوسم!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
