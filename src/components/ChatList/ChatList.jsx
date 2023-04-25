import { useEffect, useState } from "react";
import axios from "axios";
import { SingleChat } from "../SingleChat/SingleChat";
import "./ChatList.css";
import { ChatDetails } from "../ChatDetails/ChatDetails";

export const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);

  async function loadChats() {
    try {
      const response = await axios.get(
        "https://my-json-server.typicode.com/codebuds-fk/chat/chats"
      );

      setChats(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadChats();
  }, []);

  const changeSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const filteredChat = chats?.filter(
    (chat) =>
      chat?.title.toLowerCase().includes(searchText.toLowerCase()) ||
      chat?.orderId.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className={selectedChat ? "list-container " : ""}>
      <div style={{ width: selectedChat ? "40%" : "100%", overflow: "auto" }}>
        <label htmlFor="search" className="search-label">
          Filter by Title / Order ID
        </label>
        <input
          id="search"
          type="search"
          placeholder="Start typing to search"
          onChange={changeSearchText}
          value={searchText}
          className="search-box"
        />
        <ul className="chat-container">
          {filteredChat?.map((chat) => (
            <SingleChat
              key={chat.id}
              {...chat}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
            />
          ))}
        </ul>
      </div>
      {selectedChat && (
        <ChatDetails
          selectedChatId={selectedChat.id}
          chats={chats}
          setChats={setChats}
        />
      )}
    </div>
  );
};
