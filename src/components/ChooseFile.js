import React from "react";
import Button from "react-bootstrap/Button";

const ChooseFile = () => {
  // return <Button as="input" type="file" id="chooseFileBtn" />;
  return <input type="file" className="btn btn-primary" id="chooseFileBtn" />;
};

export default ChooseFile;
