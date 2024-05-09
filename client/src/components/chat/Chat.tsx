import { ChangeEvent, useState } from "react";
import "./chat.scss";
import { ChatMessage, ChatProp, ReceiverProp } from "../../types/data";
import { useAuthContext } from "../../context/AuthContext";
import apiRequest from "../../data/apiRequest";
import { format } from "timeago.js";

const Chat = ({ chats }: { chats: ChatProp[] }) => {
  const [chat, setChat] = useState<ChatMessage>();
  const [openChat, setOpenChat] = useState(false);
  const { currentUser } = useAuthContext();

  const handleOpenChat = async (id: string, receiver: ReceiverProp) => {
    try {
      const res = await apiRequest("/chats/" + id);
      setChat({ ...res.data, receiver });
      setOpenChat(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const text = formData.get("text");
    if (!text) return;

    try {
      const res = await apiRequest.post("/messages/" + chat?.id, { text });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setChat((prev: ChatMessage | any) => {
        if (prev) {
          return {
            ...prev,
            messages: [...prev.messages, res.data],
          };
        } else {
          return prev;
        }
      });

      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="chat">
      <section className="messages">
        <h1>Messages</h1>
        {chats.map((chat) => (
          <section
            className="message"
            key={chat.id}
            style={{
              backgroundColor: chat.seenBy.includes(currentUser!.id)
                ? "white"
                : "#fecd514e",
            }}
            onClick={() => handleOpenChat(chat.id, chat.receiver)}
          >
            <img
              src={chat.receiver.avatar || "/noavatar.jpg"}
              alt={chat.receiver.username}
            />
            <span>{chat.receiver.username}</span>
            <p>{chat.lastMessage}</p>
          </section>
        ))}
      </section>

      {openChat && chat && (
        <section className="chatBox">
          <section className="top">
            <section className="user">
              <img
                src={chat.receiver.avatar || "noavatar.jpg"}
                alt={chat.receiver.username}
              />
              {chat.receiver.username}
            </section>
            <span className="close" onClick={() => setOpenChat(false)}>
              X
            </span>
          </section>

          <section className="center">
            {chat.messages.map((message) => (
              <section
                className="chatMessage"
                style={{
                  alignSelf:
                    message.userId === currentUser?.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser?.id ? "right" : "left",
                }}
                key={message.id}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAT)}</span>
              </section>
            ))}
          </section>

          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </section>
      )}
    </section>
  );
};

export default Chat;
