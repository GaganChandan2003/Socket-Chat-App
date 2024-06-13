import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import axios from "axios";
import toast from "react-hot-toast";
import { getRandomEmoji } from "../../utils/emojis";
import { useSocketContext } from "../../context/SocketContext";

const Conversations = () => {
  const [loading, setloading] = useState(false);
  const [conversations, setconversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setloading(true);
      try {
        await axios.get("/api/users").then((res) => {
          setconversations(res.data.data);
        });
      } catch (error) {
        toast.error(error?.response?.data?.error);
      } finally {
        setloading(false);
      }
    };
    getConversations();
  }, []);
  return (
    <div className="py-2 flex flex-col no-scrollbar overflow-y-auto">
      {conversations?.map((conversation, ind) => (
        <Conversation
          key={conversation?._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastInd={conversations.length - 1 === ind}
        />
      ))}
      {loading ? <span className="loading loading-bars max-auto"></span> : null}
    </div>
  );
};

export default Conversations;
