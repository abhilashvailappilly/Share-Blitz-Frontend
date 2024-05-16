import React from 'react';

interface CaptionWithShowMoreProps {
  text: string;
  styleProps:string
}

const CaptionWithShowMore: React.FC<CaptionWithShowMoreProps> = ({ text ,styleProps}) => {
  return (
    <div className="font-sans">
      <h4 className={styleProps}>
        {text}
      </h4>
    </div>
  );
}

export default CaptionWithShowMore;
