/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { userData } from "../../data/dummydata";
import "./chat.scss";

const Chat = () => {
  const [chat, setChat] = useState<boolean | null>(true);

  return (
    <section className="chat">
      <section className="messages">
        <h1>Messages</h1>
        <section className="message">
          <img src={userData.img} alt={userData.name} />
          <span>{userData.name}</span>
          <p>Lorem ipsum dolor sit amet...</p>
        </section>
        <section className="message">
          <img src={userData.img} alt={userData.name} />
          <span>{userData.name}</span>
          <p>Lorem ipsum dolor sit amet...</p>
        </section>
        <section className="message">
          <img src={userData.img} alt={userData.name} />
          <span>{userData.name}</span>
          <p>Lorem ipsum dolor sit amet...</p>
        </section>
        <section className="message">
          <img src={userData.img} alt={userData.name} />
          <span>{userData.name}</span>
          <p>Lorem ipsum dolor sit amet...</p>
        </section>
        <section className="message">
          <img src={userData.img} alt={userData.name} />
          <span>{userData.name}</span>
          <p>Lorem ipsum dolor sit amet...</p>
        </section>
      </section>

      {chat && (
        <section className="chatBox">
          <section className="top">
            <section className="user">
              <img src={userData.img} alt={userData.name} />
              {userData.name}
            </section>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </section>

          <section className="center">
            <section className="chatMessage own">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <span>1 hour ago</span>
            </section>
            <section className="chatMessage">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <span>1 hour ago</span>
            </section>
            <section className="chatMessage own">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <span>1 hour ago</span>
            </section>
            <section className="chatMessage">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <span>1 hour ago</span>
            </section>
            <section className="chatMessage own">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <span>1 hour ago</span>
            </section>
            <section className="chatMessage">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <span>1 hour ago</span>
            </section>
            <section className="chatMessage own">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <span>1 hour ago</span>
            </section>
            <section className="chatMessage">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <span>1 hour ago</span>
            </section>
            <section className="chatMessage own">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <span>1 hour ago</span>
            </section>
          </section>

          <section className="bottom">
            <textarea></textarea>
            <button>Send</button>
          </section>
        </section>
      )}
    </section>
  );
};

export default Chat;
