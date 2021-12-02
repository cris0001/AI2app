import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Row, Col, Card, Button, Empty, Alert } from "antd";
import { FaEnvelope } from "react-icons/fa";
import User from "./User";
import NewUserModal from "./NewUserModal";
import Loading from "./Loading";

const { Title } = Typography;

const UserList = () => {
  const [loading, setLoading] = useState();
  const [users, setUsers] = useState([]);
  const [newUserModal, setNewUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    visible: false,
  });
  const [emailLen, setEmailLen] = useState(0);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://www.workersappur.somee.com/api/workers");

      const data = response.data;
      console.log(data);
      setUsers(data);

      //setLoading(false);
    } catch (error) {
      console.log(error.message);
      //setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUsers();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (alert.visible) {
      setTimeout(() => {
        setAlert({ ...alert, visible: false });
      }, 3000);
    }
  }, [alert.visible]);

  return loading ? (
    <Loading />
  ) : users ? (
    <div className="table">
      <div className="alert">
        {alert.visible ? (
          <Alert
            style={{ padding: "20px 20px", fontSize: "15px" }}
            onClick={() => setAlert({ ...alert, visible: false })}
            message={alert.message}
            type={alert.type}
          />
        ) : null}
      </div>
      <Row style={{ marginBottom: "10px" }} justify="space-between">
        <Col>
          {" "}
          <Button size="large" onClick={() => setNewUserModal(true)} type="primary">
            Dodaj użytkownika
          </Button>
          <Button
            onClick={() => setEmailModal(true)}
            style={{ marginLeft: "20px" }}
            size="large"
            disabled={emailLen < 1}
            type="primary"
          >
            Wyślij wiadomość
          </Button>
        </Col>
        <Col></Col>
      </Row>

      {newUserModal ? (
        <NewUserModal
          newUserModal={newUserModal}
          setNewUserModal={setNewUserModal}
          setLoading={setLoading}
          getUsers={getUsers}
          setAlert={setAlert}
        />
      ) : null}

      <Card style={{ backgroundColor: "#fafafa" }}>
        <Row justify="space-between" align="middle">
          <Col span={1}>
            <FaEnvelope style={{ fontSize: "20px" }} />
          </Col>
          <Col span={3}>
            <Title level={5}>Imię</Title>
          </Col>
          <Col span={3}>
            <Title level={5}>Nazwisko</Title>
          </Col>
          <Col span={3}>
            <Title level={5}>Stanowisko</Title>
          </Col>
          <Col span={5}>
            <Title level={5}>Email</Title>
          </Col>
          <Col span={2}>
            <Title level={5}>Pensja</Title>
          </Col>
          <Col span={2}>
            <Title level={5}>Edytuj/usuń</Title>
          </Col>
        </Row>
      </Card>
      <div>
        {users.length < 1 && !loading ? (
          <Empty style={{ marginTop: "80px" }} />
        ) : (
          <User
            emailModal={emailModal}
            setEmailModal={setEmailModal}
            setEmailLen={setEmailLen}
            emailLen={emailLen}
            getUsers={getUsers}
            users={users}
            setAlert={setAlert}
            setEditUserModal={setEditUserModal}
            editUserModal={editUserModal}
            setLoading={setLoading}
          />
        )}
      </div>
    </div>
  ) : null;
};
export default UserList;
