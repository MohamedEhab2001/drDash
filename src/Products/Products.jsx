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
  Checkbox,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useProductContext, useCategoryContext } from "../App";

const { Title } = Typography;
const { Option } = Select;

const Products = () => {
  const { products, loading, error, addProduct, updateProduct, deleteProduct } =
    useProductContext();
  const { categories } = useCategoryContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const showAddModal = () => {
    setEditProduct(null);
    form.resetFields();
    setFileList([]);
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
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }
        if (fileList.length > 0) {
          formData.append("image", fileList[0].originFileObj);
        }
        if (editProduct) {
          updateProduct(editProduct.id, formData);
        } else {
          addProduct(formData);
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      content: "Once deleted, you cannot recover this product.",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        deleteProduct(id);
      },
    });
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList.slice(-1)); // Only keep the last uploaded file
  };

  if (loading) return <Spin size="large" />;
  if (error)
    return (
      <Alert
        message="Error"
        description="Failed to load products."
        type="error"
      />
    );

  const categoryMap = categories.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img) => <Image width={100} src={img} />,
    },
    {
      title: "English Name",
      dataIndex: "en_name",
      key: "en_name",
    },
    {
      title: "Russian Name",
      dataIndex: "rs_name",
      key: "rs_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category_id",
      key: "category_id",
      render: (categoryId) => categoryMap[categoryId] || "Unspecified",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Title level={3}>Products</Title>
      <Button
        type="primary"
        onClick={showAddModal}
        style={{ marginBottom: "16px" }}
      >
        Add Product
      </Button>
      <Table columns={columns} dataSource={products} rowKey="id" />
      <Modal
        title={editProduct ? "Edit Product" : "Add Product"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload
              beforeUpload={() => false}
              fileList={fileList}
              onChange={handleUploadChange}
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="English Name"
            name="en_name"
            rules={[
              { required: true, message: "Please enter the English name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Russian Name"
            name="rs_name"
            rules={[
              { required: true, message: "Please enter the Russian name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="English Description"
            name="en_desc"
            rules={[
              {
                required: true,
                message: "Please enter the English description!",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Russian Description"
            name="rs_desc"
            rules={[
              {
                required: true,
                message: "Please enter the Russian description!",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category_id"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select placeholder="Select a category">
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="homepage" valuePropName="checked">
            <Checkbox>Display on Homepage</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
