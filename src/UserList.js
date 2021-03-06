import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Row,
  Col,
  Card,
  Button,
  Empty,
  Alert,
  Select,
  Input,
} from "antd";
import { FaEnvelope } from "react-icons/fa";
import User from "./User";
import NewUserModal from "./NewUserModal";
import Loading from "./Loading";
import {
  sortByNameAZ,
  sortByNameZA,
  sortBySurnameAZ,
  sortBySurnameZA,
  sortByOccAZ,
  sortByOccZA,
  sortByEmailAZ,
  sortByEmailZA,
  sortBySalaryAZ,
  sortBySalaryZA,
} from "./utils";

const { Option } = Select;
const { Title } = Typography;

const UserList = () => {
  const [loading, setLoading] = useState();
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [newUserModal, setNewUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    visible: false,
  });
  const [emailLen, setEmailLen] = useState(0);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://www.workersappur.somee.com/api/workers"
      );

      const data = response.data;
      console.log(data);

      setUsers(data);
      setAllUsers(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUsers();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (emailLen === 0) {
      setEmailModal(false);
    }
  }, [emailLen]);

  useEffect(() => {
    const tmp = [...allUsers];
    const filtered = tmp.filter((user) => {
      if (
        user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.surname.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.occupation.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.salary.toString().includes(searchValue)
      )
        return true;

      return false;
    });
    setUsers(filtered);
    console.log(filtered);
  }, [searchValue]);

  useEffect(() => {
    if (alert.visible) {
      setTimeout(() => {
        setAlert({ ...alert, visible: false });
      }, 3000);
    }
  }, [alert]);
  const handleChaneSearch = (e) => {
    setSearchValue(e.target.value);
  };
  return loading ? (
    <Loading />
  ) : users ? (
    <div className="table">
      <div className="alert">
        {alert.visible ? (
          <Alert
            style={{ padding: "10px 20px", fontSize: "15px" }}
            onClick={() => setAlert({ ...alert, visible: false })}
            message={alert.message}
            type={alert.type}
          />
        ) : null}
      </div>
      <Row style={{ marginBottom: "10px" }} justify="space-between">
        <Col>
          {" "}
          <Button
            size="large"
            onClick={() => setNewUserModal(true)}
            type="primary"
          >
            Dodaj u??ytkownika
          </Button>
          <Button
            onClick={() => setEmailModal(true)}
            style={{ marginLeft: "20px" }}
            size="large"
            disabled={emailLen < 1}
            type="primary"
          >
            Wy??lij wiadomo????
          </Button>
        </Col>
        <Col style={{ display: "flex", gap: "6px" }}>
          <Input
            value={searchValue}
            onChange={handleChaneSearch}
            placeholder="Wyszukaj po dowolnej kolumnie..."
          />
          <Select
            size="large"
            style={{ width: 250 }}
            onChange={(value) => {
              if (value === "imieaz") setUsers(sortByNameAZ(users));

              if (value === "imieza") setUsers(sortByNameZA(users));

              if (value === "nazwiskoaz") setUsers(sortBySurnameAZ(users));

              if (value === "nazwiskoza") setUsers(sortBySurnameZA(users));

              if (value === "stanowiskoaz") setUsers(sortByOccAZ(users));

              if (value === "stanowiskoza") setUsers(sortByOccZA(users));

              if (value === "emailaz") setUsers(sortByEmailAZ(users));

              if (value === "emailaz") setUsers(sortByEmailZA(users));

              if (value === "pensjaaz") setUsers(sortBySalaryAZ(users));

              if (value === "pensjaza") setUsers(sortBySalaryZA(users));
            }}
            placeholder="sortuj wg:"
          >
            <Option value="imieaz">imie A-Z</Option>
            <Option value="imieza">imie Z-A</Option>
            <Option value="nazwiskoaz">nazwisko A-Z</Option>
            <Option value="nazwiskoza">nazwisko Z-A</Option>
            <Option value="stanowiskoaz">stanowisko A-Z</Option>
            <Option value="stanowiskoza">stanowisko Z-A</Option>
            <Option value="emailaz">email A-Z</Option>
            <Option value="emailza">email Z-A</Option>
            <Option value="pensjaaz">pensja A-Z</Option>
            <Option value="pensjaza">pensja Z-A</Option>
          </Select>{" "}
        </Col>
      </Row>

      {newUserModal ? (
        <NewUserModal
          newUserModal={newUserModal}
          setNewUserModal={setNewUserModal}
          setLoading={setLoading}
          getUsers={getUsers}
          setAlert={setAlert}
          users={users}
        />
      ) : null}

      <Card style={{ backgroundColor: "#fafafa" }}>
        <Row justify="space-between" align="middle">
          <Col span={1}>
            <FaEnvelope style={{ fontSize: "20px" }} />
          </Col>
          <Col span={3}>
            <Title level={5}>Imi??</Title>
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
            <Title level={5}>Edytuj/usu??</Title>
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
            setUsers={setUsers}
            users={users}
            setAlert={setAlert}
            setEditUserModal={setEditUserModal}
            editUserModal={editUserModal}
            setLoading={setLoading}
            setSearchValue={setSearchValue}
          />
        )}
      </div>
    </div>
  ) : null;
};
export default UserList;
