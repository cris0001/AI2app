import React from "react";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div>
      <div className="example">
        <Spin size="large" />
      </div>
      ,
    </div>
  );
};

export default Loading;
