import ProfileHeader from "./ProfileHeader"
// import userImage from ''

const Profile = () => {
  return (
    <div className="profile">
     <ProfileHeader/>
     <div className="user--profile">
        <div className="user--detail">
            <img src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
             alt="userimage" />
             <h3 className="username">Hhone doe</h3>
             <span className="profession">teacher</span>
            {/* <img src={} alt="" /> */}
        </div>
     </div>
    </div>
  )
}

export default Profile
