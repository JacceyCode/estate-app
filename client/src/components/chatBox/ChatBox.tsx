import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./chatBox.scss";
import apiRequest from "../../data/apiRequest";

const ChatBox = ({
  handleCloseChat,
  receiver,
  receiverId,
}: {
  handleCloseChat: () => void;
  receiver: {
    username: string;
    avatar: string;
  };
  receiverId: string;
}) => {
  const [info, setInfo] = useState<string>();
  const navigate = useNavigate();

  const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    setInfo(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await apiRequest.post("/chats", { receiverId });
      const chatId = res.data.id;

      await apiRequest.post("/messages/" + chatId, {
        text: info,
      });

      navigate("/profile");
      setInfo("");
      handleCloseChat();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="chatBox">
      <section className="top">
        <section className="user">
          <img
            src={receiver.avatar || "noavatar.jpg"}
            alt={receiver.username}
          />
          {receiver.username}
        </section>
        <span className="close" onClick={handleCloseChat}>
          X
        </span>
      </section>

      <section className="bottom">
        <textarea name="text" value={info} onChange={handleText}></textarea>
        <button onClick={handleSubmit}>Send</button>
      </section>
    </section>
  );
};

export default ChatBox;
