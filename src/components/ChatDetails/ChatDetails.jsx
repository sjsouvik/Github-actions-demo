import { useState } from "react";
import "./ChatDetails.css";

export const ChatDetails = (props) => {
  const { selectedChatId, chats, setChats } = props;
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    const updatedChat = chats.map((chat) =>
      chat.id === selectedChatId
        ? {
            ...chat,
            messageList: [
              ...chat.messageList,
              {
                messageId: 3243,
                message: newMessage,
                sender: "USER",
                messageType: "text",
              },
            ],
          }
        : chat
    );

    setChats(updatedChat);
    setNewMessage("");
  };

  const messageInputKeydownHandler = (e) => {
    if (e.key === "Enter" && newMessage) {
      sendMessage();
    }
  };

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  return (
    <div
      style={{
        flexGrow: "1",
        overflow: "auto",
        position: "relative",
        backgroundColor: "#f1f3f6",
      }}
    >
      <h1>{selectedChat.title}</h1>
      <ul className="message-container">
        {selectedChat.messageList.map((textMessage) => (
          <li
            className={`message ${
              textMessage.sender === "BOT" ? "bot-message" : "user-message"
            }`}
            key={textMessage.messageId}
          >
            {textMessage.message}
          </li>
        ))}
      </ul>
      <div style={{ position: "absolute", bottom: "0", width: "100%" }}>
        <input
          style={{ width: "80%" }}
          type="text"
          placeholder="Type a message..."
          className="message-input"
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={messageInputKeydownHandler}
          value={newMessage}
        />
        <button
          className="add-btn"
          disabled={!newMessage}
          onClick={sendMessage}
        >
          Add
        </button>
      </div>
    </div>
  );
};
