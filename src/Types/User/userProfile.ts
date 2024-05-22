
export default interface ProfileDataInterface {
    _id:string
    name: string
    userName:string
    email :string
    mobile:string
    bio :string
    dob :string
    profileImageUrl:string
    // backgroundImageUrl:string
    role:String
    location:string
    loginType:String
    isVerified:Boolean
    isBlocked:Boolean
    isDeleted:Boolean 
    creationTime:Date
    followings:IFollow[] |[]
    followers:IFollow[] |[]
}
interface IFollow {
    id: string;
  }