import "./SingleChat.css";

export const SingleChat = (props) => {
  const {
    id,
    title,
    orderId,
    imageURL,
    latestMessageTimestamp,
    selectedChat,
    setSelectedChat,
  } = props;
  return (
    <li
      className={`container ${selectedChat?.id === id ? "selected-chat" : ""}`}
      onClick={() => setSelectedChat(props)}
    >
      <div className="mr-1">
        <img src={imageURL} alt="profile" height={50} width={50} />
      </div>
      <div className="chat-details">
        <p>{title}</p>
        <div>{orderId}</div>
      </div>
      <div style={{ marginLeft: "auto" }}>
        {new Date(latestMessageTimestamp).toLocaleDateString()}
      </div>
    </li>
  );
};
