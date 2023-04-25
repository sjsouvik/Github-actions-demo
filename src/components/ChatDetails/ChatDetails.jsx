import { useEffect, useRef, useState } from "react";
import "./ChatDetails.css";

export const ChatDetails = (props) => {
  const { selectedChatId, chats, setChats } = props;
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [chats, selectedChatId]);

  const sendMessage = () => {
    const updatedChat = chats.map((chat) =>
      chat.id === selectedChatId
        ? {
            ...chat,
            messageList: [
              ...chat.messageList,
              {
                messageId: crypto.randomUUID(),
                message: newMessage,
                sender: "USER",
                messageType: "text",
                timestamp: Date.now(),
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
    <div className="single-chat">
      <div className="single-chat-heading">
        <img src={selectedChat.imageURL} alt="profile" height={50} width={50} />
        <h2>{selectedChat.title}</h2>
      </div>

      <ul className="message-container">
        {selectedChat.messageList.map((textMessage) => (
          <li
            className={`message ${
              textMessage.sender === "BOT" ? "bot-message" : "user-message"
            }`}
            key={textMessage.messageId}
          >
            <div>{textMessage.message}</div>
            <div className="message-time">
              {new Date(textMessage.timestamp).toLocaleTimeString()}
            </div>
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>

      <section className="send-message-section">
        <input
          style={{ width: "98%" }}
          type="text"
          placeholder="Type a message & press enter to send..."
          className="message-input"
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={messageInputKeydownHandler}
          value={newMessage}
        />
      </section>
    </div>
  );
};
