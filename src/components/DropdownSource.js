import React from "react";

const DropdownSource = ({ setFileSource }) => {
  const onSourceChange = event => {
    setFileSource(event.target.value);
  };

  return (
    <select onChange={onSourceChange}>
      <option value="Placeholder" selected disabled hidden>
        Select CSV Source
      </option>
      <option value="Benevity">Benevity</option>
      <option value="Paypal">Paypal</option>
      <option value="Giving.sg">Giving.sg</option>
    </select>
  );
};

export default DropdownSource;
