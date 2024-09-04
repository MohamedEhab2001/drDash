import React, { useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { useDaysContext } from "../App";

const CContent = () => {
  const { data, loading, error, addDay, deleteDay, updateDay } = useDaysContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentDay, setCurrentDay] = useState(null);
  const [form] = Form.useForm();

  const handleAddDay = () => {
    setIsEditMode(false);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditDay = (record) => {
    setIsEditMode(true);
    setCurrentDay(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDeleteDay = (id) => {
    deleteDay(id);
  };

  const handleSubmit = (values) => {
    if (isEditMode) {
      updateDay(currentDay.id, values);
    } else {
      addDay(values.day, values.hours);
    }
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Hours",
      dataIndex: "hours",
      key: "hours",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleEditDay(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDeleteDay(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAddDay}>
        Add Day
      </Button>
      <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />

      <Modal
        title={isEditMode ? "Edit Day" : "Add Day"}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="day" label="Day" rules={[{ required: true, message: "Please input the day!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="hours" label="Hours" rules={[{ required: true, message: "Please input the hours!" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CContent;
