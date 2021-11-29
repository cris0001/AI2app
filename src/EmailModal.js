import React, { useState } from "react";
import { Modal, Input, Tag } from "antd";
import axios from "axios";

const { TextArea } = Input;
const EmailModal = ({ setEmailModal, emailList, emailModal, setAlert }) => {
  const [ids, setIds] = useState(emailList);
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const email = { subject, title, message, ids };
  console.log(email);

  const sendEmail = async ({ subject, title, message, ids }) => {
    console.log(subject);
    console.log(title);
    console.log(message);
    console.log(ids);
    try {
      const response = await axios.post(
        "http://www.workersappur.somee.com/api/workers/sendemails",
        {
          subject,
          title,
          message,
          ids,
        }
      );
      console.log(response);
      setEmailModal(false);
      setTimeout(() => {
        setAlert({
          message: "Wiadomość została wysłana",
          type: "success",
          visible: true,
        });
      }, 150);
    } catch (error) {
      console.log(error.message);

      setAlert({
        message: "Coś poszło nie tak",
        type: "error",
        visible: true,
      });
    }
  };

  return (
    <div>
      {" "}
      <Modal
        style={{ minHeight: "525px" }}
        title="Grupowe wysyłanie wiadomości"
        visible={emailModal}
        onOk={() => sendEmail(email)}
        onCancel={() => setEmailModal(false)}
        okText="wyślij"
        cancelText="anuluj"
      >
        <div className="tag">
          {emailList.map((item, index) => {
            return (
              <Tag key={index} color="blue" closable>
                {item}
              </Tag>
            );
          })}
        </div>
        <Input
          onChange={(e) => setSubject(e.target.value)}
          style={{ marginBottom: "25px" }}
          placeholder="temat"
        />
        <Input
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "25px" }}
          placeholder="tytuł"
        />
        <TextArea
          onChange={(e) => setMessage(e.target.value)}
          placeholder="treść wiadomości"
        />
      </Modal>
    </div>
  );
};

export default EmailModal;
