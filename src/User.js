import React, { useState } from "react";
import axios from "axios";
import { Card, Row, Col, Typography, Button, Popconfirm, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Text } = Typography;

const User = ({ users, getUsers }) => {
  const deleteUser = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://www.workersappur.somee.com/api/workers/${id}`
      );
      getUsers();
      alert("użytwkonik został poprawnie usunięty");
    } catch (error) {
      console.log(error.message);
      alert("coś poszło nie tak");
    }
  };

  return (
    <div>
      {users.map((user, index) => (
        <Card onClick={() => console.log(user)} key={index}>
          <Row justify="space-between" align="middle">
            <Col>
              <Text level={5}>{user.name}</Text>
            </Col>
            <Col>
              <Text level={5}>{user.surname}</Text>
            </Col>
            <Col>
              <Text level={5}>{user.occupation}</Text>
            </Col>
            <Col>
              <Text level={5}>{user.email}</Text>
            </Col>
            <Col>
              <Text level={5}>{user.salary}</Text>
            </Col>
            <Col>
              <Row justify="space-between">
                <Col>
                  <Button style={{ border: "none" }}>
                    <EditOutlined
                      style={{ color: "#1890ff", fontSize: "20px" }}
                    />
                  </Button>
                </Col>
                <Col>
                  <Popconfirm
                    title="Usunąć tego ożytkownika?"
                    onConfirm={() => deleteUser(user.publicId)}
                    okText="Tak"
                    cancelText="Nie"
                  >
                    <Button style={{ border: "none" }}>
                      <DeleteOutlined
                        style={{
                          color: "red",
                          fontSize: "20px",
                        }}
                      />
                    </Button>
                  </Popconfirm>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default User;
