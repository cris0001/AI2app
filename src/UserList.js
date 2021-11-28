import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Row, Col, Card, Button, Empty } from "antd";
import User from "./User";
import NewUserModal from "./NewUserModal";
import Loading from "./Loading";

const { Title } = Typography;

const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState();
  const [newUserModal, setNewUserModal] = useState(false);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://www.workersappur.somee.com/api/workers"
      );

      const data = response.data;
      setUsers(data);

      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return users ? (
    <div className="table">
      <Row style={{ marginBottom: "10px" }} justify="end">
        <Button onClick={() => setNewUserModal(true)} type="primary">
          Dodaj użytkownika
        </Button>
      </Row>

      {newUserModal ? (
        <NewUserModal
          newUserModal={newUserModal}
          setNewUserModal={setNewUserModal}
          setLoading={setLoading}
          getUsers={getUsers}
        />
      ) : null}
      <Card style={{ backgroundColor: "#fafafa" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={5}>Imie</Title>
          </Col>
          <Col>
            <Title level={5}>Nazwisko</Title>
          </Col>
          <Col>
            <Title level={5}>Stanowisko</Title>
          </Col>
          <Col>
            <Title level={5}>Email</Title>
          </Col>
          <Col>
            <Title level={5}>Pensja</Title>
          </Col>
          <Col>
            <Title level={5}>Edytuj/usuń</Title>
          </Col>
        </Row>
      </Card>
      <div>
        {users.length < 1 ? (
          <Empty style={{ marginTop: "80px" }} />
        ) : (
          <User getUsers={getUsers} users={users} />
        )}
      </div>
    </div>
  ) : (
    <div>{loading ? <Loading /> : <Loading />}</div>
  );
};
export default UserList;
