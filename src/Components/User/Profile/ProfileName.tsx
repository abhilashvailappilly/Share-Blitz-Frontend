import React from 'react';

interface NameFieldProps {
  name: string;
  styleProp: string;
  doFunction: () => void;
}

const NameField: React.FC<NameFieldProps> = ({ name, styleProp, doFunction }) => {
  console.log('name field ;',name)
  return (
    <>
      <span onClick={doFunction} className={styleProp}>{name}</span>
    </>
  );
}

export default NameField;
