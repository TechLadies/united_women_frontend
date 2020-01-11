import React from 'react';

const DropdownSource = () => {
  return (
    <select>
        <option value="Placeholder" selected disabled hidden>Select CSV Source</option>
        <option value="Benevity">Benevity</option>
        <option value="Paypal">Paypal</option>
        <option value="Giving.sg">Giving.sg</option>
    </select>
  );
};

export default DropdownSource;
