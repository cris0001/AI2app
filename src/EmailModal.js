import React, { useState } from "react";
import { Modal, Input, Tag } from "antd";
import axios from "axios";

const { TextArea } = Input;
const EmailModal = ({
  setEmailModal,
  emailList,
  emailModal,
  setAlert,
  setEmailList,
  setEmailLen,
  emailLen,
}) => {
  const [ids, setIds] = useState(emailList.map((item) => item.id));
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  console.log(emailList);

  const email = { subject, title, message, ids };
  //console.log(email);

  const sendEmail = async ({ subject, title, message, ids }) => {
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
      setEmailList([]);
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
        onCancel={() => {
          setEmailModal(false);
          setEmailList([]);
          setEmailLen(0);
        }}
        okText="wyślij"
        cancelText="anuluj"
      >
        <div className="tag">
          {emailList.map((item, index) => {
            return (
              <Tag
                onClose={() => {
                  const newList = [...emailList].filter(
                    (e) => e.id !== item.id
                  );
                  console.log(newList);
                  setEmailList(newList);
                  setIds(newList.map((item) => item.id));
                  setEmailLen(emailLen - 1);
                }}
                key={index}
                color="blue"
                closable
              >
                {item.name}
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
