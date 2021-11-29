import React, { useState } from "react";
import { Modal, Input } from "antd";
import axios from "axios";

const NewUserModal = ({
  newUserModal,
  setNewUserModal,
  setLoading,
  getUsers,
  setAlert,
}) => {
  const [newUser, setNewUser] = useState({
    name: "",
    surname: "",
    occupation: "",
    email: "",
    salary: "",
  });

  console.log(newUser);
  const addUser = async ({ name, surname, occupation, email, salary }) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://www.workersappur.somee.com/api/workers",
        {
          name,
          surname,
          occupation,
          email,
          salary,
        }
      );
      console.log(response);

      const refUsers = await getUsers();
      setNewUserModal(false);
      setTimeout(() => {
        setAlert({
          message: "Użytkownik został dodany",
          type: "success",
          visible: true,
        });
      }, 150);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      setAlert({
        message: "Coś poszło nie tak",
        type: "error",
        visible: true,
      });
    }
  };

  return (
    <div>
      <Modal
        title="Dodaj nowego użytkownika"
        visible={newUserModal}
        onOk={() => addUser(newUser)}
        onCancel={() => setNewUserModal(false)}
        okText="Dodaj"
        cancelText="Anuluj"
      >
        <Input
          value={newUser.name}
          onChange={(e) => {
            setNewUser({ ...newUser, name: e.target.value });
            console.log(newUser);
          }}
          style={{ marginBottom: "25px" }}
          placeholder="Imie"
        />
        <Input
          value={newUser.surname}
          onChange={(e) => setNewUser({ ...newUser, surname: e.target.value })}
          style={{ marginBottom: "25px" }}
          placeholder="Nazwisko"
        />
        <Input
          value={newUser.occupation}
          onChange={(e) =>
            setNewUser({ ...newUser, occupation: e.target.value })
          }
          style={{ marginBottom: "25px" }}
          placeholder="Stanowisko"
        />
        <Input
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          style={{ marginBottom: "25px" }}
          placeholder="Email"
        />
        <Input
          value={newUser.salary}
          onChange={(e) => setNewUser({ ...newUser, salary: e.target.value })}
          type="number"
          style={{ marginBottom: "25px" }}
          placeholder="Pensja"
        />
      </Modal>
    </div>
  );
};

export default NewUserModal;
