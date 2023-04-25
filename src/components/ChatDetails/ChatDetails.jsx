import { useEffect, useRef, useState } from "react";
import "./ChatDetails.css";

export const ChatDetails = (props) => {
  const { selectedChatId, chats, setChats } = props;
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    console.log("called");
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
