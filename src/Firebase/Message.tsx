interface notificationInterface {
    image:string
    body:string
    title:string
}
interface props {
    notification : notificationInterface
}
const Message = ({ notification } :props) => {
    return (
      <>
        <div id="notificationHeader">
          {/* image is optional */}
          {notification.image && (
            <div id="imageContainer">
              <img src={notification.image} width={100} alt="image" />
            </div>
          )}
          <span>{notification.title}</span>
        </div>
        <div id="notificationBody">{notification.body}</div>
      </>
    );
  };
  
  export default Message;