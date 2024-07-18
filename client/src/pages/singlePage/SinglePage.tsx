import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { SingleData } from "../../types/data";
import DOMPurify from "dompurify";
import { useAuthContext } from "../../context/AuthContext";
import apiRequest from "../../data/apiRequest";
import ChatBox from "../../components/chatBox/ChatBox";

const SinglePage = () => {
  const post = useLoaderData() as SingleData;
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(post.isSaved);
  const postOwner = currentUser?.id === post.userId;

  ////// for the chat features /////////////

  const [openChat, setOpenChat] = useState(false);
  const closeChat = () => setOpenChat(false);

  ////// for the chat features /////////////

  const handleSave = async () => {
    if (!currentUser) navigate("/login");

    try {
      await apiRequest.post("/user/save", { postId: post.id });
      setSaved((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="singlePage">
      <section className="details">
        <section className="wrapper">
          <Slider images={post?.images} />

          <article className="info">
            <section className="top">
              <section className="post">
                <h1>{post?.title}</h1>

                <div className="address">
                  <img src="/pin.png" alt="Location icon" />
                  <span>{post?.address}</span>
                </div>

                <div className="price">$ {post?.price}</div>
              </section>

              <section className="user">
                <img src={post.user?.avatar} alt={post.user.username} />
                <span>{post.user?.username}</span>
              </section>
            </section>

            <section
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail?.desc),
              }}
            ></section>
          </article>
        </section>
      </section>

      <section className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="utility icon" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail?.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="pet icon" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail?.pet && <p>{`Pets ${post.postDetail.pet}`}</p>}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="cash icon" />
              <div className="featureText">
                <span>Income policy</span>
                <p>{post.postDetail?.income}</p>
              </div>
            </div>
          </div>

          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="icon" />
              <span>{post.postDetail?.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="icon" />
              <span>{post?.bedroom} bed(s)</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="icon" />
              <span>{post?.bathroom} bathroom(s)</span>
            </div>
          </div>

          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="school icon" />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetail?.school}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="pet icon" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail?.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="cash icon" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail?.restaurant}m away</p>
              </div>
            </div>
          </div>

          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>

          {!postOwner && (
            <div className="buttons">
              <button onClick={() => setOpenChat(true)}>
                <img src="/chat.png" alt="Message icon" />
                Send a Message
              </button>
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: currentUser && saved ? "#fece51" : "white",
                }}
              >
                <img src="/save.png" alt="Bookmark icon" />
                {saved ? "Place saved!" : "Save the Place"}
              </button>
            </div>
          )}

          {openChat && (
            <ChatBox
              receiver={post.user}
              receiverId={post.userId}
              senderId={currentUser!.id}
              handleCloseChat={closeChat}
            />
          )}
        </div>
      </section>
    </section>
  );
};

export default SinglePage;
