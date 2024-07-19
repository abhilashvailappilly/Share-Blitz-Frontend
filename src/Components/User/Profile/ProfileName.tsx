import React from 'react';

interface NameFieldProps {
  name: string;
  styleProp: string;
  doFunction: () => void;
}

const NameField: React.FC<NameFieldProps> = ({ name, styleProp, doFunction }) => {
  return (
    <>
      <span onClick={doFunction} className={styleProp}>{name}</span>
    </>
  );
}

export default NameField;
