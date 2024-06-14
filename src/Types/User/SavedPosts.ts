export interface savedPost {
    _id:string, postId:string
    ,creationTime:Date
}
export default interface SavedPostInterface {
    _id:string
    userId: string
    savedPosts: savedPost[]
    creationTime:Date
}