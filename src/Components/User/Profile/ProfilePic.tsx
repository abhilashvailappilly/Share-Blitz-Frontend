import React from 'react';

interface ProfilePicProps {
  styleProp: string;
  image: string;
}

const ProfilePic: React.FC<ProfilePicProps> = ({ styleProp, image }) => {
  return (
    <>
      <img src={image} alt="" className={styleProp} />
    </>
  );
}

export default ProfilePic;
