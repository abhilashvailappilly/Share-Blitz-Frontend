
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
    isPrivate:Boolean
    isBlocked:Boolean
    isDeleted:Boolean 
    creationTime:Date
    followings:IFollow[] |[]
    followers:IFollow[] |[]
}
export interface IFollow {
    id: string;
  }