import React from 'react';

interface ProfilePicProps {
  styleProp: string;
  image: string;
}

const ProfilePic: React.FC<ProfilePicProps> = ({ styleProp, image }) => {
  return (
    <>
      <img loading='lazy' src={image} alt="" className={styleProp} />
    </>
  );
}

export default ProfilePic;
