import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { ChatMessage, ChatProp, ReceiverProp } from "../../types/data";
import { useAuthContext } from "../../context/AuthContext";
import apiRequest from "../../data/apiRequest";
import { format } from "timeago.js";
import { useSocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../context/notificationStore";
import { Link } from "react-router-dom";

const Chat = ({ chats }: { chats: ChatProp[] }) => {
  const [chat, setChat] = useState<ChatMessage>();
  const [openChat, setOpenChat] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useAuthContext();
  const { socket } = useSocketContext();
  const reversedChats = chats.slice().reverse();

  const messageEndRef = useRef<HTMLElement>(null);
  const decreaseCount = useNotificationStore((state) => state.decreaseCount);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (
    id: string,
    receiver: ReceiverProp,
    sender: ReceiverProp
  ) => {
    try {
      const res = await apiRequest("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser?.id)) {
        decreaseCount();
      }
      setChat({ ...res.data, receiver, sender });
      setOpenChat(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const text = formData.get("text");
    if (!text) return;

    try {
      const res = await apiRequest.post(
        `/messages/${chat?.id}/${currentUser?.id}`,
        { text }
      );

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

      // sending chats using socket.io
      socket?.emit("sendMessage", {
        receiverId: chat?.receiver.id,
        data: res.data,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat?.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setChat((prev: ChatMessage | any) => {
            if (prev) {
              return {
                ...prev,
                messages: [...prev.messages, data],
              };
            }
          });

          read();
        }
      });
    }

    return () => {
      socket?.off("getMessage");
    };
  }, [socket, chat]);

  return (
    <section className="chat">
      <section className="messages">
        <h1>Messages</h1>
        {reversedChats.map((chat) => {
          const currentProfile = currentUser?.id === chat.receiver.id;

          return (
            <section
              key={chat.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "10px",
                alignItems: "center",
              }}
            >
              <div
                className="message"
                onClick={() =>
                  handleOpenChat(chat.id, chat.receiver, chat.sender)
                }
              >
                <img
                  src={
                    currentProfile
                      ? chat.sender.avatar || "/noavatar.jpg"
                      : chat.receiver.avatar || "/noavatar.jpg"
                  }
                  alt={
                    currentProfile
                      ? chat.sender.username
                      : chat.receiver.username
                  }
                />
                <span>
                  {currentProfile
                    ? chat.sender.username
                    : chat.receiver.username}
                </span>
                <p>{chat.lastMessage}</p>
              </div>

              <Link to={`/${chat.propertyId}` ?? "/list"}>
                <img
                  src={chat.imageUrl || "school.png"}
                  alt="property image"
                  style={{
                    borderRadius: "10px",
                    height: "50px",
                    width: "50px",
                  }}
                />
              </Link>
            </section>
          );
        })}
      </section>

      {openChat && chat && (
        <section className="chatBox">
          <section className="top">
            <section className="user">
              <img
                src={
                  currentUser?.id === chat.receiver.id
                    ? chat.sender.avatar || "noavatar.jpg"
                    : chat.receiver.avatar || "noavatar.jpg"
                }
                alt={
                  currentUser?.id === chat.receiver.id
                    ? chat.sender.username
                    : chat.receiver.username
                }
              />
              {currentUser?.id === chat.receiver.id
                ? chat.sender.username
                : chat.receiver.username}
            </section>
            <span className="close" onClick={() => setOpenChat(false)}>
              X
            </span>
          </section>

          <section className="center">
            {chat?.messages.map((message) => (
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
            <section ref={messageEndRef}></section>
          </section>

          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button
              disabled={isLoading}
              style={{
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </section>
      )}
    </section>
  );
};

export default Chat;
