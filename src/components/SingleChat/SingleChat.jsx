import "./SingleChat.css";

export const SingleChat = (props) => {
  const { title, orderId, imageURL, setSelectedChat } = props;
  return (
    <li className="container" onClick={() => setSelectedChat(props)}>
      <div className="mr-1">
        <img src={imageURL} alt="profile" height={50} width={50} />
      </div>
      <div className="chat-details">
        <p>{title}</p>
        <div>{orderId}</div>
      </div>
    </li>
  );
};
