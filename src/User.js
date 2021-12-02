import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Popconfirm,
  Modal,
  Input,
  Checkbox,
} from "antd";
import { checkName, checkSurname, checkOccupation, checkEmail } from "./utils";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import EmailModal from "./EmailModal";

const { Text } = Typography;

const User = ({
  users,
  getUsers,
  setAlert,
  emailLen,
  setEmailLen,
  setEmailModal,
  emailModal,
  setEditUserModal,
}) => {
  const [clickedUser, setClickedUser] = useState();
  const [newUser, setNewUser] = useState();
  const [modal, setModal] = useState(false);
  const [emailList, setEmailList] = useState([]);

  const deleteUser = async (id) => {
    let allIds = emailList.map((email) => email.id);
    if (allIds.includes(id)) {
      setAlert({
        message: "Odznacz użytkownika aby go usunąć!",
        type: "warning",
        visible: true,
      });
      return null;
    } else
      try {
        const response = await axios.delete(
          `http://www.workersappur.somee.com/api/workers/${id}`
        );

        getUsers();
        setEmailList([]);
        setTimeout(() => {
          setAlert({
            message: "Użytkownik usunięty ",
            type: "success",
            visible: true,
          });
        }, 200);
      } catch (error) {
        console.log(error.message);
        setAlert({
          message: "Coś poszło nie tak",
          type: "error",
          visible: true,
        });
      }
  };

  const getSingleUser = async (id) => {
    try {
      const response = await axios.get(
        `http://www.workersappur.somee.com/api/workers/${id}`
      );

      setNewUser(response.data);
      setClickedUser(response.data);
      setModal(true);
    } catch (error) {
      console.log(error.message);
      setAlert({
        message: "Coś poszło nie tak",
        type: "error",
        visible: true,
      });
    }
  };

  const editUser = async ({
    publicId,
    name,
    surname,
    occupation,
    email,
    salary,
  }) => {
    if (
      checkName(name) &&
      checkSurname(surname) &&
      checkOccupation(occupation) &&
      checkEmail(email)
    ) {
      try {
        const response = await axios.put(
          `http://www.workersappur.somee.com/api/workers/${publicId}`,
          {
            name,
            surname,
            occupation,
            email,
            salary,
          }
        );

        getUsers();

        setModal(false);
        setAlert({
          message: "Dane użytkownika zostały zmienione",
          type: "success",
          visible: true,
        });
      } catch (error) {
        console.log(error.message);
        setAlert({
          message: "Coś poszło nie tak",
          type: "error",
          visible: true,
        });
      }
    }
  };

  return (
    <div>
      {users.map((user, index) => {
        return (
          <Card key={index}>
            {modal && clickedUser ? (
              <Modal
                title={`Zmiana danych użytkownika ${clickedUser.name} ${clickedUser.surname}`}
                clickedUser={clickedUser}
                visible={modal}
                onOk={() => {
                  editUser(newUser);
                }}
                okText="Zapisz dane"
                cancelText="Anuluj"
                onCancel={() => {
                  setModal(false);
                }}
              >
                <div>
                  <Input
                    style={{ marginBottom: "25px" }}
                    onChange={(e) => {
                      setNewUser({ ...newUser, name: e.target.value });
                    }}
                    defaultValue={clickedUser.name}
                  />
                  <Input
                    style={{ marginBottom: "25px" }}
                    onChange={(e) => {
                      setNewUser({ ...newUser, surname: e.target.value });
                    }}
                    defaultValue={clickedUser.surname}
                  />
                  <Input
                    style={{ marginBottom: "25px" }}
                    onChange={(e) => {
                      setNewUser({ ...newUser, occupation: e.target.value });
                    }}
                    defaultValue={clickedUser.occupation}
                  />
                  <Input
                    style={{ marginBottom: "25px" }}
                    onChange={(e) => {
                      setNewUser({ ...newUser, email: e.target.value });
                    }}
                    defaultValue={clickedUser.email}
                  />
                  <Input
                    type="number"
                    onChange={(e) => {
                      setNewUser({ ...newUser, salary: e.target.value });
                    }}
                    defaultValue={clickedUser.salary}
                  />
                </div>
              </Modal>
            ) : null}
            {emailModal ? (
              <EmailModal
                setEmailLen={setEmailLen}
                setEmailModal={setEmailModal}
                emailLen={emailLen}
                emailModal={emailModal}
                emailList={emailList}
                setAlert={setAlert}
                setEmailList={setEmailList}
              />
            ) : null}
            <Row justify="space-between" align="middle">
              <Col span={1}>
                <Checkbox
                  checked={
                    emailList.filter((e) => e.id === user.publicId).length > 0
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setEmailList([
                        ...emailList,
                        {
                          id: user.publicId,
                          name: `${user.name} ${user.surname}`,
                        },
                      ]);
                      setEmailLen(emailLen + 1);
                    } else {
                      const newList = emailList.filter(
                        (e) => e.id !== user.publicId
                      );
                      setEmailList(newList);
                      setEmailLen(emailLen - 1);
                    }
                  }}
                />
              </Col>
              <Col span={3}>
                <Text level={5}>{user.name}</Text>
              </Col>
              <Col span={3}>
                <Text level={5}>{user.surname}</Text>
              </Col>
              <Col span={3}>
                <Text level={5}>{user.occupation}</Text>
              </Col>
              <Col span={5}>
                <Text level={5}>{user.email}</Text>
              </Col>
              <Col span={2}>
                <Text level={5}>{user.salary} zł</Text>
              </Col>

              <Col span={2}>
                <Row justify="space-between">
                  <Col>
                    <Button
                      onClick={() => {
                        getSingleUser(user.publicId);
                      }}
                      style={{ border: "none" }}
                    >
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
        );
      })}
    </div>
  );
};

export default User;
