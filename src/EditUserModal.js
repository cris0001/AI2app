import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Input } from "antd";

const EditUserModal = ({ id, modal, setModal, clickedUser }) => {
  console.log(id);
  console.log(clickedUser);
  return (
    <div>
      <Modal
        visible={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      >
        {clickedUser ? <h1>xd</h1> : <h1>{id}</h1>}
      </Modal>
    </div>
  );
};

export default EditUserModal;
